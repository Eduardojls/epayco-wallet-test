import { ClientDto } from "src/modules/client/dto/client.dto";

export class SessionTransactionDto {
  amount: number;

  status: string;

  sessionStatus: string;

  client: ClientDto;

  createdAt: Date;

  updatedAt: Date;
}
