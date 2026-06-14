import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AdminApproveProductDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;
}
