import { Controller, Logger } from '@nestjs/common';
import { ClientService } from './client.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterClientDTO } from './dto/registerClient.dto';
import { ClientDto } from './dto/client.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { ErrorResponseDto } from 'src/dto/errorResponse.dto';

@Controller('client')
export class ClientController {
  private readonly logger: Logger = new Logger('ClientController');

  constructor(private readonly clientService: ClientService) {}

  @MessagePattern('/client')
  async registerClient(
    @Payload() body: RegisterClientDTO,
  ): Promise<ResponseDto<ClientDto> | ErrorResponseDto> {
    this.logger.log('CLIENT_CONTROLLER::REGISTER_CLIENT::START');
    const response = await this.clientService.registerClient(body);
    this.logger.log('CLIENT_CONTROLLER::REGISTER_CLIENT::FINISH');
    return response;
  }
}
