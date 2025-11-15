import { 
  IsString, 
  IsNumber, 
  IsOptional, 
  IsArray, 
  IsEnum, 
  IsBoolean, 
  ValidateNested, 
  Min, 
  Max, 
  IsUUID,
  Length,
  IsUrl,
  ArrayMaxSize,
  IsPositive,
  Matches
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductType } from '../enums/product-type.enum';
import { ProductPriceDto } from './product-price.dto';
import { SUPPLIER_PRODUCT_CONSTANTS } from '../constants/supplier-product.constants';

export class ProductInventoryDto {
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(SUPPLIER_PRODUCT_CONSTANTS.MIN_QUANTITY, { 
    message: `Quantity must be at least ${SUPPLIER_PRODUCT_CONSTANTS.MIN_QUANTITY}` 
  })
  @IsPositive({ message: 'Quantity must be positive' })
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
  @IsString({ message: 'Image URL must be a string' })
  @IsUrl({}, { message: 'Image URL must be a valid URL' })
  url: string;

  @IsOptional()
  @IsString({ message: 'Alt text must be a string' })
  @Length(0, 255, { message: 'Alt text must be at most 255 characters' })
  altText?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Sort order must be a number' })
  @Min(0, { message: 'Sort order must be non-negative' })
  sortOrder?: number = 0;

  @IsOptional()
  @IsBoolean({ message: 'isPrimary must be a boolean' })
  isPrimary?: boolean = false;

  @IsOptional()
  @IsNumber({}, { message: 'Width must be a number' })
  @Min(1, { message: 'Width must be at least 1 pixel' })
  width?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Height must be a number' })
  @Min(1, { message: 'Height must be at least 1 pixel' })
  height?: number;

  @IsOptional()
  @IsNumber({}, { message: 'File size must be a number' })
  @Min(0, { message: 'File size must be non-negative' })
  fileSize?: number;

  @IsOptional()
  @IsString({ message: 'MIME type must be a string' })
  @Matches(/^image\/(jpeg|jpg|png|gif|webp)$/i, { 
    message: 'MIME type must be a valid image type' 
  })
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
  @IsUUID(4, { message: 'Supplier ID must be a valid UUID' })
  supplierId: string;

  @IsString({ message: 'Product name must be a string' })
  @Length(
    SUPPLIER_PRODUCT_CONSTANTS.MIN_NAME_LENGTH, 
    SUPPLIER_PRODUCT_CONSTANTS.MAX_NAME_LENGTH,
    { message: `Product name must be between ${SUPPLIER_PRODUCT_CONSTANTS.MIN_NAME_LENGTH} and ${SUPPLIER_PRODUCT_CONSTANTS.MAX_NAME_LENGTH} characters` }
  )
  name: string;

  @IsString({ message: 'Description must be a string' })
  @Length(
    SUPPLIER_PRODUCT_CONSTANTS.MIN_DESCRIPTION_LENGTH, 
    SUPPLIER_PRODUCT_CONSTANTS.MAX_DESCRIPTION_LENGTH,
    { message: `Description must be between ${SUPPLIER_PRODUCT_CONSTANTS.MIN_DESCRIPTION_LENGTH} and ${SUPPLIER_PRODUCT_CONSTANTS.MAX_DESCRIPTION_LENGTH} characters` }
  )
  description: string;

  @IsOptional()
  @IsString({ message: 'Short description must be a string' })
  @Length(0, 500, { message: 'Short description must be at most 500 characters' })
  shortDescription?: string;

  @IsString({ message: 'SKU must be a string' })
  @Length(
    SUPPLIER_PRODUCT_CONSTANTS.MIN_SKU_LENGTH, 
    SUPPLIER_PRODUCT_CONSTANTS.MAX_SKU_LENGTH,
    { message: `SKU must be between ${SUPPLIER_PRODUCT_CONSTANTS.MIN_SKU_LENGTH} and ${SUPPLIER_PRODUCT_CONSTANTS.MAX_SKU_LENGTH} characters` }
  )
  @Matches(/^[A-Z0-9_-]+$/i, { message: 'SKU can only contain letters, numbers, hyphens, and underscores' })
  sku: string;

  @IsString({ message: 'Category name must be a string' })
  @Length(1, 100, { message: 'Category name must be between 1 and 100 characters' })
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
  @IsArray({ message: 'Tags must be an array' })
  @ArrayMaxSize(SUPPLIER_PRODUCT_CONSTANTS.MAX_TAGS_PER_PRODUCT, { 
    message: `Maximum ${SUPPLIER_PRODUCT_CONSTANTS.MAX_TAGS_PER_PRODUCT} tags allowed` 
  })
  @IsString({ each: true, message: 'Each tag must be a string' })
  @Length(1, SUPPLIER_PRODUCT_CONSTANTS.MAX_TAG_LENGTH, { 
    each: true, 
    message: `Each tag must be between 1 and ${SUPPLIER_PRODUCT_CONSTANTS.MAX_TAG_LENGTH} characters` 
  })
  tags?: string[];

  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive?: boolean = true;

  @IsOptional()
  @IsBoolean({ message: 'isFeatured must be a boolean' })
  isFeatured?: boolean = false;

  @IsOptional()
  @IsNumber({}, { message: 'Weight must be a number' })
  @Min(0, { message: 'Weight must be non-negative' })
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
  @IsArray({ message: 'Images must be an array' })
  @ArrayMaxSize(SUPPLIER_PRODUCT_CONSTANTS.MAX_IMAGES_PER_PRODUCT, { 
    message: `Maximum ${SUPPLIER_PRODUCT_CONSTANTS.MAX_IMAGES_PER_PRODUCT} images allowed` 
  })
  @ValidateNested({ each: true })
  @Type(() => ProductImageDto)
  images?: ProductImageDto[];
}


