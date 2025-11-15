import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { SUPPLIER_PRODUCT_CONSTANTS } from '../constants/supplier-product.constants';

@Catch()
export class SupplierProductExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(SupplierProductExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost): Observable<any> {
    const contextType = host.getType();

    // Log the exception
    this.logger.error(
      `Exception caught: ${exception.message}`,
      exception.stack,
      'SupplierProductExceptionFilter'
    );

    if (contextType === 'rpc') {
      return this.handleRpcException(exception);
    }

    // Handle HTTP exceptions (if needed in the future)
    return this.handleHttpException(exception);
  }

  private handleRpcException(exception: any): Observable<any> {
    let status = 'INTERNAL';
    let message: string = SUPPLIER_PRODUCT_CONSTANTS.ERRORS.INTERNAL_ERROR;
    let details: any = {};

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      status = this.mapHttpStatusToGrpcStatus(exception.getStatus());
      
      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object' && response !== null) {
        message = (response as any).message || SUPPLIER_PRODUCT_CONSTANTS.ERRORS.INTERNAL_ERROR;
        details = response;
      }
    } else if (exception instanceof RpcException) {
      const error = exception.getError();
      if (typeof error === 'string') {
        message = error;
      } else if (typeof error === 'object' && error !== null) {
        message = (error as any).message || SUPPLIER_PRODUCT_CONSTANTS.ERRORS.INTERNAL_ERROR;
        status = (error as any).code || status;
        details = error;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // Return gRPC-compatible error
    return throwError(() => ({
      code: status,
      message,
      details,
    }));
  }

  private handleHttpException(exception: any): Observable<any> {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = SUPPLIER_PRODUCT_CONSTANTS.ERRORS.INTERNAL_ERROR;
    let details: any = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      
      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object' && response !== null) {
        message = (response as any).message || SUPPLIER_PRODUCT_CONSTANTS.ERRORS.INTERNAL_ERROR;
        details = response;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    return throwError(() => ({
      statusCode: status,
      message,
      details,
      timestamp: new Date().toISOString(),
    }));
  }

  private mapHttpStatusToGrpcStatus(httpStatus: number): string {
    const statusMap: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: 'INVALID_ARGUMENT',
      [HttpStatus.UNAUTHORIZED]: 'UNAUTHENTICATED',
      [HttpStatus.FORBIDDEN]: 'PERMISSION_DENIED',
      [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
      [HttpStatus.CONFLICT]: 'ALREADY_EXISTS',
      [HttpStatus.UNPROCESSABLE_ENTITY]: 'FAILED_PRECONDITION',
      [HttpStatus.INTERNAL_SERVER_ERROR]: 'INTERNAL',
      [HttpStatus.SERVICE_UNAVAILABLE]: 'UNAVAILABLE',
    };

    return statusMap[httpStatus] || 'INTERNAL';
  }
}
