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
import { SupplierProductComputedPropertiesService } from '../services/supplier-product-computed-properties.service';

/**
 * ✅ PURE MAPPER - Chỉ làm structure transformation
 * 
 * Responsibilities:
 * - Transform Entity structure → DTO structure
 * - Map nested objects (price, inventory, specifications, etc.)
 * - Convert types (Date → string, etc.)
 * - Orchestrate mapping với computed properties (helper method)
 * - NO business logic
 * - NO computed properties calculation (được tính bởi ComputedPropertiesService)
 * - NO presentation formatting calculation (được tính bởi ComputedPropertiesService)
 */
export class SupplierProductMapper {
  /**
   * Helper method: Map product với computed properties service
   * Đây là method chính mà services nên sử dụng
   * 
   * @param product - Entity từ database
   * @param computedPropsService - Service để tính computed properties
   */
  static toResponseDtoWithComputed(
    product: SupplierProductOrm,
    computedPropsService: SupplierProductComputedPropertiesService
  ): SupplierProductResponseDto {
    // 1. Compute all properties
    const computedProps = computedPropsService.computeAllProperties(product);
    
    // 2. Get primary image với computed properties
    const primaryImageEntity = computedPropsService.getPrimaryImageEntity(product);
    const primaryImage = primaryImageEntity 
      ? this.mapImageToDto(
          primaryImageEntity,
          computedPropsService.computeImageProperties(primaryImageEntity)
        )
      : undefined;

    // 3. Map to DTO với computed properties
    return this.toResponseDto(
      product,
      {
        ...computedProps,
        primaryImage,
      },
      {
        computeImageProperties: (img) => computedPropsService.computeImageProperties(img),
        computeReviewProperties: (review) => computedPropsService.computeReviewProperties(review),
        computeDimensionsProperties: (dim) => computedPropsService.computeDimensionsProperties(dim),
      }
    );
  }
  /**
   * Map Entity to DTO với computed properties
   * 
   * @param product - Entity từ database
   * @param computedProps - Computed properties từ ComputedPropertiesService
   * @param computedPropsService - Service để tính computed properties cho nested objects
   */
  static toResponseDto(
    product: SupplierProductOrm,
    computedProps?: {
      isApproved: boolean;
      isPendingApproval: boolean;
      isRejected: boolean;
      isActiveAndApproved: boolean;
      averageRating: number;
      reviewCount: number;
      primaryImage?: ProductImageResponseDto;
      hasImages: boolean;
      formattedListingPrice: string;
      formattedRetailPrice: string;
      profitAmount: number;
    },
    computedPropsService?: {
      computeImageProperties: (image: ProductImageOrm) => {
        aspectRatio?: number;
        isLandscape: boolean;
        isPortrait: boolean;
        isSquare: boolean;
        formattedFileSize?: string;
      };
      computeReviewProperties: (review: ProductReviewOrm) => {
        isHighRating: boolean;
        isLowRating: boolean;
        isMediumRating: boolean;
        hasComment: boolean;
        hasTitle: boolean;
        isRecent: boolean;
      };
      computeDimensionsProperties: (dimensions: {
        length?: number;
        width?: number;
        height?: number;
        unit?: string;
      }) => {
        formattedDimensions?: string;
        volume?: number;
      };
    }
  ): SupplierProductResponseDto {
    const baseDto = this.toBaseDto(product);
    
    // Map images với computed properties nếu có service
    if (computedPropsService) {
      baseDto.images = product.images.map(img => 
        this.mapImageToDto(img, computedPropsService.computeImageProperties(img))
      );

      baseDto.reviews = product.reviews.map(review => 
        this.mapReviewToDto(review, computedPropsService.computeReviewProperties(review))
      );

      if (product.dimensions) {
        baseDto.dimensions = this.mapDimensionsToDto(
          product.dimensions,
          computedPropsService.computeDimensionsProperties(product.dimensions)
        );
      }
    } else {
      // Fallback: map không có computed properties
      baseDto.images = product.images.map(img => this.mapImageToDto(img, undefined));
      baseDto.reviews = product.reviews.map(review => this.mapReviewToDto(review, undefined));
    }
    
    // Merge computed properties nếu có
    if (computedProps) {
      return {
        ...baseDto,
        ...computedProps,
      } as SupplierProductResponseDto;
    }
    
    // Return với default values cho computed properties (không nên xảy ra nếu dùng toResponseDtoWithComputed)
    return {
      ...baseDto,
      isApproved: false,
      isPendingApproval: false,
      isRejected: false,
      isActiveAndApproved: false,
      averageRating: 0,
      reviewCount: 0,
      hasImages: false,
      formattedListingPrice: '',
      formattedRetailPrice: '',
      profitAmount: 0,
    } as SupplierProductResponseDto;
  }

