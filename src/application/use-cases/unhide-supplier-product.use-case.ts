import { Injectable, Inject } from '@nestjs/common';
import type { ISupplierProductRepository } from '../../domain/repositories/supplier-product.repository.interface';
import { ProductStatus } from '../../domain/enums/product-status.enum';
import { SupplierProduct } from '../../domain/aggregates/supplier-product.aggregate';

export interface UnhideSupplierProductRequest {
  id: string;
  unhiddenBy: string;
}

@Injectable()
export class UnhideSupplierProductUseCase {
  constructor(
    @Inject('SUPPLIER_PRODUCT_REPOSITORY')
    private readonly supplierProductRepository: ISupplierProductRepository
  ) {}

  async execute(request: UnhideSupplierProductRequest): Promise<any> {
    const { id, unhiddenBy } = request;

    if (!id) {
      throw new Error('Product ID is required');
    }
    if (!unhiddenBy) {
      throw new Error('Supplier ID who unhides the product is required');
    }

    const product = await this.supplierProductRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    if (product.isActive) {
      throw new Error('Product is not hidden');
    }

    // Unhide product by setting isActive to true and isSuspend to false
    const updatedProduct = new SupplierProduct(
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
      ProductStatus.PUBLISHED,
      product.approvalStatus,
      product.images,
      product.reviews,
      product.tags,
      true, // Set isActive to true
      product.isFeatured,
      false, // Set isSuspend to false
      product.weight,
      product.dimensions,
      product.seoData,
      product.createdAt,
      new Date(),
      product.approvedAt,
      product.approvedBy,
      product.rejectionReason
    );

    const adminNote = {
      action: 'UNHIDDEN',
      performedBy: unhiddenBy,
      performedAt: new Date()
    };

    const savedProduct = await this.supplierProductRepository.save(updatedProduct);

    return {
      success: true,
      message: 'Product unhidden successfully',
      data: {
        id: savedProduct.id,
        status: savedProduct.status,
        action: adminNote
      }
    };
  }
}
