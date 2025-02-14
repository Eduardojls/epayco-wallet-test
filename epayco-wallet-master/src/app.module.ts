import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config';
import { ClientModule } from './modules/client/client.module';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.hostDB,
      port: Number(envs.portDB),
      username: envs.userDB,
      password: envs.passwordDB,
      database: envs.nameDB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: envs.emailAddress,
          pass: envs.emailPassword,
        },
      },
      preview: true,
      template: {
        dir: __dirname + '/../../epayco-wallet-master/src/templates',
        adapter: new EjsAdapter({
          inlineCssEnabled: true,
        }),
        options: {
          strict: false,
        },
      },
    }),
    ClientModule,
    WalletModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
