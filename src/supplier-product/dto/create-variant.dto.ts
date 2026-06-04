import { IsNotEmpty, IsString, IsUUID, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateVariantDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  supplierPrice: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  attributes?: Record<string, string>;

  @IsOptional()
  @IsNumber()
  @Min(0)
  inventorySnapshot?: number;
}
