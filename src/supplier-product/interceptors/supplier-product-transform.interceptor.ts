import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SUPPLIER_PRODUCT_CONSTANTS } from '../constants/supplier-product.constants';

export interface StandardResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
  path?: string;
}

@Injectable()
export class SupplierProductTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType = context.getType();
    
    return next.handle().pipe(
      map((data) => {
        // For gRPC, return data as-is since it has its own format
        if (contextType === 'rpc') {
          return data;
        }

        // For HTTP, wrap in standard response format
        if (contextType === 'http') {
          const httpContext = context.switchToHttp();
          const request = httpContext.getRequest();
          
          return this.transformHttpResponse(data, request.url);
        }

        return data;
      })
    );
  }

  private transformHttpResponse(data: any, path?: string): StandardResponse {
    // If data is already in standard format, return as-is
    if (data && typeof data === 'object' && 'success' in data) {
      return {
        ...data,
        timestamp: new Date().toISOString(),
        path,
      };
    }

    // Wrap raw data in standard format
    return {
      success: true,
      message: 'Operation completed successfully',
      data,
      timestamp: new Date().toISOString(),
      path,
    };
  }
}
