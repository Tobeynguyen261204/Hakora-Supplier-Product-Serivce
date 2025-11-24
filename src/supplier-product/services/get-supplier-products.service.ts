import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductListResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';
import { ProductType } from '../enums/product-type.enum';
import { SupplierProductComputedPropertiesService } from './supplier-product-computed-properties.service';
import { SupplierProductValidationException } from '../exceptions/supplier-product.exceptions';

export interface GetSupplierProductsFilters {
  status?: ProductStatus;
  approvalStatus?: ApprovalStatus;
  supplierId?: string;
  categoryName?: string;
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
export class GetSupplierProductsService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly computedPropertiesService: SupplierProductComputedPropertiesService
  ) {}

  async execute(
    page: number = 1,
    limit: number = 10,
    filters: GetSupplierProductsFilters = {},
    supplierId?: string
  ): Promise<SupplierProductListResponseDto> {
    try {
      // 1. Validate pagination parameters
      if (page < 1) page = 1;
      if (limit < 1 || limit > 100) limit = 10;

      // 2. Apply supplier scope if supplierId provided (from context takes precedence)
      // This ensures suppliers can only see their own products
      const scopedFilters = supplierId 
        ? { ...filters, supplierId } // Override any supplierId in filters with context supplierId
        : filters;

      // 3. Get products with pagination
      const result = await this.supplierProductRepository.findWithPagination(page, limit, scopedFilters);

      // 3. Map to response DTOs với computed properties (mapper tự động orchestrate)
      const productDtos = result.products.map(product => 
        SupplierProductMapper.toResponseDtoWithComputed(product, this.computedPropertiesService)
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
      // Re-throw RpcException
      if (error instanceof SupplierProductValidationException) {
        throw error;
      }
      // Wrap other errors
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new SupplierProductValidationException(`Failed to get supplier products: ${errorMessage}`);
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

  async getByCategoryName(
    categoryName: string,
    page: number = 1,
    limit: number = 10,
    filters: Omit<GetSupplierProductsFilters, 'categoryName'> = {}
  ): Promise<SupplierProductListResponseDto> {
    return this.execute(page, limit, { ...filters, categoryName });
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




