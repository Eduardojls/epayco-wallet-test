export class ResponseDto<Model> {
  data: Model;
  code: number;
  message: string;
}