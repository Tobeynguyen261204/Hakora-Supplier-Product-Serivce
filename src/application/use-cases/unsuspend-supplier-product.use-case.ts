import { Injectable, Inject } from '@nestjs/common';
import type { ISupplierProductRepository } from '../../domain/repositories/supplier-product.repository.interface';
import { SupplierProduct } from '../../domain/aggregates/supplier-product.aggregate';

@Injectable()
export class UnsuspendSupplierProductUseCase {
  constructor(
    @Inject('SUPPLIER_PRODUCT_REPOSITORY')
    private readonly supplierProductRepository: ISupplierProductRepository
  ) {}

  async execute(id: string, reason: string, unsuspendedBy: string): Promise<{ success: boolean; message: string; data?: { id: string; isSuspend: boolean; reason: string; unsuspendedBy: string; updatedAt: Date } }> {
    const product = await this.supplierProductRepository.findById(id);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    if (!product.isSuspend) {
      return { success: false, message: 'Product is not suspended' };
    }

    // Create updated product with isSuspend = false
    const unsuspendedProduct = new SupplierProduct(
      product.id,
      product.supplierId,
      product.name,
      product.description,
      product.shortDescription,
      product.sku,
      product.categoryName,
      product.price,
      product.inventory,
      product.specifications,
      product.type,
      product.status,
      product.approvalStatus,
      product.images,
      product.reviews,
      product.tags,
      product.isActive,
      product.isFeatured,
      false, // isSuspend = false
      product.weight,
      product.dimensions,
      product.seoData,
      product.createdAt,
      new Date(),
      product.approvedAt,
      product.approvedBy,
      product.rejectionReason
    );

    await this.supplierProductRepository.save(unsuspendedProduct);

    return {
      success: true,
      message: 'Product unsuspended successfully',
      data: {
        id: unsuspendedProduct.id,
        isSuspend: unsuspendedProduct.isSuspend,
        reason,
        unsuspendedBy,
        updatedAt: unsuspendedProduct.updatedAt
      }
    };
  }
}
