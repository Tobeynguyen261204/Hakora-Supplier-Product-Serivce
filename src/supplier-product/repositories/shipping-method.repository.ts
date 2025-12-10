import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ShippingMethodOrm } from '../entities/shipping-method.entity';

/**
 * Shipping Method Repository
 * Handles all database operations for shipping methods
 */
@Injectable()
export class ShippingMethodRepository extends Repository<ShippingMethodOrm> {
  constructor(
    private readonly dataSource: DataSource,
  ) {
    super(
      ShippingMethodOrm,
      dataSource.createEntityManager()
    );
  }

  /**
   * Find all shipping methods for a supplier
   * @param supplierId - Supplier ID
   * @param isActive - Optional: filter by active status
   * @returns Array of shipping methods
   */
  async findBySupplierId(supplierId: string, isActive?: boolean): Promise<ShippingMethodOrm[]> {
    const query = this.createQueryBuilder('shipping_method')
      .where('shipping_method.supplierId = :supplierId', { supplierId })
      .orderBy('shipping_method.createdAt', 'DESC');

    if (isActive !== undefined) {
      query.andWhere('shipping_method.isActive = :isActive', { isActive });
    }

    return query.getMany();
  }

  /**
   * Find active shipping methods for a supplier
   * Used by customers during checkout
   */
  async findActiveBySupplierId(supplierId: string): Promise<ShippingMethodOrm[]> {
    return this.findBySupplierId(supplierId, true);
  }

  /**
   * Find shipping method by ID and supplier ID (for scope validation)
   */
  async findByIdAndSupplierId(id: string, supplierId: string): Promise<ShippingMethodOrm | null> {
    return this.findOne({
      where: { id, supplierId }
    });
  }
}

