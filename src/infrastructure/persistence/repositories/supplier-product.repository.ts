import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ISupplierProductRepository } from '../../../domain/repositories/supplier-product.repository.interface';
import { SupplierProduct } from '../../../domain/aggregates/supplier-product.aggregate';
import { ProductImage } from '../../../domain/entities/product-image.entity';
import { ProductReview } from '../../../domain/entities/product-review.entity';
import { ProductPrice } from '../../../domain/value-objects/product-price.vo';
import { ProductInventory } from '../../../domain/value-objects/product-inventory.vo';
import { ProductSpecifications } from '../../../domain/value-objects/product-specifications.vo';
import { ProductStatus } from '../../../domain/enums/product-status.enum';
import { ApprovalStatus } from '../../../domain/enums/approval-status.enum';
import { ProductType } from '../../../domain/enums/product-type.enum';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { ProductImageOrm } from '../entities/product-image.entity';
import { ProductReviewOrm } from '../entities/product-review.entity';

@Injectable()
export class SupplierProductRepository implements ISupplierProductRepository {
  constructor(
    @InjectRepository(SupplierProductOrm)
    private readonly productRepo: Repository<SupplierProductOrm>,
    @InjectRepository(ProductImageOrm)
    private readonly imageRepo: Repository<ProductImageOrm>,
    @InjectRepository(ProductReviewOrm)
    private readonly reviewRepo: Repository<ProductReviewOrm>
  ) {}

  async save(product: SupplierProduct): Promise<SupplierProduct> {
    const productOrm = this.toOrm(product);
    const savedProduct = await this.productRepo.save(productOrm);
    return this.toDomain(savedProduct);
  }

  async findById(id: string): Promise<SupplierProduct | null> {
    const productOrm = await this.productRepo.findOne({
      where: { id },
      relations: ['images', 'reviews']
    });
    if (!productOrm) return null;
    return this.toDomain(productOrm);
  }

  async findBySku(sku: string): Promise<SupplierProduct | null> {
    const productOrm = await this.productRepo.findOne({
      where: { sku },
      relations: ['images', 'reviews']
    });
    if (!productOrm) return null;
    return this.toDomain(productOrm);
  }

  async update(product: SupplierProduct): Promise<SupplierProduct> {
    const productOrm = this.toOrm(product);
    const updatedProduct = await this.productRepo.save(productOrm);
    return this.toDomain(updatedProduct);
  }

  async remove(id: string): Promise<void> {
    await this.productRepo.delete({ id });
  }

  async findBySupplierId(supplierId: string): Promise<SupplierProduct[]> {
    const products = await this.productRepo.find({
      where: { supplierId },
      relations: ['images', 'reviews']
    });
    return products.map(product => this.toDomain(product));
  }

  async findBySupplierIdAndStatus(supplierId: string, status: ProductStatus): Promise<SupplierProduct[]> {
    const products = await this.productRepo.find({
      where: { supplierId, status },
      relations: ['images', 'reviews']
    });
    return products.map(product => this.toDomain(product));
  }

  async findBySupplierIdAndApprovalStatus(supplierId: string, approvalStatus: ApprovalStatus): Promise<SupplierProduct[]> {
    const products = await this.productRepo.find({
      where: { supplierId, approvalStatus },
      relations: ['images', 'reviews']
    });
    return products.map(product => this.toDomain(product));
  }

  async findByCategoryId(categoryId: string): Promise<SupplierProduct[]> {
    const products = await this.productRepo.find({
      where: { categoryName: categoryId },
      relations: ['images', 'reviews']
    });
    return products.map(product => this.toDomain(product));
  }

  async findByCategoryIdAndStatus(categoryId: string, status: ProductStatus): Promise<SupplierProduct[]> {
    const products = await this.productRepo.find({
      where: { categoryName: categoryId, status },
      relations: ['images', 'reviews']
    });
    return products.map(product => this.toDomain(product));
  }

  async findByStatus(status: ProductStatus): Promise<SupplierProduct[]> {
    const products = await this.productRepo.find({
      where: { status },
      relations: ['images', 'reviews']
    });
    return products.map(product => this.toDomain(product));
  }

  async findByApprovalStatus(approvalStatus: ApprovalStatus): Promise<SupplierProduct[]> {
    const products = await this.productRepo.find({
      where: { approvalStatus },
      relations: ['images', 'reviews']
    });
    return products.map(product => this.toDomain(product));
  }

  async findPendingApproval(): Promise<SupplierProduct[]> {
    return this.findByApprovalStatus(ApprovalStatus.PENDING);
  }

  async findApproved(): Promise<SupplierProduct[]> {
    return this.findByApprovalStatus(ApprovalStatus.APPROVED);
  }

