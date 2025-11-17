import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';
import type { SupplierProductSellerViewDetailDto } from '../dto/supplier-product-seller-view.dto';
import { SupplierProductSellerViewMapper } from '../mappers/supplier-product-seller-view.mapper';
import { SupplierProductComputedPropertiesService } from './supplier-product-computed-properties.service';

@Injectable()
export class GetSupplierProductSellerViewService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly computedPropertiesService: SupplierProductComputedPropertiesService
  ) {}

  async execute(id: string): Promise<{ success: boolean; message: string; data?: SupplierProductSellerViewDetailDto }> {
    const product = await this.supplierProductRepository.findById(id);
    if (!product) return { success: false, message: 'Product not found' };

    // Check visibility: APPROVED + PUBLISHED + isActive = true + isSuspend = false
    const visible = product.approvalStatus === ApprovalStatus.APPROVED && 
                   product.status === ProductStatus.PUBLISHED &&
                   product.isActive &&
                   !product.isSuspend;
    
    if (!visible) return { success: false, message: 'Product not available for sellers' };

    // Map to Seller View DTO (mapper tự động orchestrate với computed properties)
    const data = SupplierProductSellerViewMapper.toDetailDto(product, this.computedPropertiesService);

    return {
      success: true,
      message: 'OK',
      data,
    };
  }
}



