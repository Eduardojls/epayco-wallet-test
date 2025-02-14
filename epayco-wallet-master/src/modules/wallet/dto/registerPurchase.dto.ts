import { IsNumber, IsPositive, IsString, Min } from "class-validator";

export class RegisterPurchaseDto {
  @IsString()
  documentNumber: string;

  @IsPositive()
  @IsNumber()
  amount: number;

  @IsString()
  phone: string;
}
