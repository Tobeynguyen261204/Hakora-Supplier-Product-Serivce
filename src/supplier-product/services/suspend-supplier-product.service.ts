import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { SupplierProductBusinessService } from './supplier-product-business.service';

@Injectable()
export class SuspendSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly supplierProductBusinessService: SupplierProductBusinessService
  ) {}

  async execute(id: string, reason: string, suspendedBy: string, suspensionDuration?: number): Promise<{ success: boolean; message: string; data?: { id: string; isSuspend: boolean; reason: string; suspendedBy: string; suspensionDuration?: number; updatedAt: Date } }> {
    const product = await this.supplierProductRepository.findById(id);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    if (product.isSuspend) {
      return { success: false, message: 'Product is already suspended' };
    }

    // Suspend the product using business service
    const suspendedProduct = this.supplierProductBusinessService.suspend(product);

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
