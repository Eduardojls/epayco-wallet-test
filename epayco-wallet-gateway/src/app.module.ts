import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './modules/client/client.module';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
  imports: [ConfigModule.forRoot(), ClientModule, WalletModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
