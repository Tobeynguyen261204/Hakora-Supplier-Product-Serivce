import {
  IsArray,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateProductImageItemDto {
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  isPrimary?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sortOrder?: number;
}

class CreateProductVariantItemDto {
  @IsString()
  sku: string;

  @IsNumber()
  @Min(0)
  supplierPrice: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsObject()
  attributes?: Record<string, string>;

  @IsOptional()
  @IsNumber()
  @Min(0)
  inventorySnapshot?: number;
}

export class CreateProductDto {
  // supplierId lấy từ metadata ở controller, không nên bắt client gửi
  @IsOptional()
  @IsUUID()
  supplierId?: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsObject()
  specifications?: Record<string, string>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsIn(['draft', 'pending_review', 'active', 'hidden', 'out_of_stock', 'discontinued', 'suspended', 'banned', 'archived', 'rejected'])
  status?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageItemDto)
  images?: CreateProductImageItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantItemDto)
  variants?: CreateProductVariantItemDto[];

  @IsOptional()
  @IsString()
  modelGlbUrl?: string;
}