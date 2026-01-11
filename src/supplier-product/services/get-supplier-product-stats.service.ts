import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';

@Injectable()
export class GetSupplierProductStatsService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository
  ) {}

  /**
   * Get supplier product statistics using efficient database aggregation
   * 
   * ✅ BEST PRACTICE: Uses a single optimized query with conditional aggregation
   * instead of loading all products into memory. This provides:
   * - Better performance (especially with large datasets)
   * - Lower memory usage
   * - Single database round-trip
   * - Better scalability
   * 
   * @param supplierId - The supplier ID to get stats for
   * @returns Statistics including approval status counts and inventory metrics
   */
  async execute(supplierId: string): Promise<{
    success: boolean;
    message: string;
    data?: {
      approved: number;
      pending: number;
      rejected: number;
      suspend: number;
      totalProducts: number;
      totalStock: number;
      lowStockAlert: number;
      outOfStock: number;
    };
  }> {
    const LOW_STOCK_THRESHOLD = 5;

    console.log('[GetSupplierProductStatsService] Getting stats for supplierId:', supplierId);

    try {
      // ✅ Use efficient database aggregation instead of loading all products
      const stats = await this.supplierProductRepository.getAllStatsBySupplierId(
        supplierId,
        LOW_STOCK_THRESHOLD
      );

      console.log('[GetSupplierProductStatsService] Raw stats from repository:', stats);

      const responseData = {
        approved: stats.approved,
        pending: stats.pending,
        rejected: stats.rejected,
        suspend: stats.suspended,
        totalProducts: stats.total,
        totalStock: stats.totalStock,
        lowStockAlert: stats.lowStockCount,
        outOfStock: stats.outOfStockCount
      };

      console.log('[GetSupplierProductStatsService] Response data:', responseData);

      return {
        success: true,
        message: 'Statistics retrieved successfully',
        data: responseData
      };
    } catch (error) {
      console.error('[GetSupplierProductStatsService] Error getting stats:', error);
      return {
        success: false,
        message: `Failed to retrieve statistics: ${error instanceof Error ? error.message : 'Unknown error'}`,
        data: {
          approved: 0,
          pending: 0,
          rejected: 0,
          suspend: 0,
          totalProducts: 0,
          totalStock: 0,
          lowStockAlert: 0,
          outOfStock: 0
        }
      };
    }
  }
}

