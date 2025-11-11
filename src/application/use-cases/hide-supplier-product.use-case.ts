import { Injectable, Inject } from '@nestjs/common';
import type { ISupplierProductRepository } from '../../domain/repositories/supplier-product.repository.interface';
import { ProductStatus } from '../../domain/enums/product-status.enum';

export interface HideSupplierProductRequest {
  id: string;
  reason: string;
  hiddenBy: string;
}

@Injectable()
export class HideSupplierProductUseCase {
  constructor(
    @Inject('SUPPLIER_PRODUCT_REPOSITORY')
    private readonly supplierProductRepository: ISupplierProductRepository
  ) {}

  async execute(request: HideSupplierProductRequest): Promise<any> {
    const { id, reason, hiddenBy } = request;

    if (!id) {
      throw new Error('Product ID is required');
    }

    if (!reason || reason.trim().length === 0) {
      throw new Error('Reason for hiding product is required');
    }

    if (!hiddenBy) {
      throw new Error('Admin ID who hides the product is required');
    }

    // Get the product
    const product = await this.supplierProductRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    // Check if product can be hidden
    if (product.isSuspend) {
      throw new Error('Cannot hide a suspended product');
    }

    if (!product.isActive) {
      throw new Error('Product is already hidden');
    }

    // Hide the product using domain method
    const updatedProduct = product.hide();
    
    // Add admin action note
    const adminNote = {
      action: 'HIDDEN',
      reason,
      performedBy: hiddenBy,
      performedAt: new Date(),
      previousStatus: product.status
    };

    // Save the product
    const savedProduct = await this.supplierProductRepository.save(updatedProduct);

    return {
      success: true,
      message: 'Product hidden successfully',
      data: {
        id: savedProduct.id,
        status: savedProduct.status,
        adminAction: adminNote
      }
    };
  }
}
