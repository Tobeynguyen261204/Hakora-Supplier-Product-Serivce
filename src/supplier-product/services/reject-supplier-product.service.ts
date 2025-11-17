import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';
import { SupplierProductBusinessService } from './supplier-product-business.service';
import { SupplierProductComputedPropertiesService } from './supplier-product-computed-properties.service';
import { SupplierProductNotFoundException, SupplierProductBusinessRuleException, SupplierProductValidationException } from '../exceptions/supplier-product.exceptions';

@Injectable()
export class RejectSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly supplierProductBusinessService: SupplierProductBusinessService,
    private readonly computedPropertiesService: SupplierProductComputedPropertiesService
  ) {}

  async execute(productId: string, reason: string, rejectedBy: string): Promise<SupplierProductResponseDto> {
    // 1. Get product
    const product = await this.supplierProductRepository.findById(productId);
    if (!product) {
      throw new SupplierProductNotFoundException(productId);
    }

    // 2. Check if product can be rejected
    if (product.approvalStatus === 'REJECTED') {
      throw new SupplierProductBusinessRuleException('Product is already rejected');
    }

    if (product.approvalStatus === 'APPROVED') {
      throw new SupplierProductBusinessRuleException('Cannot reject an approved product');
    }

    // 3. Validate rejection reason
    if (!reason || reason.trim().length === 0) {
      throw new SupplierProductValidationException('Rejection reason is required');
    }

    // 4. Reject product using business service
    const rejectedProduct = this.supplierProductBusinessService.reject(product, reason, rejectedBy);

    // 5. Save rejected product
    const savedProduct = await this.supplierProductRepository.updateProduct(rejectedProduct);

    // 6. Map to DTO với computed properties (mapper tự động orchestrate)
    return SupplierProductMapper.toResponseDtoWithComputed(savedProduct, this.computedPropertiesService);
  }
}




