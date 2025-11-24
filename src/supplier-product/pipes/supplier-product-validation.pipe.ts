import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { SUPPLIER_PRODUCT_CONSTANTS } from '../constants/supplier-product.constants';
import { EnumMapper } from '../utils/enum-mapper.util';

@Injectable()
export class SupplierProductValidationPipe implements PipeTransform<any> {
  private readonly logger = new Logger(SupplierProductValidationPipe.name);

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Transform enum values và UUID fields từ gRPC format sang domain format trước khi validate
    const transformedValue = this.transformEnums(
      this.transformUUIDs(value, metatype),
      metatype
    );

    const object = plainToInstance(metatype, transformedValue, {
      enableImplicitConversion: true,
      exposeDefaultValues: true,
    });
    
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    });

    if (errors.length > 0) {
      // Log chi tiết lỗi validation để debug
      this.logger.error('Validation failed:', {
        metatype: metatype.name,
        value: JSON.stringify(value, null, 2),
        errors: this.formatValidationErrors(errors),
      });

      const errorMessages = this.formatValidationErrors(errors);

      // Throw RpcException cho gRPC (code 3 = INVALID_ARGUMENT)
      throw new RpcException({
        code: 3, // INVALID_ARGUMENT
        message: `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.VALIDATION_FAILED}: ${errorMessages.join('; ')}`,
        details: errorMessages,
      });
    }

    return object;
  }

  /**
   * Transform UUID fields từ gRPC format (number/string) sang string UUID
   * Các field UUID thường gặp: id, supplierId, productId, customerId, categoryId, etc.
   */
  private transformUUIDs(value: any, metatype: Function): any {
    if (!value || typeof value !== 'object') {
      return value;
    }

    const transformed = { ...value };

    // Danh sách các field có thể là UUID (single value)
    const uuidFields = ['id', 'supplierId', 'productId', 'customerId', 'categoryId'];
    
    uuidFields.forEach(field => {
      if (field in transformed && transformed[field] !== undefined && transformed[field] !== null) {
        // Convert number hoặc string sang string
        const fieldValue = transformed[field];
        if (typeof fieldValue === 'number') {
          // Nếu là number, convert sang string (có thể là UUID dạng number từ gRPC)
          transformed[field] = String(fieldValue);
        } else if (typeof fieldValue === 'string') {
          // Đảm bảo là string và trim whitespace
          transformed[field] = fieldValue.trim();
        }
      }
    });

    // Xử lý categoryName (có thể là string, không phải UUID)
    if ('categoryName' in transformed && transformed.categoryName !== undefined && transformed.categoryName !== null) {
      if (typeof transformed.categoryName === 'string') {
        transformed.categoryName = transformed.categoryName.trim();
      }
    }

    // Xử lý UUID arrays (ví dụ: productIds)
    const uuidArrayFields = ['productIds'];
    uuidArrayFields.forEach(field => {
      if (field in transformed && Array.isArray(transformed[field])) {
        transformed[field] = transformed[field].map((item: any) => {
          if (typeof item === 'number') {
            return String(item);
          } else if (typeof item === 'string') {
            return item.trim();
          }
          return item;
        });
      }
    });

    // Transform nested objects (nếu có)
    if (Array.isArray(transformed)) {
      return transformed.map(item => this.transformUUIDs(item, metatype));
    }

    // Recursively transform nested objects
    for (const key in transformed) {
      if (transformed[key] && typeof transformed[key] === 'object' && !Array.isArray(transformed[key])) {
        transformed[key] = this.transformUUIDs(transformed[key], metatype);
      }
    }

    return transformed;
  }

  /**
   * Transform enum values từ gRPC format (number/string) sang domain enum
   */
  private transformEnums(value: any, metatype: Function): any {
    if (!value || typeof value !== 'object') {
      return value;
    }

    const transformed = { ...value };

    // Transform ProductStatus
    if ('status' in transformed && transformed.status !== undefined) {
      transformed.status = EnumMapper.toProductStatus(transformed.status);
    }

    // Transform ApprovalStatus
    if ('approvalStatus' in transformed && transformed.approvalStatus !== undefined) {
      transformed.approvalStatus = EnumMapper.toApprovalStatus(transformed.approvalStatus);
    }

    // Transform ProductType
    if ('type' in transformed && transformed.type !== undefined) {
      transformed.type = EnumMapper.toProductType(transformed.type);
    }

    // Transform nested objects (nếu có)
    if (Array.isArray(transformed)) {
      return transformed.map(item => this.transformEnums(item, metatype));
    }

    // Recursively transform nested objects
    for (const key in transformed) {
      if (transformed[key] && typeof transformed[key] === 'object' && !Array.isArray(transformed[key])) {
        transformed[key] = this.transformEnums(transformed[key], metatype);
      }
    }

    return transformed;
  }

  /**
   * Format validation errors thành array of messages
   */
  private formatValidationErrors(errors: any[]): string[] {
    const messages: string[] = [];

    errors.forEach(error => {
      if (error.constraints) {
        Object.values(error.constraints).forEach((message: string) => {
          messages.push(`${error.property}: ${message}`);
        });
      }

      // Handle nested validation errors
      if (error.children && error.children.length > 0) {
        const nestedMessages = this.formatValidationErrors(error.children);
        nestedMessages.forEach(msg => {
          messages.push(`${error.property}.${msg}`);
        });
      }
    });

    return messages;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

@Injectable()
export class ParseUUIDPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    
    if (!value || !uuidRegex.test(value)) {
      // Throw RpcException cho gRPC (code 3 = INVALID_ARGUMENT)
      throw new RpcException({
        code: 3, // INVALID_ARGUMENT
        message: SUPPLIER_PRODUCT_CONSTANTS.ERRORS.INVALID_ID,
      });
    }
    
    return value;
  }
}

@Injectable()
export class ParsePaginationPipe implements PipeTransform {
  transform(value: any) {
    if (!value) return value;

    const { page, limit, ...rest } = value;

    return {
      ...rest,
      page: this.parsePositiveInt(page, SUPPLIER_PRODUCT_CONSTANTS.DEFAULT_PAGE),
      limit: this.parseLimit(limit, SUPPLIER_PRODUCT_CONSTANTS.DEFAULT_LIMIT),
    };
  }

  private parsePositiveInt(value: any, defaultValue: number): number {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) || parsed < 1 ? defaultValue : parsed;
  }

  private parseLimit(value: any, defaultValue: number): number {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed) || parsed < SUPPLIER_PRODUCT_CONSTANTS.MIN_LIMIT) {
      return defaultValue;
    }
    return Math.min(parsed, SUPPLIER_PRODUCT_CONSTANTS.MAX_LIMIT);
  }
}
