import { Injectable } from '@nestjs/common';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { ProductImageOrm } from '../entities/product-image.entity';
import { ProductReviewOrm } from '../entities/product-review.entity';
import { SupplierProductBusinessService } from './supplier-product-business.service';

/**
 * SupplierProductComputedPropertiesService
 * 
 * Trách nhiệm: Orchestration và Presentation formatting cho computed properties
 * - Orchestration: Tập hợp computed properties từ BusinessService
 * - Presentation formatting: Format dữ liệu cho hiển thị (prices, dates, etc.)
 * 
 * @note KHÔNG tự implement business logic hay computed values
 * Tất cả business logic và computed values đều delegate cho BusinessService
 */
@Injectable()
export class SupplierProductComputedPropertiesService {
  constructor(
    private readonly businessService: SupplierProductBusinessService
  ) {}

  /**
   * Tính toán tất cả computed properties cho product
   * Tất cả business logic và computed values đều delegate cho BusinessService
   */
  computeAllProperties(product: SupplierProductOrm): {
    isApproved: boolean;
    isPendingApproval: boolean;
    isRejected: boolean;
    isActiveAndApproved: boolean;
    averageRating: number;
    reviewCount: number;
    hasImages: boolean;
    formattedListingPrice: string;
    formattedRetailPrice: string;
    profitAmount: number;
  } {
    return {
      // Business rule checks - delegate cho BusinessService
      isApproved: this.businessService.isApproved(product),
      isPendingApproval: this.businessService.isPendingApproval(product),
      isRejected: this.businessService.isRejected(product),
      isActiveAndApproved: this.businessService.isActiveAndApproved(product),
      
      // Computed values - delegate cho BusinessService
      averageRating: this.businessService.calculateAverageRating(product),
      reviewCount: product.reviewCount || (product.reviews?.length || 0),
      profitAmount: this.businessService.calculateProfitAmount(product),
      
      // Derived properties
      hasImages: product.hasImages || (product.images?.length > 0 || false),
      
      // Presentation formatting - đây là trách nhiệm của service này
      formattedListingPrice: this.formatPrice(product.price.listingPrice, product.price.currency),
      formattedRetailPrice: this.formatPrice(product.price.retailPrice, product.price.currency),
    };
  }

  /**
   * Lấy primary image entity hoặc image đầu tiên
   * Delegate cho BusinessService để tránh duplicate logic
   */
  getPrimaryImageEntity(product: SupplierProductOrm): ProductImageOrm | undefined {
    return this.businessService.getPrimaryImage(product);
  }

  /**
   * Format price với currency
   * Presentation formatting - trách nhiệm của service này
   */
  formatPrice(amount: number, currency: string): string {
    return `${amount.toLocaleString()} ${currency}`;
  }

  /**
   * Format date cho presentation (ISO string format)
   * Presentation formatting - trách nhiệm của service này
   */
  formatDate(date: Date | string | undefined): string | undefined {
    if (!date) return undefined;
    if (date instanceof Date) return date.toISOString();
    try {
      return new Date(date).toISOString();
    } catch {
      return undefined;
    }
  }

  /**
   * Tính toán computed properties cho review
   */
  computeReviewProperties(review: ProductReviewOrm): {
    isHighRating: boolean;
    isLowRating: boolean;
    isMediumRating: boolean;
    hasComment: boolean;
    hasTitle: boolean;
    isRecent: boolean;
  } {
    return {
      isHighRating: review.rating >= 4,
      isLowRating: review.rating <= 2,
      isMediumRating: review.rating === 3,
      hasComment: !!review.comment,
      hasTitle: !!review.title,
      isRecent: this.isRecentReview(review.createdAt),
    };
  }

  /**
   * Kiểm tra review có phải recent (trong 30 ngày)
   */
  private isRecentReview(createdAt: Date | undefined): boolean {
    if (!createdAt) {
      return false;
    }
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    return (Date.now() - createdAt.getTime()) < thirtyDaysInMs;
  }

  /**
   * Tính toán computed properties cho image
   */
  computeImageProperties(image: ProductImageOrm): {
    aspectRatio?: number;
    isLandscape: boolean;
    isPortrait: boolean;
    isSquare: boolean;
    formattedFileSize?: string;
  } {
    const aspectRatio = image.width && image.height 
      ? image.width / image.height 
      : undefined;

    return {
      aspectRatio,
      isLandscape: aspectRatio ? aspectRatio > 1 : false,
      isPortrait: aspectRatio ? aspectRatio < 1 : false,
      isSquare: aspectRatio ? Math.abs(aspectRatio - 1) < 0.01 : false,
      formattedFileSize: image.fileSize 
        ? `${(image.fileSize / 1024).toFixed(2)} KB` 
        : undefined,
    };
  }

  /**
   * Tính toán computed properties cho dimensions
   */
  computeDimensionsProperties(dimensions: {
    length?: number;
    width?: number;
    height?: number;
    unit?: string;
  }): {
    formattedDimensions?: string;
    volume?: number;
  } {
    if (!dimensions.length || !dimensions.width || !dimensions.height) {
      return {
        formattedDimensions: undefined,
        volume: undefined,
      };
    }

    return {
      formattedDimensions: `${dimensions.length}${dimensions.unit} x ${dimensions.width}${dimensions.unit} x ${dimensions.height}${dimensions.unit}`,
      volume: dimensions.length * dimensions.width * dimensions.height,
    };
  }

  /**
   * Tính toán computed properties cho weight
   */
  computeWeightProperties(weight: { value: number; unit: string }): {
    formattedWeight: string;
  } {
    return {
      formattedWeight: `${weight.value}${weight.unit}`,
    };
  }

}

