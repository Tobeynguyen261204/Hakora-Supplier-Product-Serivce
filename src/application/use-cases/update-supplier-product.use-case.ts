import { Injectable, Inject } from '@nestjs/common';
import type { ISupplierProductRepository } from '../../domain/repositories/supplier-product.repository.interface';
import { UpdateSupplierProductRequest, UpdateProductPriceDto } from '../dto/update-supplier-product-request.dto';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';
import { SupplierProduct } from '../../domain/aggregates/supplier-product.aggregate';
import { ProductPrice } from '../../domain/value-objects/product-price.vo';
import { ProductInventory } from '../../domain/value-objects/product-inventory.vo';
import { ProductSpecifications } from '../../domain/value-objects/product-specifications.vo';
import { ProductStatus } from '../../domain/enums/product-status.enum';
import { ApprovalStatus } from '../../domain/enums/approval-status.enum';
import { ProductType } from '../../domain/enums/product-type.enum';

@Injectable()
export class UpdateSupplierProductUseCase {
  constructor(
    @Inject('SUPPLIER_PRODUCT_REPOSITORY')
    private readonly supplierProductRepository: ISupplierProductRepository
  ) {}

  async execute(request: UpdateSupplierProductRequest): Promise<{ success: boolean; message: string; data?: SupplierProductResponseDto }> {
    try {
      if (!request || !request.id) {
        return { success: false, message: 'id is required' };
      }
      const existing = await this.supplierProductRepository.findById(request.id);
      if (!existing) {
        return { success: false, message: 'Product not found' };
      }

      const newPrice = request.price
        ? new ProductPrice(
            request.price.listingPrice ?? existing.price.listingPrice,
            request.price.retailPrice ?? existing.price.retailPrice,
            request.price.currency ?? existing.price.currency
          )
        : existing.price;

      const newInventory = request.inventory
        ? new ProductInventory(request.inventory.quantity ?? existing.inventory.quantity)
        : existing.inventory;

      // Merge specifications if provided
      const newSpecifications = request.specifications
        ? new ProductSpecifications(
            new Map(Object.entries(request.specifications.specifications || Object.fromEntries(existing.specifications.specifications))),
            request.specifications.materials ?? existing.specifications.materials,
            request.specifications.colors ?? existing.specifications.colors,
            request.specifications.sizes ?? existing.specifications.sizes
          )
        : existing.specifications;

      // Only override when non-empty objects are provided
      const nextDimensions = (() => {
        if (request.dimensions && typeof request.dimensions === 'object') {
          if (Object.keys(request.dimensions).length > 0) return request.dimensions;
        }
        return existing.dimensions;
      })();

      const nextSeoData = (() => {
        if (request.seoData && typeof request.seoData === 'object') {
          if (Object.keys(request.seoData).length > 0) return request.seoData;
        }
        return existing.seoData;
      })();

      const updated = new SupplierProduct(
        existing.id,
        request.supplierId ?? existing.supplierId,
        request.name ?? existing.name,
        request.description ?? existing.description,
        request.shortDescription ?? existing.shortDescription,
        request.sku ?? existing.sku,
        request.categoryName ?? existing.categoryName,
        newPrice,
        newInventory,
        newSpecifications,
        (request.type ?? existing.type) as ProductType,
        existing.status,
        existing.approvalStatus,
        existing.images,
        existing.reviews,
        request.tags ?? existing.tags,
        request.isActive ?? existing.isActive,
        request.isFeatured ?? existing.isFeatured,
        existing.isSuspend,
        request.weight ?? existing.weight,
        nextDimensions && nextDimensions.length !== undefined && nextDimensions.width !== undefined && nextDimensions.height !== undefined && nextDimensions.unit
          ? {
              length: nextDimensions.length,
              width: nextDimensions.width,
              height: nextDimensions.height,
              unit: nextDimensions.unit
            }
          : undefined,
        nextSeoData,
        existing.createdAt,
        new Date(),
        existing.approvedAt,
        existing.approvedBy,
        existing.rejectionReason
      );

      const saved = await this.supplierProductRepository.update(updated);
      return { success: true, message: 'Updated', data: SupplierProductMapper.toResponseDto(saved) };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, message: errorMessage || 'Failed to update product' };
    }
  }
}


