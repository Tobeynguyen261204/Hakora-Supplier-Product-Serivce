import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';
import type { SupplierProductSellerViewListItemDto } from '../dto/supplier-product-seller-view.dto';
import { ProductPriceResponseDto } from '../dto/product-price.dto';
import { GetSupplierProductsFilters } from './get-supplier-products.service';

@Injectable()
export class ListSupplierProductSellerViewService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository
  ) {}

  private formatDate(date: Date | string | undefined): string | undefined {
    if (!date) return undefined;
    if (date instanceof Date) return date.toISOString();
    try {
      return new Date(date).toISOString();
    } catch {
      return undefined;
    }
  }

  async execute(page = 1, limit = 10, filters?: { categoryId?: string; search?: string; supplierId?: string }): Promise<{ success: boolean; message: string; products: SupplierProductSellerViewListItemDto[]; total: number; page: number; limit: number; totalPages: number }> {
    // Filter for visible products: APPROVED + PUBLISHED + isActive = true + isSuspend = false
    const baseFilters: GetSupplierProductsFilters = { 
      approvalStatus: ApprovalStatus.APPROVED,
      status: ProductStatus.PUBLISHED,  // Only PUBLISHED products
      isActive: true,
      isSuspend: false  // Exclude suspended products
    };
    if (filters?.categoryId) baseFilters.categoryId = filters.categoryId;
    if (filters?.search) baseFilters.search = filters.search;
    if (filters?.supplierId) baseFilters.supplierId = filters.supplierId;

    const { products, total, totalPages } = await this.supplierProductRepository.findWithPagination(page, limit, baseFilters);

    const items: SupplierProductSellerViewListItemDto[] = products.map(p => {
      const categoryName = p.categoryName || null;
      const price: ProductPriceResponseDto = {
        listingPrice: p.price?.listingPrice || 0,
        retailPrice: p.price?.retailPrice || 0,
        currency: p.price?.currency || 'VND',
        profitAmount: p.price?.profitAmount || 0
      };
      const imageUrl = (p.images || []).find(i => i.isPrimary)?.url || (p.images || [])[0]?.url || null;
      return {
        id: p.id,
        name: p.name,
        shortDescription: p.shortDescription,
        price,
        categoryName,
        imageUrl,
        isFeatured: p.isFeatured === true,
        createdAt: this.formatDate(p.createdAt),
        updatedAt: this.formatDate(p.updatedAt)
      };
    });

    return { success: true, message: 'OK', products: items, total, page, limit, totalPages };
  }
}



