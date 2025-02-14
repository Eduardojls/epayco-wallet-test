import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmPurchaseDto {

  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @IsNotEmpty()
  @IsString()
  token: string;

}