import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { ProductImageOrm } from './product-image.entity';
import { ProductReviewOrm } from './product-review.entity';
import { ApprovalStatus } from '../enums/approval-status.enum';
import { ProductStatus } from '../enums/product-status.enum';
import { ProductPrice } from '../value-objects/product-price.vo';
import { ProductInventory } from '../value-objects/product-inventory.vo';

// Add ApprovalStatus enum definition or import
@Entity('supplier_products')
@Index(['supplierId'])
@Index(['sku'], { unique: true })
@Index(['status'])
@Index(['approvalStatus'])
@Index(['isActive'])
@Index(['isFeatured'])
@Index(['createdAt'])
@Index(['updatedAt'])
export class SupplierProductOrm {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('uuid')
  supplierId!: string;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column('text', { nullable: true })
  shortDescription?: string;

  @Column({ unique: true })
  sku!: string;

  @Column()
  categoryName!: string;

  @Column('uuid', { nullable: true })
  @Index(['categoryId'])
  categoryId?: string;

  @Column('jsonb')
  price!: {
    listingPrice: number;
    retailPrice: number;
    currency: string;
  };

  @Column('jsonb')
  inventory!: {
    quantity: number;
  };

  @Column('jsonb')
  specifications!: {
    specifications: Record<string, string>;
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
      unit?: string;
    };
    weight?: {
      value: number;
      unit: string;
    };
    materials?: string[];
    colors?: string[];
    sizes?: string[];
  };

  @Column()
  type!: string;

  @Column()
  status!: string;

  @Column()
  approvalStatus!: string;

  @OneToMany(() => ProductImageOrm, image => image.product)
  images!: ProductImageOrm[];

  @OneToMany(() => ProductReviewOrm, review => review.product)
  reviews!: ProductReviewOrm[];

  @Column('text', { array: true, default: '{}' })
  tags!: string[];

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isFeatured!: boolean;

  @Column({ default: false })
  isSuspend!: boolean;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  weight?: number;

  @Column('jsonb', { nullable: true })
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };

  // shippingInfo removed

  @Column('jsonb', { nullable: true })
  seoData?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  approvedAt?: Date;

  @Column('uuid', { nullable: true })
  approvedBy?: string;

  @Column('text', { nullable: true })
  rejectionReason?: string;

  // ✅ CHỈ basic computed properties (không có business logic)

  get availableQuantity(): number {
    return this.inventory.quantity;
  }

  get isInStock(): boolean {
    return this.inventory.quantity > 0;
  }


  get isOutOfStock(): boolean {
    return this.inventory.quantity === 0;
  }

  get reviewCount(): number {
    return this.reviews ? this.reviews.length : 0;
  }

  get hasImages(): boolean {
    return this.images && this.images.length > 0;
  }

}
