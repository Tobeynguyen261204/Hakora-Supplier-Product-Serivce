import { Injectable, NotFoundException } from '@nestjs/common';
import { ShippingMethodRepository } from '../repositories/shipping-method.repository';

@Injectable()
export class DeleteShippingMethodService {
  constructor(
    private readonly shippingMethodRepository: ShippingMethodRepository,
  ) {}

  async execute(id: string, supplierId: string): Promise<void> {
    // Find shipping method and validate ownership
    const shippingMethod = await this.shippingMethodRepository.findByIdAndSupplierId(id, supplierId);

    if (!shippingMethod) {
      throw new NotFoundException(`Shipping method with id ${id} not found or you don't have permission to delete it`);
    }

    await this.shippingMethodRepository.remove(shippingMethod);
  }
}

