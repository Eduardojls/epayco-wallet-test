import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/entities/wallet.entity';
import { Client } from 'src/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Wallet])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
