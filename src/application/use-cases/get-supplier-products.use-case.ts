import { Injectable, Inject } from '@nestjs/common';
import type { ISupplierProductRepository } from '../../domain/repositories/supplier-product.repository.interface';
import { SupplierProductListResponseDto } from '../dto/supplier-product-response.dto';
import { ProductStatus } from '../../domain/enums/product-status.enum';
import { ApprovalStatus } from '../../domain/enums/approval-status.enum';
import { ProductType } from '../../domain/enums/product-type.enum';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';

export interface GetSupplierProductsFilters {
  status?: ProductStatus;
  approvalStatus?: ApprovalStatus;
  supplierId?: string;
  categoryId?: string; // kept to not break callers; repository will map to categoryName
  type?: ProductType;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  search?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isSuspend?: boolean;
}

@Injectable()
export class GetSupplierProductsUseCase {
  constructor(
    @Inject('SUPPLIER_PRODUCT_REPOSITORY')
    private readonly supplierProductRepository: ISupplierProductRepository
  ) {}

  async execute(
    page: number = 1,
    limit: number = 10,
    filters: GetSupplierProductsFilters = {}
  ): Promise<SupplierProductListResponseDto> {
    try {
      // 1. Validate pagination parameters
      if (page < 1) page = 1;
      if (limit < 1 || limit > 100) limit = 10;

      // 2. Get products with pagination
      const result = await this.supplierProductRepository.findWithPagination(page, limit, filters);

      // 3. Map to response DTOs
      const productDtos = result.products.map(product => 
        SupplierProductMapper.toResponseDto(product)
      );

      // 4. Return response
      return {
        products: productDtos,
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to get supplier products: ${errorMessage}`);
    }
  }

  async getBySupplierId(
    supplierId: string,
    page: number = 1,
    limit: number = 10,
    filters: Omit<GetSupplierProductsFilters, 'supplierId'> = {}
  ): Promise<SupplierProductListResponseDto> {
    return this.execute(page, limit, { ...filters, supplierId });
  }

  async getByCategoryId(
    categoryId: string,
    page: number = 1,
    limit: number = 10,
    filters: Omit<GetSupplierProductsFilters, 'categoryId'> = {}
  ): Promise<SupplierProductListResponseDto> {
    return this.execute(page, limit, { ...filters, categoryId });
  }

  async getPendingApproval(
    page: number = 1,
    limit: number = 10,
    filters: Omit<GetSupplierProductsFilters, 'approvalStatus'> = {}
  ): Promise<SupplierProductListResponseDto> {
    return this.execute(page, limit, { ...filters, approvalStatus: ApprovalStatus.PENDING });
  }

  async getApproved(
    page: number = 1,
    limit: number = 10,
    filters: Omit<GetSupplierProductsFilters, 'approvalStatus'> = {}
  ): Promise<SupplierProductListResponseDto> {
    return this.execute(page, limit, { ...filters, approvalStatus: ApprovalStatus.APPROVED });
  }

  async getActive(
    page: number = 1,
    limit: number = 10,
    filters: Omit<GetSupplierProductsFilters, 'status' | 'isActive'> = {}
  ): Promise<SupplierProductListResponseDto> {
    return this.execute(page, limit, { ...filters, status: ProductStatus.PUBLISHED, isActive: true });
  }

  async getFeatured(
    page: number = 1,
    limit: number = 10,
    filters: Omit<GetSupplierProductsFilters, 'isFeatured'> = {}
  ): Promise<SupplierProductListResponseDto> {
    return this.execute(page, limit, { ...filters, isFeatured: true });
  }

  async search(
    query: string,
    page: number = 1,
    limit: number = 10,
    filters: Omit<GetSupplierProductsFilters, 'search'> = {}
  ): Promise<SupplierProductListResponseDto> {
    return this.execute(page, limit, { ...filters, search: query });
  }
}
