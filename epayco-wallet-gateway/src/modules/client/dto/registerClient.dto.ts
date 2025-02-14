import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterClientDTO {

  @ApiProperty({ type: String, required: true })
  @IsString()
  @MinLength(1)
  documentNumber: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ type: String, required: true })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  phone: string;
}
