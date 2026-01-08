import { IsUUID, IsString, IsOptional, IsNumber, IsArray, Min, Max, IsBoolean, IsEnum } from 'class-validator';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';
import { ProductType } from '../enums/product-type.enum';

/**
 * Common DTOs cho các requests đơn giản
 */

export class GetByIdRequest {
  @IsUUID(4, { message: 'ID must be a valid UUID' })
  id: string;
}

export class GetSupplierProductRequest {
  @IsUUID(4, { message: 'ID must be a valid UUID' })
  id: string;

  @IsOptional()
  @IsUUID(4, { message: 'Supplier ID must be a valid UUID' })
  supplierId?: string;
}

export class DeleteSupplierProductRequest {
  @IsUUID(4, { message: 'ID must be a valid UUID' })
  id: string;

  @IsOptional()
  @IsUUID(4, { message: 'Supplier ID must be a valid UUID' })
  supplierId?: string;
}

export class GetBySupplierIdRequest {
  @IsUUID(4, { message: 'Supplier ID must be a valid UUID' })
  supplierId: string;
}

export class GetSupplierProductsRequest {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsEnum(ApprovalStatus)
  approvalStatus?: ApprovalStatus;

  @IsOptional()
  @IsUUID(4)
  supplierId?: string;

  @IsOptional()
  @IsUUID(4)
  userId?: string;

  @IsOptional()
  @IsString()
  userRole?: string;

  @IsOptional()
  @IsString()
  categoryName?: string;

  // ✅ FIXED: Thêm categoryId để filter chính xác bằng UUID
  @IsOptional()
  @IsUUID(4, { message: 'Category ID must be a valid UUID' })
  categoryId?: string;

  @IsOptional()
  @IsEnum(ProductType)
  type?: ProductType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsBoolean()
  isSuspend?: boolean;
}

export class ApproveSupplierProductRequest {
  @IsUUID(4, { message: 'Product ID must be a valid UUID' })
  id: string;

  @IsString({ message: 'Approved by must be a string' })
  approvedBy: string;
}

export class RejectSupplierProductRequest {
  @IsUUID(4, { message: 'Product ID must be a valid UUID' })
  id: string;

  @IsString({ message: 'Rejection reason must be a string' })
  reason: string;

  @IsString({ message: 'Rejected by must be a string' })
  rejectedBy: string;
}

export class HideSupplierProductRequest {
  @IsUUID(4, { message: 'Product ID must be a valid UUID' })
  id: string;

  @IsUUID(4, { message: 'Supplier ID must be a valid UUID' })
  supplierId: string;

  @IsString({ message: 'Reason must be a string' })
  reason: string;

  @IsString({ message: 'Hidden by must be a string' })
  hiddenBy: string;
}

export class UnhideSupplierProductRequest {
  @IsUUID(4, { message: 'Product ID must be a valid UUID' })
  id: string;

  @IsUUID(4, { message: 'Supplier ID must be a valid UUID' })
  supplierId: string;

  @IsString({ message: 'Unhidden by must be a string' })
  unhiddenBy: string;
}

export class SuspendSupplierProductRequest {
  @IsUUID(4, { message: 'Product ID must be a valid UUID' })
  id: string;

  @IsString({ message: 'Reason must be a string' })
  reason: string;

  @IsString({ message: 'Suspended by must be a string' })
  suspendedBy: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  suspensionDuration?: number;

  @IsOptional()
  @IsUUID(4, { message: 'Supplier ID must be a valid UUID' })
  supplierId?: string;
}

export class UnsuspendSupplierProductRequest {
  @IsUUID(4, { message: 'Product ID must be a valid UUID' })
  id: string;

  @IsString({ message: 'Reason must be a string' })
  reason: string;

  @IsString({ message: 'Unsuspended by must be a string' })
  unsuspendedBy: string;

  @IsOptional()
  @IsUUID(4, { message: 'Supplier ID must be a valid UUID' })
  supplierId?: string;
}

export class GetSupplierProductsByIdsRequest {
  @IsArray({ message: 'Product IDs must be an array' })
  @IsUUID(4, { each: true, message: 'Each product ID must be a valid UUID' })
  productIds: string[];

  @IsOptional()
  @IsUUID(4, { message: 'Supplier ID must be a valid UUID' })
  supplierId?: string;
}

export class ListSupplierProductSellerViewRequest {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsUUID(4)
  supplierId?: string;
}

