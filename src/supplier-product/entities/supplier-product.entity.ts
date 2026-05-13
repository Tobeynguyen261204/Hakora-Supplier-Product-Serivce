import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { SupplierProductImage } from './supplier-product-image.entity';
import { SupplierProductVariant } from './supplier-product-variant.entity';
import { SupplierProductStatus } from './supplier-product-status.enum';

@Entity('supplier_products')
@Index(['supplierId'])
@Index(['status'])
@Index(['isFeatured'])
export class SupplierProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'supplier_id', nullable: true })
  @Index('idx_supplier_product_supplier_id')
  supplierId?: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ name: 'category_id', type: 'uuid', nullable: true })
  categoryId: string | null;

  @Column({ type: 'enum', enum: SupplierProductStatus, default: SupplierProductStatus.DRAFT })
  status: SupplierProductStatus;

  // Specifications - JSONB format
  @Column('jsonb', { name: 'specifications' })
  specifications!: Record<string, string>;

  @Column('text', { array: true, nullable: true, default: '{}' })
  tags: string[];

  @Column('decimal', {
    precision: 5,
    scale: 2,
    name: 'rating_avg',
    nullable: true,
  })
  ratingAvg: number;

  @Column('int', {
    name: 'rating_count',
    nullable: true,
  })
  ratingCount: number;

  @Column({ default: false, name: 'is_featured' })
  isFeatured!: boolean;

  /** HTTPS URL to hosted .glb (or compatible) 3D asset; not stored as BLOB in DB */
  @Column({ name: 'model_glb_url', type: 'text', nullable: true })
  modelGlbUrl?: string | null;

  // Relations
  @OneToMany(() => SupplierProductImage, image => image.product)
  images!: SupplierProductImage[];

  @OneToMany(() => SupplierProductVariant, variant => variant.product)
  variants!: SupplierProductVariant[];

  // Timestamps
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  static createNew(
    supplierId: string | undefined,
    name: string,
    description: string,
    specifications: Record<string, string>,
    tags: string[] = [],
    status: string = 'draft',
    isFeatured: boolean = false,
  ): SupplierProduct {
    const product = new SupplierProduct();
    product.supplierId = supplierId;
    product.name = name;
    product.description = description;
    product.status = status as SupplierProductStatus;
    product.isFeatured = isFeatured;
    product.specifications = specifications;
    product.tags = tags;
    product.isFeatured = isFeatured;
    return product;
  }

  // Business logic methods
  updatePricing(
    newPrice: {
      sellerPrice: number;
      supplierPrice: number;
      currency?: string;
    },
  ): void {
    if (newPrice.sellerPrice < 0) {
      throw new Error('Seller price cannot be negative');
    }
    if (newPrice.supplierPrice < 0) {
      throw new Error('Supplier price cannot be negative');
    }
    if (newPrice.supplierPrice < newPrice.sellerPrice) {
      throw new Error('Supplier price cannot be less than seller price');
    }
  }

  // updateDetails(dto: UpdateSupplierProductDto): void {
  //   if (dto.name !== undefined) this.name = dto.name;
  //   if (dto.description !== undefined) this.description = dto.description;
  //   if (dto.inventory !== undefined) {
  //     if (typeof dto.inventory === 'object' && dto.inventory !== null) {
  //       if (dto.inventory.quantity < 0) {
  //         throw new Error('Inventory quantity cannot be negative');
  //       }
  //       this.variants.forEach(variant => {
  //         if (variant.sku === dto.sku) {
  //           variant.inventorySnapshot = { quantity: dto.inventoryQuantity ?? 0 };
  //         }
  //       });
  //     }
  //   }
  //   if (dto.status !== undefined) this.status = dto.status as SupplierProductStatus;
  //   if (dto.isFeatured !== undefined) this.isFeatured = dto.isFeatured;
  // }

  // Computed properties (similar to SupplierProduct)
  get availableQuantity(): number {
    return this.variants.reduce((acc, variant) => acc + (variant.inventorySnapshot ?? 0), 0);
  }

  get isInStock(): boolean {
    return this.availableQuantity > 0;
  }

  get isOutOfStock(): boolean {
    return this.availableQuantity === 0;
  }



  get hasImages(): boolean {
    return this.images && this.images.length > 0;
  }

  get primaryImage(): SupplierProductImage | undefined {
    if (!this.images || this.images.length === 0) {
      return undefined;
    }
    return this.images.find(img => img.isPrimary) || this.images[0];
  }

  toObject() {
    // Transform price to include profitAmount for response DTO
    // ✅ FIX: Handle case where price might be string (from JSONB) or invalid
    let priceResponse: {
      supplierPrice: number;
      currency: string;
    };

    // ✅ FIX: Check if price exists and is valid
    if (this.variants.length > 0) {
      // Price is an object
      const supplierPrice = Number(this.variants[0].supplierPrice) || 0;
      priceResponse = {
        supplierPrice,
        currency: this.variants[0].currency || 'VND',
      };
    } else {
      // Fallback: use priceValue, salesPrice, or calculate from profit
      const supplierPrice = Number(this.variants[0].supplierPrice) || 0;
      priceResponse = {
        supplierPrice: supplierPrice,
        currency: 'VND',
      };
    }

    // Transform inventory for response DTO
    const inventoryResponse = this.variants.length > 0 ? {
      quantity: this.variants.reduce((acc, variant) => acc + variant.inventorySnapshot, 0),
      availableQuantity: this.availableQuantity,
    } : {
      quantity: 0,
      availableQuantity: 0,
    };

    // Transform specifications for response DTO
    const specificationsResponse = this.specifications ? {
      specifications: this.specifications.specifications || {},
      dimensions: this.specifications.dimensions,
      weight: this.specifications.weight,
      materials: this.specifications.materials,
      colors: this.specifications.colors,
      sizes: this.specifications.sizes,
      specificationCount: Object.keys(this.specifications.specifications || {}).length,
    } : {
      specifications: {},
      specificationCount: 0,
    };

    return {
      id: this.id,
      supplierId: this.supplierId, // ✅ NEW: Include supplierId in response
      name: this.name,
      description: this.description,
      price: priceResponse,
      inventory: inventoryResponse,
      inventoryQuantity: this.availableQuantity,
      specifications: specificationsResponse,
      images: this.images?.map(img => ({
        id: img.id,
        productId: this.id,
        url: img.url,
        altText: img.altText,
        isPrimary: img.isPrimary,
        sortOrder: img.sortOrder,
        width: img.width,
        height: img.height,
      })) || [],
      tags: Array.isArray(this.tags) ? this.tags : [],
      status: this.status,
      isFeatured: this.isFeatured !== undefined ? this.isFeatured : false,
      // ✅ FIX: Extract weight from specifications if not in separate column, or use separate column
      weight: this.specifications?.weight
        ? this.specifications.weight
        : undefined,
      // ✅ FIX: Use dimensions from separate column, or extract from specifications
      dimensions: this.specifications?.dimensions
        ? this.specifications.dimensions
        : undefined,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      primaryImage: this.primaryImage ? {
        id: this.primaryImage.id,
        productId: this.id,
        url: this.primaryImage.url,
        altText: this.primaryImage.altText,
        isPrimary: this.primaryImage.isPrimary,
        sortOrder: this.primaryImage.sortOrder,
        width: this.primaryImage.width,
        height: this.primaryImage.height,
      } : undefined,
    };
  }
}
