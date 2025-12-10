import { DataSourceOptions } from 'typeorm';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { ProductImageOrm } from '../entities/product-image.entity';
import { ProductReviewOrm } from '../entities/product-review.entity';
import { ShippingMethodOrm } from '../entities/shipping-method.entity';

/**
 * Database configuration chung cho cả NestJS app và TypeORM CLI
 * Tránh trùng lặp cấu hình giữa app.module.ts và data-source.ts
 */
export const getDatabaseConfig = (): DataSourceOptions => {
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'SupplierProductService',
    entities: [SupplierProductOrm, ProductImageOrm, ProductReviewOrm, ShippingMethodOrm],
    synchronize: false,
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    logging: process.env.NODE_ENV === 'development',
  };
};

