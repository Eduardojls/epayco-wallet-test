import { ClientDto } from 'src/modules/client/dto/client.dto';
import { SessionTransactionDto } from './sessionTransaction.dto';

export class TransactionDto {
  amount: number;

  type: string;

  reference: string;

  client: ClientDto;

  createdAt: Date;

  sessionTransaction: SessionTransactionDto;
}
