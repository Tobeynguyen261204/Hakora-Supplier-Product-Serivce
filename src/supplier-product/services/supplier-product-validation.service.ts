import { Injectable } from '@nestjs/common';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { CreateSupplierProductRequest } from '../dto/create-supplier-product-request.dto';
import { SupplierProductValidationException } from '../exceptions/supplier-product.exceptions';

/**
 * SupplierProductValidationService
 * 
 * Trách nhiệm: Business validation logic
 * - Entity validation
 * - Request validation
 * - Business rule validation
 */
@Injectable()
export class SupplierProductValidationService {

  /**
   * Validate entity before save
   */
  validateEntity(product: SupplierProductOrm): void {
    const errors: string[] = [];

    if (!product.id || product.id.trim().length === 0) {
      errors.push('Product ID is required');
    }

    if (!product.supplierId || product.supplierId.trim().length === 0) {
      errors.push('Supplier ID is required');
    }

    if (!product.name || product.name.trim().length === 0) {
      errors.push('Product name is required');
    }

    if (!product.description || product.description.trim().length === 0) {
      errors.push('Product description is required');
    }

    if (!product.sku || product.sku.trim().length === 0) {
      errors.push('Product SKU is required');
    }

    if (!product.price || product.price.listingPrice <= 0) {
      errors.push('Listing price must be greater than 0');
    }

    if (!product.price || product.price.retailPrice <= 0) {
      errors.push('Retail price must be greater than 0');
    }

    if (product.price && product.price.listingPrice > product.price.retailPrice) {
      errors.push('Listing price cannot exceed retail price');
    }

    if (!product.inventory || product.inventory.quantity < 0) {
      errors.push('Inventory quantity cannot be negative');
    }

    if (errors.length > 0) {
      throw new SupplierProductValidationException('Entity validation failed', errors);
    }
  }

  /**
   * Validate create request
   */
  validateCreateRequest(request: CreateSupplierProductRequest): void {
    const errors: string[] = [];

    if (!request.name || request.name.trim().length === 0) {
      errors.push('Product name is required');
    }

    if (!request.description || request.description.trim().length === 0) {
      errors.push('Product description is required');
    }

    if (!request.sku || request.sku.trim().length === 0) {
      errors.push('Product SKU is required');
    }

    if (!request.supplierId || request.supplierId.trim().length === 0) {
      errors.push('Supplier ID is required');
    }

    if (!request.price) {
      errors.push('Price information is required');
    } else {
      if (request.price.listingPrice <= 0) {
        errors.push('Listing price must be greater than 0');
      }
      if (request.price.retailPrice <= 0) {
        errors.push('Retail price must be greater than 0');
      }
      if (request.price.listingPrice > request.price.retailPrice) {
        errors.push('Listing price cannot exceed retail price');
      }
    }

    if (!request.inventory) {
      errors.push('Inventory information is required');
    } else if (request.inventory.quantity < 0) {
      errors.push('Inventory quantity cannot be negative');
    }

    if (request.images && request.images.length > 10) {
      errors.push('Maximum 10 images allowed per product');
    }

    if (request.tags && request.tags.length > 20) {
      errors.push('Maximum 20 tags allowed per product');
    }

    if (errors.length > 0) {
      throw new SupplierProductValidationException('Request validation failed', errors);
    }
  }

  /**
   * Validate SKU format
   */
  validateSku(sku: string): boolean {
    // SKU should be alphanumeric with hyphens and underscores
    const skuRegex = /^[A-Z0-9_-]+$/i;
    return skuRegex.test(sku);
  }

  /**
   * Validate price range
   */
  validatePriceRange(listingPrice: number, retailPrice: number): boolean {
    return listingPrice > 0 && retailPrice > 0 && listingPrice <= retailPrice;
  }

  /**
   * Validate inventory quantity
   */
  validateInventoryQuantity(quantity: number): boolean {
    return quantity >= 0 && Number.isInteger(quantity);
  }
}
