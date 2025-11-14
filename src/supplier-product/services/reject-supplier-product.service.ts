import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';

@Injectable()
export class RejectSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository
  ) {}

  async execute(productId: string, reason: string, rejectedBy: string): Promise<SupplierProductResponseDto> {
    // 1. Get product
    const product = await this.supplierProductRepository.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // 2. Check if product can be rejected
    if (product.isRejected) {
      throw new BadRequestException('Product is already rejected');
    }

    if (product.isApproved) {
      throw new BadRequestException('Cannot reject an approved product');
    }

    // 3. Validate rejection reason
    if (!reason || reason.trim().length === 0) {
      throw new BadRequestException('Rejection reason is required');
    }

    // 4. Reject product
    const rejectedProduct = product.reject(reason, rejectedBy);

    // 5. Save rejected product
    const savedProduct = await this.supplierProductRepository.update(rejectedProduct);

    // 6. Return response
    return SupplierProductMapper.toResponseDto(savedProduct);
  }
}




