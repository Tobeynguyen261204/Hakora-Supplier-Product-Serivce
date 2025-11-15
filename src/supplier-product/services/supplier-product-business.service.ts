import { Injectable } from '@nestjs/common';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { SupplierProductFactoryService } from './supplier-product-factory.service';
import { ProductPrice } from '../value-objects/product-price.vo';
import { ProductInventory } from '../value-objects/product-inventory.vo';
import { ApprovalStatus } from '../enums/approval-status.enum';
import { ProductStatus } from '../enums/product-status.enum';
import { SupplierProductBusinessRuleException } from '../exceptions/supplier-product.exceptions';

/**
 * SupplierProductBusinessService
 * 
 * Trách nhiệm: Business logic operations
 * - Approval/Rejection logic
 * - Price/Inventory updates
 * - Status changes
 * - Business rule validation
 */
@Injectable()
export class SupplierProductBusinessService {
  constructor(
    private readonly factoryService: SupplierProductFactoryService
  ) {}

  /**
   * Approve product
   */
  approve(product: SupplierProductOrm, approvedBy: string): SupplierProductOrm {
    // Business rule validation
    if (this.isApproved(product)) {
      throw new SupplierProductBusinessRuleException('Product is already approved');
    }
    
    return this.factoryService.cloneWithUpdates(product, {
      approvalStatus: ApprovalStatus.APPROVED,
      approvedAt: new Date(),
      approvedBy,
    });
  }

  /**
   * Reject product
   */
  reject(product: SupplierProductOrm, reason: string, rejectedBy: string): SupplierProductOrm {
    // Business rule validation
    if (this.isRejected(product)) {
      throw new SupplierProductBusinessRuleException('Product is already rejected');
    }
    
    return this.factoryService.cloneWithUpdates(product, {
      approvalStatus: ApprovalStatus.REJECTED,
      rejectionReason: reason,
    });
  }

  /**
   * Update price
   */
  updatePrice(product: SupplierProductOrm, newPrice: ProductPrice): SupplierProductOrm {
    return this.factoryService.cloneWithUpdates(product, {
      price: {
        listingPrice: newPrice.listingPrice,
        retailPrice: newPrice.retailPrice,
        currency: newPrice.currency,
      },
    });
  }

  /**
   * Update inventory
   */
  updateInventory(product: SupplierProductOrm, newInventory: ProductInventory): SupplierProductOrm {
    if (newInventory.quantity < 0) {
      throw new SupplierProductBusinessRuleException('Quantity cannot be negative');
    }
    
    return this.factoryService.cloneWithUpdates(product, {
      inventory: {
        quantity: newInventory.quantity,
      },
    });
  }

  /**
   * Activate product
   */
  activate(product: SupplierProductOrm): SupplierProductOrm {
    if (!this.isApproved(product)) {
      throw new SupplierProductBusinessRuleException('Cannot activate unapproved product');
    }
    
    return this.factoryService.cloneWithUpdates(product, {
      isActive: true,
      status: ProductStatus.PUBLISHED,
    });
  }

  /**
   * Deactivate product
   */
  deactivate(product: SupplierProductOrm): SupplierProductOrm {
    return this.factoryService.cloneWithUpdates(product, {
      isActive: false,
      status: ProductStatus.DRAFT,
    });
  }

  /**
   * Hide product
   */
  hide(product: SupplierProductOrm): SupplierProductOrm {
    if (product.isSuspend) {
      throw new SupplierProductBusinessRuleException('Cannot hide a suspended product');
    }
    
    if (!product.isActive) {
      throw new SupplierProductBusinessRuleException('Product is already hidden');
    }

    return this.factoryService.cloneWithUpdates(product, {
      isActive: false,
    });
  }

  /**
   * Suspend product
   */
  suspend(product: SupplierProductOrm): SupplierProductOrm {
    if (product.isSuspend) {
      throw new SupplierProductBusinessRuleException('Product is already suspended');
    }

    return this.factoryService.cloneWithUpdates(product, {
      isSuspend: true,
    });
  }

  /**
   * Mark as featured
   */
  markAsFeatured(product: SupplierProductOrm): SupplierProductOrm {
    if (!this.isActiveAndApproved(product)) {
      throw new SupplierProductBusinessRuleException('Cannot feature inactive or unapproved product');
    }
    
    return this.factoryService.cloneWithUpdates(product, {
      isFeatured: true,
    });
  }

  /**
   * Unmark as featured
   */
  unmarkAsFeatured(product: SupplierProductOrm): SupplierProductOrm {
    return this.factoryService.cloneWithUpdates(product, {
      isFeatured: false,
    });
  }

  // ===== Business Rule Checks =====

  isApproved(product: SupplierProductOrm): boolean {
    return product.approvalStatus === ApprovalStatus.APPROVED;
  }

  isPendingApproval(product: SupplierProductOrm): boolean {
    return product.approvalStatus === ApprovalStatus.PENDING;
  }

  isRejected(product: SupplierProductOrm): boolean {
    return product.approvalStatus === ApprovalStatus.REJECTED;
  }

  isActiveAndApproved(product: SupplierProductOrm): boolean {
    return product.isActive && this.isApproved(product) && product.status === ProductStatus.PUBLISHED;
  }

  // ===== Computed Properties =====

  calculateProfitAmount(product: SupplierProductOrm): number {
    return product.price.retailPrice - product.price.listingPrice;
  }

  calculateAverageRating(product: SupplierProductOrm): number {
    if (!product.reviews || product.reviews.length === 0) return 0;
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / product.reviews.length;
  }

  getPrimaryImage(product: SupplierProductOrm) {
    if (!product.images || product.images.length === 0) return undefined;
    return product.images.find(img => img.isPrimary) || product.images[0];
  }
}
