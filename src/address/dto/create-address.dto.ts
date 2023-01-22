import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @MaxLength(8)
  @MinLength(8)
  cep: string;

  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsNumber()
  number?: number;

  @IsString()
  district: string;
}
