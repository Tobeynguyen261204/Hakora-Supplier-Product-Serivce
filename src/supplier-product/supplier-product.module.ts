import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { join } from 'path';

// Controllers
import { SupplierProductController } from './controllers/supplier-product.controller';

// Services
import { CreateSupplierProductService } from './services/create-supplier-product.service';
import { GetSupplierProductsService } from './services/get-supplier-products.service';
import { ApproveSupplierProductService } from './services/approve-supplier-product.service';
import { GetSupplierProductService } from './services/get-supplier-product.service';
import { UpdateSupplierProductService } from './services/update-supplier-product.service';
import { DeleteSupplierProductService } from './services/delete-supplier-product.service';
import { RejectSupplierProductService } from './services/reject-supplier-product.service';
import { HideSupplierProductService } from './services/hide-supplier-product.service';
import { SuspendSupplierProductService } from './services/suspend-supplier-product.service';
import { UnhideSupplierProductService } from './services/unhide-supplier-product.service';
import { ListSupplierProductSellerViewService } from './services/list-supplier-product-seller-view.service';
import { GetSupplierProductSellerViewService } from './services/get-supplier-product-seller-view.service';
import { UnsuspendSupplierProductService } from './services/unsuspend-supplier-product.service';
import { GetSupplierProductStatsService } from './services/get-supplier-product-stats.service';
import { GetSupplierProductsByIdsService } from './services/get-supplier-products-by-ids.service';
import { SupplierProductFactoryService } from './services/supplier-product-factory.service';
import { SupplierProductBusinessService } from './services/supplier-product-business.service';
import { SupplierProductComputedPropertiesService } from './services/supplier-product-computed-properties.service';
import { CategoryValidationService } from './services/category-validation.service';

// Mappers
import { GrpcRequestMapper } from './mappers/grpc-request.mapper';
import { GrpcResponseMapper } from './mappers/grpc-response.mapper';

// Repositories
import { SupplierProductRepository } from './repositories/supplier-product.repository';

// Entities
import { SupplierProductOrm } from './entities/supplier-product.entity';
import { ProductImageOrm } from './entities/product-image.entity';
import { ProductReviewOrm } from './entities/product-review.entity';

// Infrastructure
import { SupplierProductExceptionFilter } from './filters/supplier-product-exception.filter';
import { SupplierProductLoggingInterceptor } from './interceptors/supplier-product-logging.interceptor';
import { SupplierProductTransformInterceptor } from './interceptors/supplier-product-transform.interceptor';
import { SupplierContextInterceptor } from './interceptors/supplier-context.interceptor';
import { SupplierProductAccessGuard } from './guards/supplier-product-access.guard';
import { SupplierProductValidationPipe } from './pipes/supplier-product-validation.pipe';

// Constants
import { SUPPLIER_PRODUCT_CONSTANTS } from './constants/supplier-product.constants';

@Module({
  imports: [
    // gRPC Client for API Gateway (CategoryService)
    // ✅ FIXED: Now calling API Gateway instead of directly calling category-service
    ClientsModule.register([
      {
        name: 'API_GATEWAY_CATEGORY_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'category',
          protoPath: join(__dirname, '..', '..', 'proto', 'category.proto'),
          url: process.env.API_GATEWAY_GRPC_URL || '0.0.0.0:50060',
          loader: {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            arrays: true,
          },
        },
      },
    ]),
    
    // TypeORM
    TypeOrmModule.forFeature([
      SupplierProductOrm,
      ProductImageOrm,
      ProductReviewOrm
    ])
  ],
  controllers: [SupplierProductController],
  providers: [
    // Infrastructure - Global providers
    {
      provide: APP_FILTER,
      useClass: SupplierProductExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SupplierContextInterceptor, // Chạy đầu tiên để inject supplierId từ headers
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SupplierProductLoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SupplierProductTransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: SupplierProductAccessGuard,
    },
    {
      provide: APP_PIPE,
      useClass: SupplierProductValidationPipe,
    },
    
    // Repository
    SupplierProductRepository,
    
    // Business Services (New Architecture)
    SupplierProductFactoryService,
    SupplierProductBusinessService,
    SupplierProductComputedPropertiesService,
    CategoryValidationService,

    // Mappers
    GrpcRequestMapper,
    GrpcResponseMapper,
    
    // Use Cases / Services
    CreateSupplierProductService,
    GetSupplierProductsService,
    GetSupplierProductService,
    UpdateSupplierProductService,
    DeleteSupplierProductService,
    ApproveSupplierProductService,
    RejectSupplierProductService,
    HideSupplierProductService,
    SuspendSupplierProductService,
    UnhideSupplierProductService,
    ListSupplierProductSellerViewService,
    GetSupplierProductSellerViewService,
    GetSupplierProductStatsService,
    UnsuspendSupplierProductService,
    GetSupplierProductsByIdsService,
  ],
  exports: [
    // Repository (for other modules)
    SupplierProductRepository,
    
    // Business Services (for other modules)
    SupplierProductFactoryService,
    SupplierProductBusinessService,
    
    // Use Cases (for other modules)
    CreateSupplierProductService,
    GetSupplierProductsService,
    GetSupplierProductService,
    UpdateSupplierProductService,
    DeleteSupplierProductService,
    ApproveSupplierProductService,
    RejectSupplierProductService,
    HideSupplierProductService,
    SuspendSupplierProductService,
    UnhideSupplierProductService,
    ListSupplierProductSellerViewService,
    GetSupplierProductSellerViewService,
    GetSupplierProductStatsService,
    UnsuspendSupplierProductService,
    GetSupplierProductsByIdsService,
  ]
})
export class SupplierProductModule {}



