import { registerAs } from '@nestjs/config';
import { IsNumber, IsString, IsBoolean, validateSync } from 'class-validator';
import { plainToClass, Transform } from 'class-transformer';

class EnvironmentVariables {
  @IsString()
  DATABASE_HOST: string = 'localhost';

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  DATABASE_PORT: number = 5432;

  @IsString()
  DATABASE_USERNAME: string = 'postgres';

  @IsString()
  DATABASE_PASSWORD: string = 'password';

  @IsString()
  DATABASE_NAME: string = 'SupplierProductService';

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  DATABASE_SYNCHRONIZE: boolean = false;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  DATABASE_LOGGING: boolean = false;

  @IsString()
  NODE_ENV: string = 'development';

  @IsString()
  LOG_LEVEL: string = 'info';

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  PORT: number = 3000;

  @IsString()
  GRPC_URL: string = 'localhost:50051';

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  MAX_FILE_SIZE: number = 5 * 1024 * 1024; // 5MB
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(`Configuration validation error: ${errors.toString()}`);
  }

  return validatedConfig;
}

export default registerAs('supplierProduct', () => ({
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'SupplierProductService',
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    logging: process.env.DATABASE_LOGGING === 'true',
  },
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
    port: parseInt(process.env.PORT || '3000', 10),
    grpcUrl: process.env.GRPC_URL || 'localhost:50051',
  },
  business: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5MB
  },
}));
