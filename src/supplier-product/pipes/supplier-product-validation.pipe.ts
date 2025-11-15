import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { SUPPLIER_PRODUCT_CONSTANTS } from '../constants/supplier-product.constants';

@Injectable()
export class SupplierProductValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const errorMessages = errors.map(error => {
        return Object.values(error.constraints || {}).join(', ');
      });

      throw new BadRequestException({
        message: SUPPLIER_PRODUCT_CONSTANTS.ERRORS.VALIDATION_FAILED,
        errors: errorMessages,
      });
    }

    return object;
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
      throw new BadRequestException(SUPPLIER_PRODUCT_CONSTANTS.ERRORS.INVALID_ID);
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
