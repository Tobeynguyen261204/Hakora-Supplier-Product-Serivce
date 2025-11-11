import { Injectable, Inject } from '@nestjs/common';
import type { ISupplierProductRepository } from '../../domain/repositories/supplier-product.repository.interface';

@Injectable()
export class GetSupplierProductsByIdsUseCase {
  constructor(
    @Inject('SUPPLIER_PRODUCT_REPOSITORY')
    private readonly supplierProductRepository: ISupplierProductRepository,
  ) {}

  async execute(productIds: string[]): Promise<any[]> {
    try {
      const products = await this.supplierProductRepository.findByIds(productIds);
      return products;
    } catch (error) {
      console.error('Error fetching products by IDs:', error);
      throw error;
    }
  }
}
