import { Injectable } from '@nestjs/common';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { ProductImageOrm } from '../entities/product-image.entity';
import { ProductReviewOrm } from '../entities/product-review.entity';
import { CreateSupplierProductRequest } from '../dto/create-supplier-product-request.dto';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';

/**
 * SupplierProductFactoryService
 * 
 * Trách nhiệm: Tạo SupplierProductOrm từ request data
 * - Factory pattern
 * - Encapsulate creation logic
 * - Validate creation rules
 */
@Injectable()
export class SupplierProductFactoryService {
  
  /**
   * Tạo SupplierProductOrm từ CreateSupplierProductRequest
   */
  createFromRequest(
    id: string,
    request: CreateSupplierProductRequest,
    images: ProductImageOrm[] = [],
    reviews: ProductReviewOrm[] = []
  ): SupplierProductOrm {
    const product = new SupplierProductOrm();
    
    // Basic fields
    product.id = id;
    product.supplierId = request.supplierId;
    product.name = request.name;
    product.description = request.description;
    product.shortDescription = request.shortDescription;
    product.sku = request.sku;
    product.categoryName = request.categoryName;
    
    // JSONB fields - convert from DTOs to plain objects
    product.price = {
      listingPrice: request.price.listingPrice,
      retailPrice: request.price.retailPrice,
      currency: request.price.currency,
    };
    
    product.inventory = {
      quantity: request.inventory.quantity,
    };
    
    product.specifications = {
      specifications: request.specifications?.specifications || {},
      materials: request.specifications?.materials,
      colors: request.specifications?.colors,
      sizes: request.specifications?.sizes,
    };
    
    // Enums as strings
    product.type = request.type;
    product.status = ProductStatus.DRAFT;  // Always start as DRAFT
    product.approvalStatus = ApprovalStatus.PENDING;  // Always start as PENDING
    
    // Relations
    product.images = images;
    product.reviews = reviews;
    
    // Arrays
    product.tags = request.tags || [];
    
    // Booleans with defaults
    product.isActive = request.isActive ?? true;
    product.isFeatured = request.isFeatured ?? false;
    product.isSuspend = false;  // Always start as not suspended
    
    // Optional fields
    product.weight = request.weight;
    product.dimensions = request.dimensions ? {
      length: request.dimensions.length,
      width: request.dimensions.width,
      height: request.dimensions.height,
      unit: request.dimensions.unit,
    } : undefined;
    
    product.seoData = request.seoData ? {
      metaTitle: request.seoData.metaTitle,
      metaDescription: request.seoData.metaDescription,
      keywords: request.seoData.keywords,
    } : undefined;
    
    return product;
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
