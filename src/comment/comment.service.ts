import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/auth/entities/user.entity';
import { successResponse } from 'src/common/helpers/auth-response.helper';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: User) {
    const { postId, content } = createCommentDto;

    const post = await this.postRepository.findOneBy({ id: postId });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = this.commentRepository.create({
      content,
      post,
      user,
    });

    await this.commentRepository.save(comment);

    const newComment = {
      id: comment.id,
      content: comment.content,
      author: {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      createdAt: comment.createdAt,
    };

    return successResponse({
      message: 'Comment created successfully',
      data: { newComment },
    });
  }

  // async findAllBypostId(postId: string) {
  //   const post = await this.postRepository.findOneBy({ id: postId });
  //   if (!post) {
  //     throw new NotFoundException('Post not found');
  //   }

  //   const comments = await this.commentRepository.find({
  //     where: { post: { id: postId } },
  //     relations: ['user'],
  //     order: { createdAt: 'DESC' },
  //   });

  //   return successResponse({
  //     message: 'Comments retrieved successfully',
  //     data: { comments },
  //   });
  // }

  async findAllBypostId(postId: string, options: IPaginationOptions) {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (!post) throw new NotFoundException('Post not found');

    const queryBuilder = this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.postId = :postId', { postId })
      .orderBy('comment.createdAt', 'DESC');

    const paginated = await paginate<Comment>(queryBuilder, options);

    const comments = paginated.items.map((comment) => ({
      id: comment.id,
      content: comment.content,
      postId: postId,
      createdAt: comment.createdAt,
      author: {
        name: comment.user.name,
        userId: comment.user.id,
        avatarUrl: comment.user.avatarUrl,
      },
    }));

    return successResponse({
      message: 'Comments retrieved successfully',
      data: {
        info: {
          totalComments: paginated.meta.totalItems,
          commentsPerPage: paginated.meta.itemsPerPage,
          totalPages: paginated.meta.totalPages,
          page: paginated.meta.currentPage,
          nextPage: paginated.meta.hasNextPage
            ? paginated.meta.currentPage + 1
            : null,
        },
        comments,
      },
    });
  }

  async update(updateCommentDto: UpdateCommentDto) {
    const { id, content } = updateCommentDto;

    const comment = await this.commentRepository.findOne({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (content !== undefined) {
      if (typeof content !== 'string') {
        throw new BadRequestException('Content must be a string');
      }
      comment.content = content;
    }

    // Si quieres permitir actualizar postId (poco común) deberías validar y actualizar también

    await this.commentRepository.save(comment);

    return successResponse({
      message: 'Comment updated successfully',
    });
  }

  async remove(deleteCommentDto: DeleteCommentDto): Promise<any> {
    const { id } = deleteCommentDto;

    const result = await this.commentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return successResponse({
      message: 'Comment deleted successfully',
    });
  }
}
