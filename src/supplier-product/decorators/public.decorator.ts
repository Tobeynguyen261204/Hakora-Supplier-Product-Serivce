import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../guards/supplier-product-access.guard';

/**
 * Decorator để đánh dấu endpoint là public (không cần authentication)
 * Sử dụng với SupplierProductAccessGuard
 */
export const Public = () => SetMetadata(PUBLIC_KEY, true);

