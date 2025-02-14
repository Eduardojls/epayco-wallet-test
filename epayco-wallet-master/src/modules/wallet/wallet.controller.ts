import { Controller, Logger } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddFundsDto } from './dto/addFunds.dto';
import { WalletDto } from './dto/wallet.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { ErrorResponseDto } from 'src/dto/errorResponse.dto';

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
}
