import { Injectable } from '@nestjs/common';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { ProductImageOrm } from '../entities/product-image.entity';
import { ProductReviewOrm } from '../entities/product-review.entity';
import { CreateSupplierProductRequest } from '../dto/create-supplier-product-request.dto';
import { ProductPrice } from '../value-objects/product-price.vo';
import { ProductInventory } from '../value-objects/product-inventory.vo';
import { ProductSpecifications } from '../value-objects/product-specifications.vo';
import { ProductType } from '../enums/product-type.enum';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';

/**
 * SupplierProductFactoryService
 * 
 * Trách nhiệm: Tạo SupplierProductOrm từ request data
 * - Factory pattern
 * - Encapsulate creation logic
 * - Validate creation rules
 * - Handle Value Object to JSONB conversion
 */
@Injectable()
export class SupplierProductFactoryService {
  
  /**
   * ✅ Professional: Tạo SupplierProductOrm từ Value Objects (Domain Model)
   * Factory nhận Value Objects, handle conversion internally
   */
  createFromValueObjects(
    id: string,
    supplierId: string,
    name: string,
    description: string,
    shortDescription: string | undefined,
    sku: string,
    categoryName: string,
    price: ProductPrice,  // ✅ Value Object
    inventory: ProductInventory,  // ✅ Value Object
    specifications: ProductSpecifications,  // ✅ Value Object
    type: ProductType,
    tags: string[],
    isActive: boolean,
    isFeatured: boolean,
    weight: number | undefined,
    dimensions: CreateSupplierProductRequest['dimensions'],
    seoData: CreateSupplierProductRequest['seoData'],
    images: ProductImageOrm[] = [],
    reviews: ProductReviewOrm[] = [],
    categoryId?: string  // ✅ Add optional categoryId (moved to end after all required params)
  ): SupplierProductOrm {
    const product = new SupplierProductOrm();
    
    // Basic fields
    product.id = id;
    product.supplierId = supplierId;
    product.name = name;
    product.description = description;
    product.shortDescription = shortDescription;
    product.sku = sku;
    product.categoryName = categoryName;
    product.categoryId = categoryId;
    
    // ✅ Convert Value Objects to JSONB format
    product.price = {
      listingPrice: price.listingPrice,
      retailPrice: price.retailPrice,
      currency: price.currency,
    };
    
    product.inventory = {
      quantity: inventory.quantity,
    };
    
    // ✅ Use Value Object's toJSON method
    product.specifications = specifications.toJSON();
    
    // Enums as strings
    product.type = type;
    product.status = ProductStatus.DRAFT;  // Business rule: Always start as DRAFT
    product.approvalStatus = ApprovalStatus.PENDING;  // Business rule: Always start as PENDING
    
    // Relations
    product.images = images;
    product.reviews = reviews;
    
    // Arrays
    product.tags = tags || [];
    
    // Booleans with defaults
    product.isActive = isActive ?? true;
    product.isFeatured = isFeatured ?? false;
    product.isSuspend = false;  // Business rule: Always start as not suspended
    
    // Optional fields
    product.weight = weight;
    product.dimensions = dimensions;
    product.seoData = seoData;
    
    return product;
  }

  /**
   * Tạo SupplierProductOrm từ DTO (backward compatibility)
   * Internally converts DTO to Value Objects, then uses createFromValueObjects
   */
  createFromRequest(
    id: string,
    request: CreateSupplierProductRequest,
    images: ProductImageOrm[] = [],
    reviews: ProductReviewOrm[] = []
  ): SupplierProductOrm {
    // Convert DTO to Value Objects first, then use createFromValueObjects
    const price = new ProductPrice(
      request.price.listingPrice,
      request.price.retailPrice,
      request.price.currency
    );
    
    const inventory = new ProductInventory(request.inventory.quantity);
    
    const specifications = request.specifications 
      ? new ProductSpecifications(
          new Map(Object.entries(request.specifications.specifications || {})),
          request.specifications.materials,
          request.specifications.colors,
          request.specifications.sizes
        )
      : new ProductSpecifications(new Map());

    return this.createFromValueObjects(
      id,
      request.supplierId,
      request.name,
      request.description,
      request.shortDescription,
      request.sku,
      request.categoryName,
      price,
      inventory,
      specifications,
      request.type,
      request.tags || [],
      request.isActive ?? true,
      request.isFeatured ?? false,
      request.weight,
      request.dimensions,
      request.seoData,
      images,
      reviews,
      request.categoryId // Pass categoryId if provided (optional, at the end)
    );
  }
  
  /**
   * Clone entity với updates
   */
  cloneWithUpdates(
    original: SupplierProductOrm, 
    updates: Partial<SupplierProductOrm>
  ): SupplierProductOrm {
    return Object.assign(Object.create(Object.getPrototypeOf(original)), {
      ...original,
      ...updates,
      updatedAt: new Date()
    });
  }
}
