import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class UpdateCommentDto {
  @IsUUID()
  id: string; // obligatorio

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  content?: string;
}
