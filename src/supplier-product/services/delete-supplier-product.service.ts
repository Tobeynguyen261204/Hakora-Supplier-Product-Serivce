import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductNotFoundException, SupplierProductUnauthorizedException } from '../exceptions/supplier-product.exceptions';

@Injectable()
export class DeleteSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository
  ) {}

  async execute(id: string, supplierId?: string): Promise<{ success: boolean; message: string }> {
    const exists = await this.supplierProductRepository.findById(id);
    if (!exists) {
      throw new SupplierProductNotFoundException(id);
    }

    // ✅ Validate supplier scope: only supplier can delete their own products
    if (supplierId && exists.supplierId !== supplierId) {
      throw new SupplierProductUnauthorizedException('delete this product');
    }

    await this.supplierProductRepository.deleteById(id);
    return { success: true, message: 'Deleted' };
  }
}





