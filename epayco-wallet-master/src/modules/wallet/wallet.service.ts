import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from 'src/entities/wallet.entity';
import { ResponseBuilder } from 'src/utils/buildResponse';
import { Repository } from 'typeorm';
import { WalletDto } from './dto/wallet.dto';
import { Transaction } from 'src/entities/transaction.entity';
import { AddFundsDto } from './dto/addFunds.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { ErrorResponseDto } from 'src/dto/errorResponse.dto';
import { generateToken } from 'src/utils/tokenSession';

@Injectable()
export class WalletService {

  private readonly logger: Logger = new Logger('ClientService');
  private readonly responseBuilder: ResponseBuilder = new ResponseBuilder();


  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,

    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async addFunds(
    addFundsDto: AddFundsDto,
  ): Promise<ResponseDto<WalletDto> | ErrorResponseDto> {
    try {
      // Find wallet by querying by the client's credentials
      const wallet = await this.walletRepository.findOne({
        where: {
          client: {
            phone: addFundsDto.phone,
            documentNumber: addFundsDto.documentNumber,
          },
        },
        relations: ['client'],
      });
      if (!wallet) {
        return this.responseBuilder.buildErrorResponse(
          HttpStatus.NOT_FOUND,
          'Wallet not found',
        );
      }

      // Add funds once the wallet  and the client are found.
      wallet.balance += addFundsDto.amount;
      this.walletRepository.update(wallet.id, wallet);

      // Lets create a transaction
      const transaction = this.transactionRepository.create({
        amount: addFundsDto.amount,
        client: wallet.client,
        documentNumber: wallet.client.documentNumber,
        type: 'ADD_FUNDS', // Add enum
        reference: generateToken(),
      });
      this.logger.debug(`WALLET_SERVICE::ADD_FUNDS::CREATE_TRANSACTION::START`);
      await this.transactionRepository.save(transaction);
      this.logger.debug(
        `WALLET_SERVICE::ADD_FUNDS::CREATE_TRANSACTION::FINISH`,
      );

      // Remove the id from the wallet and client instance's in order
      // to prevent including it in the response
      const {
        id,
        client: { id: clientId, ...rest },
        ...walletData
      } = wallet;

      const response: WalletDto = {
        ...walletData,
        client: rest,
      };

      return this.responseBuilder.buildResponse(
        response,
        'Funds added successfully',
      );
    } catch (error) {
      this.logger.error(`WALLET_SERVICE::REGISTER_CLIENT::ERROR::${error}`);
      return this.responseBuilder.buildErrorResponse(
        HttpStatus.BAD_REQUEST,
        'Error adding funds',
      );
    }
  }
}
