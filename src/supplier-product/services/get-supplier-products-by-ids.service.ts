import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';
import { SupplierProductComputedPropertiesService } from './supplier-product-computed-properties.service';

@Injectable()
export class GetSupplierProductsByIdsService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly computedPropertiesService: SupplierProductComputedPropertiesService
  ) {}

  async execute(productIds: string[], supplierId?: string): Promise<SupplierProductResponseDto[]> {
    try {
      const products = await this.supplierProductRepository.findByIds(productIds);
      
      // ✅ Filter by supplierId if provided (supplier scope)
      const filteredProducts = supplierId 
        ? products.filter(product => product.supplierId === supplierId)
        : products;
      
      // Map to DTOs với computed properties (mapper tự động orchestrate)
      return filteredProducts.map(product => 
        SupplierProductMapper.toResponseDtoWithComputed(product, this.computedPropertiesService)
      );
    } catch (error) {
      console.error('Error fetching products by IDs:', error);
      throw error;
    }
  }
}

