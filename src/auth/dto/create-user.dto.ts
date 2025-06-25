import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './create-address.dto';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  name: string;

  @IsEmail()
  @MinLength(10)
  @MaxLength(50)
  mail: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @IsOptional()
  @IsDateString()
  birthday?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone?: string;

  // @IsOptional()
  // @IsArray()
  // @IsString({ each: true })
  // favoriteEpisodes?: string[];

  // @IsOptional()
  // @IsString()
  // avatarUrl?: string;
}
