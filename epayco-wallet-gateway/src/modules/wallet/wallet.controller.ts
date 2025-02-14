import {
  Body,
  Controller,
  Get,
  Logger,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/dto/errorResponse.dto';
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

  @ApiBody({ type: AddFundsDto })
  @ApiResponse({ status: 201, description: ''})
  @Patch('/funds/add')
  async addFunds(
    @Body() body: AddFundsDto,
  ): Promise<string | ResponseDto<WalletDto> | ErrorResponseDto> {
    this.logger.debug('WALLET::CONTROLLER::ADD_FUNDS::INIT');
    const response: string | ResponseDto<WalletDto> | ErrorResponseDto =
      await this.walletService.addFunds(body);
    this.logger.debug('WALLET::CONTROLLER::ADD_FUNDS::FINISH');
    return response;
  }

  @Post('/purchase/register')
  async registerPurchase(
    @Body() body: RegisterPurchaseDto,
  ): Promise<ResponseDto<SessionTransactionDto> | ErrorResponseDto> {
    this.logger.debug('WALLET::CONTROLLER::REGISTER_PURCHASE::INIT');
    const response = await this.walletService.registerPurchase(body);
    this.logger.debug('WALLET::CONTROLLER::REGISTER_PURCHASE::FINISH');
    return response;
  }

  @Post('/purchase/confirm')
  async confirmPurchase(
    @Body() body: ConfirmPurchaseDto,
  ): Promise<ResponseDto<TransactionDto> | ErrorResponseDto> {
    this.logger.debug('WALLET::CONTROLLER::CONFIRM_PURCHASE::INIT');
    const response = await this.walletService.confirmPurchase(body);
    this.logger.debug('WALLET::CONTROLLER::CONFIRM_PURCHASE::FINISH');
    return response;
  }

  @Get('/funds/check')
  async checkBalance(
    @Query() query: CheckBalanceDto,
  ): Promise<ResponseDto<{ balance: number }> | ErrorResponseDto> {
    this.logger.debug('WALLET::CONTROLLER::CONFIRM_PURCHASE::INIT');
    const response = await this.walletService.checkBalance(query);
    this.logger.debug('WALLET::CONTROLLER::CONFIRM_PURCHASE::FINISH');
    return response;
  }
}
