import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetSupplierProductDetailDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;
}
