import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class PublishProductDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;
}
