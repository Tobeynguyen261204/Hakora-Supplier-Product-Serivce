import { IsString, IsNumber, IsOptional, IsArray, IsEnum, IsBoolean, ValidateNested, Min, Max, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductType } from '../enums/product-type.enum';
import { ProductStatus } from '../enums/product-status.enum';


export class UpdateProductPriceDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  listingPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  retailPrice?: number;

  @IsOptional()
  @IsString()
  currency?: string;
}

export class UpdateProductInventoryDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;
}

export class UpdateProductDimensionsDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  length?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  width?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  height?: number;

  @IsOptional()
  @IsString()
  unit?: string;
}

export class UpdateProductWeightDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  value?: number;

  @IsOptional()
  @IsString()
  unit?: string;
}

export class UpdateProductSpecificationsDto {
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

export class UpdateProductImageDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  altText?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sortOrder?: number;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

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

export class UpdateProductShippingInfoDto {
  // removed
}

export class UpdateProductSEODto {
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

export class UpdateSupplierProductRequest {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsUUID()
  supplierId?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsOptional()
  @IsUUID(4, { message: 'Category ID must be a valid UUID' })
  categoryId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProductPriceDto)
  price?: UpdateProductPriceDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProductInventoryDto)
  inventory?: UpdateProductInventoryDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProductSpecificationsDto)
  specifications?: UpdateProductSpecificationsDto;

  @IsOptional()
  @IsEnum(ProductType)
  type?: ProductType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProductDimensionsDto)
  dimensions?: UpdateProductDimensionsDto;

  // shippingInfo removed

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateProductSEODto)
  seoData?: UpdateProductSEODto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductImageDto)
  images?: UpdateProductImageDto[];
}
