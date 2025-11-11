import { SupplierProduct } from '../../domain/aggregates/supplier-product.aggregate';
import { ProductImage } from '../../domain/entities/product-image.entity';
import { ProductReview } from '../../domain/entities/product-review.entity';
import { ProductPrice } from '../../domain/value-objects/product-price.vo';
import { ProductInventory } from '../../domain/value-objects/product-inventory.vo';
import { ProductSpecifications } from '../../domain/value-objects/product-specifications.vo';
import { PriceMapper } from './price.mapper';
import { SupplierProductResponseDto, ProductInventoryResponseDto, ProductSpecificationsResponseDto, ProductImageResponseDto, ProductReviewResponseDto, ProductDimensionsResponseDto, ProductWeightResponseDto, ProductSEOResponseDto } from '../dto/supplier-product-response.dto';
import { ProductPriceResponseDto } from '../dto/product-price.dto';

export class SupplierProductMapper {
  static toResponseDto(product: SupplierProduct): SupplierProductResponseDto {
    return {
      id: product.id,
      supplierId: product.supplierId,
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription,
      sku: product.sku,
      categoryName: product.categoryName,
      price: this.mapPriceToDto(product.price),
      inventory: this.mapInventoryToDto(product.inventory),
      specifications: this.mapSpecificationsToDto(product.specifications),
      type: product.type,
      status: product.status,
      approvalStatus: product.approvalStatus,
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
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      approvedAt: product.approvedAt?.toISOString(),
      approvedBy: product.approvedBy,
      rejectionReason: product.rejectionReason,
      
      // Computed properties
      isApproved: product.isApproved,
      isPendingApproval: product.isPendingApproval,
      isRejected: product.isRejected,
      isActiveAndApproved: product.isActiveAndApproved,
      averageRating: product.averageRating,
      reviewCount: product.reviewCount,
      primaryImage: product.primaryImage ? this.mapImageToDto(product.primaryImage) : undefined,
      hasImages: product.hasImages,
      formattedListingPrice: product.formattedListingPrice,
      formattedRetailPrice: product.formattedRetailPrice,
      profitAmount: product.profitAmount
    };
  }

  // category removed

  private static mapPriceToDto(price: ProductPrice): ProductPriceResponseDto {
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

  private static mapImageToDto(image: ProductImage): ProductImageResponseDto {
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
      aspectRatio: image.aspectRatio ?? undefined,
      isLandscape: image.isLandscape,
      isPortrait: image.isPortrait,
      isSquare: image.isSquare,
      formattedFileSize: image.formattedFileSize ?? undefined
    };
  }

  private static mapReviewToDto(review: ProductReview): ProductReviewResponseDto {
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
      createdAt: review.createdAt.toISOString(),
      updatedAt: review.updatedAt.toISOString(),
      isHighRating: review.isHighRating,
      isLowRating: review.isLowRating,
      isMediumRating: review.isMediumRating,
      hasComment: review.hasComment,
      hasTitle: review.hasTitle,
      isRecent: review.isRecent
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
