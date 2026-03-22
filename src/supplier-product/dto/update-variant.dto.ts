import { IsNotEmpty, IsString, IsUUID, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateVariantDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  variantId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  supplierPrice: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  inventorySnapshot?: number;
}
