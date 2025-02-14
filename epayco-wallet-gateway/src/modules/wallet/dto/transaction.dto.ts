import { ClientDto } from 'src/modules/client/dto/client.dto';
import { SessionTransactionDto } from './sessionTransaction.dto';

export class TransactionDto {
  readonly amount: number;

  readonly type: string;

  readonly reference: string;

  readonly client: ClientDto;

  readonly createdAt: Date;

  readonly sessionTransaction: SessionTransactionDto;
}
