import { DataSourceOptions } from 'typeorm';
import { SupplierProduct } from '../entities/supplier-product.entity';
import { SupplierProductImage } from '../entities/supplier-product-image.entity';
import { SupplierProductVariant } from '../entities/supplier-product-variant.entity';

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
    entities: [SupplierProduct, SupplierProductImage, SupplierProductVariant], // TODO: add more entities
    synchronize: false,
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    logging: process.env.NODE_ENV === 'development',
  };
};

