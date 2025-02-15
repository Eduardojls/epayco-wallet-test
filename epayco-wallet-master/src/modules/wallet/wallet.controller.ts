import { Controller, HttpException, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ResponseDto } from 'src/dto/response.dto';
import { AddFundsDto } from './dto/addFunds.dto';
import { CheckBalanceDto } from './dto/checkBalance.dto';
import { ConfirmPurchaseDto } from './dto/confirmPurchase.dto';
import { RegisterPurchaseDto } from './dto/registerPurchase.dto';
import { SessionTransactionDto } from './dto/sessionTransaction.dto';
import { TransactionDto } from './dto/transaction.dto';
import { WalletDto } from './dto/wallet.dto';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  private readonly logger: Logger = new Logger('WalletController');


  constructor(private readonly walletService: WalletService) {}

  @MessagePattern('/funds/add')
  async addFunds(
    @Payload() body: AddFundsDto,
  ): Promise<ResponseDto<WalletDto> | HttpException> {
    this.logger.debug('WALLET_CONTROLLER::ADD_FUNDS::START');
    const response = await this.walletService.addFunds(body);
    this.logger.debug('WALLET_CONTROLLER::ADD_FUNDS::FINISH');
    return response;
  }

  @MessagePattern('/purchase/register')
  async registerPurchase(
    @Payload() body: RegisterPurchaseDto,
  ): Promise<ResponseDto<SessionTransactionDto> | HttpException> {
    this.logger.debug('WALLET_CONTROLLER::REGISTER_PURCHASE::START');
    const response = await this.walletService.registerPurchase(body);
    this.logger.debug('WALLET_CONTROLLER::REGISTER_PURCHASE::FINISH');
    return response;
  }

  @MessagePattern('/purchase/confirm')
  async confirmPurchase(
    @Payload() body: ConfirmPurchaseDto,
  ): Promise<ResponseDto<TransactionDto> | HttpException> {
    this.logger.debug('WALLET_CONTROLLER::REGISTER_PURCHASE::START');
    const response = await this.walletService.confirmPurchase(body);
    this.logger.debug('WALLET_CONTROLLER::REGISTER_PURCHASE::FINISH');
    return response;
  }

  @MessagePattern('/funds/check')
  async checkBalance(@Payload() query: CheckBalanceDto) {
    this.logger.debug('WALLET_CONTROLLER::CHECK_BALANCE::START');
    const response = await this.walletService.checkBalance(query);
    this.logger.debug('WALLET_CONTROLLER::CHECK_BALANCE::FINISH');
    return response;
  }
}
