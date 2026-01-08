import { Injectable, NotFoundException } from '@nestjs/common';
import { ShippingMethodRepository } from '../repositories/shipping-method.repository';
import { ShippingMethodOrm } from '../entities/shipping-method.entity';

@Injectable()
export class GetShippingMethodsService {
  constructor(
    private readonly shippingMethodRepository: ShippingMethodRepository,
  ) {}

  async execute(supplierId: string, isActive?: boolean): Promise<ShippingMethodOrm[]> {
    return await this.shippingMethodRepository.findBySupplierId(supplierId, isActive);
  }
}

