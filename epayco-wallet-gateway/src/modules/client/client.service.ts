import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ClientDto } from './dto/client.dto';
import { RegisterClientDTO } from './dto/registerClient.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { ErrorResponseDto } from 'src/dto/errorResponse.dto';
import { envs } from 'src/config';

@Injectable()
export class ClientService {
  // private readonly client: ClientProxy;
  private readonly logger: Logger = new Logger('ClientService');

  constructor(
    @Inject(envs.clientService) private readonly clientProxy: ClientProxy, 
  ) {}

  async registerClient(
    body: RegisterClientDTO,
  ): Promise<string | ResponseDto<ClientDto>> {
    this.logger.debug('CLIENT::SERVICE::REGISTER::INIT');
    const response = await this.clientProxy.send<any, RegisterClientDTO>(
      '/client',
      body,
    ).toPromise();

    this.logger.debug('CLIENT::SERVICE::REGISTER::FINISH');
    return response;
  }
}
