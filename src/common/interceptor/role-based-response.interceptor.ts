import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Metadata } from '@grpc/grpc-js';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { FIELD_ROLES_KEY } from '../decorators/field-roles.decorator';
import { RESPONSE_VIEW_KEY } from '../decorators/response-view.decorator';

@Injectable()
export class RoleBasedResponseInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const viewDto = this.reflector.get<Type<unknown>>(RESPONSE_VIEW_KEY, context.getHandler());
        if (!viewDto) {
            return next.handle();
        }

        const metadata = context.switchToRpc().getContext<Metadata>();
        const role = metadata?.get('userrole')?.[0]?.toString() ?? '';

        return next
            .handle()
            .pipe(map((data) => this.transformAndFilterByRole(data, viewDto, role)));
    }

    private transformAndFilterByRole(
        data: unknown,
        dtoClass: Type<unknown>,
        role: string,
    ): unknown {
        const transformed = plainToInstance(dtoClass, data, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true,
        });

        this.filterByRole(transformed, role);
        return transformed;
    }

    private filterByRole(payload: unknown, role: string): void {
        if (payload === null || payload === undefined) {
            return;
        }

        if (Array.isArray(payload)) {
            payload.forEach((item) => this.filterByRole(item, role));
            return;
        }

        if (typeof payload !== 'object') {
            return;
        }

        const instance = payload as Record<string, unknown>;
        const prototype = Object.getPrototypeOf(instance);

        for (const key of Object.keys(instance)) {
            const allowedRoles = Reflect.getMetadata(FIELD_ROLES_KEY, prototype, key) as
                | string[]
                | undefined;

            if (allowedRoles && !allowedRoles.includes(role)) {
                delete instance[key];
                continue;
            }

            this.filterByRole(instance[key], role);
        }
    }
}
