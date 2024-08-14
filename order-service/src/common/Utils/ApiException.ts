import { HttpException, HttpStatus } from '@nestjs/common';

export class APIException extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    super(message, statusCode);
    this.message = message;
  }
}