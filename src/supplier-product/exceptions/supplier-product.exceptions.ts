import { HttpException, HttpStatus } from '@nestjs/common';
import { SUPPLIER_PRODUCT_CONSTANTS } from '../constants/supplier-product.constants';

export class SupplierProductNotFoundException extends HttpException {
  constructor(id?: string) {
    const message = id 
      ? `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.PRODUCT_NOT_FOUND}: ${id}`
      : SUPPLIER_PRODUCT_CONSTANTS.ERRORS.PRODUCT_NOT_FOUND;
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class SupplierProductAlreadyExistsException extends HttpException {
  constructor(sku: string) {
    super(
      `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.SKU_ALREADY_EXISTS}: ${sku}`,
      HttpStatus.CONFLICT
    );
  }
}

export class SupplierProductValidationException extends HttpException {
  constructor(message: string, errors?: any[]) {
    super(
      {
        message: `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.VALIDATION_FAILED}: ${message}`,
        errors,
      },
      HttpStatus.BAD_REQUEST
    );
  }
}

export class SupplierProductBusinessRuleException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class SupplierProductUnauthorizedException extends HttpException {
  constructor(action?: string) {
    const message = action
      ? `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.UNAUTHORIZED_ACTION}: ${action}`
      : SUPPLIER_PRODUCT_CONSTANTS.ERRORS.UNAUTHORIZED_ACTION;
    super(message, HttpStatus.FORBIDDEN);
  }
}

export class SupplierProductInternalException extends HttpException {
  constructor(originalError?: Error) {
    super(
      {
        message: SUPPLIER_PRODUCT_CONSTANTS.ERRORS.INTERNAL_ERROR,
        originalError: originalError?.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
