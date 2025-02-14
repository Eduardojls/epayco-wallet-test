import { HttpStatus, Injectable } from '@nestjs/common';
import { RegisterClientDTO } from './dto/registerClient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/entities/client.entity';
import { Wallet } from 'src/entities/wallet.entity';
import { ResponseDto } from 'src/dto/response.dto';
import { ClientDto } from './dto/client.dto';
import { ErrorResponseDto } from 'src/dto/errorResponse.dto';
import { ResponseBuilder } from 'src/utils/buildResponse';

@Injectable()
export class ClientService {
  private readonly responseBuilder = new ResponseBuilder();

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async registerClient(
    body: RegisterClientDTO,
  ): Promise<ResponseDto<ClientDto> | ErrorResponseDto> {
    try {
      const existingClient = await this.clientRepository.findOne({
        where: {
          documentNumber: body.documentNumber,
          phone: body.phone,
        },
      });

      if (existingClient) {
        return this.responseBuilder.buildErrorResponse(
          HttpStatus.BAD_REQUEST,
          `Error, client with document ${body.documentNumber} and phone ${body.phone} already exists`,
        );
      }

      const client = this.clientRepository.create(body);
      const wallet = this.walletRepository.create({ balance: 0, client });
      const createdWallet = await this.walletRepository.save(wallet);
      client.wallets = [createdWallet];
      const { id, ...savedUser } = await this.clientRepository.save(client);

      return this.responseBuilder.buildResponse(
        savedUser,
        'Client registered successfully',
      );
    } catch (error) {
      return this.responseBuilder.buildErrorResponse(
        HttpStatus.BAD_REQUEST,
        `Error registering client: ${error}`,
      );
    }
  }
}
