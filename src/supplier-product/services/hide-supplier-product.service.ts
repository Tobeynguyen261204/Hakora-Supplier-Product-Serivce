import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { ProductStatus } from '../../domain/enums/product-status.enum';

export interface HideSupplierProductRequest {
  id: string;
  reason: string;
  hiddenBy: string;
}

@Injectable()
export class HideSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository
  ) {}

  async execute(request: HideSupplierProductRequest): Promise<any> {
    const { id, reason, hiddenBy } = request;

    if (!id) {
      throw new BadRequestException('Product ID is required');
    }

    if (!reason || reason.trim().length === 0) {
      throw new BadRequestException('Reason for hiding product is required');
    }

    if (!hiddenBy) {
      throw new BadRequestException('Admin ID who hides the product is required');
    }

    // Get the product
    const product = await this.supplierProductRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Check if product can be hidden
    if (product.isSuspend) {
      throw new BadRequestException('Cannot hide a suspended product');
    }

    if (!product.isActive) {
      throw new BadRequestException('Product is already hidden');
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




