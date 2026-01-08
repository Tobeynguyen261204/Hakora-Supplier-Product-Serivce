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

    console.log('🛡️ SupplierProductAccessGuard - Debug Info:');
    console.log('- Method:', context.getHandler().name);
    console.log('- Is Public:', isPublic);

    // If public endpoint, allow access without authentication
    if (isPublic) {
      console.log('- ✅ Public endpoint, allowing access');
      return true;
    }

    const rpcContext = context.switchToRpc();
    const data = rpcContext.getData();
    const metadata = rpcContext.getContext();

    console.log('- RPC Data:', data);
    console.log('- RPC Metadata:', metadata);

    // Extract userId/supplierId from metadata
    // API Gateway truyền metadata dạng: { userId: '...', role: 'user' }
    let userId = data.userId;
    let supplierId = data.supplierId;
    let userRole: string | undefined = undefined;

    if (!userId && !supplierId && metadata) {
      try {
        const metadataObj = metadata as any;
        
        // gRPC Metadata object với get() method
        if (metadataObj.get && typeof metadataObj.get === 'function') {
          const userIdArray = metadataObj.get('userid');
          const userRoleArray = metadataObj.get('userrole');
          userId = userIdArray?.[0] ? String(userIdArray[0]) : undefined;
          userRole = userRoleArray?.[0] ? String(userRoleArray[0]).toLowerCase() : undefined;
          
          // Nếu role là 'supplier' thì dùng userId làm supplierId
          if (userId && userRole && (userRole === 'supplier' || userRole.includes('supplier'))) {
            supplierId = userId;
          }
          
          console.log('- 📦 Extracted from gRPC metadata:');
          console.log('  - userId:', userId);
          console.log('  - role:', userRole);
          console.log('  - supplierId:', supplierId);
        }
      } catch (error) {
        console.log('- ⚠️ Error extracting metadata:', error);
      }
    }

    console.log('- Final userId:', userId);
    console.log('- Final userRole:', userRole);
    console.log('- Final supplierId:', supplierId);

    // Require authentication: at least userId or supplierId must be present
    if (!userId && !supplierId) {
      console.log('- ❌ No authentication found, throwing UnauthorizedException');
      throw new UnauthorizedException(
        'Authentication required. Please provide userId or supplierId in request metadata.'
      );
    }

    console.log('- ✅ Authentication passed');

    // 🔒 SECURITY: Validate supplierId for supplier-scoped endpoints
    // ADMIN role có thể bypass supplier scope check (full access)
    const isAdmin = userRole && (userRole === 'admin' || userRole.includes('admin'));
    
    const requiresSupplierScope = this.checkIfRequiresSupplierScope(context);
    if (requiresSupplierScope && !supplierId) {
      // Allow ADMIN to bypass supplier scope check
      if (isAdmin) {
        console.log('- ✅ ADMIN role detected, bypassing supplier scope validation');
      } else {
        console.error('❌ SECURITY VIOLATION: No supplierId provided for supplier-scoped endpoint');
        console.error('- Method:', context.getHandler().name);
        console.error('- This prevents unauthorized access to supplier-specific data');
        throw new UnauthorizedException(
          'Supplier ID is required for this operation. Please ensure proper authentication headers are provided.'
        );
      }
    } else if (requiresSupplierScope) {
      console.log('- ✅ Supplier scope validation passed, supplierId:', supplierId);
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

    if (requiresSupplierAccess && !supplierId) {
      throw new ForbiddenException(
        `${SUPPLIER_PRODUCT_CONSTANTS.ERRORS.UNAUTHORIZED_ACTION}: Supplier ID required in headers (x-supplier-id or x-user-id with supplier role)`
      );
    }

    return true;
  }

  /**
   * 🔒 SECURITY: Check if the current endpoint requires supplier scope validation
   * Centralized list of methods that need supplierId to prevent data leakage
   */
  private checkIfRequiresSupplierScope(context: ExecutionContext): boolean {
    const methodName = context.getHandler().name;
    
    // Danh sách methods cần supplierId - CRITICAL SECURITY LIST
    const supplierScopedMethods = [
      'getSupplierProducts',      // List products - must be scoped to supplier
      'getSupplierProduct',       // Get single product - must validate ownership
      'suspendSupplierProduct',   // Suspend - must validate ownership
      'unsuspendSupplierProduct', // Unsuspend - must validate ownership  
      'getSupplierProductStats',  // Stats - must be scoped to supplier
      'deleteSupplierProduct',    // Delete - must validate ownership
      'updateSupplierProduct',    // Update - must validate ownership
      'hideSupplierProduct',      // Hide - must validate ownership
      'unhideSupplierProduct',    // Unhide - must validate ownership
    ];
    
    const requiresScope = supplierScopedMethods.includes(methodName);
    
    if (requiresScope) {
      console.log('- 🔒 Method requires supplier scope:', methodName);
    }
    
    return requiresScope;
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
