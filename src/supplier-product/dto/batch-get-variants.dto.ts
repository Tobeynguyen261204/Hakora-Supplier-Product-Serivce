import { IsNotEmpty, IsArray, IsString, IsUUID } from 'class-validator';

export class BatchGetVariantsDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  variantIds: string[];
}
