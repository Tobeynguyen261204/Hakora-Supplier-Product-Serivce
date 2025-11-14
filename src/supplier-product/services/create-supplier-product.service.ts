import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { CreateSupplierProductRequest } from '../dto/create-supplier-product-request.dto';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { ProductPrice } from '../value-objects/product-price.vo';
import { ProductInventory } from '../value-objects/product-inventory.vo';
import { ProductSpecifications } from '../value-objects/product-specifications.vo';
import { ProductImageOrm } from '../entities/product-image.entity';
import { ProductType } from '../enums/product-type.enum';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';

@Injectable()
export class CreateSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository
  ) {}

  async execute(request: CreateSupplierProductRequest): Promise<SupplierProductResponseDto> {
    try {
      // 1. Validate input
      await this.validateRequest(request);

      // 2. Check if SKU already exists
      const existingProduct = await this.supplierProductRepository.findBySku(request.sku);
      if (existingProduct) {
        throw new ConflictException('Product with this SKU already exists');
      }

      // 3. Category simplified: just a string name
      const categoryName = request.categoryName;

      // 4. Pre-generate IDs
      const productId = this.generateProductId();

      // 5. Create value objects
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

      // 6. Create images tied to the product ID
      const images = (request.images || []).map((img, index) => 
        new ProductImageOrm(
          this.generateImageId(),
          productId,
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

      // 7. Create product aggregate
      const product = new SupplierProductOrm(
        productId,
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

      // 8. Save product
      const savedProduct = await this.supplierProductRepository.save(product);

      // 9. Update image product IDs
      const updatedImages = savedProduct.images.map(img => 
        new ProductImageOrm(
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

      const finalProduct = new SupplierProductOrm(
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

      // 10. Return response
      return SupplierProductMapper.toResponseDto(updatedProduct);
    } catch (error) {
      // Re-throw NestJS exceptions
      if (error instanceof ConflictException || error instanceof BadRequestException) {
        throw error;
      }
      // Wrap other errors
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new BadRequestException(`Failed to create supplier product: ${errorMessage}`);
    }
  }

  private async validateRequest(request: CreateSupplierProductRequest): Promise<void> {
    if (!request.name || request.name.trim().length === 0) {
      throw new BadRequestException('Product name is required');
    }
    if (!request.description || request.description.trim().length === 0) {
      throw new BadRequestException('Product description is required');
    }
    if (!request.sku || request.sku.trim().length === 0) {
      throw new BadRequestException('Product SKU is required');
    }
    if (!request.supplierId || request.supplierId.trim().length === 0) {
      throw new BadRequestException('Supplier ID is required');
    }
    if (!request.categoryName || request.categoryName.trim().length === 0) {
      throw new BadRequestException('Category name is required');
    }
    if (request.price.listingPrice < 0) {
      throw new BadRequestException('Listing price cannot be negative');
    }
    if (request.price.retailPrice < 0) {
      throw new BadRequestException('Retail price cannot be negative');
    }
    if (request.price.retailPrice < request.price.listingPrice) {
      throw new BadRequestException('Retail price cannot be less than listing price');
    }
    if (request.inventory.quantity < 0) {
      throw new BadRequestException('Inventory quantity cannot be negative');
    }
  }

  private generateProductId(): string {
    return uuidv4();
  }

  private generateImageId(): string {
    return uuidv4();
  }
}

