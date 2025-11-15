import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { UpdateSupplierProductRequest, UpdateProductPriceDto } from '../dto/update-supplier-product-request.dto';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';
import { ProductPrice } from '../value-objects/product-price.vo';
import { ProductInventory } from '../value-objects/product-inventory.vo';
import { ProductSpecifications } from '../value-objects/product-specifications.vo';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';
import { ProductType } from '../enums/product-type.enum';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { SupplierProductFactoryService } from './supplier-product-factory.service';


@Injectable()
export class UpdateSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly supplierProductFactoryService: SupplierProductFactoryService
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

      // ✅ Create Value Object and use business methods for updates
      const currentPrice = new ProductPrice(
        existing.price.listingPrice,
        existing.price.retailPrice,
        existing.price.currency
      );

      const newPrice = request.price
        ? (request.price.listingPrice !== undefined 
            ? currentPrice.updateListingPrice(request.price.listingPrice)
            : request.price.retailPrice !== undefined
            ? currentPrice.updateRetailPrice(request.price.retailPrice)
            : currentPrice)
        : currentPrice;

      // ✅ Create Value Object and use business methods for updates
      const currentInventory = new ProductInventory(existing.inventory.quantity);
      
      const newInventory = request.inventory?.quantity !== undefined
        ? currentInventory.updateQuantity(request.inventory.quantity)
        : currentInventory;

      // Merge specifications if provided
      const newSpecifications = request.specifications
        ? new ProductSpecifications(
            new Map(Object.entries(request.specifications.specifications || existing.specifications.specifications || {})),
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

      // ✅ Keep Value Objects for business logic, convert only when saving
      const updated = new SupplierProductOrm();
      updated.id = existing.id;
      updated.supplierId = request.supplierId ?? existing.supplierId;
      updated.name = request.name ?? existing.name;
      updated.description = request.description ?? existing.description;
      updated.shortDescription = request.shortDescription ?? existing.shortDescription;
      updated.sku = request.sku ?? existing.sku;
      updated.categoryName = request.categoryName ?? existing.categoryName;
      
      // ✅ Use Value Object business logic when converting to JSONB
      updated.price = {
        listingPrice: newPrice.listingPrice,
        retailPrice: newPrice.retailPrice,
        currency: newPrice.currency
      };
      
      updated.inventory = {
        quantity: newInventory.quantity
      };
      
      // ✅ Use Value Object toJSON method if it's a Value Object
      updated.specifications = newSpecifications instanceof ProductSpecifications 
        ? newSpecifications.toJSON()
        : newSpecifications;
      
      updated.type = (request.type ?? existing.type) as ProductType;
      updated.status = existing.status;
      updated.approvalStatus = existing.approvalStatus;
      updated.images = existing.images;
      updated.reviews = existing.reviews;
      updated.tags = request.tags ?? existing.tags;
      updated.isActive = request.isActive ?? existing.isActive;
      updated.isFeatured = request.isFeatured ?? existing.isFeatured;
      updated.isSuspend = existing.isSuspend;
      updated.weight = request.weight ?? existing.weight;
      updated.dimensions = nextDimensions && nextDimensions.length !== undefined && nextDimensions.width !== undefined && nextDimensions.height !== undefined && nextDimensions.unit
          ? {
              length: nextDimensions.length,
              width: nextDimensions.width,
              height: nextDimensions.height,
              unit: nextDimensions.unit
            }
        : undefined;
      updated.seoData = nextSeoData;

      const saved = await this.supplierProductRepository.updateProduct(updated);
      return { success: true, message: 'Updated', data: SupplierProductMapper.toResponseDto(saved) };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, message: errorMessage || 'Failed to update product' };
    }
  }
}



