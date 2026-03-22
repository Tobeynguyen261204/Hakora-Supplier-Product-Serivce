import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UnpublishProductDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;
}
