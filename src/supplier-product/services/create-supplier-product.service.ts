import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { CreateSupplierProductRequest } from '../dto/create-supplier-product-request.dto';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { ProductPrice } from '../value-objects/product-price.vo';
import { ProductInventory } from '../value-objects/product-inventory.vo';
import { ProductSpecifications } from '../value-objects/product-specifications.vo';
import { ProductImageOrm } from '../entities/product-image.entity';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';
import { SupplierProductAlreadyExistsException, SupplierProductValidationException, SupplierProductBusinessRuleException } from '../exceptions/supplier-product.exceptions';
import { SupplierProductFactoryService } from './supplier-product-factory.service';
import { SupplierProductComputedPropertiesService } from './supplier-product-computed-properties.service';
import { CategoryValidationService } from './category-validation.service';

@Injectable()
export class CreateSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly supplierProductFactoryService: SupplierProductFactoryService,
    private readonly computedPropertiesService: SupplierProductComputedPropertiesService,
    private readonly categoryValidationService: CategoryValidationService
  ) {}

  async execute(request: CreateSupplierProductRequest): Promise<SupplierProductResponseDto> {
    try {
      // 1. Request validation đã được DTO + ValidationPipe xử lý tự động
      // Không cần gọi validateCreateRequest() nữa vì đã duplicate với DTO validation

      // 2. Check if SKU already exists
      const existingProduct = await this.supplierProductRepository.findBySku(request.sku);
      if (existingProduct) {
        throw new SupplierProductAlreadyExistsException(request.sku);
      }

      // 3. ✅ Validate category exists in CategoryService
      const categoryInfo = await this.categoryValidationService.getCategoryInfo(
        request.categoryId || request.categoryName
      );

      // 4. Pre-generate IDs
      const productId = this.generateProductId();

      // 4. Create value objects (domain validation)
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

      // 5. Create images tied to the product ID
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

      // ✅ 6. Create product using factory service - clean and professional
      // Factory nhận Value Objects trực tiếp và handle conversion internally
      const product = this.supplierProductFactoryService.createFromValueObjects(
        productId,
        request.supplierId,
        request.name,
        request.description,
        request.shortDescription,
        request.sku,
        categoryInfo.name,  // Use validated category name
        price,  // ✅ Value Object
        inventory,  // ✅ Value Object
        specifications,  // ✅ Value Object
        request.type,
        request.tags || [],
        request.isActive ?? true,
        request.isFeatured ?? false,
        request.weight,
        request.dimensions,
        request.seoData,
        images,
        [], // reviews - empty for new product
        categoryInfo.id   // Use validated category ID (optional, at the end)
      );

      // 7. Save product
      const savedProduct = await this.supplierProductRepository.save(product);

      // 8. Map to DTO với computed properties (mapper tự động orchestrate)
      return SupplierProductMapper.toResponseDtoWithComputed(savedProduct, this.computedPropertiesService);
    } catch (error) {
      // Re-throw RpcException
      if (error instanceof SupplierProductAlreadyExistsException || 
          error instanceof SupplierProductValidationException ||
          error instanceof SupplierProductBusinessRuleException) {
        throw error;
      }
      // Wrap other errors
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new SupplierProductValidationException(`Failed to create supplier product: ${errorMessage}`);
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
      throw new SupplierProductValidationException('At least one image must be marked as primary');
    }

    // Validate URLs
    for (const img of images) {
      if (!img.url || img.url.trim().length === 0) {
        throw new SupplierProductValidationException('Image URL is required');
      }

      // Basic URL validation
      try {
        new URL(img.url);
      } catch {
        throw new SupplierProductValidationException(`Invalid image URL: ${img.url}`);
      }
    }
  }
}

