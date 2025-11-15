import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export const SUPPLIER_ACCESS_KEY = 'supplierAccess';
export const SupplierAccess = () => SetMetadata(SUPPLIER_ACCESS_KEY, true);

export const ADMIN_ONLY_KEY = 'adminOnly';
export const AdminOnly = () => SetMetadata(ADMIN_ONLY_KEY, true);

export const PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(PUBLIC_KEY, true);

export const GetCurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const contextType = ctx.getType();
    
    if (contextType === 'rpc') {
      const rpcContext = ctx.switchToRpc();
      const requestData = rpcContext.getData();
      
      // Extract user information from gRPC request
      return {
        id: requestData.userId,
        supplierId: requestData.supplierId,
        roles: requestData.userRoles || [],
        permissions: requestData.userPermissions || [],
      };
    }
    
    if (contextType === 'http') {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    }
    
    return null;
  },
);

export const GetRequestData = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const contextType = ctx.getType();
    
    if (contextType === 'rpc') {
      const rpcContext = ctx.switchToRpc();
      const requestData = rpcContext.getData();
      return data ? requestData[data] : requestData;
    }
    
    if (contextType === 'http') {
      const request = ctx.switchToHttp().getRequest();
      return data ? request[data] : request;
    }
    
    return null;
  },
);

export const GetPagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const contextType = ctx.getType();
    
    if (contextType === 'rpc') {
      const rpcContext = ctx.switchToRpc();
      const requestData = rpcContext.getData();
      
      return {
        page: parseInt(requestData.page) || 1,
        limit: Math.min(parseInt(requestData.limit) || 10, 100),
      };
    }
    
    if (contextType === 'http') {
      const request = ctx.switchToHttp().getRequest();
      const { page = 1, limit = 10 } = request.query;
      
      return {
        page: parseInt(page) || 1,
        limit: Math.min(parseInt(limit) || 10, 100),
      };
    }
    
    return { page: 1, limit: 10 };
  },
);
