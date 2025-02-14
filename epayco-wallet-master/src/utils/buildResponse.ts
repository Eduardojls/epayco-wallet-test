import { HttpStatus, Logger } from '@nestjs/common';
import { ErrorResponseDto } from 'src/dto/errorResponse.dto';
import { ResponseDto } from 'src/dto/response.dto';

export class ResponseBuilder {
  private readonly logger: Logger = new Logger();

  buildErrorResponse(code: number, message: string): ErrorResponseDto {
    const response = new ErrorResponseDto();
    response.isError = true;
    response.code = code;
    response.message = message;
    return response;
  }

  buildResponse(data, message: string): ResponseDto<any> {
    this.logger.debug('BUILD_RESPONSE::INIT');
    const response: ResponseDto<any> = {
      data,
      statusCode: data ? HttpStatus.CREATED : HttpStatus.NO_CONTENT,
      message,
    };
    this.logger.debug('BUILD_RESPONSE::FINISH');
    return response;
  }
}

