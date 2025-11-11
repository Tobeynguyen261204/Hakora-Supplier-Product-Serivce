import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierProductController } from './supplier-product.controller';
import { CreateSupplierProductUseCase } from '../../application/use-cases/create-supplier-product.use-case';
import { GetSupplierProductsUseCase } from '../../application/use-cases/get-supplier-products.use-case';
import { ApproveSupplierProductUseCase } from '../../application/use-cases/approve-supplier-product.use-case';
import { GetSupplierProductUseCase } from '../../application/use-cases/get-supplier-product.use-case';
import { UpdateSupplierProductUseCase } from '../../application/use-cases/update-supplier-product.use-case';
import { DeleteSupplierProductUseCase } from '../../application/use-cases/delete-supplier-product.use-case';
import { RejectSupplierProductUseCase } from '../../application/use-cases/reject-supplier-product.use-case';
import { HideSupplierProductUseCase } from '../../application/use-cases/hide-supplier-product.use-case';
import { SuspendSupplierProductUseCase } from '../../application/use-cases/suspend-supplier-product.use-case';
import { UnhideSupplierProductUseCase } from '../../application/use-cases/unhide-supplier-product.use-case';
import { SupplierProductRepository } from '../../infrastructure/persistence/repositories/supplier-product.repository';
import { ListSupplierProductSellerViewUseCase } from '../../application/use-cases/list-supplier-product-seller-view.use-case';
import { GetSupplierProductSellerViewUseCase } from '../../application/use-cases/get-supplier-product-seller-view.use-case';
import { UnsuspendSupplierProductUseCase } from '../../application/use-cases/unsuspend-supplier-product.use-case';
import { GetSupplierProductStatsUseCase } from '../../application/use-cases/get-supplier-product-stats.use-case';
import { GetSupplierProductsByIdsUseCase } from '../../application/use-cases/get-supplier-products-by-ids.use-case';
import { SupplierProductOrm } from '../../infrastructure/persistence/entities/supplier-product.entity';
import { ProductImageOrm } from '../../infrastructure/persistence/entities/product-image.entity';
import { ProductReviewOrm } from '../../infrastructure/persistence/entities/product-review.entity';

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
    CreateSupplierProductUseCase,
    GetSupplierProductsUseCase,
    GetSupplierProductUseCase,
    UpdateSupplierProductUseCase,
    DeleteSupplierProductUseCase,
    ApproveSupplierProductUseCase,
    RejectSupplierProductUseCase,
    HideSupplierProductUseCase,
    SuspendSupplierProductUseCase,
    UnhideSupplierProductUseCase,
    ListSupplierProductSellerViewUseCase,
    GetSupplierProductSellerViewUseCase,
    GetSupplierProductStatsUseCase,
    UnsuspendSupplierProductUseCase,
    GetSupplierProductsByIdsUseCase,
    {
      provide: 'SUPPLIER_PRODUCT_REPOSITORY',
      useClass: SupplierProductRepository
    }
  ],
  exports: [
    CreateSupplierProductUseCase,
    GetSupplierProductsUseCase,
    GetSupplierProductUseCase,
    UpdateSupplierProductUseCase,
    DeleteSupplierProductUseCase,
    ApproveSupplierProductUseCase,
    RejectSupplierProductUseCase,
    HideSupplierProductUseCase,
    SuspendSupplierProductUseCase,
    UnhideSupplierProductUseCase,
    ListSupplierProductSellerViewUseCase,
    GetSupplierProductSellerViewUseCase,
    GetSupplierProductStatsUseCase,
    UnsuspendSupplierProductUseCase
  ]
})
export class SupplierProductModule {}



