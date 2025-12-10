import { Injectable, NotFoundException } from '@nestjs/common';
import { ShippingMethodRepository } from '../repositories/shipping-method.repository';
import { ShippingMethodOrm } from '../entities/shipping-method.entity';

@Injectable()
export class GetShippingMethodService {
  constructor(
    private readonly shippingMethodRepository: ShippingMethodRepository,
  ) {}

  async execute(id: string): Promise<ShippingMethodOrm> {
    const shippingMethod = await this.shippingMethodRepository.findOne({
      where: { id },
    });

    if (!shippingMethod) {
      throw new NotFoundException(`Shipping method with id ${id} not found`);
    }

    return shippingMethod;
  }
}

