import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SUPPLIER_PRODUCT_CONSTANTS } from '../constants/supplier-product.constants';

export interface SupplierProductConfig {
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
  };
  pagination: {
    defaultPage: number;
    defaultLimit: number;
    maxLimit: number;
  };
  validation: {
    maxImagesPerProduct: number;
    maxTagsPerProduct: number;
    maxTagLength: number;
    lowStockThreshold: number;
  };
  cache: {
    ttl: {
      productDetails: number;
      productList: number;
      featuredProducts: number;
      stats: number;
    };
  };
  business: {
    recentDaysThreshold: number;
    allowedImageTypes: string[];
    maxFileSize: number;
  };
}

@Injectable()
export class SupplierProductConfigService {
  constructor(private readonly configService: ConfigService) {}

  get config(): SupplierProductConfig {
    return {
      database: {
        host: this.configService.get<string>('DATABASE_HOST', 'localhost'),
        port: this.configService.get<number>('DATABASE_PORT', 5432),
        username: this.configService.get<string>('DATABASE_USERNAME', 'postgres'),
        password: this.configService.get<string>('DATABASE_PASSWORD', 'password'),
        database: this.configService.get<string>('DATABASE_NAME', 'SupplierProductService'),
        synchronize: this.configService.get<boolean>('DATABASE_SYNCHRONIZE', false),
        logging: this.configService.get<boolean>('DATABASE_LOGGING', false),
      },
      pagination: {
        defaultPage: SUPPLIER_PRODUCT_CONSTANTS.DEFAULT_PAGE,
        defaultLimit: SUPPLIER_PRODUCT_CONSTANTS.DEFAULT_LIMIT,
        maxLimit: SUPPLIER_PRODUCT_CONSTANTS.MAX_LIMIT,
      },
      validation: {
        maxImagesPerProduct: SUPPLIER_PRODUCT_CONSTANTS.MAX_IMAGES_PER_PRODUCT,
        maxTagsPerProduct: SUPPLIER_PRODUCT_CONSTANTS.MAX_TAGS_PER_PRODUCT,
        maxTagLength: SUPPLIER_PRODUCT_CONSTANTS.MAX_TAG_LENGTH,
        lowStockThreshold: SUPPLIER_PRODUCT_CONSTANTS.LOW_STOCK_THRESHOLD,
      },
      cache: {
        ttl: {
          productDetails: SUPPLIER_PRODUCT_CONSTANTS.CACHE_TTL.PRODUCT_DETAILS,
          productList: SUPPLIER_PRODUCT_CONSTANTS.CACHE_TTL.PRODUCT_LIST,
          featuredProducts: SUPPLIER_PRODUCT_CONSTANTS.CACHE_TTL.FEATURED_PRODUCTS,
          stats: SUPPLIER_PRODUCT_CONSTANTS.CACHE_TTL.STATS,
        },
      },
      business: {
        recentDaysThreshold: SUPPLIER_PRODUCT_CONSTANTS.RECENT_DAYS_THRESHOLD,
        allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
        maxFileSize: this.configService.get<number>('MAX_FILE_SIZE', 5 * 1024 * 1024), // 5MB
      },
    };
  }

  get databaseConfig() {
    return this.config.database;
  }

  get paginationConfig() {
    return this.config.pagination;
  }

  get validationConfig() {
    return this.config.validation;
  }

  get cacheConfig() {
    return this.config.cache;
  }

  get businessConfig() {
    return this.config.business;
  }

  // Helper methods for common configurations
  isProduction(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }

  isDevelopment(): boolean {
    return this.configService.get<string>('NODE_ENV') === 'development';
  }

  getLogLevel(): string {
    return this.configService.get<string>('LOG_LEVEL', 'info');
  }

  getPort(): number {
    return this.configService.get<number>('PORT', 3000);
  }

  getGrpcUrl(): string {
    return this.configService.get<string>('GRPC_URL', 'localhost:50051');
  }
}
