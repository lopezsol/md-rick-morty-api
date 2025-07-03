import { IsArray, IsInt, IsOptional, IsUUID } from 'class-validator';

export class UpdateUserFavoriteEpisodesDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  favoriteEpisodes?: number[];
}
