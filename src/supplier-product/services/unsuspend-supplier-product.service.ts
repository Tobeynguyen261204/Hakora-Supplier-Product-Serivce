import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { SupplierProductBusinessService } from './supplier-product-business.service';
import { SupplierProductUnauthorizedException } from '../exceptions/supplier-product.exceptions';

@Injectable()
export class UnsuspendSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly supplierProductBusinessService: SupplierProductBusinessService
  ) {}

  async execute(id: string, reason: string, unsuspendedBy: string, supplierId?: string): Promise<{ success: boolean; message: string; data?: { id: string; isSuspend: boolean; reason: string; unsuspendedBy: string; updatedAt: Date } }> {
    const product = await this.supplierProductRepository.findById(id);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    // ✅ Validate supplier scope: only supplier can unsuspend their own products
    if (supplierId && product.supplierId !== supplierId) {
      throw new SupplierProductUnauthorizedException('unsuspend this product');
    }

    if (!product.isSuspend) {
      return { success: false, message: 'Product is not suspended' };
    }

    // Unsuspend the product by setting isSuspend to false
    product.isSuspend = false;
    const unsuspendedProduct = product;

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

