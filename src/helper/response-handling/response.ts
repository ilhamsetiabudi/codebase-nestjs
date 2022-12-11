import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(error: EntityNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      status: 'failed',
      data: null,
      message: 'Not found',
    });
  }
}
export const success = (data: any, message: any) => {
  return {
    code: 200,
    status: 'success',
    data,
    message,
  };
};

export const error = (message: string, code: number) => {
  return {
    code,
    status: 'failed',
    data: null,
    message,
  };
};
