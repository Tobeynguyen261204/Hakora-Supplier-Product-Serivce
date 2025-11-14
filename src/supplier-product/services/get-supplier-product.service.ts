import { Injectable, NotFoundException } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';

@Injectable()
export class GetSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository
  ) {}

  async execute(id: string): Promise<{ success: boolean; message: string; data?: SupplierProductResponseDto }> {
    const product = await this.supplierProductRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
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
  }
}





