import { IsString, IsNumber, IsOptional, IsArray, IsEnum, IsBoolean, ValidateNested, Min, Max, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductType } from '../../domain/enums/product-type.enum';
import { ProductStatus } from '../../domain/enums/product-status.enum';

import { ProductPriceDto } from './product-price.dto';

export class ProductInventoryDto {
  @IsNumber()
  @Min(0)
  quantity: number;
}

export class ProductDimensionsDto {
  @IsNumber()
  @Min(0)
  length: number;

  @IsNumber()
  @Min(0)
  width: number;

  @IsNumber()
  @Min(0)
  height: number;

  @IsString()
  unit: string = 'cm';
}

export class ProductWeightDto {
  @IsNumber()
  @Min(0)
  value: number;

  @IsString()
  unit: string = 'kg';
}

export class ProductSpecificationsDto {
  @IsOptional()
  specifications?: Record<string, string>;

  // dimensions removed
  // weight removed

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  materials?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  colors?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sizes?: string[];
}

export class ProductImageDto {
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sortOrder?: number = 0;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean = false;

  @IsOptional()
  @IsNumber()
  @Min(0)
  width?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  height?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  fileSize?: number;

  @IsOptional()
  @IsString()
  mimeType?: string;
}

export class ProductShippingInfoDto {
  // removed
}

export class ProductSEODto {
  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];
}

export class CreateSupplierProductRequest {
  @IsUUID()
  supplierId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsString()
  sku: string;

  @IsString()
  categoryName: string;

  @ValidateNested()
  @Type(() => ProductPriceDto)
  price: ProductPriceDto;

  @ValidateNested()
  @Type(() => ProductInventoryDto)
  inventory: ProductInventoryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductSpecificationsDto)
  specifications?: ProductSpecificationsDto;

  @IsEnum(ProductType)
  type: ProductType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean = false;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDimensionsDto)
  dimensions?: ProductDimensionsDto;

  // shippingInfo removed

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductSEODto)
  seoData?: ProductSEODto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  images?: ProductImageDto[];
}
