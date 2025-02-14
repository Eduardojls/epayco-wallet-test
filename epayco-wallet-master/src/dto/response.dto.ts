export class ResponseDto<Model> {
  data: Model;
  statusCode: number;
  message: string;
}