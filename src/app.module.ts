import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SupplierProductModule } from './supplier-product/supplier-product.module';
import { getDatabaseConfig } from './supplier-product/database/database.config';
import { RoleBasedResponseInterceptor } from './common/interceptor/role-based-response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    SupplierProductModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RoleBasedResponseInterceptor,
    },
  ],
})
export class AppModule { }
