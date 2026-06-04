import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<unknown> {
    const rpcContext = context.switchToRpc();
    const data = rpcContext.getData();
    const handler = context.getHandler().name;

    this.logger.log(`[${handler}] Request: ${JSON.stringify(data)}`);

    const now = Date.now();
    return next.handle().pipe(
      tap({
        next: (value) => {
          const duration = Date.now() - now;
          this.logger.log(
            `[${handler}] Response (${duration}ms): ${JSON.stringify(value).substring(0, 200)}`,
          );
        },
        error: (error) => {
          const duration = Date.now() - now;
          this.logger.error(
            `[${handler}] Error (${duration}ms): ${error.message}`,
          );
        },
      }),
    );
  }
}