  async findRejected(): Promise<SupplierProduct[]> {
    return this.findByApprovalStatus(ApprovalStatus.REJECTED);
  }

  async findActive(): Promise<SupplierProduct[]> {
    const products = await this.productRepo.find({
      where: { status: ProductStatus.PUBLISHED, isActive: true },
      relations: ['images', 'reviews']
    });
    return products.map(product => this.toDomain(product));
  }

  async findActiveBySupplierId(supplierId: string): Promise<SupplierProduct[]> {
    const products = await this.productRepo.find({
      where: { supplierId, status: ProductStatus.PUBLISHED, isActive: true },
      relations: ['images', 'reviews']
    });
    return products.map(product => this.toDomain(product));
  }

  async findActiveByCategoryId(categoryId: string): Promise<SupplierProduct[]> {
    const products = await this.productRepo.find({
      where: { categoryName: categoryId, status: ProductStatus.PUBLISHED, isActive: true },
      relations: ['images', 'reviews']
    });
    return products.map(product => this.toDomain(product));
  }

  async search(query: string): Promise<SupplierProduct[]> {
    const products = await this.productRepo
      .createQueryBuilder('product')
      // category removed
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .where('product.name ILIKE :query OR product.description ILIKE :query OR product.sku ILIKE :query', {
        query: `%${query}%`
      })
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async searchBySupplier(supplierId: string, query: string): Promise<SupplierProduct[]> {
    const products = await this.productRepo
      .createQueryBuilder('product')
      // category removed
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .where('product.supplierId = :supplierId', { supplierId })
      .andWhere('(product.name ILIKE :query OR product.description ILIKE :query OR product.sku ILIKE :query)', {
        query: `%${query}%`
      })
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findByTags(tags: string[]): Promise<SupplierProduct[]> {
    const products = await this.productRepo
      .createQueryBuilder('product')
      // category removed
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .where('product.tags && :tags', { tags })
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<SupplierProduct[]> {
    const products = await this.productRepo
      .createQueryBuilder('product')
      // category removed
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .where('(product.price->>\'amount\')::numeric BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice
      })
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findByType(type: ProductType): Promise<SupplierProduct[]> {
    const products = await this.productRepo.find({
      where: { type },
      relations: ['images', 'reviews']
    });
    return products.map(product => this.toDomain(product));
  }

  async findFeatured(): Promise<SupplierProduct[]> {
    const products = await this.productRepo.find({
      where: { isFeatured: true },
      relations: ['images', 'reviews']
    });
    return products.map(product => this.toDomain(product));
  }

  async findFeaturedBySupplierId(supplierId: string): Promise<SupplierProduct[]> {
    const products = await this.productRepo.find({
      where: { supplierId, isFeatured: true },
      relations: ['images', 'reviews']
    });
    return products.map(product => this.toDomain(product));
  }

  async findLowStock(): Promise<SupplierProduct[]> {
    const products = await this.productRepo
      .createQueryBuilder('product')
      // category removed
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .where('(product.inventory->>\'quantity\')::numeric <= (product.inventory->>\'minStockLevel\')::numeric')
      .andWhere('(product.inventory->>\'isTracked\')::boolean = true')
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findOutOfStock(): Promise<SupplierProduct[]> {
    const products = await this.productRepo
      .createQueryBuilder('product')
      // category removed
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.reviews', 'reviews')
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
      categoryId?: string;
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
    products: SupplierProduct[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const queryBuilder = this.productRepo
      .createQueryBuilder('product')
      // category removed
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.reviews', 'reviews');

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
      if (filters.categoryId) {
        queryBuilder.andWhere('product.categoryName = :categoryName', { categoryName: filters.categoryId });
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
    return this.productRepo.count({ where: { status } });
  }

  async countByApprovalStatus(approvalStatus: ApprovalStatus): Promise<number> {
    return this.productRepo.count({ where: { approvalStatus } });
  }

  async countBySupplierId(supplierId: string): Promise<number> {
    return this.productRepo.count({ where: { supplierId } });
  }

  async countByCategoryId(categoryId: string): Promise<number> {
    return this.productRepo.count({ where: { categoryName: categoryId } });
  }

  async countActive(): Promise<number> {
    return this.productRepo.count({ where: { status: ProductStatus.PUBLISHED, isActive: true } });
  }

  async countPendingApproval(): Promise<number> {
    return this.productRepo.count({ where: { approvalStatus: ApprovalStatus.PENDING } });
  }

  async updateStatus(ids: string[], status: ProductStatus): Promise<void> {
    await this.productRepo.update(ids, { status });
  }

  async updateApprovalStatus(ids: string[], approvalStatus: ApprovalStatus): Promise<void> {
    await this.productRepo.update(ids, { approvalStatus });
  }

  async bulkDelete(ids: string[]): Promise<void> {
    await this.productRepo.delete(ids);
  }

  async bulkActivate(ids: string[]): Promise<void> {
    await this.productRepo.update(ids, { isActive: true, status: ProductStatus.PUBLISHED });
  }

  async bulkDeactivate(ids: string[]): Promise<void> {
    await this.productRepo.update(ids, { isActive: false, status: ProductStatus.DRAFT });
  }

  async findRecentlyAdded(days: number): Promise<SupplierProduct[]> {
    const date = new Date();
    date.setDate(date.getDate() - days);
    
    const products = await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .where('product.createdAt >= :date', { date })
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findRecentlyUpdated(days: number): Promise<SupplierProduct[]> {
    const date = new Date();
    date.setDate(date.getDate() - days);
    
    const products = await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .where('product.updatedAt >= :date', { date })
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findTopRated(limit: number): Promise<SupplierProduct[]> {
    const products = await this.productRepo
      .createQueryBuilder('product')
      // category removed
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .addSelect('AVG(reviews.rating)', 'avgRating')
      .groupBy('product.id')
      .orderBy('avgRating', 'DESC')
      .limit(limit)
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findMostReviewed(limit: number): Promise<SupplierProduct[]> {
    const products = await this.productRepo
      .createQueryBuilder('product')
      // category removed
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .addSelect('COUNT(reviews.id)', 'reviewCount')
      .groupBy('product.id')
      .orderBy('reviewCount', 'DESC')
      .limit(limit)
      .getMany();
    return products.map(product => this.toDomain(product));
  }

  async findBestSelling(limit: number): Promise<SupplierProduct[]> {
    // This would need to be implemented based on order data
    // For now, return featured products
    return this.findFeatured();
  }

  async findRelatedProducts(productId: string, limit: number): Promise<SupplierProduct[]> {
    // Get the product to find its category
    const product = await this.findById(productId);
    if (!product) return [];

    // Find products in the same category
    const relatedProducts = await this.findByCategoryId(product.categoryName);
    return relatedProducts
      .filter(p => p.id !== productId)
      .slice(0, limit);
  }

  private toDomain(ormProduct: SupplierProductOrm): SupplierProduct {
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
      new ProductImage(
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
      new ProductReview(
        review.id,
        review.productId,
        review.customerId,
        review.rating,
        review.title,
        review.comment,
        review.isVerified,
        review.isPublished,
        review.helpfulCount,
        review.createdAt,
        review.updatedAt
      )
    );

    return new SupplierProduct(
      ormProduct.id,
      ormProduct.supplierId,
      ormProduct.name,
      ormProduct.description,
      ormProduct.shortDescription,
      ormProduct.sku,
      categoryName,
      price,
      inventory,
      specifications,
      ormProduct.type as ProductType,
      ormProduct.status as ProductStatus,
      ormProduct.approvalStatus as ApprovalStatus,
      images,
      reviews,
      ormProduct.tags,
      ormProduct.isActive,
      ormProduct.isFeatured,
      ormProduct.isSuspend,
      ormProduct.weight,
      ormProduct.dimensions,
      ormProduct.seoData,
      ormProduct.createdAt,
      ormProduct.updatedAt,
      ormProduct.approvedAt,
      ormProduct.approvedBy,
      ormProduct.rejectionReason
    );
  }

  private toOrm(product: SupplierProduct): SupplierProductOrm {
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

    return {
      id: product.id,
      supplierId: product.supplierId,
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription,
      sku: product.sku,
      categoryName: product.categoryName,
      price: safePrice,
      inventory: safeInventory,
      specifications: {
        specifications: Object.fromEntries(product.specifications.specifications),
        materials: product.specifications.materials,
        colors: product.specifications.colors,
        sizes: product.specifications.sizes
      },
      type: product.type,
      status: product.status,
      approvalStatus: product.approvalStatus,
      tags: product.tags,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      isSuspend: product.isSuspend,
      weight: safeWeight,
      dimensions: safeDimensions,
      seoData: isSeoShape(product.seoData) ? product.seoData : undefined,
      images: product.images.map(img => {
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
      }),
      reviews: product.reviews.map(review => {
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
      }),
      createdAt: toSafeDate(product.createdAt) || new Date(),
      updatedAt: toSafeDate(product.updatedAt) || new Date(),
      approvedAt: toSafeDate(product.approvedAt),
      approvedBy: product.approvedBy,
      rejectionReason: product.rejectionReason
    };
  }

  async findByIds(productIds: string[]): Promise<SupplierProduct[]> {
    if (!productIds || productIds.length === 0) {
      return [];
    }

    const products = await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .where('product.id IN (:...ids)', { ids: productIds })
      .getMany();

    return products.map(product => this.toDomain(product));
  }
}
