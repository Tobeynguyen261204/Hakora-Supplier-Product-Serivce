import { Injectable, Inject } from '@nestjs/common';
import type { ISupplierProductRepository } from '../../domain/repositories/supplier-product.repository.interface';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';

@Injectable()
export class RejectSupplierProductUseCase {
  constructor(
    @Inject('SUPPLIER_PRODUCT_REPOSITORY')
    private readonly supplierProductRepository: ISupplierProductRepository
  ) {}

  async execute(productId: string, reason: string, rejectedBy: string): Promise<SupplierProductResponseDto> {
    try {
      // 1. Get product
      const product = await this.supplierProductRepository.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // 2. Check if product can be rejected
      if (product.isRejected) {
        throw new Error('Product is already rejected');
      }

      if (product.isApproved) {
        throw new Error('Cannot reject an approved product');
      }

      // 3. Validate rejection reason
      if (!reason || reason.trim().length === 0) {
        throw new Error('Rejection reason is required');
      }

      // 4. Reject product
      const rejectedProduct = product.reject(reason, rejectedBy);

      // 5. Save rejected product
      const savedProduct = await this.supplierProductRepository.update(rejectedProduct);

      // 6. Return response
      return SupplierProductMapper.toResponseDto(savedProduct);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to reject supplier product: ${errorMessage}`);
    }
  }
}
