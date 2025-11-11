import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import type { ISupplierProductRepository } from '../../domain/repositories/supplier-product.repository.interface';
import { CreateSupplierProductRequest } from '../dto/create-supplier-product-request.dto';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProduct } from '../../domain/aggregates/supplier-product.aggregate';
import { ProductPrice } from '../../domain/value-objects/product-price.vo';
import { ProductInventory } from '../../domain/value-objects/product-inventory.vo';
import { ProductSpecifications } from '../../domain/value-objects/product-specifications.vo';
import { ProductImage } from '../../domain/entities/product-image.entity';
import { ProductType } from '../../domain/enums/product-type.enum';
import { ProductStatus } from '../../domain/enums/product-status.enum';
import { ApprovalStatus } from '../../domain/enums/approval-status.enum';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';

@Injectable()
export class CreateSupplierProductUseCase {
  constructor(
    @Inject('SUPPLIER_PRODUCT_REPOSITORY')
    private readonly supplierProductRepository: ISupplierProductRepository
  ) {}

  async execute(request: CreateSupplierProductRequest): Promise<SupplierProductResponseDto> {
    try {
      // 1. Validate input
      await this.validateRequest(request);

      // 2. Check if SKU already exists
      const existingProduct = await this.supplierProductRepository.findBySku(request.sku);
      if (existingProduct) {
        throw new Error('Product with this SKU already exists');
      }

      // 3. Category simplified: just a string name
      const categoryName = request.categoryName;

      // 4. Create value objects
      const price = new ProductPrice(
        request.price.listingPrice,
        request.price.retailPrice,
        request.price.currency
      );

      const inventory = new ProductInventory(request.inventory.quantity);

      const specifications = request.specifications 
        ? new ProductSpecifications(
            new Map(Object.entries(request.specifications.specifications || {})),
            request.specifications.materials,
            request.specifications.colors,
            request.specifications.sizes
          )
        : new ProductSpecifications(new Map());

      // 5. Create images
      const images = (request.images || []).map((img, index) => 
        new ProductImage(
          this.generateImageId(),
          '', // Will be set after product creation
          img.url,
          img.altText,
          img.sortOrder,
          img.isPrimary,
          img.width,
          img.height,
          img.fileSize,
          img.mimeType
        )
      );

      // 6. Create product aggregate
      const product = new SupplierProduct(
        this.generateProductId(),
        request.supplierId,
        request.name,
        request.description,
        request.shortDescription,
        request.sku,
        categoryName,
        price,
        inventory,
        specifications,
        request.type,
        ProductStatus.DRAFT,
        ApprovalStatus.PENDING,
        images,
        [],
        request.tags || [],
        request.isActive,
        request.isFeatured,
        false, // isSuspend = false by default
        request.weight,
        request.dimensions ? {
          length: request.dimensions.length,
          width: request.dimensions.width,
          height: request.dimensions.height,
          unit: request.dimensions.unit
        } : undefined,
        request.seoData ? {
          metaTitle: request.seoData.metaTitle,
          metaDescription: request.seoData.metaDescription,
          keywords: request.seoData.keywords
        } : undefined
      );

      // 7. Save product
      const savedProduct = await this.supplierProductRepository.save(product);

      // 8. Update image product IDs
      const updatedImages = savedProduct.images.map(img => 
        new ProductImage(
          img.id,
          savedProduct.id,
          img.url,
          img.altText,
          img.sortOrder,
          img.isPrimary,
          img.width,
          img.height,
          img.fileSize,
          img.mimeType
        )
      );

      const finalProduct = new SupplierProduct(
        savedProduct.id,
        savedProduct.supplierId,
        savedProduct.name,
        savedProduct.description,
        savedProduct.shortDescription,
        savedProduct.sku,
        savedProduct.categoryName,
        savedProduct.price,
        savedProduct.inventory,
        savedProduct.specifications,
        savedProduct.type,
        savedProduct.status,
        savedProduct.approvalStatus,
        updatedImages,
        savedProduct.reviews,
        savedProduct.tags,
        savedProduct.isActive,
        savedProduct.isFeatured,
        savedProduct.isSuspend,
        savedProduct.weight,
        savedProduct.dimensions,
        savedProduct.seoData,
        savedProduct.createdAt,
        savedProduct.updatedAt,
        savedProduct.approvedAt,
        savedProduct.approvedBy,
        savedProduct.rejectionReason
      );

      const updatedProduct = await this.supplierProductRepository.update(finalProduct);

      // 9. Return response
      return SupplierProductMapper.toResponseDto(updatedProduct);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to create supplier product: ${errorMessage}`);
    }
  }

  private async validateRequest(request: CreateSupplierProductRequest): Promise<void> {
    if (!request.name || request.name.trim().length === 0) {
      throw new Error('Product name is required');
    }
    if (!request.description || request.description.trim().length === 0) {
      throw new Error('Product description is required');
    }
    if (!request.sku || request.sku.trim().length === 0) {
      throw new Error('Product SKU is required');
    }
    if (!request.supplierId || request.supplierId.trim().length === 0) {
      throw new Error('Supplier ID is required');
    }
    if (!request.categoryName || request.categoryName.trim().length === 0) {
      throw new Error('Category name is required');
    }
    if (request.price.listingPrice < 0) {
      throw new Error('Listing price cannot be negative');
    }
    if (request.price.retailPrice < 0) {
      throw new Error('Retail price cannot be negative');
    }
    if (request.price.retailPrice < request.price.listingPrice) {
      throw new Error('Retail price cannot be less than listing price');
    }
    if (request.inventory.quantity < 0) {
      throw new Error('Inventory quantity cannot be negative');
    }
  }

  private generateProductId(): string {
    return uuidv4();
  }

  private generateImageId(): string {
    return uuidv4();
  }
}
