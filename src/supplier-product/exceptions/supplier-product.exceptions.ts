import { RpcException } from '@nestjs/microservices';
import { SUPPLIER_PRODUCT_CONSTANTS } from '../constants/supplier-product.constants';

/**
 * gRPC Status Codes:
 * - NOT_FOUND = 5
 * - ALREADY_EXISTS = 6
 * - INVALID_ARGUMENT = 3
 * - PERMISSION_DENIED = 7
 * - INTERNAL = 13
 */

export class SupplierProductNotFoundException extends RpcException {
  constructor(id?: string) {
    const message = id 
      ? `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.PRODUCT_NOT_FOUND}: ${id}`
      : SUPPLIER_PRODUCT_CONSTANTS.ERRORS.PRODUCT_NOT_FOUND;
    super({
      code: 5, // NOT_FOUND
      message,
    });
  }
}

export class SupplierProductAlreadyExistsException extends RpcException {
  constructor(sku: string) {
    super({
      code: 6, // ALREADY_EXISTS
      message: `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.SKU_ALREADY_EXISTS}: ${sku}`,
    });
  }
}

export class SupplierProductValidationException extends RpcException {
  constructor(message: string, errors?: any[]) {
    super({
      code: 3, // INVALID_ARGUMENT
      message: `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.VALIDATION_FAILED}: ${message}`,
      details: errors,
    });
  }
}

export class SupplierProductBusinessRuleException extends RpcException {
  constructor(message: string) {
    super({
      code: 3, // INVALID_ARGUMENT
      message,
    });
  }
}

export class SupplierProductUnauthorizedException extends RpcException {
  constructor(action?: string) {
    const message = action
      ? `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.UNAUTHORIZED_ACTION}: ${action}`
      : SUPPLIER_PRODUCT_CONSTANTS.ERRORS.UNAUTHORIZED_ACTION;
    super({
      code: 7, // PERMISSION_DENIED
      message,
    });
  }
}

export class SupplierProductInternalException extends RpcException {
  constructor(originalError?: Error) {
    super({
      code: 13, // INTERNAL
      message: SUPPLIER_PRODUCT_CONSTANTS.ERRORS.INTERNAL_ERROR,
      details: originalError?.message,
    });
  }
}
