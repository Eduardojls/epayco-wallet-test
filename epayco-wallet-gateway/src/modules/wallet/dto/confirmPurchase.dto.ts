import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ConfirmPurchaseDto {

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  token: string;

}