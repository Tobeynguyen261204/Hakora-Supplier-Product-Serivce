import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index, PrimaryGeneratedColumn } from 'typeorm';
import { SupplierProduct } from './supplier-product.entity';

@Entity('supplier_product_images')
@Index(['product'])
@Index(['sortOrder'])
export class SupplierProductImage {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => SupplierProduct, product => product.images)
  @JoinColumn({ name: 'product_id' })
  product!: SupplierProduct;

  @Column()
  url!: string;

  @Column({ nullable: true, name: 'alt_text' })
  altText?: string;

  @Column({ default: 0, name: 'sort_order' })
  sortOrder!: number;

  @Column({ default: false, name: 'is_primary' })
  isPrimary!: boolean;

  @Column({ nullable: true })
  width?: number;

  @Column({ nullable: true })
  height?: number;

  @Column('uuid', { nullable: true, name: 'variant_id' })
  variantId?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  /**
   * Factory method to create SalesProductImage from DTO data
   * This encapsulates the creation logic within the entity
   */
  static create(
    id: string,
    product: SupplierProduct,
    url: string,
    altText?: string,
    sortOrder: number = 0,
    isPrimary: boolean = false,
    width?: number,
    height?: number,
    // variantId?: string,
  ): SupplierProductImage {
    const image = new SupplierProductImage();
    image.id = id;
    image.product = product;
    image.url = url;
    image.altText = altText;
    image.sortOrder = sortOrder;
    image.isPrimary = isPrimary;
    image.width = width;
    image.height = height;
    // image.variantId = variantId;
    image.createdAt = new Date();
    image.updatedAt = new Date();
    return image;
  }
}

