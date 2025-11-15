import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { SupplierProductOrm } from './supplier-product.entity';

@Entity('product_images')
@Index(['productId'])
@Index(['isPrimary'])
@Index(['sortOrder'])
export class ProductImageOrm {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('uuid')
  productId!: string;

  @ManyToOne(() => SupplierProductOrm, product => product.images)
  @JoinColumn({ name: 'productId' })
  product!: SupplierProductOrm;

  @Column()
  url!: string;

  @Column({ nullable: true })
  altText?: string;

  @Column({ default: 0 })
  sortOrder!: number;

  @Column({ default: false })
  isPrimary!: boolean;

  @Column({ nullable: true })
  width?: number;

  @Column({ nullable: true })
  height?: number;

  @Column({ nullable: true })
  fileSize?: number;

  @Column({ nullable: true })
  mimeType?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  /**
   * Factory method to create ProductImageOrm from DTO data
   * This encapsulates the creation logic within the entity
   */
  static create(
    id: string,
    productId: string,
    url: string,
    altText?: string,
    sortOrder: number = 0,
    isPrimary: boolean = false,
    width?: number,
    height?: number,
    fileSize?: number,
    mimeType?: string
  ): ProductImageOrm {
    const image = new ProductImageOrm();
    image.id = id;
    image.productId = productId;
    image.url = url;
    image.altText = altText;
    image.sortOrder = sortOrder;
    image.isPrimary = isPrimary;
    image.width = width;
    image.height = height;
    image.fileSize = fileSize;
    image.mimeType = mimeType;
    return image;
  }
}
