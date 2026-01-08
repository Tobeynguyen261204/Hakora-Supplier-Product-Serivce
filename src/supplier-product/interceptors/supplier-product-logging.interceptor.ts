import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class SupplierProductLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(SupplierProductLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType = context.getType();
    const handler = context.getHandler();
    const className = context.getClass().name;
    const methodName = handler.name;

    let requestInfo = '';
    let metadataInfo = '';
    
    if (contextType === 'rpc') {
      const rpcContext = context.switchToRpc();
      const data = rpcContext.getData();
      requestInfo = `gRPC ${className}.${methodName}`;
      
      // Log metadata details
      const args = context.getArgs();
      if (args && args.length > 2 && args[2]) {
        const metadata = args[2];
        metadataInfo = JSON.stringify({
          headers: metadata?.getMap?.() || metadata || {}
        });
      }
      
      this.logger.log(
        `[${requestInfo}] Metadata: ${metadataInfo}`,
        JSON.stringify(data, null, 2)
      );
    } else if (contextType === 'http') {
      const httpContext = context.switchToHttp();
      const request = httpContext.getRequest();
      requestInfo = `${request.method} ${request.url}`;
      
      this.logger.log(
        `Incoming HTTP request: ${requestInfo}`,
        JSON.stringify(request.body, null, 2)
      );
    }

    const startTime = Date.now();

    return next.handle().pipe(
      tap((response) => {
        const duration = Date.now() - startTime;
        // this.logger.log(
        //   `${requestInfo} completed in ${duration}ms`,
        //   JSON.stringify(response, null, 2)
        // );
      }),
      catchError((error) => {
        const duration = Date.now() - startTime;
        this.logger.error(
          `${requestInfo} failed in ${duration}ms: ${error.message}`,
          error.stack
        );
        throw error;
      })
    );
  }
}
