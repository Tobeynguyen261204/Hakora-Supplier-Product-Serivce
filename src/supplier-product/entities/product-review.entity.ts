import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index, Check } from 'typeorm';
import { SupplierProductOrm } from './supplier-product.entity';

@Entity('product_reviews')
@Index(['productId'])
@Index(['customerId'])
@Index(['rating'])
@Index(['isVerified'])
@Index(['isPublished'])
@Index(['createdAt'])
@Check('CHK_product_reviews_rating', 'rating >= 1 AND rating <= 5')
export class ProductReviewOrm {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('uuid')
  productId!: string;

  @ManyToOne(() => SupplierProductOrm, product => product.reviews)
  @JoinColumn({ name: 'productId' })
  product!: SupplierProductOrm;

  @Column('uuid')
  customerId!: string;

  @Column({ type: 'integer' })
  rating!: number;

  @Column({ nullable: true })
  title?: string;

  @Column('text', { nullable: true })
  comment?: string;

  @Column({ default: false })
  isVerified!: boolean;

  @Column({ default: true })
  isPublished!: boolean;

  @Column({ default: 0 })
  helpfulCount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  static create(
    id: string,
    productId: string,
    customerId: string,
    rating: number,
    title?: string,
    comment?: string,
    isVerified: boolean = false,
    isPublished: boolean = true,
  ): ProductReviewOrm {
    const review = new ProductReviewOrm();
    review.id = id;
    review.productId = productId;
    review.customerId = customerId;
    review.rating = rating;
    review.title = title;
    review.comment = comment;
    review.isVerified = isVerified;
    review.isPublished = isPublished;
    return review;
  }
}