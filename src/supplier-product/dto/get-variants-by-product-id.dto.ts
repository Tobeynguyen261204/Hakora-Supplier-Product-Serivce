import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetVariantsByProductIdDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;
}
