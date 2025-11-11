import { Injectable, Inject } from '@nestjs/common';
import type { ISupplierProductRepository } from '../../domain/repositories/supplier-product.repository.interface';
import { ApprovalStatus } from '../../domain/enums/approval-status.enum';
import { SupplierProduct } from '../../domain/aggregates/supplier-product.aggregate';

interface SupplierProductStats {
  approved: number;
  pending: number;
  rejected: number;
  suspend: number;
  totalProducts: number;
  totalStock: number;
  lowStockAlert: number;
  outOfStock: number;
}

@Injectable()
export class GetSupplierProductStatsUseCase {
  constructor(
    @Inject('SUPPLIER_PRODUCT_REPOSITORY')
    private readonly supplierProductRepository: ISupplierProductRepository
  ) {}

  async execute(supplierId: string): Promise<{ success: boolean; message: string; data?: SupplierProductStats }> {
    const products = await this.supplierProductRepository.findBySupplierId(supplierId);
    const LOW_STOCK_THRESHOLD = 5;
    const getQuantity = (p: SupplierProduct): number => {
      const q = p.inventory.quantity;
      return typeof q === 'number' && Number.isFinite(q) ? q : 0;
    };
    
    const stats = {
      // Approval + admin lock
      approved: products.filter(p => p.approvalStatus === ApprovalStatus.APPROVED).length,
      pending: products.filter(p => p.approvalStatus === ApprovalStatus.PENDING).length,
      rejected: products.filter(p => p.approvalStatus === ApprovalStatus.REJECTED).length,
      suspend: products.filter(p => p.isSuspend === true).length,
      // Inventory-based KPIs
      totalProducts: products.length,
      totalStock: products.reduce((sum, p) => sum + getQuantity(p), 0),
      lowStockAlert: products.filter(p => {
        const q = getQuantity(p);
        return q > 0 && q <= LOW_STOCK_THRESHOLD;
      }).length,
      outOfStock: products.filter(p => getQuantity(p) === 0).length
    };

    return {
      success: true,
      message: 'Statistics retrieved successfully',
      data: stats
    };
  }
}
