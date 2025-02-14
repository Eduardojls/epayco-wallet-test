import { IsDate, IsNumber, IsString } from 'class-validator';
import { ClientDto } from 'src/client/dto/client.dto';
import { TransactionDto } from './transaction.dto';

export class SessionTransactionDto {
  amount: number;

  status: string;

  sessionStatus: string;

  client: ClientDto;

  createdAt: Date;

  updatedAt: Date;
}
