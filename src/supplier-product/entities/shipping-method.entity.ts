import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

/**
 * Shipping Method Entity
 * Mỗi supplier có thể tạo nhiều shipping methods với giá cố định
 * Tương lai có thể mở rộng để tính theo weight/size
 */
@Entity('shipping_methods')
@Index(['supplierId'])
@Index(['supplierId', 'isActive'])
@Index(['isActive'])
export class ShippingMethodOrm {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  @Index(['supplierId'])
  supplierId!: string;

  @Column()
  name!: string; // e.g., "Fast", "Super Fast", "Heavy Product"

  @Column('text', { nullable: true })
  description?: string | null; // Optional description

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number; // Fixed price in VND (hiện tại: fixed price, tương lai: có thể tính theo weight)

  @Column('varchar', { length: 50, nullable: true })
  estimatedDays?: string | null; // e.g., "2-3 days", "1-2 days"

  @Column('boolean', { default: true })
  isActive!: boolean; // Supplier có thể bật/tắt method

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Tương lai có thể thêm:
  // @Column('decimal', { precision: 10, scale: 2, nullable: true })
  // pricePerKg?: number; // Tính theo weight
  
  // @Column('decimal', { precision: 10, scale: 2, nullable: true })
  // minWeight?: number;
  
  // @Column('decimal', { precision: 10, scale: 2, nullable: true })
  // maxWeight?: number;
}

