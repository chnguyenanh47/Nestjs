import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    if (exception instanceof HttpException) {
      // Xử lý HttpException từ NestJS
      status = exception.getStatus();
      const httpResponse = exception.getResponse();
      message = typeof httpResponse === 'string' ? httpResponse : httpResponse;
    } else if (exception instanceof QueryFailedError) {
      // Xử lý lỗi từ TypeORM
      status = HttpStatus.BAD_REQUEST;
      message = exception.message || 'Database error occurred';
    } else if (exception instanceof Error) {
      // Trường hợp là lỗi JavaScript thông thường
      message = exception.message;
    }

    // Tránh lỗi circular structure khi JSON.stringify
    const safeMessage =
      typeof message === 'object' ? this.safeStringify(message) : message;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: safeMessage,
    });
  }

  /**
   * Helper function để xử lý JSON.stringify mà không bị lỗi circular structure
   */
  private safeStringify(value: any): string {
    try {
      return JSON.stringify(value);
    } catch (error) {
      return 'Error serializing response';
    }
  }
}
