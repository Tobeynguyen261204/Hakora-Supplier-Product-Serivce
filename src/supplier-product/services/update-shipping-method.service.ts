import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { ShippingMethodRepository } from '../repositories/shipping-method.repository';
import { ShippingMethodOrm } from '../entities/shipping-method.entity';

@Injectable()
export class UpdateShippingMethodService {
  constructor(
    private readonly shippingMethodRepository: ShippingMethodRepository,
  ) {}

  async execute(
    id: string,
    supplierId: string,
    data: {
      name?: string;
      description?: string;
      price?: number;
      estimatedDays?: string;
      isActive?: boolean;
    }
  ): Promise<ShippingMethodOrm> {
    // Find shipping method and validate ownership
    const shippingMethod = await this.shippingMethodRepository.findByIdAndSupplierId(id, supplierId);

    if (!shippingMethod) {
      throw new NotFoundException(`Shipping method with id ${id} not found or you don't have permission to update it`);
    }

    // Validate price if provided
    if (data.price !== undefined && data.price <= 0) {
      throw new BadRequestException('Shipping price must be greater than 0');
    }

    // Validate name if provided
    if (data.name !== undefined && (!data.name || data.name.trim().length === 0)) {
      throw new BadRequestException('Shipping method name is required');
    }

    // Check if name already exists (if name is being changed)
    if (data.name && data.name.trim() !== shippingMethod.name) {
      const existing = await this.shippingMethodRepository.findOne({
        where: {
          supplierId,
          name: data.name.trim(),
        },
      });

      if (existing && existing.id !== id) {
        throw new BadRequestException(`Shipping method with name "${data.name}" already exists`);
      }
    }

    // Update fields
    if (data.name !== undefined) {
      shippingMethod.name = data.name.trim();
    }
    if (data.description !== undefined) {
      shippingMethod.description = data.description?.trim() || null;
    }
    if (data.price !== undefined) {
      shippingMethod.price = data.price;
    }
    if (data.estimatedDays !== undefined) {
      shippingMethod.estimatedDays = data.estimatedDays || null;
    }
    if (data.isActive !== undefined) {
      shippingMethod.isActive = data.isActive;
    }

    return await this.shippingMethodRepository.save(shippingMethod);
  }
}

