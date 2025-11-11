import { Injectable, Inject } from '@nestjs/common';
import type { ISupplierProductRepository } from '../../domain/repositories/supplier-product.repository.interface';

@Injectable()
export class DeleteSupplierProductUseCase {
  constructor(
    @Inject('SUPPLIER_PRODUCT_REPOSITORY')
    private readonly supplierProductRepository: ISupplierProductRepository
  ) {}

  async execute(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const exists = await this.supplierProductRepository.findById(id);
      if (!exists) {
        return { success: false, message: 'Product not found' };
      }
      await this.supplierProductRepository.remove(id);
      return { success: true, message: 'Deleted' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, message: errorMessage || 'Failed to delete product' };
    }
  }
}


