import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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
import { TransactionDto } from './dto/transaction.dto';
import { ConfirmPurchaseDto } from './dto/confirmPurchase.dto';
import { CheckBalanceDto } from './dto/checkBalance.dto';

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
  ): Promise<ResponseDto<WalletDto> | HttpException> {
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
        throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
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
      return new HttpException('Error adding funds', HttpStatus.BAD_REQUEST);
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
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      // Check if the wallet has enough funds
      if (wallet.balance < body.amount) {
        throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
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
      throw new HttpException(
        'Error registering purchase',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async confirmPurchase(body: ConfirmPurchaseDto) {
    try {
      this.logger.error(`WALLET_SERVICE::CONFIRM_PURCHASE::START`);

      // Find if the session transaction exists based on the token
      // and the session ID provided by the client.
      this.logger.debug(
        `WALLET_SERVICE::CONFIRM_PURCHASE::FIND_SESSION_TRANSACTION::START`,
      );
      const session = await this.sessionTransactionRepository.findOne({
        where: {
          idSession: body.sessionId,
          sessionStatus: 'OPEN',
        },
        relations: ['client'],
      });
      this.logger.debug(
        `WALLET_SERVICE::CONFIRM_PURCHASE::FIND_SESSION_TRANSACTION::FINISH`,
      );

      // Validate if token and session are valid
      if (!session || body.token !== session.token) {
        throw new HttpException(
          'Wallet not found, Please verify your session and token are correct',
          HttpStatus.NOT_FOUND,
        );
      }

      const wallet = await this.walletRepository.findOne({
        where: {
          client: {
            phone: session.client.phone,
            documentNumber: session.client.documentNumber,
          },
        },
        relations: ['client'],
      });
      if (!wallet) {
        throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
      }

      this.logger.log('SESSION', wallet);

      // Let's create a Transaction now we now the session transaction is
      // okay and everything is validated.
      const transaction = this.transactionRepository.create({
        amount: session.amount,
        client: session.client,
        documentNumber: session.documentNumber,
        sessionTransaction: session,
        type: 'PURCHASE', // Add enum
        reference: session.idSession,
      });
      this.logger.debug(
        `WALLET_SERVICE::CONFIRM_PURCHASE::CREATE_TRANSACTION::START`,
      );
      const createdTransaction =
        await this.transactionRepository.save(transaction);
      this.logger.debug(
        `WALLET_SERVICE::CONFIRM_PURCHASE::CREATE_TRANSACTION::FINISH`,
      );

      // Once the wallet's funds were check, let's
      // withdraw the funds from client's wallet
      wallet!.balance -= session.amount;
      this.logger.debug(
        `WALLET_SERVICE::CONFIRM_PURCHASE::UPDATE_WALLET_FUNDS::START`,
      );
      await this.walletRepository.update(wallet!.id, wallet!);
      this.logger.debug(
        `WALLET_SERVICE::CONFIRM_PURCHASE::UPDATE_WALLET_FUNDS::FINISH`,
      );

      // Update the session transaction status's to
      // mark it as CONFIRMED and CLOSED.
      this.logger.debug(
        `WALLET_SERVICE::CONFIRM_PURCHASE::UPDATE_SESSION_TRANSACTION::START`,
      );
      const updatedSessionTransaction =
        await this.sessionTransactionRepository.update(
          { idSession: body.sessionId },
          {
            status: 'CONFIRMED',
            updatedAt: new Date(),
            sessionStatus: 'CLOSED',
          },
        );
      this.logger.debug(
        `WALLET_SERVICE::CONFIRM_PURCHASE::UPDATE_SESSION_TRANSACTION::FINISH`,
      );

      this.logger.debug(`CONFIRM_PURCHASE::SERVICE::SUCCESS`);

      const transactionDto: TransactionDto = {
        amount: createdTransaction.amount,
        client: createdTransaction.client,
        reference: createdTransaction.reference,
        createdAt: createdTransaction.createdAt,
        type: createdTransaction.type,
        sessionTransaction: createdTransaction.sessionTransaction,
      };
      return this.responseBuilder.buildResponse(
        transactionDto,
        'Purchase confirmed successfully',
      );
    } catch (err) {
      this.logger.error(`WALLET_SERVICE::CONFIRM_PURCHASE::ERROR::${err}`);
      throw new HttpException(
        'Error confirming purchase',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async checkBalance(
    body: CheckBalanceDto,
  ): Promise<ResponseDto<{ balance: number }> | HttpException> {
    try {
      this.logger.error(`WALLET_SERVICE::CHECK_BALANCE::START`);
      const wallet = await this.walletRepository.findOneBy({
        client: {
          phone: body.phone,
          documentNumber: body.documentNumber,
        },
      });
      if (!wallet) {
        return new HttpException(
          'Wallet not found. Please check the phone and document number.',
          HttpStatus.NOT_FOUND,
        );
      }

      return this.responseBuilder.buildResponse(
        wallet.balance,
        `Balance checked successfully`,
      );
    } catch (error) {
      this.logger.error(`WALLET_SERVICE::CHECK_BALANCE::ERROR::${error}`);
      return new HttpException(
        'Error adding funds. Contact support',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
