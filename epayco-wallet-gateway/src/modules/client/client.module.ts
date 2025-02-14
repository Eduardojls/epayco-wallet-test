import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: envs.clientService,
        transport: Transport.TCP,
        options: {
          host: envs.urlMsMaster,
          port: Number(envs.portMsMaster),
        },
      },
    ]),
  ],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
