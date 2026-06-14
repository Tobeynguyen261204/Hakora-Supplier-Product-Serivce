import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AdminRejectProductDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsString()
  reason: string;
}
