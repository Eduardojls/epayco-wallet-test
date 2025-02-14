import { IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class AddFundsDto {
  @IsString()
  documentNumber: string;

  @IsPositive()
  @IsNumber()
  amount: number;

  @IsString()
  phone: string;
}
