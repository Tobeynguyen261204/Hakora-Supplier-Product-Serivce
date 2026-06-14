import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

const STATUSES = [
  'none',
  'pending',
  'extracting_frames',
  'reconstructing',
  'optimizing',
  'ready',
  'failed',
] as const;

export class UpdateModel3dDto {
  @IsUUID()
  @IsNotEmpty()
  productId!: string;

  @IsOptional()
  @IsIn(STATUSES)
  model3dStatus?: (typeof STATUSES)[number];

  @IsOptional()
  @IsString()
  modelGlbUrl?: string;

  @IsOptional()
  @IsString()
  modelVideoUrl?: string;

  @IsOptional()
  @IsString()
  model3dPosterUrl?: string;

  @IsOptional()
  @IsString()
  model3dJobId?: string;

  @IsOptional()
  @IsIn(['none', 'colmap', 'manual_glb', 'orbit_images', 'triposr', 'instantmesh'])
  model3dSource?: 'none' | 'colmap' | 'manual_glb' | 'orbit_images' | 'triposr' | 'instantmesh';

  @IsOptional()
  @IsString()
  model3dError?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  model3dProgress?: number;
}
