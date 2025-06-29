import { IsBoolean, IsUUID, IsNotEmpty } from 'class-validator';

export class UpdatePostDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  @IsNotEmpty()
  enabled: boolean;
}
