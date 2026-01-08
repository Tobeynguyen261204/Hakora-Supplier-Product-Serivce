import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';
import { SupplierProductBusinessService } from './supplier-product-business.service';
import { SupplierProductComputedPropertiesService } from './supplier-product-computed-properties.service';
import { SupplierProductNotFoundException, SupplierProductBusinessRuleException } from '../exceptions/supplier-product.exceptions';

@Injectable()
export class ApproveSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly supplierProductBusinessService: SupplierProductBusinessService,
    private readonly computedPropertiesService: SupplierProductComputedPropertiesService
  ) {}

  async execute(productId: string, approvedBy: string): Promise<SupplierProductResponseDto> {
    // 1. Get product
    const product = await this.supplierProductRepository.findById(productId);
    if (!product) {
      throw new SupplierProductNotFoundException(productId);
    }

    // 2. Check if product can be approved
    if (product.approvalStatus === 'APPROVED') {
      throw new SupplierProductBusinessRuleException('Product is already approved');
    }

    if (product.approvalStatus === 'REJECTED') {
      throw new SupplierProductBusinessRuleException('Cannot approve a rejected product');
    }

    // 3. Approve the product using business service
    const approvedProduct = this.supplierProductBusinessService.approve(product, approvedBy);

    // 4. Save approved product
    const savedProduct = await this.supplierProductRepository.updateProduct(approvedProduct);

    // 5. Map to DTO với computed properties (mapper tự động orchestrate)
    return SupplierProductMapper.toResponseDtoWithComputed(savedProduct, this.computedPropertiesService);
  }
}




