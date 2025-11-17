import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { ProductStatus } from '../enums/product-status.enum';
import { SupplierProductBusinessService } from './supplier-product-business.service';
import { SupplierProductNotFoundException, SupplierProductBusinessRuleException, SupplierProductValidationException } from '../exceptions/supplier-product.exceptions';
import { HideSupplierProductRequest } from '../dto/common-request.dto';

@Injectable()
export class HideSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly supplierProductBusinessService: SupplierProductBusinessService
  ) {}

  async execute(request: HideSupplierProductRequest): Promise<{ success: boolean; message: string; data?: any }> {
    const { id, reason, hiddenBy } = request;

    if (!id) {
      throw new SupplierProductValidationException('Product ID is required');
    }

    if (!reason || reason.trim().length === 0) {
      throw new SupplierProductValidationException('Reason for hiding product is required');
    }

    if (!hiddenBy) {
      throw new SupplierProductValidationException('Admin ID who hides the product is required');
    }

    // Get the product
    const product = await this.supplierProductRepository.findById(id);
    if (!product) {
      throw new SupplierProductNotFoundException(id);
    }

    // Check if product can be hidden
    if (product.isSuspend) {
      throw new SupplierProductBusinessRuleException('Cannot hide a suspended product');
    }

    if (!product.isActive) {
      throw new SupplierProductBusinessRuleException('Product is already hidden');
    }

    // Hide the product using business service
    const updatedProduct = this.supplierProductBusinessService.hide(product);
    
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




