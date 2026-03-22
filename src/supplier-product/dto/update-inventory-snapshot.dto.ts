import { IsNotEmpty, IsString, IsUUID, IsNumber, Min } from 'class-validator';

export class UpdateInventorySnapshotDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  variantId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  inventory: number;
}
