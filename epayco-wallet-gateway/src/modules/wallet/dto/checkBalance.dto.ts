import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, isString, IsString } from 'class-validator';

export class CheckBalanceDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
