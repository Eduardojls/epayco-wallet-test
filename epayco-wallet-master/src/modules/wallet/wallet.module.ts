import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/entities/wallet.entity';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Client } from 'src/entities/client.entity';
import { ClientModule } from '../client/client.module';
import { SessionTransaction } from 'src/entities/session-transaction.entity';
import { Transaction } from 'src/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, SessionTransaction, Transaction])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
