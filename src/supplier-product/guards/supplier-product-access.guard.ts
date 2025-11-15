import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SUPPLIER_PRODUCT_CONSTANTS } from '../constants/supplier-product.constants';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => {
  const { SetMetadata } = require('@nestjs/common');
  return SetMetadata(ROLES_KEY, roles);
};

export const SUPPLIER_ACCESS_KEY = 'supplierAccess';
export const SupplierAccess = () => {
  const { SetMetadata } = require('@nestjs/common');
  return SetMetadata(SUPPLIER_ACCESS_KEY, true);
};

@Injectable()
export class SupplierProductAccessGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const contextType = context.getType();
    
    // For gRPC context, we'll implement basic access control
    if (contextType === 'rpc') {
      return this.validateRpcAccess(context);
    }

    // For HTTP context (if needed in the future)
    return this.validateHttpAccess(context);
  }

  private validateRpcAccess(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const requiresSupplierAccess = this.reflector.getAllAndOverride<boolean>(
      SUPPLIER_ACCESS_KEY,
      [context.getHandler(), context.getClass()]
    );

    // If no specific roles or supplier access required, allow access
    if (!requiredRoles && !requiresSupplierAccess) {
      return true;
    }

    const rpcContext = context.switchToRpc();
    const data = rpcContext.getData();

    // Basic validation - in a real app, you'd validate JWT tokens or API keys
    if (requiresSupplierAccess && !data.supplierId) {
      throw new ForbiddenException(
        `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.UNAUTHORIZED_ACTION}: Supplier ID required`
      );
    }

    if (requiredRoles) {
      // In a real implementation, you'd extract user roles from JWT or session
      const userRoles = data.userRoles || [];
      const hasRole = requiredRoles.some(role => userRoles.includes(role));
      
      if (!hasRole) {
        throw new ForbiddenException(
          `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.UNAUTHORIZED_ACTION}: Required roles: ${requiredRoles.join(', ')}`
        );
      }
    }

    return true;
  }

  private validateHttpAccess(context: ExecutionContext): boolean {
    // HTTP access validation logic would go here
    return true;
  }
}

@Injectable()
export class SupplierOwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const contextType = context.getType();
    
    if (contextType === 'rpc') {
      const rpcContext = context.switchToRpc();
      const data = rpcContext.getData();
      
      // Validate that the supplier can only access their own products
      // This is a simplified check - in reality, you'd validate against the database
      if (data.supplierId && data.productSupplierId) {
        if (data.supplierId !== data.productSupplierId) {
          throw new ForbiddenException(
            `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.UNAUTHORIZED_ACTION}: Can only access own products`
          );
        }
      }
    }

    return true;
  }
}
