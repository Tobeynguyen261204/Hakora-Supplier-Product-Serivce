import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierProductController } from './controllers/supplier-product.controller';
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
import { SupplierProductRepository } from './repositories/supplier-product.repository';
import { ListSupplierProductSellerViewService } from './services/list-supplier-product-seller-view.service';
import { GetSupplierProductSellerViewService } from './services/get-supplier-product-seller-view.service';
import { UnsuspendSupplierProductService } from './services/unsuspend-supplier-product.service';
import { GetSupplierProductStatsService } from './services/get-supplier-product-stats.service';
import { GetSupplierProductsByIdsService } from './services/get-supplier-products-by-ids.service';
import { SupplierProductOrm } from './entities/supplier-product.entity';
import { ProductImageOrm } from './entities/product-image.entity';
import { ProductReviewOrm } from './entities/product-review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SupplierProductOrm,
      ProductImageOrm,
      ProductReviewOrm
    ])
  ],
  controllers: [SupplierProductController],
  providers: [
    // Repository - inject trực tiếp bằng class (NestJS way)
    SupplierProductRepository,
    // Use Cases
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
    // Export repository nếu cần dùng ở module khác
    SupplierProductRepository,
    // Export use cases
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



