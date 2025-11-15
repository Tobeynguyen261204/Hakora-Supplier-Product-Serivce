import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { ProductImageOrm } from '../entities/product-image.entity';
import { ProductReviewOrm } from '../entities/product-review.entity';
import { ProductPrice } from '../value-objects/product-price.vo';
import { ProductInventory } from '../value-objects/product-inventory.vo';
import { ProductSpecifications } from '../value-objects/product-specifications.vo';
import { PriceMapper } from './price.mapper';
import { SupplierProductResponseDto, ProductInventoryResponseDto, ProductSpecificationsResponseDto, ProductImageResponseDto, ProductReviewResponseDto, ProductDimensionsResponseDto, ProductWeightResponseDto, ProductSEOResponseDto } from '../dto/supplier-product-response.dto';
import { ProductPriceResponseDto } from '../dto/product-price.dto';
import { ProductType } from '../enums/product-type.enum';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';

export class SupplierProductMapper {
  static toResponseDto(product: SupplierProductOrm): SupplierProductResponseDto {
    return {
      id: product.id,
      supplierId: product.supplierId,
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription,
      sku: product.sku,
      categoryName: product.categoryName,
      price: this.mapPriceToDto(product.price),
      inventory: this.mapInventoryToDto(
        product.inventory instanceof ProductInventory
          ? product.inventory
          : new ProductInventory(product.inventory.quantity)
      ),
      specifications: this.mapSpecificationsToDto(
        product.specifications instanceof ProductSpecifications
          ? product.specifications
          : new ProductSpecifications(
              new Map(Object.entries(product.specifications.specifications)),
              product.specifications.materials,
              product.specifications.colors,
              product.specifications.sizes
            )
      ),
      type: product.type as ProductType,
      status: product.status as ProductStatus,
      approvalStatus: product.approvalStatus as ApprovalStatus,
      images: product.images.map(img => this.mapImageToDto(img)),
      reviews: product.reviews.map(review => this.mapReviewToDto(review)),
      tags: product.tags,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      isSuspend: product.isSuspend,
      weight: product.weight,
      // Return raw shapes to avoid losing fields due to undefined filtering during mapping
      dimensions: product.dimensions ? { ...product.dimensions } : undefined,
      // shippingInfo removed
      seoData: product.seoData ? { ...product.seoData } : undefined,
      createdAt: product.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: product.updatedAt?.toISOString() || new Date().toISOString(),
      approvedAt: product.approvedAt?.toISOString(),
      approvedBy: product.approvedBy,
      rejectionReason: product.rejectionReason,
      
      // Computed properties - calculated directly since removed from entity
      isApproved: product.approvalStatus === 'APPROVED',
      isPendingApproval: product.approvalStatus === 'PENDING', 
      isRejected: product.approvalStatus === 'REJECTED',
      isActiveAndApproved: product.isActive && product.approvalStatus === 'APPROVED' && product.status === 'PUBLISHED',
      averageRating: product.reviews && product.reviews.length > 0 
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length 
        : 0,
      reviewCount: product.reviewCount,
      primaryImage: product.images && product.images.length > 0 
        ? this.mapImageToDto(product.images.find(img => img.isPrimary) || product.images[0]) 
        : undefined,
      hasImages: product.hasImages,
      formattedListingPrice: `${product.price.listingPrice.toLocaleString()} ${product.price.currency}`,
      formattedRetailPrice: `${product.price.retailPrice.toLocaleString()} ${product.price.currency}`,
      profitAmount: product.price.retailPrice - product.price.listingPrice
    };
  }

  // category removed

  private static mapPriceToDto(price: any): ProductPriceResponseDto {
    return PriceMapper.mapListingPrice(price);
  }

  private static mapInventoryToDto(inventory: ProductInventory): ProductInventoryResponseDto {
    return {
      quantity: inventory.quantity,
      availableQuantity: inventory.availableQuantity,
      isInStock: inventory.isInStock,
      isOutOfStock: inventory.isOutOfStock,
      stockLevel: inventory.isOutOfStock ? 'OUT_OF_STOCK' : 'IN_STOCK'
    };
  }

  private static mapSpecificationsToDto(specifications: ProductSpecifications): ProductSpecificationsResponseDto {
    return {
      specifications: Object.fromEntries(specifications.specifications),
      materials: specifications.materials,
      colors: specifications.colors,
      sizes: specifications.sizes,
      specificationCount: specifications.specificationCount
    };
  }

  private static mapImageToDto(image: ProductImageOrm): ProductImageResponseDto {
    const aspectRatio = image.width && image.height ? image.width / image.height : undefined;
    const isLandscape = aspectRatio ? aspectRatio > 1 : false;
    const isPortrait = aspectRatio ? aspectRatio < 1 : false;
    const isSquare = aspectRatio ? Math.abs(aspectRatio - 1) < 0.01 : false;
    const formattedFileSize = image.fileSize 
      ? `${(image.fileSize / 1024).toFixed(2)} KB` 
      : undefined;

    return {
      id: image.id,
      productId: image.productId,
      url: image.url,
      altText: image.altText,
      sortOrder: image.sortOrder,
      isPrimary: image.isPrimary,
      width: image.width,
      height: image.height,
      fileSize: image.fileSize,
      mimeType: image.mimeType,
      aspectRatio,
      isLandscape,
      isPortrait,
      isSquare,
      formattedFileSize
    };
  }

  private static mapReviewToDto(review: ProductReviewOrm): ProductReviewResponseDto {
    const isHighRating = review.rating >= 4;
    const isLowRating = review.rating <= 2;
    const isMediumRating = review.rating === 3;
    const hasComment = !!review.comment;
    const hasTitle = !!review.title;
    const isRecent = review.createdAt 
      ? (Date.now() - review.createdAt.getTime()) < 30 * 24 * 60 * 60 * 1000 // 30 days
      : false;

    return {
      id: review.id,
      productId: review.productId,
      customerId: review.customerId,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      isVerified: review.isVerified,
      isPublished: review.isPublished,
      helpfulCount: review.helpfulCount,
      createdAt: review.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: review.updatedAt?.toISOString() || new Date().toISOString(),
      isHighRating,
      isLowRating,
      isMediumRating,
      hasComment,
      hasTitle,
      isRecent
    };
  }

  private static mapDimensionsToDto(dimensions: {
    length?: number;
    width?: number;
    height?: number;
    unit?: string;
  }): ProductDimensionsResponseDto {
    return {
      length: dimensions.length,
      width: dimensions.width,
      height: dimensions.height,
      unit: dimensions.unit,
      formattedDimensions: dimensions.length && dimensions.width && dimensions.height 
        ? `${dimensions.length}${dimensions.unit} x ${dimensions.width}${dimensions.unit} x ${dimensions.height}${dimensions.unit}`
        : undefined,
      volume: dimensions.length && dimensions.width && dimensions.height 
        ? dimensions.length * dimensions.width * dimensions.height 
        : undefined
    };
  }

  private static mapWeightToDto(weight: { value: number; unit: string }): ProductWeightResponseDto {
    return {
      value: weight.value,
      unit: weight.unit,
      formattedWeight: `${weight.value}${weight.unit}`
    };
  }

  // shippingInfo mapping removed

  private static mapSEOTodto(seoData: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  }): ProductSEOResponseDto {
    return {
      metaTitle: seoData.metaTitle,
      metaDescription: seoData.metaDescription,
      keywords: seoData.keywords
    };
  }
}
