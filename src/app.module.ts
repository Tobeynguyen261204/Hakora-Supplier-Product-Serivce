import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SupplierProductModule } from './supplier-product/supplier-product.module';
import { SupplierProductOrm } from './supplier-product/entities/supplier-product.entity';
import { ProductImageOrm } from './supplier-product/entities/product-image.entity';
import { ProductReviewOrm } from './supplier-product/entities/product-review.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [SupplierProductOrm, ProductImageOrm, ProductReviewOrm],
      synchronize: false,
      migrations: [
        __dirname + '/infrastructure/database/migrations/*{.ts,.js}',
      ],
      logging: process.env.NODE_ENV === 'development',
    }),
    SupplierProductModule,
  ],
})
export class AppModule {}
