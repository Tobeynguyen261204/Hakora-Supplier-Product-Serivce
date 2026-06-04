import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AdminSuspendProductDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsString()
  reason: string;
}
