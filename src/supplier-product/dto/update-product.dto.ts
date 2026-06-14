import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

type PatchOperation = 'UPSERT' | 'DELETE';

class UpdateProductImageItemDto {
  @IsIn(['UPSERT', 'DELETE'])
  operation: PatchOperation;

  @ValidateIf((o) => o.operation === 'DELETE')
  @IsUUID()
  id?: string;

  @ValidateIf((o) => o.operation === 'UPSERT')
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sortOrder?: number;
}

class UpdateProductVariantItemDto {
  @IsIn(['UPSERT', 'DELETE'])
  operation: PatchOperation;

  @IsOptional()
  @IsUUID()
  @ValidateIf((o) => o.operation === 'DELETE' || o.id !== undefined)
  id?: string;

  @ValidateIf((o) => o.operation === 'UPSERT')
  @IsString()
  sku?: string;

  @ValidateIf((o) => o.operation === 'UPSERT')
  @IsNumber()
  @Min(0)
  supplierPrice?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  inventorySnapshot?: number;

  @IsOptional()
  @IsObject()
  attributes?: Record<string, string>;
}

export class UpdateProductDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  version?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductImageItemDto)
  images?: UpdateProductImageItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductVariantItemDto)
  variants?: UpdateProductVariantItemDto[];

  @IsOptional()
  @IsString()
  modelGlbUrl?: string;

  @IsOptional()
  @IsString()
  modelVideoUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  modelOrbitImageUrls?: string[];

  @IsOptional()
  @IsIn([
    'draft',
    'pending_review',
    'active',
    'hidden',
    'discontinued',
  ])
  status?: string;
}