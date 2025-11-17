import { Injectable } from '@nestjs/common';
import { SupplierProductRepository } from '../repositories/supplier-product.repository';
import { ProductStatus } from '../enums/product-status.enum';
import { SupplierProductOrm } from '../entities/supplier-product.entity';
import { SupplierProductBusinessService } from './supplier-product-business.service';
import { SupplierProductNotFoundException, SupplierProductBusinessRuleException, SupplierProductValidationException } from '../exceptions/supplier-product.exceptions';
import { UnhideSupplierProductRequest } from '../dto/common-request.dto';

@Injectable()
export class UnhideSupplierProductService {
  constructor(
    private readonly supplierProductRepository: SupplierProductRepository,
    private readonly supplierProductBusinessService: SupplierProductBusinessService
  ) {}

  async execute(request: UnhideSupplierProductRequest): Promise<{ success: boolean; message: string; data?: any }> {
    const { id, unhiddenBy } = request;

    if (!id) {
      throw new SupplierProductValidationException('Product ID is required');
    }
    if (!unhiddenBy) {
      throw new SupplierProductValidationException('Supplier ID who unhides the product is required');
    }

    const product = await this.supplierProductRepository.findById(id);
    if (!product) {
      throw new SupplierProductNotFoundException(id);
    }

    if (product.isActive) {
      throw new SupplierProductBusinessRuleException('Product is not hidden');
    }

    // Unhide the product by setting isActive to true
    product.isActive = true;
    product.isSuspend = false;
    product.status = ProductStatus.PUBLISHED;
    const updatedProduct = product;

    const adminNote = {
      action: 'UNHIDDEN',
      performedBy: unhiddenBy,
      performedAt: new Date()
    };

    const savedProduct = await this.supplierProductRepository.save(updatedProduct);

    return {
      success: true,
      message: 'Product unhidden successfully',
      data: {
        id: savedProduct.id,
        status: savedProduct.status,
        action: adminNote
      }
    };
  }
}




