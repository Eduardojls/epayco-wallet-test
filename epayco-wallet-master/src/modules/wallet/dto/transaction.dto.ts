import { IsNumber, IsString } from 'class-validator';
import { ClientDto } from 'src/client/dto/client.dto';
import { SessionTransactionDto } from './sessionTransaction.dto';

export class TransactionDto {
  amount: number;

  type: string;

  reference: string;

  client: ClientDto;

  createdAt: Date;

  sessionTransaction: SessionTransactionDto;
}
