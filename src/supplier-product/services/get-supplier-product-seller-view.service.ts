import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';
import type { SupplierProductSellerViewDetailDto } from '../dto/supplier-product-seller-view.dto';
import { ProductPriceResponseDto } from '../dto/product-price.dto';

@Injectable()
export class GetSupplierProductSellerViewService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository
  ) {}

  private formatDate(date: Date | string | undefined): string | undefined {
    if (!date) return undefined;
    if (date instanceof Date) return date.toISOString();
    try {
      return new Date(date).toISOString();
    } catch {
      return undefined;
    }
  }

  async execute(id: string): Promise<{ success: boolean; message: string; data?: SupplierProductSellerViewDetailDto }> {
    const product = await this.supplierProductRepository.findById(id);
    if (!product) return { success: false, message: 'Product not found' };

    // Check visibility: APPROVED + PUBLISHED + isActive = true + isSuspend = false
    const visible = product.approvalStatus === ApprovalStatus.APPROVED && 
                   product.status === ProductStatus.PUBLISHED &&
                   product.isActive &&
                   !product.isSuspend;
    
    if (!visible) return { success: false, message: 'Product not available for sellers' };

    const categoryName = product.categoryName || null;
    const price: ProductPriceResponseDto = {
      listingPrice: product.price?.listingPrice || 0,
      retailPrice: product.price?.retailPrice || 0,
      currency: product.price?.currency || 'VND',
      profitAmount: product.price?.profitAmount || 0
    };
    const quantity = product.inventory?.quantity;
    const images = (product.images || []).map(i => ({ id: i.id, url: i.url, altText: i.altText, isPrimary: i.isPrimary, width: i.width, height: i.height }));
    const reviews = (product.reviews || []).map(r => ({ id: r.id, rating: r.rating, title: r.title, comment: r.comment, isVerified: r.isVerified, createdAt: r.createdAt?.toISOString?.() }));
    const count = reviews.length;
    const avg = count > 0 ? reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0) / count : 0;

    return {
      success: true,
      message: 'OK',
      data: {
        id: product.id,
        supplierId: product.supplierId,
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription,
        sku: product.sku,
        price,
        categoryName,
        imageUrl: images.find(i => i.isPrimary)?.url || images[0]?.url || null,
        isFeatured: product.isFeatured === true,
        images,
        reviews,
        reviewSummary: { count, averageRating: avg },
        inventory: quantity !== undefined ? { quantity } : undefined,
        specifications: product.specifications ? {
          specifications: Object.fromEntries(product.specifications.specifications || new Map()),
          materials: product.specifications.materials,
          colors: product.specifications.colors,
          sizes: product.specifications.sizes
        } : undefined,
        dimensions: product.dimensions,
        type: product.type,
        tags: product.tags,
        weight: product.weight,
        createdAt: this.formatDate(product.createdAt),
        updatedAt: this.formatDate(product.updatedAt)
      }
    };
  }
}



