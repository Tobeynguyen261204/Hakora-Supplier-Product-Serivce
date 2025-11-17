import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SupplierProductModule } from './supplier-product/supplier-product.module';
import { getDatabaseConfig } from './supplier-product/database/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
    SupplierProductModule,
  ],
})
export class AppModule {}
