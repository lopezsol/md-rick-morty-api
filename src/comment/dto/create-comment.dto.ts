import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  postId: string;

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  @IsNotEmpty()
  content: string;
}
