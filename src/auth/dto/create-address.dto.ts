import { IsString, MaxLength, ValidateIf } from 'class-validator';

export class AddressDto {
  @ValidateIf((o) => Object.values(o).some((v) => v !== undefined))
  @IsString()
  @MaxLength(50)
  street: string;

  @ValidateIf((o) => Object.values(o).some((v) => v !== undefined))
  @IsString()
  @MaxLength(50)
  location: string;

  @ValidateIf((o) => Object.values(o).some((v) => v !== undefined))
  @IsString()
  @MaxLength(50)
  city: string;

  @ValidateIf((o) => Object.values(o).some((v) => v !== undefined))
  @IsString()
  @MaxLength(50)
  country: string;

  @ValidateIf((o) => Object.values(o).some((v) => v !== undefined))
  @IsString()
  @MaxLength(4)
  cp: string;
}
