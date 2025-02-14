import { Controller, Logger } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddFundsDto } from './dto/addFunds.dto';
import { WalletDto } from './dto/wallet.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { ErrorResponseDto } from 'src/dto/errorResponse.dto';
import { ConfirmPurchaseDto } from './dto/confirmPurchase.dto';
import { RegisterPurchaseDto } from './dto/registerPurchase.dto';
import { SessionTransactionDto } from './dto/sessionTransaction.dto';
import { TransactionDto } from './dto/transaction.dto';

@Controller('wallet')
export class WalletController {
  private readonly logger: Logger = new Logger('WalletController');


  constructor(private readonly walletService: WalletService) {}

  @MessagePattern('/funds/add')
  async addFunds(
    @Payload() body: AddFundsDto,
  ): Promise<ResponseDto<WalletDto> | ErrorResponseDto> {
    this.logger.debug('WALLET::CONTROLLER::ADD_FUNDS::INIT');
    const response = await this.walletService.addFunds(body);
    this.logger.debug('WALLET::CONTROLLER::ADD_FUNDS::FINISH');
    return response;
  }

  @MessagePattern('/purchase/register')
  async registerPurchase(
    @Payload() body: RegisterPurchaseDto,
  ): Promise<ResponseDto<SessionTransactionDto> | ErrorResponseDto> {
    this.logger.debug('WALLET::CONTROLLER::REGISTER_PURCHASE::INIT');
    const response = await this.walletService.registerPurchase(body);
    this.logger.debug('WALLET::CONTROLLER::REGISTER_PURCHASE::FINISH');
    return response;
  }

  @MessagePattern('/purchase/confirm')
  async confirmPurchase(
    @Payload() body: ConfirmPurchaseDto,
  ): Promise<ResponseDto<TransactionDto> | ErrorResponseDto> {
    this.logger.debug('WALLET::CONTROLLER::REGISTER_PURCHASE::INIT');
    const response = await this.walletService.confirmPurchase(body);
    this.logger.debug('WALLET::CONTROLLER::REGISTER_PURCHASE::FINISH');
    return response;
  }
}
