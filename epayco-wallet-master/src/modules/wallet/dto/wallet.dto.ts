import { IsNumber } from 'class-validator';
import { ClientDto } from 'src/client/dto/client.dto';

export class WalletDto {
  @IsNumber()
  readonly balance: number;

  readonly client: ClientDto;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
