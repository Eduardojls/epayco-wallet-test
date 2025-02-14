import { IsDate, IsNumber, IsString } from 'class-validator';
import { TransactionDto } from './transaction.dto';
import { ClientDto } from 'src/modules/client/dto/client.dto';

export class SessionTransactionDto {
  readonly  amount: number;

  readonly  status: string;

  readonly  sessionStatus: string;

  readonly  client: ClientDto;

  readonly  createdAt: Date;

  readonly  updatedAt: Date;
}
