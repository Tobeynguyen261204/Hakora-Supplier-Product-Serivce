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
import { ICreateSupplierProductService } from '../interfaces/supplier-product-service.interface';
import { SupplierProductAlreadyExistsException } from '../exceptions/supplier-product.exceptions';
import { SupplierProductFactoryService } from './supplier-product-factory.service';
import { SupplierProductValidationService } from './supplier-product-validation.service';

@Injectable()
export class CreateSupplierProductService implements ICreateSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly supplierProductFactoryService: SupplierProductFactoryService,
    private readonly supplierProductValidationService: SupplierProductValidationService
  ) {}

  async execute(request: CreateSupplierProductRequest): Promise<SupplierProductResponseDto> {
    try {
      // 1. Validate input using validation service
      this.supplierProductValidationService.validateCreateRequest(request);

      // 2. Check if SKU already exists
      const existingProduct = await this.supplierProductRepository.findBySku(request.sku);
      if (existingProduct) {
      throw new SupplierProductAlreadyExistsException(request.sku);
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
      this.validateImages(request.images || []);
      const images = (request.images || []).map((img) =>
        ProductImageOrm.create(
          this.generateImageId(),
          productId,
          img.url,
          img.altText,
          img.sortOrder ?? 0,
          img.isPrimary ?? false,
          img.width,
          img.height,
          img.fileSize,
          img.mimeType
        )
      );

      // 7. Create product using factory service - pass Value Objects directly
      const product = new SupplierProductOrm();
      product.id = productId;
      product.supplierId = request.supplierId;
      product.name = request.name;
      product.description = request.description;
      product.shortDescription = request.shortDescription;
      product.sku = request.sku;
      product.categoryName = request.categoryName;
      
      // ✅ Convert Value Objects to JSONB only when saving
      product.price = {
        listingPrice: price.listingPrice,
        retailPrice: price.retailPrice,
        currency: price.currency
      };
      
      product.inventory = {
        quantity: inventory.quantity
      };
      
      // ✅ Use Value Object toJSON method
      product.specifications = specifications.toJSON();
      
      product.type = request.type;
      product.status = ProductStatus.DRAFT;
      product.approvalStatus = ApprovalStatus.PENDING;
      product.images = images;
      product.reviews = [];
      product.tags = request.tags || [];
      product.isActive = request.isActive ?? true;
      product.isFeatured = request.isFeatured ?? false;
      product.isSuspend = false;
      product.weight = request.weight;
      product.dimensions = request.dimensions;
      product.seoData = request.seoData;

      // 8. Save product
      const savedProduct = await this.supplierProductRepository.save(product);

      // 9. Update image product IDs (if needed)
      // Note: savedProduct.images should already have correct productId from repository
      const updatedImages = savedProduct.images.map((img) =>
        ProductImageOrm.create(
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

      // Use the saved product directly - no need to recreate
      const finalProduct = savedProduct;

      const updatedProduct = await this.supplierProductRepository.updateProduct(finalProduct);

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

  /**
   * Validates image data according to business rules
   */
  private validateImages(images: CreateSupplierProductRequest['images']): void {
    if (!images || images.length === 0) {
      return;
    }

    // Ensure at least one primary image if images are provided
    const hasPrimaryImage = images.some((img) => img.isPrimary === true);
    if (!hasPrimaryImage) {
      throw new BadRequestException('At least one image must be marked as primary');
    }

    // Validate URLs
    for (const img of images) {
      if (!img.url || img.url.trim().length === 0) {
        throw new BadRequestException('Image URL is required');
      }

      // Basic URL validation
      try {
        new URL(img.url);
      } catch {
        throw new BadRequestException(`Invalid image URL: ${img.url}`);
      }
    }
  }
}

