import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AdminUnsuspendProductDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;
}
