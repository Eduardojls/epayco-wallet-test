import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponseDto {

  @ApiProperty({ type: Boolean, required: true })
  isError: boolean;

  @ApiProperty({ type: Number, required: true })
  code: number;

  @ApiProperty({ type: String, required: true })
  message: string;
}