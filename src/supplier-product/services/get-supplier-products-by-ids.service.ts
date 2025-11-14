import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';

@Injectable()
export class GetSupplierProductsByIdsService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
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

