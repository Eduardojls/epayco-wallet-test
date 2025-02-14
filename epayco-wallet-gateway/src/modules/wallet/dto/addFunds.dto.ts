import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class AddFundsDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  documentNumber: string;
  
  @ApiProperty({ type: Number, required: true })
  @IsPositive()
  @IsNumber()
  amount: number;

  @ApiProperty({ type: String, required: true })
  @IsString()
  phone: string;
}
