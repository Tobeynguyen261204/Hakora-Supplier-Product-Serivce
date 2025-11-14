import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProduct } from '../../domain/aggregates/supplier-product.aggregate';

@Injectable()
export class SuspendSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository
  ) {}

  async execute(id: string, reason: string, suspendedBy: string, suspensionDuration?: number): Promise<{ success: boolean; message: string; data?: { id: string; isSuspend: boolean; reason: string; suspendedBy: string; suspensionDuration?: number; updatedAt: Date } }> {
    const product = await this.supplierProductRepository.findById(id);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    if (product.isSuspend) {
      return { success: false, message: 'Product is already suspended' };
    }

    // Create updated product with isSuspend = true
    const suspendedProduct = new SupplierProduct(
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
      true, // isSuspend = true
      product.weight,
      product.dimensions,
      product.seoData,
      product.createdAt,
      new Date(),
      product.approvedAt,
      product.approvedBy,
      product.rejectionReason
    );

    await this.supplierProductRepository.save(suspendedProduct);

    return {
      success: true,
      message: 'Product suspended successfully',
      data: {
        id: suspendedProduct.id,
        isSuspend: suspendedProduct.isSuspend,
        reason,
        suspendedBy,
        suspensionDuration,
        updatedAt: suspendedProduct.updatedAt
      }
    };
  }
}
