import { SupplierProduct } from '../aggregates/supplier-product.aggregate';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';
import { ProductType } from '../enums/product-type.enum';

export interface ISupplierProductRepository {
  // Basic CRUD operations
  save(product: SupplierProduct): Promise<SupplierProduct>;
  findById(id: string): Promise<SupplierProduct | null>;
  findBySku(sku: string): Promise<SupplierProduct | null>;
  update(product: SupplierProduct): Promise<SupplierProduct>;
  remove(id: string): Promise<void>;

  // Find by supplier
  findBySupplierId(supplierId: string): Promise<SupplierProduct[]>;
  findBySupplierIdAndStatus(supplierId: string, status: ProductStatus): Promise<SupplierProduct[]>;
  findBySupplierIdAndApprovalStatus(supplierId: string, approvalStatus: ApprovalStatus): Promise<SupplierProduct[]>;

  // Find by category (using categoryName string)
  findByCategoryId(categoryId: string): Promise<SupplierProduct[]>;
  findByCategoryIdAndStatus(categoryId: string, status: ProductStatus): Promise<SupplierProduct[]>;

  // Find by status and approval
  findByStatus(status: ProductStatus): Promise<SupplierProduct[]>;
  findByApprovalStatus(approvalStatus: ApprovalStatus): Promise<SupplierProduct[]>;
  findPendingApproval(): Promise<SupplierProduct[]>;
  findApproved(): Promise<SupplierProduct[]>;
  findRejected(): Promise<SupplierProduct[]>;

  // Find active products
  findActive(): Promise<SupplierProduct[]>;
  findActiveBySupplierId(supplierId: string): Promise<SupplierProduct[]>;
  findActiveByCategoryId(categoryId: string): Promise<SupplierProduct[]>;

  // Search and filter
  search(query: string): Promise<SupplierProduct[]>;
  searchBySupplier(supplierId: string, query: string): Promise<SupplierProduct[]>;
  findByTags(tags: string[]): Promise<SupplierProduct[]>;
  findByPriceRange(minPrice: number, maxPrice: number): Promise<SupplierProduct[]>;
  findByType(type: ProductType): Promise<SupplierProduct[]>;

  // Featured and special products
  findFeatured(): Promise<SupplierProduct[]>;
  findFeaturedBySupplierId(supplierId: string): Promise<SupplierProduct[]>;
  findLowStock(): Promise<SupplierProduct[]>;
  findOutOfStock(): Promise<SupplierProduct[]>;

  // Pagination
  findWithPagination(
    page: number,
    limit: number,
    filters?: {
      status?: ProductStatus;
      approvalStatus?: ApprovalStatus;
      supplierId?: string;
      categoryId?: string;
      type?: ProductType;
      minPrice?: number;
      maxPrice?: number;
      tags?: string[];
      search?: string;
    }
  ): Promise<{
    products: SupplierProduct[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;

  // Statistics
  countByStatus(status: ProductStatus): Promise<number>;
  countByApprovalStatus(approvalStatus: ApprovalStatus): Promise<number>;
  countBySupplierId(supplierId: string): Promise<number>;
  countByCategoryId(categoryId: string): Promise<number>;
  countActive(): Promise<number>;
  countPendingApproval(): Promise<number>;

  // Bulk operations
  updateStatus(ids: string[], status: ProductStatus): Promise<void>;
  updateApprovalStatus(ids: string[], approvalStatus: ApprovalStatus): Promise<void>;
  bulkDelete(ids: string[]): Promise<void>;
  bulkActivate(ids: string[]): Promise<void>;
  bulkDeactivate(ids: string[]): Promise<void>;

  // Advanced queries
  findRecentlyAdded(days: number): Promise<SupplierProduct[]>;
  findRecentlyUpdated(days: number): Promise<SupplierProduct[]>;
  findTopRated(limit: number): Promise<SupplierProduct[]>;
  findMostReviewed(limit: number): Promise<SupplierProduct[]>;
  findBestSelling(limit: number): Promise<SupplierProduct[]>;
  findRelatedProducts(productId: string, limit: number): Promise<SupplierProduct[]>;
  
  // Find by multiple IDs
  findByIds(productIds: string[]): Promise<SupplierProduct[]>;
}
