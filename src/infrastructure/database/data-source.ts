import { DataSource } from 'typeorm';
import { SupplierProductOrm } from '../persistence/entities/supplier-product.entity';
import { ProductImageOrm } from '../persistence/entities/product-image.entity';
import { ProductReviewOrm } from '../persistence/entities/product-review.entity';
import 'dotenv/config';
// Load environment variables

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'khoa261204',
  database: process.env.DATABASE_NAME || 'SupplierProductService',
  entities: [SupplierProductOrm, ProductImageOrm, ProductReviewOrm],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});
