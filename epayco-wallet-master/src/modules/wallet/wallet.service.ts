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
import { generateSessionId, generateToken } from 'src/utils/tokenSession';
import { SessionTransaction } from 'src/entities/session-transaction.entity';
import { SessionTransactionDto } from './dto/sessionTransaction.dto';
import { RegisterPurchaseDto } from './dto/registerPurchase.dto';
import { envs } from 'src/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class WalletService {

  private readonly logger: Logger = new Logger('ClientService');
  private readonly responseBuilder: ResponseBuilder = new ResponseBuilder();


  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,

    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    @InjectRepository(SessionTransaction)
    private readonly sessionTransactionRepository: Repository<SessionTransaction>,

    private readonly mailerService: MailerService,
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

  async registerPurchase(body: RegisterPurchaseDto) {
    try {
      const wallet = await this.walletRepository.findOne({
        where: {
          client: {
            phone: body.phone,
            documentNumber: body.documentNumber,
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

      // Check if the wallet has enough funds
      if (wallet.balance < body.amount) {
        return this.responseBuilder.buildErrorResponse(
          HttpStatus.BAD_REQUEST,
          'Insufficient balance',
        );
      }

      // generate token and session ID
      const token = generateToken();
      const idSession = generateSessionId();

      // Create a session transaction to store all the information
      // related to the transaction.
      const sessionTransaction = this.sessionTransactionRepository.create({
        amount: body.amount,
        documentNumber: body.documentNumber,
        status: 'PENDING',
        sessionStatus: 'OPEN',
        token,
        idSession,
        client: wallet.client,
      });

      // Send email to client with token and session ID
      await this.mailerService.sendMail({
        from: envs.emailAddress,
        to: [wallet.client.email],
        subject: 'Register Purchase',
        template: 'confirm-purchase',
        context: {
          name: wallet.client.name,
          sessionId: idSession,
          token: token,
        },
      });

      // Create the session transaction once
      // the information is validated
      const {
        id,
        documentNumber,
        idSession: sessionId,
        token: sessionToken,
        transaction,
        ...createdSessionTransaction
      } = await this.sessionTransactionRepository.save(sessionTransaction);

      const sessionTransactionDto: SessionTransactionDto =
        createdSessionTransaction;

      return this.responseBuilder.buildResponse(
        sessionTransactionDto,
        'Purchase registered successfully',
      );
    } catch (error) {
      this.logger.error(`WALLET_SERVICE::REGISTER_CLIENT::ERROR::${error}`);
      return this.responseBuilder.buildErrorResponse(
        HttpStatus.BAD_REQUEST,
        'Error registering purchase',
      );
    }
  }
}
