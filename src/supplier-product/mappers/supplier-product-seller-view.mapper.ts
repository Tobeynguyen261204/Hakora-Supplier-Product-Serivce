import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { SupplierProductSellerViewListItemDto, SupplierProductSellerViewDetailDto } from '../dto/supplier-product-seller-view.dto';
import { ProductPriceResponseDto } from '../dto/product-price.dto';
import { SupplierProductComputedPropertiesService } from '../services/supplier-product-computed-properties.service';

/**
 * ✅ SELLER VIEW MAPPER - Map Entity to Seller View DTO
 * 
 * Responsibilities:
 * - Transform Entity → Seller View DTO (simplified view for sellers)
 * - Reuse computed properties service for business logic
 * - Map price directly from plain object (product.price is plain object, not ProductPrice value object)
 * - Handle date formatting via ComputedPropertiesService
 * - NO business logic calculation (delegate to ComputedPropertiesService)
 */
export class SupplierProductSellerViewMapper {
  /**
   * Map Entity to Seller View Detail DTO
   * 
   * @param product - Entity từ database
   * @param computedPropsService - Service để tính computed properties
   */
  static toDetailDto(
    product: SupplierProductOrm,
    computedPropsService: SupplierProductComputedPropertiesService
  ): SupplierProductSellerViewDetailDto {
    // 1. Map price với computed properties
    const price = this.mapPrice(product, computedPropsService);
    
    // 2. Map images (simplified)
    const images = product.images.map(img => ({
      id: img.id,
      url: img.url,
      altText: img.altText,
      isPrimary: img.isPrimary,
      width: img.width,
      height: img.height,
    }));

    // 3. Map reviews (simplified)
    const reviews = product.reviews.map(review => ({
      id: review.id,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      isVerified: review.isVerified,
      createdAt: review.createdAt?.toISOString(),
    }));

    // 4. Compute review summary từ computed properties service
    const averageRating = computedPropsService.computeAllProperties(product).averageRating;
    const reviewCount = computedPropsService.computeAllProperties(product).reviewCount;

    // 5. Get primary image URL
    const primaryImageEntity = computedPropsService.getPrimaryImageEntity(product);
    const imageUrl = primaryImageEntity?.url || (product.images?.[0]?.url) || null;

    // 6. Map specifications
    const specifications = product.specifications ? {
      specifications: product.specifications.specifications || {},
      materials: product.specifications.materials,
      colors: product.specifications.colors,
      sizes: product.specifications.sizes,
    } : undefined;

    return {
      id: product.id,
      supplierId: product.supplierId,
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription,
      sku: product.sku,
      price,
      categoryName: product.categoryName || null,
      categoryId: product.categoryId || null, // ✅ THÊM: categoryId
      imageUrl,
      isFeatured: product.isFeatured === true,
      images,
      reviews,
      reviewSummary: {
        count: reviewCount,
        averageRating: averageRating,
      },
      inventory: product.inventory?.quantity !== undefined 
        ? { quantity: product.inventory.quantity } 
        : undefined,
      specifications,
      dimensions: product.dimensions,
      type: product.type,
      tags: product.tags,
      weight: product.weight,
      createdAt: computedPropsService.formatDate(product.createdAt),
      updatedAt: computedPropsService.formatDate(product.updatedAt),
    };
  }

  /**
   * Map Entity to Seller View List Item DTO
   * 
   * @param product - Entity từ database
   * @param computedPropsService - Service để tính computed properties
   */
  static toListItemDto(
    product: SupplierProductOrm,
    computedPropsService: SupplierProductComputedPropertiesService
  ): SupplierProductSellerViewListItemDto {
    // 1. Map price với computed properties
    const price = this.mapPrice(product, computedPropsService);

    // 2. Get primary image URL
    const primaryImageEntity = computedPropsService.getPrimaryImageEntity(product);
    const imageUrl = primaryImageEntity?.url || (product.images?.[0]?.url) || null;

    return {
      id: product.id,
      name: product.name,
      shortDescription: product.shortDescription,
      price,
      categoryName: product.categoryName || null,
      categoryId: product.categoryId || null, // ✅ THÊM: categoryId
      imageUrl,
      isFeatured: product.isFeatured === true,
      createdAt: computedPropsService.formatDate(product.createdAt),
      updatedAt: computedPropsService.formatDate(product.updatedAt),
    };
  }

  /**
   * Map price với computed properties (reuse ComputedPropertiesService)
   * Map trực tiếp từ plain object vì product.price là plain object, không phải ProductPrice value object
   */
  private static mapPrice(
    product: SupplierProductOrm,
    computedPropsService: SupplierProductComputedPropertiesService
  ): ProductPriceResponseDto {
    const profitAmount = computedPropsService.computeAllProperties(product).profitAmount;
    
    return {
      listingPrice: product.price?.listingPrice || 0,
      retailPrice: product.price?.retailPrice || 0,
      currency: product.price?.currency || 'VND',
      profitAmount,
    };
  }

}

