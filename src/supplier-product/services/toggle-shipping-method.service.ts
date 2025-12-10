import { Injectable, NotFoundException } from '@nestjs/common';
import { ShippingMethodRepository } from '../repositories/shipping-method.repository';
import { ShippingMethodOrm } from '../entities/shipping-method.entity';

@Injectable()
export class ToggleShippingMethodService {
  constructor(
    private readonly shippingMethodRepository: ShippingMethodRepository,
  ) {}

  async execute(id: string, supplierId: string, isActive: boolean): Promise<ShippingMethodOrm> {
    // Find shipping method and validate ownership
    const shippingMethod = await this.shippingMethodRepository.findByIdAndSupplierId(id, supplierId);

    if (!shippingMethod) {
      throw new NotFoundException(`Shipping method with id ${id} not found or you don't have permission to update it`);
    }

    shippingMethod.isActive = isActive;
    return await this.shippingMethodRepository.save(shippingMethod);
  }
}

