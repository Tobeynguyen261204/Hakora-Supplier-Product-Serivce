import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

// Controllers
import { SupplierProductController } from './controllers/supplier-product.controller';

// Services
import { SupplierProductService } from './services/supplier-product.service';

// Entities
import { SupplierProduct } from './entities/supplier-product.entity';
import { SupplierProductVariant } from './entities/supplier-product-variant.entity';
import { SupplierProductImage } from './entities/supplier-product-image.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';
import { GrpcAuthGuard } from '../common/auth/grpc-auth.guard';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'inventory',
          protoPath: join(__dirname, '..', '..', 'proto', 'inventory.proto'),
          url: process.env.INVENTORY_SERVICE_GRPC_URL || '0.0.0.0:50072',
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
      SupplierProduct,
      SupplierProductVariant,
      SupplierProductImage,
    ])
  ],
  controllers: [SupplierProductController],
  providers: [
    // Infrastructure - Global providers
    SupplierProductService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    GrpcAuthGuard,
  ],


  exports: [
    // Business Services (for other modules)
    SupplierProductService,
  ],
})
export class SupplierProductModule { }



