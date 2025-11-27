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

    // Log raw value trước khi transform để debug
    console.log('[SupplierProductValidationPipe] ========== TRANSFORM START ==========');
    console.log('[SupplierProductValidationPipe] Metatype:', metatype.name);
    console.log('[SupplierProductValidationPipe] Raw value:', JSON.stringify(value, null, 2));
    console.log('[SupplierProductValidationPipe] Raw value keys:', value ? Object.keys(value) : []);
    console.log('[SupplierProductValidationPipe] Raw value check:', {
      hasPage: !!value?.page,
      page: value?.page,
      hasLimit: !!value?.limit,
      limit: value?.limit,
      hasCategoryId: !!value?.categoryId,
      categoryId: value?.categoryId,
      hasCategoryName: !!value?.categoryName,
      categoryName: value?.categoryName,
      hasSearch: !!value?.search,
      search: value?.search,
      hasIsFeatured: !!value?.isFeatured,
      isFeatured: value?.isFeatured,
    });

    // ✅ CRITICAL: Loại bỏ metadata fields (userId, userRole, supplierId) khỏi data
    // Các field này được inject bởi interceptor, không phải là phần của request DTO
    const metadataFields = ['userId', 'userRole', 'supplierId'];
    const valueWithoutMetadata = { ...value };
    metadataFields.forEach(field => {
      if (field in valueWithoutMetadata) {
        delete valueWithoutMetadata[field];
        console.log(`[SupplierProductValidationPipe] Removed metadata field: ${field}`);
      }
    });

    // ✅ Check nếu sau khi loại bỏ metadata, data trở thành empty object
    // Điều này có thể xảy ra nếu request thực sự không có body (chỉ có metadata)
    const remainingKeys = Object.keys(valueWithoutMetadata).filter(key => valueWithoutMetadata[key] !== undefined);
    if (remainingKeys.length === 0) {
      console.log('[SupplierProductValidationPipe] ⚠️ WARNING: Data is empty after removing metadata fields');
      console.log('[SupplierProductValidationPipe] This may indicate request has no body, only metadata');
      console.log('[SupplierProductValidationPipe] Will proceed with empty object - DTO will use default values');
    }

    // Clean data trước khi transform (remove binary data, validate structure)
    const cleanedValue = this.cleanInputData(valueWithoutMetadata);
    console.log('[SupplierProductValidationPipe] After cleanInputData:', {
      keys: Object.keys(cleanedValue),
      page: cleanedValue?.page,
      limit: cleanedValue?.limit,
      categoryId: cleanedValue?.categoryId,
    });

    // ✅ FIXED: Không map categoryId → categoryName nữa
    // DTO đã có categoryId field, giữ nguyên để filter chính xác bằng UUID

    // Transform enum values và UUID fields từ gRPC format sang domain format trước khi validate
    const transformedValue = this.transformEnums(
      this.transformUUIDs(cleanedValue, metatype),
      metatype
    );
    console.log('[SupplierProductValidationPipe] After transformEnums/transformUUIDs:', {
      keys: Object.keys(transformedValue),
      page: transformedValue?.page,
      limit: transformedValue?.limit,
      categoryId: transformedValue?.categoryId,
      categoryName: transformedValue?.categoryName,
    });

    // CRITICAL: Đảm bảo page và limit được map đúng
    // plainToInstance có thể không map đúng nếu field types không match
    // Đảm bảo page và limit là numbers trước khi plainToInstance
    if (transformedValue.page !== undefined) {
      transformedValue.page = Number(transformedValue.page) || 1;
    }
    if (transformedValue.limit !== undefined) {
      transformedValue.limit = Number(transformedValue.limit) || 10;
    }
    
    const object = plainToInstance(metatype, transformedValue, {
      enableImplicitConversion: true,
      exposeDefaultValues: true,
      excludeExtraneousValues: false, // CRITICAL: Không exclude các field không có decorator
    });
    console.log('[SupplierProductValidationPipe] After plainToInstance:', {
      keys: Object.keys(object),
      page: object?.page,
      limit: object?.limit,
      categoryName: object?.categoryName,
      search: object?.search,
      isFeatured: object?.isFeatured,
    });
    console.log('[SupplierProductValidationPipe] ========== TRANSFORM END ==========');
    
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

    // ✅ FIXED: Xử lý categoryId (UUID) - giữ nguyên để filter chính xác
    // DTO đã có categoryId field, không map sang categoryName nữa
    if ('categoryId' in transformed && transformed.categoryId !== undefined && transformed.categoryId !== null) {
      if (typeof transformed.categoryId === 'string') {
        transformed.categoryId = transformed.categoryId.trim();
      } else if (typeof transformed.categoryId === 'number') {
        transformed.categoryId = String(transformed.categoryId);
      }
      // ❌ KHÔNG map sang categoryName - giữ nguyên categoryId để filter
    }
    
    // Xử lý categoryName (nếu có) - dùng cho create/update, không dùng cho filter
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

  /**
   * Clean input data để tránh corrupt data từ gRPC
   */
  private cleanInputData(value: any): any {
    if (!value || typeof value !== 'object') {
      return value;
    }

    const cleaned: any = { ...value };

    // Clean string fields - remove binary data
    // ✅ FIXED: Thêm categoryId vào danh sách fields cần clean
    ['id', 'name', 'description', 'shortDescription', 'sku', 'categoryName', 'categoryId', 'supplierId'].forEach((field) => {
      if (cleaned[field] && typeof cleaned[field] === 'string') {
        // Remove non-printable characters (giữ lại \n, \r, \t)
        const original = cleaned[field];
        cleaned[field] = original.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
        
        // Validate không phải binary data (nếu có quá nhiều non-printable chars)
        if (cleaned[field].length < original.length * 0.5) {
          this.logger.warn(`Field ${field} contains too many non-printable chars, may be corrupted`);
        }
      }
    });

    // Validate price structure
    if (cleaned.price && typeof cleaned.price === 'object') {
      const price = cleaned.price;
      // Ensure price has valid structure
      if (price.listingPrice !== undefined) {
        const listingPrice = Number(price.listingPrice);
        if (isNaN(listingPrice) || !isFinite(listingPrice) || listingPrice < 0 || listingPrice > Number.MAX_SAFE_INTEGER) {
          this.logger.warn('Invalid listingPrice detected, may be corrupted');
          // Don't delete, let validation handle it
        }
      }
    }

    // Validate specifications structure
    if (cleaned.specifications && typeof cleaned.specifications === 'object') {
      const specs = cleaned.specifications;
      // Ensure specifications is an object, not corrupted
      if (specs.specifications && typeof specs.specifications !== 'object') {
        this.logger.warn('Invalid specifications structure detected');
        delete cleaned.specifications;
      }
    }

    return cleaned;
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
