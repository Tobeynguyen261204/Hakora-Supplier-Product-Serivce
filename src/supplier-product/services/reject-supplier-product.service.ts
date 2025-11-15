import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';
import { SupplierProductBusinessService } from './supplier-product-business.service';

@Injectable()
export class RejectSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly supplierProductBusinessService: SupplierProductBusinessService
  ) {}

  async execute(productId: string, reason: string, rejectedBy: string): Promise<SupplierProductResponseDto> {
    // 1. Get product
    const product = await this.supplierProductRepository.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // 2. Check if product can be rejected
    if (product.approvalStatus === 'REJECTED') {
      throw new BadRequestException('Product is already rejected');
    }

    if (product.approvalStatus === 'APPROVED') {
      throw new BadRequestException('Cannot reject an approved product');
    }

    // 3. Validate rejection reason
    if (!reason || reason.trim().length === 0) {
      throw new BadRequestException('Rejection reason is required');
    }

    // 4. Reject product using business service
    const rejectedProduct = this.supplierProductBusinessService.reject(product, reason, rejectedBy);

    // 5. Save rejected product
    const savedProduct = await this.supplierProductRepository.updateProduct(rejectedProduct);

    // 6. Return response
    return SupplierProductMapper.toResponseDto(savedProduct);
  }
}




