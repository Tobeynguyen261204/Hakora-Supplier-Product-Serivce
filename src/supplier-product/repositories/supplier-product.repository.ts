import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, SelectQueryBuilder, SaveOptions, FindOptionsWhere } from 'typeorm';
import { ProductPrice } from '../value-objects/product-price.vo';
import { ProductInventory } from '../value-objects/product-inventory.vo';
import { ProductSpecifications } from '../value-objects/product-specifications.vo';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';
import { ProductType } from '../enums/product-type.enum';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { ProductImageOrm } from '../entities/product-image.entity';
import { ProductReviewOrm } from '../entities/product-review.entity';

/**
 * Custom Repository cho SupplierProduct
 * 
 * Extend từ Repository<SupplierProductOrm> của TypeORM
 * Custom Repository này xử lý:
 * - Domain mapping (ORM <-> Domain Model)
 * - Business logic queries phức tạp
 * - Query builder patterns tái sử dụng
 * 
 * @note Kế thừa tất cả các method CRUD cơ bản từ Repository<SupplierProductOrm>:
 * - find, findOne, save, delete, update, count, etc.
 * Custom Repository này mở rộng với domain logic và business queries
 */
@Injectable()
export class SupplierProductRepository extends Repository<SupplierProductOrm> {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ProductImageOrm)
    private readonly imageRepo: Repository<ProductImageOrm>,
    @InjectRepository(ProductReviewOrm)
    private readonly reviewRepo: Repository<ProductReviewOrm>
  ) {
    // Gọi super constructor với DataSource và EntityManager
    super(
      SupplierProductOrm,
      dataSource.createEntityManager()
    );
  }

  // ============================================================================
  // Helper Methods - Tái sử dụng query builder patterns
  // ============================================================================

  /**
   * Relations mặc định cho các query
   */
  private readonly DEFAULT_RELATIONS = ['images', 'reviews'] as const;

  /**
   * Tạo query builder với relations mặc định (images, reviews)
   * Helper method để tránh lặp lại code
   * Sử dụng this.createQueryBuilder() vì đã extend Repository
   */
  private createQueryBuilderWithRelations(alias: string = 'product'): SelectQueryBuilder<SupplierProductOrm> {
    return this.createQueryBuilder(alias)
      .leftJoinAndSelect(`${alias}.images`, 'images')
      .leftJoinAndSelect(`${alias}.reviews`, 'reviews');
  }

  /**
   * Helper method chung cho find operations với relations
   * Tránh lặp lại code cho các query đơn giản
   */
  private async findWithRelations(
    where: FindOptionsWhere<SupplierProductOrm>,
    relations: string[] = [...this.DEFAULT_RELATIONS]
  ): Promise<SupplierProductOrm[]> {
    const products = await this.find({ where, relations });
    return products.map(product => this.toDomain(product));
  }

  /**
   * Helper method chung cho findOne operations với relations
   */
  private async findOneWithRelations(
    where: FindOptionsWhere<SupplierProductOrm>,
    relations: string[] = [...this.DEFAULT_RELATIONS]
  ): Promise<SupplierProductOrm | null> {
    const product = await this.findOne({ where, relations });
    if (!product) return null;
    return this.toDomain(product);
  }

  // ============================================================================
  // Basic CRUD Operations - Sử dụng Repository gốc từ TypeORM
  // ============================================================================

  // Overload for single entity
  async save(product: SupplierProductOrm, options?: SaveOptions): Promise<SupplierProductOrm>;
  // Overload for array of entities
  async save(products: SupplierProductOrm[], options?: SaveOptions): Promise<SupplierProductOrm[]>;
  // Implementation
  async save(
    productOrProducts: SupplierProductOrm | SupplierProductOrm[],
    options?: SaveOptions
  ): Promise<SupplierProductOrm | SupplierProductOrm[]> {
    if (Array.isArray(productOrProducts)) {
      const productsOrm = productOrProducts.map(p => this.toOrm(p));
      const savedProducts = await super.save(productsOrm, options);
      return savedProducts.map(p => this.toDomain(p));
    } else {
      const productOrm = this.toOrm(productOrProducts);
      const savedProduct = await super.save(productOrm, options);
      return this.toDomain(savedProduct);
    }
  }

  /**
   * Tìm product theo ID với relations
   * Custom method vì đây là query phổ biến nhất
   */
  async findById(id: string): Promise<SupplierProductOrm | null> {
    return this.findOneWithRelations({ id });
  }

  /**
   * Tìm product theo SKU với relations
   * Custom method vì SKU là unique identifier quan trọng
   */
  async findBySku(sku: string): Promise<SupplierProductOrm | null> {
    return this.findOneWithRelations({ sku });
  }

  async updateProduct(product: SupplierProductOrm): Promise<SupplierProductOrm> {
    const productOrm = this.toOrm(product);
    const updatedProduct = await super.save(productOrm);
    return this.toDomain(updatedProduct);
  }

  async deleteById(id: string): Promise<void> {
    // CRITICAL: Xóa các bảng liên quan trước để tránh foreign key constraint violation
    // Foreign key constraints:
    // - FK_b367708bf720c8dd62fc6833161 on table "product_images"
    // - Có thể có foreign key trên product_reviews
    
    // 1. Xóa product_images trước
    await this.imageRepo.delete({ productId: id });
    
    // 2. Xóa product_reviews nếu có
    await this.reviewRepo.delete({ productId: id });
    
    // 3. Sau đó mới xóa supplier_product
    await super.delete({ id });
  }

  /**
   * Tìm products theo supplierId
   * Giữ custom method vì đây là business query phổ biến
   */
  async findBySupplierId(supplierId: string): Promise<SupplierProductOrm[]> {
    return this.findWithRelations({ supplierId });
  }

  /**
   * Tìm products theo supplierId và status
   * Custom method vì có business logic (filter theo status)
   */
  async findBySupplierIdAndStatus(supplierId: string, status: ProductStatus): Promise<SupplierProductOrm[]> {
    return this.findWithRelations({ supplierId, status });
  }

  /**
   * Tìm products theo supplierId và approvalStatus
   * Custom method vì có business logic (filter theo approval)
   */
  async findBySupplierIdAndApprovalStatus(supplierId: string, approvalStatus: ApprovalStatus): Promise<SupplierProductOrm[]> {
    return this.findWithRelations({ supplierId, approvalStatus });
  }

  /**
   * Tìm products theo categoryId
   * Giữ custom method vì đây là business query phổ biến
   */
  async findByCategoryId(categoryId: string): Promise<SupplierProductOrm[]> {
    return this.findWithRelations({ categoryName: categoryId });
  }

  /**
   * Tìm products theo categoryId và status
   * Custom method vì có business logic (filter theo status)
   */
  async findByCategoryIdAndStatus(categoryId: string, status: ProductStatus): Promise<SupplierProductOrm[]> {
    return this.findWithRelations({ categoryName: categoryId, status });
  }

  /**
   * Tìm products theo status
   * Giữ custom method vì đây là business query phổ biến
   */
  async findByStatus(status: ProductStatus): Promise<SupplierProductOrm[]> {
    return this.findWithRelations({ status });
  }

  /**
   * Tìm products theo approvalStatus
   * Giữ custom method vì đây là business query phổ biến
   */
  async findByApprovalStatus(approvalStatus: ApprovalStatus): Promise<SupplierProductOrm[]> {
    return this.findWithRelations({ approvalStatus });
  }

  async findPendingApproval(): Promise<SupplierProductOrm[]> {
    return this.findByApprovalStatus(ApprovalStatus.PENDING);
  }

  async findApproved(): Promise<SupplierProductOrm[]> {
    return this.findByApprovalStatus(ApprovalStatus.APPROVED);
  }

  async findRejected(): Promise<SupplierProductOrm[]> {
    return this.findByApprovalStatus(ApprovalStatus.REJECTED);
  }

  /**
   * Tìm products đang active (published và isActive = true)
   * Custom method vì có business logic phức tạp (kết hợp 2 điều kiện)
   */
  async findActive(): Promise<SupplierProductOrm[]> {
    return this.findWithRelations({ 
      status: ProductStatus.PUBLISHED, 
      isActive: true 
    });
  }

  /**
   * Tìm products active theo supplierId
   * Custom method vì có business logic (active + supplier filter)
   */
  async findActiveBySupplierId(supplierId: string): Promise<SupplierProductOrm[]> {
    return this.findWithRelations({ 
      supplierId, 
      status: ProductStatus.PUBLISHED, 
      isActive: true 
    });
  }

  /**
   * Tìm products active theo categoryId
   * Custom method vì có business logic (active + category filter)
   */
  async findActiveByCategoryId(categoryId: string): Promise<SupplierProductOrm[]> {
    return this.findWithRelations({ 
      categoryName: categoryId, 
      status: ProductStatus.PUBLISHED, 
      isActive: true 
    });
  }

  // ============================================================================
  // Complex Query Operations - Sử dụng Query Builder cho logic phức tạp
  // ============================================================================

  async search(query: string): Promise<SupplierProductOrm[]> {
    const products = await this.createQueryBuilderWithRelations()
      .where('product.name ILIKE :query OR product.description ILIKE :query OR product.sku ILIKE :query', {
        query: `%${query}%`
      })
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async searchBySupplier(supplierId: string, query: string): Promise<SupplierProductOrm[]> {
    const products = await this.createQueryBuilderWithRelations()
      .where('product.supplierId = :supplierId', { supplierId })
      .andWhere('(product.name ILIKE :query OR product.description ILIKE :query OR product.sku ILIKE :query)', {
        query: `%${query}%`
      })
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findByTags(tags: string[]): Promise<SupplierProductOrm[]> {
    const products = await this.createQueryBuilderWithRelations()
      .where('product.tags && :tags', { tags })
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<SupplierProductOrm[]> {
    const products = await this.createQueryBuilderWithRelations()
      .where('(product.price->>\'listingPrice\')::numeric BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice
      })
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  /**
   * Tìm products theo type
   * Giữ custom method vì đây là business query phổ biến
   */
  async findByType(type: ProductType): Promise<SupplierProductOrm[]> {
    return this.findWithRelations({ type });
  }

  /**
   * Tìm products featured
   * Custom method vì có business logic (featured products)
   */
  async findFeatured(): Promise<SupplierProductOrm[]> {
    return this.findWithRelations({ isFeatured: true });
  }

  /**
   * Tìm products featured theo supplierId
   * Custom method vì có business logic (featured + supplier filter)
   */
  async findFeaturedBySupplierId(supplierId: string): Promise<SupplierProductOrm[]> {
    return this.findWithRelations({ supplierId, isFeatured: true });
  }

  async findLowStock(): Promise<SupplierProductOrm[]> {
    const products = await this.createQueryBuilderWithRelations()
      .where('(product.inventory->>\'quantity\')::numeric <= (product.inventory->>\'minStockLevel\')::numeric')
      .andWhere('(product.inventory->>\'isTracked\')::boolean = true')
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findOutOfStock(): Promise<SupplierProductOrm[]> {
    const products = await this.createQueryBuilderWithRelations()
      .where('(product.inventory->>\'quantity\')::numeric = 0')
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findWithPagination(
    page: number,
    limit: number,
    filters?: {
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
  ): Promise<{
    products: SupplierProductOrm[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    // Sử dụng helper method để tạo query builder với relations
    const queryBuilder = this.createQueryBuilderWithRelations();

    // Apply filters
    if (filters) {
      if (filters.status) {
        queryBuilder.andWhere('product.status = :status', { status: filters.status });
      }
      if (filters.approvalStatus) {
        queryBuilder.andWhere('product.approvalStatus = :approvalStatus', { approvalStatus: filters.approvalStatus });
      }
      if (filters.supplierId) {
        queryBuilder.andWhere('product.supplierId = :supplierId', { supplierId: filters.supplierId });
      }
      if (filters.categoryName) {
        queryBuilder.andWhere('product.categoryName = :categoryName', { categoryName: filters.categoryName });
      }
      if (filters.type) {
        queryBuilder.andWhere('product.type = :type', { type: filters.type });
      }
      if (filters.minPrice !== undefined) {
        queryBuilder.andWhere('(product.price->>\'listingPrice\')::numeric >= :minPrice', { minPrice: filters.minPrice });
      }
      if (filters.maxPrice !== undefined) {
        queryBuilder.andWhere('(product.price->>\'listingPrice\')::numeric <= :maxPrice', { maxPrice: filters.maxPrice });
      }
      if (filters.tags && filters.tags.length > 0) {
        queryBuilder.andWhere('product.tags && :tags', { tags: filters.tags });
      }
      if (filters.search) {
        queryBuilder.andWhere('(product.name ILIKE :search OR product.description ILIKE :search OR product.sku ILIKE :search)', {
          search: `%${filters.search}%`
        });
      }
      if (filters.isActive !== undefined) {
        queryBuilder.andWhere('product.isActive = :isActive', { isActive: filters.isActive });
      }
      if (filters.isFeatured !== undefined) {
        queryBuilder.andWhere('product.isFeatured = :isFeatured', { isFeatured: filters.isFeatured });
      }
      if (filters.isSuspend !== undefined) {
        queryBuilder.andWhere('product.isSuspend = :isSuspend', { isSuspend: filters.isSuspend });
      }
    }

    // Get total count
    const total = await queryBuilder.getCount();

    // Apply pagination
    const products = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('product.createdAt', 'DESC')
      .getMany();

    const totalPages = Math.ceil(total / limit);

    return {
      products: products.map(product => this.toDomain(product)),
      total,
      page,
      limit,
      totalPages
    };
  }

  async countByStatus(status: ProductStatus): Promise<number> {
    return this.count({ where: { status } });
  }

  async countByApprovalStatus(approvalStatus: ApprovalStatus): Promise<number> {
    return this.count({ where: { approvalStatus } });
  }

  async countBySupplierId(supplierId: string): Promise<number> {
    return this.count({ where: { supplierId } });
  }

  async countByCategoryId(categoryId: string): Promise<number> {
    return this.count({ where: { categoryName: categoryId } });
  }

  async countActive(): Promise<number> {
    return this.count({ where: { status: ProductStatus.PUBLISHED, isActive: true } });
  }

  async countPendingApproval(): Promise<number> {
    return this.count({ where: { approvalStatus: ApprovalStatus.PENDING } });
  }

  async updateStatus(ids: string[], status: ProductStatus): Promise<void> {
    await super.update(ids, { status });
  }

  async updateApprovalStatus(ids: string[], approvalStatus: ApprovalStatus): Promise<void> {
    await super.update(ids, { approvalStatus });
  }

  async bulkDelete(ids: string[]): Promise<void> {
    await super.delete(ids);
  }

  async bulkActivate(ids: string[]): Promise<void> {
    await super.update(ids, { isActive: true, status: ProductStatus.PUBLISHED });
  }

  async bulkDeactivate(ids: string[]): Promise<void> {
    await super.update(ids, { isActive: false, status: ProductStatus.DRAFT });
  }

  async findRecentlyAdded(days: number): Promise<SupplierProductOrm[]> {
    const date = new Date();
    date.setDate(date.getDate() - days);
    
    const products = await this.createQueryBuilderWithRelations()
      .where('product.createdAt >= :date', { date })
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findRecentlyUpdated(days: number): Promise<SupplierProductOrm[]> {
    const date = new Date();
    date.setDate(date.getDate() - days);
    
    const products = await this.createQueryBuilderWithRelations()
      .where('product.updatedAt >= :date', { date })
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findTopRated(limit: number): Promise<SupplierProductOrm[]> {
    const products = await this.createQueryBuilderWithRelations()
      .addSelect('AVG(reviews.rating)', 'avgRating')
      .groupBy('product.id')
      .orderBy('avgRating', 'DESC')
      .limit(limit)
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findMostReviewed(limit: number): Promise<SupplierProductOrm[]> {
    const products = await this.createQueryBuilderWithRelations()
      .addSelect('COUNT(reviews.id)', 'reviewCount')
      .groupBy('product.id')
      .orderBy('reviewCount', 'DESC')
      .limit(limit)
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findBestSelling(limit: number): Promise<SupplierProductOrm[]> {
    // This would need to be implemented based on order data
    // For now, return featured products
    return this.findFeatured();
  }

  async findRelatedProducts(productId: string, limit: number): Promise<SupplierProductOrm[]> {
    // Get the product to find its category
    const product = await this.findById(productId);
    if (!product) return [];

    // Find products in the same category
    const relatedProducts = await this.findByCategoryId(product.categoryName);
    return relatedProducts
      .filter(p => p.id !== productId)
      .slice(0, limit);
  }

  /**
   * Chuyển đổi từ ORM Entity sang Domain Model
   * Custom Repository xử lý mapping logic phức tạp
   */
  private toDomain(ormProduct: SupplierProductOrm): SupplierProductOrm {
    const categoryName = ormProduct.categoryName;

    const price = new ProductPrice(
      ormProduct.price.listingPrice,
      ormProduct.price.retailPrice,
      ormProduct.price.currency
    );

    const inventory = new ProductInventory(ormProduct.inventory.quantity);

    const specifications = new ProductSpecifications(
      new Map(Object.entries(ormProduct.specifications.specifications || {})),
      ormProduct.specifications.materials,
      ormProduct.specifications.colors,
      ormProduct.specifications.sizes
    );

    const images = (ormProduct.images || []).map(img => 
      ProductImageOrm.create(
        img.id,
        img.productId,
        img.url,
        img.altText,
        img.sortOrder,
        img.isPrimary,
        img.width,
        img.height,
        img.fileSize,
        img.mimeType
      )
    );

    const reviews = (ormProduct.reviews || []).map(review => 
      ProductReviewOrm.create(
        review.id,
        review.productId,
        review.customerId,
        review.rating,
        review.title,
        review.comment,
        review.isVerified,
        review.isPublished,
      )
    );

    // ✅ Repository should return raw ORM entities, not create new ones
    // The entity already has all the data loaded from database
    return ormProduct;
  }

  /**
   * Chuyển đổi từ Domain Model sang ORM Entity
   * Custom Repository xử lý mapping logic phức tạp với type safety
   */
  private toOrm(product: SupplierProductOrm): SupplierProductOrm {
    // Type-safe helper functions
    type DimensionsShape = {
      length?: number;
      width?: number;
      height?: number;
      unit?: string;
    };

    type SeoShape = {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string[];
    };

    const isDimensionsShape = (obj: unknown): obj is DimensionsShape => {
      if (!obj || typeof obj !== 'object') return false;
      const o = obj as Record<string, unknown>;
      return o.length !== undefined || o.width !== undefined || o.height !== undefined || o.unit !== undefined;
    };

    const isSeoShape = (obj: unknown): obj is SeoShape => {
      if (!obj || typeof obj !== 'object') return false;
      const o = obj as Record<string, unknown>;
      return o.metaTitle !== undefined || o.metaDescription !== undefined || Array.isArray(o.keywords);
    };

    const safeDimensions = ((): { length: number; width: number; height: number; unit: string } | undefined => {
      const d = product.dimensions;
      if (!d) return undefined;
      
      let parsed: unknown = d;
      if (typeof d === 'string') {
        try {
          parsed = JSON.parse(d);
        } catch {
          return undefined;
        }
      }
      
      if (!isDimensionsShape(parsed)) return undefined;
      
      const dims = parsed as DimensionsShape;
      // Only return if all required properties are present and valid
      if (
        dims.length !== undefined && typeof dims.length === 'number' &&
        dims.width !== undefined && typeof dims.width === 'number' &&
        dims.height !== undefined && typeof dims.height === 'number' &&
        dims.unit !== undefined && typeof dims.unit === 'string'
      ) {
        return {
          length: dims.length,
          width: dims.width,
          height: dims.height,
          unit: dims.unit
        };
      }
      return undefined;
    })();

    const safeWeight = ((): number | undefined => {
      const w = product.weight;
      if (w === undefined || w === null) return undefined;
      if (typeof w === 'object' && w !== null && 'value' in w && typeof (w as { value: unknown }).value === 'number') {
        return Number((w as { value: number }).value);
      }
      const n = Number(w);
      return isNaN(n) ? undefined : n;
    })();

    const safePrice: {
      listingPrice: number;
      retailPrice: number;
      currency: string;
    } = {
      listingPrice: Number(product.price.listingPrice),
      retailPrice: Number(product.price.retailPrice),
      currency: product.price.currency
    };

    const safeInventory: {
      quantity: number;
    } = {
      quantity: Number(product.inventory.quantity)
    };

    const toSafeDate = (v: Date | string | undefined): Date | undefined => {
      if (!v) return undefined;
      if (v instanceof Date) {
        return isNaN(v.getTime()) ? undefined : v;
      }
      const d = new Date(v);
      return isNaN(d.getTime()) ? undefined : d;
    };

    // ✅ Repository should use direct property assignment, not factory methods
    const entity = new SupplierProductOrm();
    entity.id = product.id;
    entity.supplierId = product.supplierId;
    entity.name = product.name;
    entity.description = product.description;
    entity.shortDescription = product.shortDescription;
    entity.sku = product.sku;
    entity.categoryName = product.categoryName;
    entity.price = safePrice;
    entity.inventory = safeInventory;
    entity.specifications = {
      specifications: product.specifications.specifications,
      materials: product.specifications.materials,
      colors: product.specifications.colors,
      sizes: product.specifications.sizes
    };
    entity.type = product.type;
    entity.status = product.status;
    entity.approvalStatus = product.approvalStatus;
    entity.images = product.images.map(img => {
      const imageOrm = new ProductImageOrm();
      imageOrm.id = img.id;
      imageOrm.productId = product.id;
      imageOrm.url = img.url;
      imageOrm.altText = img.altText;
      imageOrm.sortOrder = img.sortOrder;
      imageOrm.isPrimary = img.isPrimary;
      imageOrm.width = img.width;
      imageOrm.height = img.height;
      imageOrm.fileSize = img.fileSize;
      imageOrm.mimeType = img.mimeType;
      return imageOrm;
    });
    entity.reviews = product.reviews.map(review => {
      const reviewOrm = new ProductReviewOrm();
      reviewOrm.id = review.id;
      reviewOrm.productId = product.id;
      reviewOrm.customerId = review.customerId;
      reviewOrm.rating = review.rating;
      reviewOrm.title = review.title;
      reviewOrm.comment = review.comment;
      reviewOrm.isVerified = review.isVerified;
      reviewOrm.isPublished = review.isPublished;
      reviewOrm.helpfulCount = review.helpfulCount;
      reviewOrm.createdAt = review.createdAt;
      reviewOrm.updatedAt = review.updatedAt;
      return reviewOrm;
    });
    entity.tags = product.tags;
    entity.isActive = product.isActive;
    entity.isFeatured = product.isFeatured;
    entity.isSuspend = product.isSuspend;
    entity.weight = safeWeight;
    entity.dimensions = safeDimensions;
    entity.seoData = isSeoShape(product.seoData) ? product.seoData : undefined;
    
    return entity;
  }

  async findByIds(productIds: string[]): Promise<SupplierProductOrm[]> {
    if (!productIds || productIds.length === 0) {
      return [];
    }

    const products = await this.createQueryBuilderWithRelations()
      .where('product.id IN (:...ids)', { ids: productIds })
      .getMany();

    return products.map(product => this.toDomain(product));
  }

  // ============================================================================
  // Domain Mapping Methods - Chuyển đổi giữa ORM và Domain Model
  // ============================================================================
  
}
