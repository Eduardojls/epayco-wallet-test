import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { envs } from 'src/config';
import { ResponseDto } from 'src/dto/response.dto';
import { ClientDto } from '../client/dto/client.dto';
import { RegisterClientDTO } from '../client/dto/registerClient.dto';
import { AddFundsDto } from './dto/addFunds.dto';
import { WalletDto } from './dto/wallet.dto';
import { ConfirmPurchaseDto } from './dto/confirmPurchase.dto';
import { RegisterPurchaseDto } from './dto/registerPurchase.dto';
import { SessionTransactionDto } from './dto/sessionTransaction.dto';
import { ErrorResponseDto } from 'src/dto/errorResponse.dto';
import { TransactionDto } from './dto/transaction.dto';
import { CheckBalanceDto } from './dto/checkBalance.dto';

@Injectable()
export class WalletService {
  private readonly logger: Logger = new Logger('WalletService');

  constructor(
    @Inject(envs.walletService) private readonly clientProxy: ClientProxy,
  ) {}

  async addFunds(
    body: AddFundsDto,
  ): Promise<string | ResponseDto<WalletDto> | ErrorResponseDto> {
    this.logger.debug('WALLET_SERVICE::ADD_FUNDS::INIT');
    const response = await this.clientProxy
      .send<any, AddFundsDto>('/funds/add', body)
      .toPromise();

    this.logger.debug('WALLET_SERVICE::ADD_FUNDS::FINISH');
    return response;
  }

  async registerPurchase(
    body: RegisterPurchaseDto,
  ): Promise<ResponseDto<SessionTransactionDto> | ErrorResponseDto> {
    this.logger.debug('WALLET_SERVICE::REGISTER_PURCHASE::INIT');
    const response = await this.clientProxy
      .send<any, RegisterPurchaseDto>('/purchase/register', body)
      .toPromise();
    this.logger.debug('WALLET_SERVICE::REGISTER_PURCHASE::FINISH');
    return response;
  }

  async confirmPurchase(
    body: ConfirmPurchaseDto,
  ): Promise<ResponseDto<TransactionDto> | ErrorResponseDto> {
    this.logger.debug('WALLET_SERVICE::CONFIRM_PURCHASE::INIT');
    const response = await this.clientProxy
      .send<any, ConfirmPurchaseDto>('/purchase/confirm', body)
      .toPromise();
    this.logger.debug('WALLET_SERVICE::CONFIRM_PURCHASE::FINISH');
    return response;
  }

  async checkBalance(
    body: CheckBalanceDto,
  ): Promise<ResponseDto<{ balance: number }> | ErrorResponseDto> {
    this.logger.debug('WALLET_SERVICE::CHECK_BALANCE::INIT');
    const response = await this.clientProxy
      .send<any, CheckBalanceDto>('/funds/check', body)
      .toPromise();
    this.logger.debug('WALLET_SERVICE::CHECK_BALANCE::FINISH');
    return response;
  }
}
