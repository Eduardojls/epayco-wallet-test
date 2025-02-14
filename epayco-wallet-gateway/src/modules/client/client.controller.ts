import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ErrorResponseDto } from 'src/dto/errorResponse.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';
import { RegisterClientDTO } from './dto/registerClient.dto';

@Controller('client')
export class ClientController {
  private readonly logger: Logger = new Logger('ClientController');

  constructor(private readonly clientService: ClientService) {}

  @Post()
  async registerClient(
    @Body() body: RegisterClientDTO,
  ): Promise<string | ResponseDto<ClientDto> | ErrorResponseDto> {
    this.logger.debug('CLIENT::CONTROLLER::REGISTER::INIT');
    const response: string | ResponseDto<ClientDto> | ErrorResponseDto =
      await this.clientService.registerClient(body);
    this.logger.debug('CLIENT::CONTROLLER::REGISTER::FINISH');
    return response;
  }
}
