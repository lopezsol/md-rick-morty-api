import { IsString, MaxLength, Length } from 'class-validator';

export class AddressDto {
  @IsString()
  @MaxLength(50)
  street: string;

  @IsString()
  @MaxLength(50)
  city: string;

  @IsString()
  @MaxLength(50)
  location: string;

  @IsString()
  @MaxLength(50)
  country: string;

  @IsString()
  @Length(4, 4)
  cp: string;
}