  /**
   * Pure mapping - chỉ transform structure, không có computed properties
   */
  private static toBaseDto(product: SupplierProductOrm): Partial<SupplierProductResponseDto> & {
    id: string;
    supplierId: string;
    name: string;
    description: string;
    sku: string;
    categoryName: string;
    price: ProductPriceResponseDto;
    inventory: ProductInventoryResponseDto;
    specifications: ProductSpecificationsResponseDto;
    type: ProductType;
    status: ProductStatus;
    approvalStatus: ApprovalStatus;
    images: ProductImageResponseDto[];
    reviews: ProductReviewResponseDto[];
    tags: string[];
    isActive: boolean;
    isFeatured: boolean;
    isSuspend: boolean;
    createdAt: string;
    updatedAt: string;
  } {
    return {
      id: product.id,
      supplierId: product.supplierId,
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription,
      sku: product.sku,
      categoryName: product.categoryName,
      categoryId: product.categoryId,
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
      images: product.images.map(img => this.mapImageToDto(img, undefined)),
      reviews: product.reviews.map(review => this.mapReviewToDto(review, undefined)),
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

  /**
   * Map Image Entity to DTO (pure mapping)
   * Computed properties (aspectRatio, isLandscape, etc.) được tính bởi ComputedPropertiesService
   */
  static mapImageToDto(
    image: ProductImageOrm,
    computedProps?: {
      aspectRatio?: number;
      isLandscape: boolean;
      isPortrait: boolean;
      isSquare: boolean;
      formattedFileSize?: string;
    }
  ): ProductImageResponseDto {
    const baseDto: Partial<ProductImageResponseDto> & {
      id: string;
      productId: string;
      url: string;
      sortOrder: number;
      isPrimary: boolean;
      isLandscape: boolean;
      isPortrait: boolean;
      isSquare: boolean;
    } = {
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
      isLandscape: false,
      isPortrait: false,
      isSquare: false,
    };

    // Merge computed properties nếu có
    if (computedProps) {
      return {
        ...baseDto,
        ...computedProps,
      };
    }

    return baseDto;
  }

  /**
   * Map Review Entity to DTO (pure mapping)
   * Computed properties (isHighRating, isRecent, etc.) được tính bởi ComputedPropertiesService
   */
  static mapReviewToDto(
    review: ProductReviewOrm,
    computedProps?: {
      isHighRating: boolean;
      isLowRating: boolean;
      isMediumRating: boolean;
      hasComment: boolean;
      hasTitle: boolean;
      isRecent: boolean;
    }
  ): ProductReviewResponseDto {
    const baseDto: Partial<ProductReviewResponseDto> & {
      id: string;
      productId: string;
      customerId: string;
      rating: number;
      isVerified: boolean;
      isPublished: boolean;
      helpfulCount: number;
      createdAt: string;
      updatedAt: string;
      isHighRating: boolean;
      isLowRating: boolean;
      isMediumRating: boolean;
      hasComment: boolean;
      hasTitle: boolean;
      isRecent: boolean;
    } = {
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
      isHighRating: false,
      isLowRating: false,
      isMediumRating: false,
      hasComment: false,
      hasTitle: false,
      isRecent: false,
    };

    // Merge computed properties nếu có
    if (computedProps) {
      return {
        ...baseDto,
        ...computedProps,
      } as ProductReviewResponseDto;
    }

    return baseDto as ProductReviewResponseDto;
  }

  /**
   * Map Dimensions to DTO (pure mapping)
   * Computed properties (formattedDimensions, volume) được tính bởi ComputedPropertiesService
   */
  static mapDimensionsToDto(
    dimensions: {
      length?: number;
      width?: number;
      height?: number;
      unit?: string;
    },
    computedProps?: {
      formattedDimensions?: string;
      volume?: number;
    }
  ): ProductDimensionsResponseDto {
    const baseDto = {
      length: dimensions.length,
      width: dimensions.width,
      height: dimensions.height,
      unit: dimensions.unit,
    };

    // Merge computed properties nếu có
    if (computedProps) {
      return {
        ...baseDto,
        ...computedProps,
      };
    }

    return baseDto;
  }

  /**
   * Map Weight to DTO (pure mapping)
   * Computed properties (formattedWeight) được tính bởi ComputedPropertiesService
   */
  static mapWeightToDto(
    weight: { value: number; unit: string },
    computedProps?: {
      formattedWeight: string;
    }
  ): ProductWeightResponseDto {
    const baseDto: Partial<ProductWeightResponseDto> & {
      value: number;
      unit: string;
      formattedWeight: string;
    } = {
      value: weight.value,
      unit: weight.unit,
      formattedWeight: `${weight.value}${weight.unit}`, // Default fallback
    };

    // Merge computed properties nếu có
    if (computedProps) {
      return {
        ...baseDto,
        ...computedProps,
      } as ProductWeightResponseDto;
    }

    return baseDto as ProductWeightResponseDto;
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
