import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SUPPLIER_PRODUCT_CONSTANTS } from '../constants/supplier-product.constants';

// Metadata keys for guards (moved from decorators)
export const PUBLIC_KEY = 'isPublic';
export const ROLES_KEY = 'roles';
export const SUPPLIER_ACCESS_KEY = 'supplierAccess';

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
    // Check if endpoint is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If public endpoint, allow access without authentication
    if (isPublic) {
      return true;
    }

    const rpcContext = context.switchToRpc();
    const data = rpcContext.getData();

    // Require authentication: at least userId or supplierId must be present
    // In a real app, you'd validate JWT tokens from metadata or headers
    if (!data.userId && !data.supplierId) {
      throw new UnauthorizedException(
        'Authentication required. Please provide userId or supplierId in request.'
      );
    }

    // Check for role-based access
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles && requiredRoles.length > 0) {
      const userRoles = data.userRoles || [];
      const hasRole = requiredRoles.some(role => userRoles.includes(role));
      
      if (!hasRole) {
        throw new ForbiddenException(
          `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.UNAUTHORIZED_ACTION}: Required roles: ${requiredRoles.join(', ')}`
        );
      }
    }

    // Check for supplier access requirement
    const requiresSupplierAccess = this.reflector.getAllAndOverride<boolean>(
      SUPPLIER_ACCESS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (requiresSupplierAccess && !data.supplierId) {
      throw new ForbiddenException(
        `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.UNAUTHORIZED_ACTION}: Supplier ID required`
      );
    }

    return true;
  }

  private validateHttpAccess(context: ExecutionContext): boolean {
    // Check if endpoint is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If public endpoint, allow access without authentication
    if (isPublic) {
      return true;
    }

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    // Require authentication: check for user in request (set by JWT strategy)
    if (!request.user && !request.headers['x-user-id'] && !request.headers['x-supplier-id']) {
      throw new UnauthorizedException(
        'Authentication required. Please provide valid JWT token or user/supplier ID in headers.'
      );
    }

    // Check for role-based access
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles && requiredRoles.length > 0) {
      const userRoles = request.user?.roles || [];
      const hasRole = requiredRoles.some(role => userRoles.includes(role));
      
      if (!hasRole) {
        throw new ForbiddenException(
          `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.UNAUTHORIZED_ACTION}: Required roles: ${requiredRoles.join(', ')}`
        );
      }
    }

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
