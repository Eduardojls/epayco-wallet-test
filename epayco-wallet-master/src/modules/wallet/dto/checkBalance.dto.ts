import { IsNotEmpty, IsString } from 'class-validator';

export class CheckBalanceDto {
  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
