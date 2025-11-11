import { Injectable, Inject } from '@nestjs/common';
import type { ISupplierProductRepository } from '../../domain/repositories/supplier-product.repository.interface';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';

@Injectable()
export class GetSupplierProductUseCase {
  constructor(
    @Inject('SUPPLIER_PRODUCT_REPOSITORY')
    private readonly supplierProductRepository: ISupplierProductRepository
  ) {}

  async execute(id: string): Promise<{ success: boolean; message: string; data?: SupplierProductResponseDto }> {
    try {
      const product = await this.supplierProductRepository.findById(id);
      if (!product) {
        return { success: false, message: 'Product not found' };
      }
      const dto = SupplierProductMapper.toResponseDto(product);
      // Add frontend-friendly alias fields without breaking existing contract
      const dtoWithAlias = {
        ...dto,
        isSuspended: dto.isSuspend
      };
      return {
        success: true,
        message: 'OK',
        data: dtoWithAlias,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, message: errorMessage || 'Failed to get product' };
    }
  }
}


