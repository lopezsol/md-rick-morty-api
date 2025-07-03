import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './create-address.dto';

export class UpdateUserDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @ValidateIf((obj) => obj.name !== null)
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  name?: string | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto | null;

  @IsOptional()
  @ValidateIf((obj) => obj.birthday !== null)
  @IsDateString()
  birthday?: string | null;

  @IsOptional()
  @ValidateIf((obj) => obj.nickname !== null)
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  nickname?: string | null;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  favoriteEpisodes?: number[] | null;

  @IsOptional()
  @ValidateIf((obj) => obj.avatarUrl !== null)
  @IsString()
  @MaxLength(2048)
  avatarUrl?: string | null;
}
