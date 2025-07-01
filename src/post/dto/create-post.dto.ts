import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsInt()
  @IsNotEmpty()
  episodeId: number;
}
