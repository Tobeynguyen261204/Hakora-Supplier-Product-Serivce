import { Injectable, NotFoundException } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';
import { IGetSupplierProductService } from '../interfaces/supplier-product-service.interface';
import { SUPPLIER_PRODUCT_CONSTANTS } from '../constants/supplier-product.constants';

@Injectable()
export class GetSupplierProductService implements IGetSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository
  ) {}

  async execute(id: string): Promise<{ success: boolean; message: string; data?: SupplierProductResponseDto }> {
    const product = await this.supplierProductRepository.findById(id);
    if (!product) {
      throw new NotFoundException(SUPPLIER_PRODUCT_CONSTANTS.ERRORS.PRODUCT_NOT_FOUND);
    }
    const dto = SupplierProductMapper.toResponseDto(product);
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





