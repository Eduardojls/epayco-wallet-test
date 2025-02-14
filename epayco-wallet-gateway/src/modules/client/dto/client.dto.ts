import { IsString } from 'class-validator';

export class ClientDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly documentNumber: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly phone: string;

  // @IsString()
  readonly createdAt: Date;

  // @IsString()
  readonly updatedAt: Date;
}
