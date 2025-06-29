import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { successResponse } from 'src/common/helpers/auth-response.helper';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  create(episodeId: number) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all post`;
  }

  async findOrCreateByepisodeId(episodeId: number) {
    const existing = await this.postRepository.findOne({
      where: { episodeId: episodeId },
    });

    if (existing) {
      return successResponse({
        data: { newPost: existing },
      });
    }

    const newPost = this.postRepository.create({ episodeId });
    const savedPost = await this.postRepository.save(newPost);

    return successResponse({
      message: 'Post created successfully',
      data: { newPost: savedPost },
    });
  }

  async update(dto: UpdatePostDto) {
    const post = await this.postRepository.findOneBy({ id: dto.id });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    post.enabled = dto.enabled;

    await this.postRepository.save(post);

    return successResponse({ message: 'Post updated successfully' });
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['comments'],
    });

    if (!post) throw new NotFoundException('Post not found');

    return successResponse({ data: post });
  }
}
