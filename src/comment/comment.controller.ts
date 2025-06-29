import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  @Auth()
  create(@Body() createCommentDto: CreateCommentDto, @GetUser() user: User) {
    return this.commentService.create(createCommentDto, user);
  }

  // @Get(':id')
  // @Auth()
  // findAllBypostId(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.commentService.findAllBypostId(id);
  // }

  @Get(':id')
  findAllBypostId(
    @Param('id', ParseUUIDPipe) postId: string,
    @Query('limit') limit = '20',
    @Query('page') page = '1',
  ) {
    return this.commentService.findAllBypostId(postId, {
      limit: Number(limit),
      page: Number(page),
      route: '', // si querés que venga con `nextPageUrl`, poné la base acá
    });
  }

  @Put('update')
  @Auth()
  update(@Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(updateCommentDto);
  }

  @Delete('delete')
  @Auth()
  remove(@Body() deleteCommentDto: DeleteCommentDto) {
    return this.commentService.remove(deleteCommentDto);
  }

  // @Get()
  // findAll() {
  //   return this.commentService.findAll();
  // }

  // @Get()
  // findAll() {
  //   return this.commentService.findAll();
  // }
}
