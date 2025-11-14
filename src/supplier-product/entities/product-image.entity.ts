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
}
