import {
  IsEmail,
  IsInt,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterClientDTO {
  @IsString()
  @MinLength(1)
  documentNumber: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  phone: string;
}
