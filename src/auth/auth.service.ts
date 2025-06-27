import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { successResponse } from 'src/common/helpers/auth-response.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: string) {
    return `This action returns a #${id} auth`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: string) {
    return `This action removes a #${id} auth`;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const existingUser = await this.userRepository.findOneBy({
        mail: userData.mail,
      });
      if (existingUser) {
        throw new BadRequestException('Mail already registered');
      }

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      const { password: _, ...userWithoutPassword } = user;

      return successResponse({
        message: 'User created successfully',
        data: { user: userWithoutPassword },
      });
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, mail } = loginUserDto;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.mail = :mail', { mail })
      .getOne();

    if (!user) throw new UnauthorizedException('User not found');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid password');

    const { password: _, ...userWithoutPassword } = user;

    return successResponse({
      message: 'authenticated user',
      data: {
        user: userWithoutPassword,
        token: this.getJwtToken({ id: user.id }),
      },
    });
  }

  checkAuthStatus(user: User) {
    return successResponse({
      message: 'Auth status ok',
      data: {
        user,
        token: this.getJwtToken({ id: user.id }),
      },
    });
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505')
      throw new BadRequestException('Mail already registered');

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
