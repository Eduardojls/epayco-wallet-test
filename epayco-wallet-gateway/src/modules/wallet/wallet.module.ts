import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: envs.walletService,
        transport: Transport.TCP,
        options: {
          host: envs.urlMsMaster,
          port: Number(envs.portMsMaster),
        },
      },
    ]),
  ],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
