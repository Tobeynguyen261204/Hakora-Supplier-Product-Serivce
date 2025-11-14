import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { SupplierProductMapper } from '../mappers/supplier-product.mapper';

@Injectable()
export class ApproveSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository
  ) {}

  async execute(productId: string, approvedBy: string): Promise<SupplierProductResponseDto> {
    // 1. Get product
    const product = await this.supplierProductRepository.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // 2. Check if product can be approved
    if (product.isApproved) {
      throw new BadRequestException('Product is already approved');
    }

    if (product.isRejected) {
      throw new BadRequestException('Cannot approve a rejected product');
    }

    // 3. Approve product
    const approvedProduct = product.approve(approvedBy);

    // 4. Save approved product
    const savedProduct = await this.supplierProductRepository.update(approvedProduct);

    // 5. Return response
    return SupplierProductMapper.toResponseDto(savedProduct);
  }
}




