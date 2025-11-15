import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';
import { SupplierProductBusinessService } from './supplier-product-business.service';

@Injectable()
export class ApproveSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly supplierProductBusinessService: SupplierProductBusinessService
  ) {}

  async execute(productId: string, approvedBy: string): Promise<SupplierProductResponseDto> {
    // 1. Get product
    const product = await this.supplierProductRepository.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // 2. Check if product can be approved
    if (product.approvalStatus === 'APPROVED') {
      throw new BadRequestException('Product is already approved');
    }

    if (product.approvalStatus === 'REJECTED') {
      throw new BadRequestException('Cannot approve a rejected product');
    }

    // 3. Approve the product using business service
    const approvedProduct = this.supplierProductBusinessService.approve(product, approvedBy);

    // 4. Save approved product
    const savedProduct = await this.supplierProductRepository.updateProduct(approvedProduct);

    // 5. Return response
    return SupplierProductMapper.toResponseDto(savedProduct);
  }
}




