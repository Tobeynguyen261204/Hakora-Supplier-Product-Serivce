import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';
import { SUPPLIER_PRODUCT_CONSTANTS } from '../constants/supplier-product.constants';
import { SupplierProductComputedPropertiesService } from './supplier-product-computed-properties.service';
import { SupplierProductNotFoundException } from '../exceptions/supplier-product.exceptions';

@Injectable()
export class GetSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly computedPropertiesService: SupplierProductComputedPropertiesService
  ) {}

  async execute(id: string): Promise<{ success: boolean; message: string; data?: SupplierProductResponseDto }> {
    const product = await this.supplierProductRepository.findById(id);
    if (!product) {
      throw new SupplierProductNotFoundException(id);
    }
    // Map to DTO với computed properties (mapper tự động orchestrate)
    const dto = SupplierProductMapper.toResponseDtoWithComputed(product, this.computedPropertiesService);
    // Add frontend-friendly alias fields without breaking existing contract
    const dtoWithAlias = {
      ...dto,
      isSuspended: dto.isSuspend
    };
    return {
      success: true,
      message: SUPPLIER_PRODUCT_CONSTANTS.SUCCESS.PRODUCT_CREATED,
      data: dtoWithAlias,
    };
  }
}





