import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { SUPPLIER_PRODUCT_CONSTANTS } from '../constants/supplier-product.constants';

/**
 * gRPC Exception Filter
 * Xử lý tất cả exceptions và convert sang gRPC error format
 */
@Catch()
export class SupplierProductExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(SupplierProductExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost): Observable<any> {
    // Log the exception
    this.logger.error(
      `Exception caught: ${exception.message || 'Unknown error'}`,
      exception.stack,
      'SupplierProductExceptionFilter'
    );

    // Xử lý exception cho gRPC
    return this.handleGrpcException(exception);
  }

  private handleGrpcException(exception: any): Observable<any> {
    let code = 13; // INTERNAL (default)
    let message: string = SUPPLIER_PRODUCT_CONSTANTS.ERRORS.INTERNAL_ERROR;
    let details: any = {};

    if (exception instanceof RpcException) {
      // Nếu đã là RpcException, lấy thông tin từ đó
      const error = exception.getError();
      
      if (typeof error === 'string') {
        message = error;
      } else if (typeof error === 'object' && error !== null) {
        code = (error as any).code || code;
        message = (error as any).message || message;
        details = (error as any).details || {};
      }
    } else if (exception instanceof Error) {
      // Generic Error
      message = exception.message;
      details = {
        name: exception.name,
        stack: exception.stack,
      };
    } else {
      // Unknown error
      message = String(exception) || SUPPLIER_PRODUCT_CONSTANTS.ERRORS.INTERNAL_ERROR;
    }

    // Return gRPC-compatible error
    return throwError(() => ({
      code,
      message,
      details,
    }));
  }
}
