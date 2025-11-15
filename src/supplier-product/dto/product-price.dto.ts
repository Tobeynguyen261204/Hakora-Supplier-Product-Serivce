import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class ProductPriceDto {
  @IsNumber()
  @Min(0)
  listingPrice: number;

  @IsNumber()
  @Min(0)
  retailPrice: number;

  @IsString()
  currency: string = 'VND';
}

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

export class ProductPriceResponseDto {
  listingPrice: number;
  retailPrice: number;
  currency: string;
  profitAmount: number;
}

