import { Injectable, BadRequestException } from '@nestjs/common';
import { ShippingMethodRepository } from '../repositories/shipping-method.repository';
import { ShippingMethodOrm } from '../entities/shipping-method.entity';

@Injectable()
export class CreateShippingMethodService {
  constructor(
    private readonly shippingMethodRepository: ShippingMethodRepository,
  ) {}

  async execute(data: {
    supplierId: string;
    name: string;
    description?: string;
    price: number;
    estimatedDays?: string;
    isActive?: boolean;
  }): Promise<ShippingMethodOrm> {
    // Validate price
    if (data.price <= 0) {
      throw new BadRequestException('Shipping price must be greater than 0');
    }

    // Validate name
    if (!data.name || data.name.trim().length === 0) {
      throw new BadRequestException('Shipping method name is required');
    }

    // Check if supplier already has a method with the same name
    const existing = await this.shippingMethodRepository.findOne({
      where: {
        supplierId: data.supplierId,
        name: data.name.trim(),
      },
    });

    if (existing) {
      throw new BadRequestException(`Shipping method with name "${data.name}" already exists`);
    }

    // Create new shipping method
    const shippingMethod = new ShippingMethodOrm();
    shippingMethod.supplierId = data.supplierId;
    shippingMethod.name = data.name.trim();
    shippingMethod.description = data.description?.trim() || null;
    shippingMethod.price = data.price;
    shippingMethod.estimatedDays = data.estimatedDays || null;
    shippingMethod.isActive = data.isActive !== undefined ? data.isActive : true;

    return await this.shippingMethodRepository.save(shippingMethod);
  }
}

