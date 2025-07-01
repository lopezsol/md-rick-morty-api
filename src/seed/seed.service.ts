import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Post as PostEntity } from '../post/entities/post.entity';
import { Comment } from '../comment/entities/comment.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async seed() {
    // Limpiar tablas en orden correcto por FK
    // await this.commentRepository.clear();
    // await this.postRepository.clear();
    // await this.userRepository.clear();

    // Usuarios base + 10 más
    const usersData = [
      {
        name: 'Sol Lopez',
        mail: 'sol@gmail.com',
        password: '12345678',
        role: 'user',
        avatarUrl:
          'https://wallpapers.com/images/featured/stitch-profile-pictures-g710m4ul2u00hfrd.jpg',
        favoriteEpisodes: [1, 3, 5, 7, 9],
      },
      {
        name: 'Maria Rios',
        mail: 'maria@gmail.com',
        password: '12345678',
        role: 'user',
        avatarUrl:
          'https://i.pinimg.com/474x/0e/93/50/0e9350e719532c989e02bea6ef3a5c78.jpg',
        favoriteEpisodes: [2, 4, 6, 8],
      },
      {
        name: 'admin',
        mail: 'admin@gmail.com',
        password: '12345678',
        role: 'admin',
        avatarUrl:
          'https://i.pinimg.com/736x/3a/e7/b7/3ae7b75877e3696e3cbfdb7b8fae19a0.jpg',
        favoriteEpisodes: [],
      },
    ];

    for (let i = 1; i <= 10; i++) {
      usersData.push({
        name: `User${i}`,
        mail: `user${i}@example.com`,
        password: '12345678',
        role: 'user',
        avatarUrl: '',
        favoriteEpisodes: [],
      });
    }

    // Guardar usuarios
    const users: User[] = [];
    for (const userData of usersData) {
      const user = this.userRepository.create({
        ...userData,
        password: await bcrypt.hash(userData.password, 10),
      });
      users.push(await this.userRepository.save(user));
    }

    // Crear posts
    const posts: PostEntity[] = [];
    for (let i = 1; i <= 5; i++) {
      const post = this.postRepository.create({
        episodeId: i,
        enabled: true,
      });
      posts.push(await this.postRepository.save(post));
    }

    // Comentarios distintos por post
    const commentsTextsPerPost = [
      [
        'Wubba lubba dub dub!',
        'I turned myself into a pickle!',
        'That was a wild episode!',
      ],
      [
        'Morty, you gotta relax.',
        'Classic Rick and Morty chaos.',
        'Rick is a genius... and a mess.',
      ],
      [
        'Time to go on an adventure!',
        'This episode blew my mind.',
        'Summer is the real MVP.',
      ],
      [
        'What a crazy portal jump!',
        'Love the animation in this one.',
        'Beth is awesome here.',
      ],
      [
        'Morty got owned again!',
        'Interdimensional cable is the best.',
        'Pickle Rick strikes again!',
      ],
    ];

    // Crear comentarios: 2 por post por usuario
    for (const user of users) {
      for (let postIndex = 0; postIndex < posts.length; postIndex++) {
        const post = posts[postIndex];
        const commentsTexts = commentsTextsPerPost[postIndex];
        for (let i = 0; i < 2; i++) {
          const comment = this.commentRepository.create({
            content:
              commentsTexts[Math.floor(Math.random() * commentsTexts.length)],
            post,
            user,
          });
          await this.commentRepository.save(comment);
        }
      }
    }

    return {
      message: 'Database seeded successfully',
      usersCount: users.length,
      postsCount: posts.length,
      commentsCount: users.length * posts.length * 2,
    };
  }
}
