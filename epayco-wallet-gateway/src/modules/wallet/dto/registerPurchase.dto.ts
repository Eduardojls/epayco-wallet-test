import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, Min } from "class-validator";

export class RegisterPurchaseDto {

  @ApiProperty({ type: String, required: true })
  @IsString()
  documentNumber: string;

  @ApiProperty({ type: String, required: true })
  @IsPositive()
  @IsNumber()
  amount: number;

  @IsString()
  phone: string;
}
