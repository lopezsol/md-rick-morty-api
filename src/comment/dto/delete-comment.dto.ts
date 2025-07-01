// src/comment/dto/delete-comment.dto.ts
import { IsUUID, IsNotEmpty } from 'class-validator';

export class DeleteCommentDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
