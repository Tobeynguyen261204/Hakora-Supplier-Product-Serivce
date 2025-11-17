import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';
import type { SupplierProductSellerViewListItemDto } from '../dto/supplier-product-seller-view.dto';
import { GetSupplierProductsFilters } from './get-supplier-products.service';
import { SupplierProductSellerViewMapper } from '../mappers/supplier-product-seller-view.mapper';
import { SupplierProductComputedPropertiesService } from './supplier-product-computed-properties.service';

@Injectable()
export class ListSupplierProductSellerViewService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly computedPropertiesService: SupplierProductComputedPropertiesService
  ) {}

  async execute(page = 1, limit = 10, filters?: { categoryName?: string; search?: string; supplierId?: string }): Promise<{ success: boolean; message: string; products: SupplierProductSellerViewListItemDto[]; total: number; page: number; limit: number; totalPages: number }> {
    // Filter for visible products: APPROVED + PUBLISHED + isActive = true + isSuspend = false
    const baseFilters: GetSupplierProductsFilters = { 
      approvalStatus: ApprovalStatus.APPROVED,
      status: ProductStatus.PUBLISHED,  // Only PUBLISHED products
      isActive: true,
      isSuspend: false  // Exclude suspended products
    };
    if (filters?.categoryName) baseFilters.categoryName = filters.categoryName;
    if (filters?.search) baseFilters.search = filters.search;
    if (filters?.supplierId) baseFilters.supplierId = filters.supplierId;

    const { products, total, totalPages } = await this.supplierProductRepository.findWithPagination(page, limit, baseFilters);

    // Map to Seller View List Item DTOs (mapper tự động orchestrate với computed properties)
    const items: SupplierProductSellerViewListItemDto[] = products.map(product => 
      SupplierProductSellerViewMapper.toListItemDto(product, this.computedPropertiesService)
    );

    return { success: true, message: 'OK', products: items, total, page, limit, totalPages };
  }
}



