import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { ProductStatus } from '../../domain/enums/product-status.enum';
import { SupplierProduct } from '../../domain/aggregates/supplier-product.aggregate';

export interface UnhideSupplierProductRequest {
  id: string;
  unhiddenBy: string;
}

@Injectable()
export class UnhideSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository
  ) {}

  async execute(request: UnhideSupplierProductRequest): Promise<any> {
    const { id, unhiddenBy } = request;

    if (!id) {
      throw new BadRequestException('Product ID is required');
    }
    if (!unhiddenBy) {
      throw new BadRequestException('Supplier ID who unhides the product is required');
    }

    const product = await this.supplierProductRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.isActive) {
      throw new BadRequestException('Product is not hidden');
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




