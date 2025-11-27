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
import { SupplierProductComputedPropertiesService } from './supplier-product-computed-properties.service';
import { CategoryValidationService } from './category-validation.service';


@Injectable()
export class UpdateSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly supplierProductFactoryService: SupplierProductFactoryService,
    private readonly computedPropertiesService: SupplierProductComputedPropertiesService,
    private readonly categoryValidationService: CategoryValidationService
  ) {}

  async execute(request: UpdateSupplierProductRequest): Promise<{ success: boolean; message: string; data?: SupplierProductResponseDto }> {
    try {
      console.log('='.repeat(80));
      console.log('[UpdateSupplierProductService] ========== EXECUTE UPDATE ==========');
      console.log('[UpdateSupplierProductService] Request received:', {
        id: request?.id,
        name: request?.name,
        description: request?.description?.substring(0, 50),
        price: request?.price,
        supplierId: request?.supplierId,
        keys: request ? Object.keys(request) : [],
      });
      console.log('[UpdateSupplierProductService] Full request (JSON):', JSON.stringify(request, null, 2));
      
      if (!request || !request.id) {
        return { success: false, message: 'id is required' };
      }
      const existing = await this.supplierProductRepository.findById(request.id);
      if (!existing) {
        return { success: false, message: 'Product not found' };
      }
      
      console.log('[UpdateSupplierProductService] Existing product:', {
        id: existing.id,
        name: existing.name,
        description: existing.description?.substring(0, 50),
        price: existing.price,
        supplierId: existing.supplierId,
      });

      // ✅ Validate supplier scope: only supplier can update their own products
      if (request.supplierId && existing.supplierId !== request.supplierId) {
        return { success: false, message: 'You do not have permission to update this product' };
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
      
      // CRITICAL: Chỉ update các field có giá trị hợp lệ (không phải undefined, null, hoặc empty string corrupt)
      // Sử dụng nullish coalescing nhưng validate thêm
      updated.supplierId = request.supplierId ?? existing.supplierId;
      
      // Validate name - không update nếu là empty string hoặc corrupt
      updated.name = (request.name && typeof request.name === 'string' && request.name.trim().length > 0)
        ? request.name.trim()
        : existing.name;
      
      // Validate description - không update nếu là empty string hoặc corrupt
      updated.description = (request.description && typeof request.description === 'string' && request.description.trim().length > 0)
        ? request.description.trim()
        : existing.description;
      
      // Validate shortDescription
      updated.shortDescription = (request.shortDescription && typeof request.shortDescription === 'string' && request.shortDescription.trim().length > 0)
        ? request.shortDescription.trim()
        : existing.shortDescription;
      
      // Validate sku
      updated.sku = (request.sku && typeof request.sku === 'string' && request.sku.trim().length > 0)
        ? request.sku.trim()
        : existing.sku;
      
      // ✅ Validate categoryName if provided - check with CategoryService
      if (request.categoryName && typeof request.categoryName === 'string' && request.categoryName.trim().length > 0) {
        try {
          const categoryInfo = await this.categoryValidationService.getCategoryInfo(
            request.categoryId || request.categoryName.trim()
          );
          updated.categoryName = categoryInfo.name;
          updated.categoryId = categoryInfo.id;
        } catch (error) {
          // If category validation fails, keep existing category
          console.warn(`[UpdateSupplierProductService] Category validation failed, keeping existing category:`, error);
          updated.categoryName = existing.categoryName;
          updated.categoryId = existing.categoryId;
        }
      } else {
        updated.categoryName = existing.categoryName;
        updated.categoryId = existing.categoryId;
      }
      
      console.log('[UpdateSupplierProductService] After field validation:', {
        name: updated.name,
        description: updated.description?.substring(0, 50),
        sku: updated.sku,
        categoryName: updated.categoryName,
      });
      
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
      // Validate tags - chỉ update nếu là array hợp lệ
      updated.tags = (request.tags && Array.isArray(request.tags) && request.tags.length > 0)
        ? request.tags.filter((tag: any) => typeof tag === 'string' && tag.trim().length > 0)
        : existing.tags;
      
      // Validate boolean fields - chỉ update nếu không phải undefined
      updated.isActive = request.isActive !== undefined ? Boolean(request.isActive) : existing.isActive;
      updated.isFeatured = request.isFeatured !== undefined ? Boolean(request.isFeatured) : existing.isFeatured;
      updated.isSuspend = existing.isSuspend;
      
      // Validate weight - chỉ update nếu là number hợp lệ
      updated.weight = (request.weight !== undefined && typeof request.weight === 'number' && !isNaN(request.weight) && request.weight >= 0)
        ? request.weight
        : existing.weight;
      
      console.log('[UpdateSupplierProductService] Final updated object:', {
        id: updated.id,
        name: updated.name,
        price: updated.price,
        supplierId: updated.supplierId,
      });
      console.log('='.repeat(80));
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
      
      // Map to DTO với computed properties (mapper tự động orchestrate)
      const dto = SupplierProductMapper.toResponseDtoWithComputed(saved, this.computedPropertiesService);

      return { success: true, message: 'Updated', data: dto };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, message: errorMessage || 'Failed to update product' };
    }
  }
}



