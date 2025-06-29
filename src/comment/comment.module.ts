import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Comment } from './entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, User]), AuthModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
