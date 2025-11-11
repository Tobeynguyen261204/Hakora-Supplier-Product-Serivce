import { Injectable, Inject } from '@nestjs/common';
import type { ISupplierProductRepository } from '../../domain/repositories/supplier-product.repository.interface';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';

@Injectable()
export class ApproveSupplierProductUseCase {
  constructor(
    @Inject('SUPPLIER_PRODUCT_REPOSITORY')
    private readonly supplierProductRepository: ISupplierProductRepository
  ) {}

  async execute(productId: string, approvedBy: string): Promise<SupplierProductResponseDto> {
    try {
      // 1. Get product
      const product = await this.supplierProductRepository.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // 2. Check if product can be approved
      if (product.isApproved) {
        throw new Error('Product is already approved');
      }

      if (product.isRejected) {
        throw new Error('Cannot approve a rejected product');
      }

      // 3. Approve product
      const approvedProduct = product.approve(approvedBy);

      // 4. Save approved product
      const savedProduct = await this.supplierProductRepository.update(approvedProduct);

      // 5. Return response
      return SupplierProductMapper.toResponseDto(savedProduct);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      throw new Error(`Failed to approve supplier product: ${errorMessage}`);
    }
  }
}
