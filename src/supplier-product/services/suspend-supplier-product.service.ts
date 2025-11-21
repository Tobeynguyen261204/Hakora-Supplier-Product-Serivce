import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { SupplierProductBusinessService } from './supplier-product-business.service';
import { SupplierProductUnauthorizedException } from '../exceptions/supplier-product.exceptions';

@Injectable()
export class SuspendSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly supplierProductBusinessService: SupplierProductBusinessService
  ) {}

  async execute(id: string, reason: string, suspendedBy: string, suspensionDuration?: number, supplierId?: string): Promise<{ success: boolean; message: string; data?: { id: string; isSuspend: boolean; reason: string; suspendedBy: string; suspensionDuration?: number; updatedAt: Date } }> {
    const product = await this.supplierProductRepository.findById(id);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    // ✅ Validate supplier scope: only supplier can suspend their own products
    if (supplierId && product.supplierId !== supplierId) {
      throw new SupplierProductUnauthorizedException('suspend this product');
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
