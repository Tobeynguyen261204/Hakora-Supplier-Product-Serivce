import { ProductStatus } from '../enums/product-status.enum';
import { ProductType } from '../enums/product-type.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';
import { ProductPrice } from '../value-objects/product-price.vo';
import { ProductInventory } from '../value-objects/product-inventory.vo';
import { ProductSpecifications } from '../value-objects/product-specifications.vo';
// Category simplified to plain name string
import { ProductImage } from '../entities/product-image.entity';
import { ProductReview } from '../entities/product-review.entity';

export class SupplierProduct {
  constructor(
    public readonly id: string,
    public readonly supplierId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly shortDescription: string = '',
    public readonly sku: string,
    public readonly categoryName: string,
    public readonly price: ProductPrice,
    public readonly inventory: ProductInventory,
    public readonly specifications: ProductSpecifications,
    public readonly type: ProductType,
    public readonly status: ProductStatus,   // DRAFT, PUBLISHED, OUT_OF_STOCK, DELETED
    public readonly approvalStatus: ApprovalStatus, // PENDING, APPROVED, REJECTED
    public readonly images: ProductImage[] = [],
    public readonly reviews: ProductReview[] = [],
    public readonly tags: string[] = [],
    public readonly isActive: boolean = true, // true, false for hide/unhide
    public readonly isFeatured: boolean = false, // true, false for feature
    public readonly isSuspend: boolean = false, // true, false for suspend
    public readonly weight?: number,
    public readonly dimensions?: {
      length: number;
      width: number;
      height: number;
      unit: string;
    },
    // shippingInfo removed
    public readonly seoData?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string[];
    },
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
    public readonly approvedAt?: Date,
    public readonly approvedBy?: string,
    public readonly rejectionReason?: string
  ) {
    this.validateProduct();
  }

  // Helper method to clone with updates - eliminates code duplication
  private clone(updates: Partial<SupplierProduct>): SupplierProduct {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), {
      ...this,
      ...updates,
      updatedAt: new Date()
    });
  }

  private validateProduct(): void {
    if (!this.id || this.id.trim().length === 0) {
      throw new Error('Product ID is required');
    }
    if (!this.supplierId || this.supplierId.trim().length === 0) {
      throw new Error('Supplier ID is required');
    }
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Product name is required');
    }
    if (!this.description || this.description.trim().length === 0) {
      throw new Error('Product description is required');
    }
    if (!this.sku || this.sku.trim().length === 0) {
      throw new Error('Product SKU is required');
    }
  }

  get isApproved(): boolean {
    return this.approvalStatus === ApprovalStatus.APPROVED;
  }

  get isPendingApproval(): boolean {
    return this.approvalStatus === ApprovalStatus.PENDING;
  }

  get isRejected(): boolean {
    return this.approvalStatus === ApprovalStatus.REJECTED;
  }

  get isActiveAndApproved(): boolean {
    return this.isActive && this.isApproved && this.status === ProductStatus.PUBLISHED;
  }

  get isInStock(): boolean {
    return this.inventory.isInStock;
  }

  get isLowStock(): boolean {
    return this.inventory.isLowStock;
  }

  get isOutOfStock(): boolean {
    return this.inventory.isOutOfStock;
  }

  get averageRating(): number {
    if (this.reviews.length === 0) return 0;
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / this.reviews.length;
  }

  get reviewCount(): number {
    return this.reviews.length;
  }

  get primaryImage(): ProductImage | undefined {
    return this.images.find(img => img.isPrimary) || this.images[0];
  }

  get hasImages(): boolean {
    return this.images.length > 0;
  }

  get formattedListingPrice(): string {
    return `${this.price.listingPrice.toLocaleString()} ${this.price.currency}`;
  }

  get formattedRetailPrice(): string {
    return `${this.price.retailPrice.toLocaleString()} ${this.price.currency}`;
  }

  get profitAmount(): number {
    return this.price.profitAmount;
  }

  // Business methods
  approve(approvedBy: string): SupplierProduct {
    if (this.isApproved) {
      throw new Error('Product is already approved');
    }
    
    return this.clone({
      approvalStatus: ApprovalStatus.APPROVED,
      approvedAt: new Date(),
      approvedBy
    });
  }

  reject(reason: string, rejectedBy: string): SupplierProduct {
    if (this.isRejected) {
      throw new Error('Product is already rejected');
    }
    
    return this.clone({
      approvalStatus: ApprovalStatus.REJECTED,
      rejectionReason: reason
    });
  }

  updatePrice(newPrice: ProductPrice): SupplierProduct {
    return this.clone({ price: newPrice });
  }

  updateInventory(newInventory: ProductInventory): SupplierProduct {
    return this.clone({ inventory: newInventory });
  }

  addImage(image: ProductImage): SupplierProduct {
    const newImages = [...this.images, image];
    return this.clone({ images: newImages });
  }

  removeImage(imageId: string): SupplierProduct {
    const newImages = this.images.filter(img => img.id !== imageId);
    return this.clone({ images: newImages });
  }

  addReview(review: ProductReview): SupplierProduct {
    const newReviews = [...this.reviews, review];
    return this.clone({ reviews: newReviews });
  }

  activate(): SupplierProduct {
    if (!this.isApproved) {
      throw new Error('Cannot activate unapproved product');
    }
    
    return this.clone({ isActive: true, status: ProductStatus.PUBLISHED });
  }

  deactivate(): SupplierProduct {
    return this.clone({ isActive: false, status: ProductStatus.DRAFT });
  }

  markAsFeatured(): SupplierProduct {
    if (!this.isActiveAndApproved) {
      throw new Error('Cannot feature inactive or unapproved product');
    }
    
    return this.clone({ isFeatured: true });
  }

  unmarkAsFeatured(): SupplierProduct {
    return this.clone({ isFeatured: false });
  }

  hide(): SupplierProduct {
    if (this.isSuspend) {
      throw new Error('Cannot hide a suspended product');
    }
    
    if (!this.isActive) {
      throw new Error('Product is already hidden');
    }

    return this.clone({ isActive: false });
  }

  suspend(): SupplierProduct {
    if (this.isSuspend) {
      throw new Error('Product is already suspended');
    }

    return this.clone({ isSuspend: true });
  }

}
