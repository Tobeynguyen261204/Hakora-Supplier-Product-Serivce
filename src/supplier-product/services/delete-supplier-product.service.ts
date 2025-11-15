import { Injectable, NotFoundException } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';

@Injectable()
export class DeleteSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository
  ) {}

  async execute(id: string): Promise<{ success: boolean; message: string }> {
    const exists = await this.supplierProductRepository.findById(id);
    if (!exists) {
      throw new NotFoundException('Product not found');
    }
    await this.supplierProductRepository.deleteById(id);
    return { success: true, message: 'Deleted' };
  }
}





