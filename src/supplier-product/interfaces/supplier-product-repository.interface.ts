import { DeleteResult } from 'typeorm';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';
import { ProductType } from '../enums/product-type.enum';
import { GetSupplierProductsFilters } from '../services/get-supplier-products.service';

export interface PaginationResult<T> {
  products: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ISupplierProductRepository {
  // Basic CRUD operations
  findById(id: string): Promise<SupplierProductOrm | null>;
  findBySku(sku: string): Promise<SupplierProductOrm | null>;
  save(product: SupplierProductOrm): Promise<SupplierProductOrm>;
  updateProduct(product: SupplierProductOrm): Promise<SupplierProductOrm>;
  delete(id: string | string[]): Promise<DeleteResult>;
  deleteById(id: string): Promise<void>;

  // Query operations
  findWithPagination(
    page: number,
    limit: number,
    filters?: GetSupplierProductsFilters
  ): Promise<PaginationResult<SupplierProductOrm>>;

  findBySupplierId(supplierId: string): Promise<SupplierProductOrm[]>;
  findBySupplierIdAndStatus(supplierId: string, status: ProductStatus): Promise<SupplierProductOrm[]>;
  findBySupplierIdAndApprovalStatus(supplierId: string, approvalStatus: ApprovalStatus): Promise<SupplierProductOrm[]>;
  
  findByStatus(status: ProductStatus): Promise<SupplierProductOrm[]>;
  findByApprovalStatus(approvalStatus: ApprovalStatus): Promise<SupplierProductOrm[]>;
  findByType(type: ProductType): Promise<SupplierProductOrm[]>;
  
  findPendingApproval(): Promise<SupplierProductOrm[]>;
  findApproved(): Promise<SupplierProductOrm[]>;
  findRejected(): Promise<SupplierProductOrm[]>;
  findActive(): Promise<SupplierProductOrm[]>;
  findFeatured(): Promise<SupplierProductOrm[]>;
  
  // Search operations
  search(query: string): Promise<SupplierProductOrm[]>;
  searchBySupplier(supplierId: string, query: string): Promise<SupplierProductOrm[]>;
  findByTags(tags: string[]): Promise<SupplierProductOrm[]>;
  findByPriceRange(minPrice: number, maxPrice: number): Promise<SupplierProductOrm[]>;
  
  // Bulk operations
  findByIds(productIds: string[]): Promise<SupplierProductOrm[]>;
  
  // Analytics
  findRecentlyAdded(days: number): Promise<SupplierProductOrm[]>;
  findRecentlyUpdated(days: number): Promise<SupplierProductOrm[]>;
  findTopRated(limit: number): Promise<SupplierProductOrm[]>;
  findMostReviewed(limit: number): Promise<SupplierProductOrm[]>;
  findBestSelling(limit: number): Promise<SupplierProductOrm[]>;
  findRelatedProducts(productId: string, limit: number): Promise<SupplierProductOrm[]>;
}
