import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

/**
 * Interceptor để extract supplierId từ gRPC metadata (headers)
 * API Gateway truyền userId qua header x-user-id
 * Nếu user là supplier thì userId chính là supplierId
 */
@Injectable()
export class SupplierContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType = context.getType();

    // Chỉ xử lý cho gRPC context
    if (contextType === 'rpc') {
      const rpcContext = context.switchToRpc();
      const data = rpcContext.getData();
      const metadata = rpcContext.getContext() as Metadata;

      console.log('🔍 SupplierContextInterceptor - Debug Info:');
      console.log('- Context type:', contextType);
      console.log('- Metadata type:', typeof metadata);
      console.log('- Metadata instanceof Metadata:', metadata instanceof Metadata);
      console.log('- Data before injection:', JSON.stringify(data, null, 2));

      // Extract supplierId từ metadata (headers từ API Gateway)
      // API Gateway truyền: x-user-id, x-user-role
      // Nếu có x-supplier-id thì dùng, không thì dùng x-user-id (nếu user là supplier)
      let supplierId: string | undefined;
      let userId: string | undefined;
      let userRole: string | undefined;

      // Case 1: Plain object từ API Gateway { userId, role }
      if (metadata && typeof metadata === 'object' && !(metadata instanceof Metadata)) {
        const metadataObj = metadata as any;
        
        if (metadataObj.userId || metadataObj.role) {
          userId = metadataObj.userId ? String(metadataObj.userId) : undefined;
          userRole = metadataObj.role ? String(metadataObj.role) : undefined;
          
          console.log('- 📦 Extracted from plain object metadata:');
          console.log('  - userId:', userId);
          console.log('  - userRole:', userRole);
        }
      }
      // Case 2: gRPC Metadata instance
      else if (metadata && metadata instanceof Metadata) {
        // Metadata.get() trả về array of values
        // API Gateway truyền userid và userrole (không có prefix x-)
        const supplierIdArray = metadata.get('x-supplier-id');
        const userIdArray = metadata.get('userid'); // ✅ Sửa key từ x-user-id thành userid
        const userRoleArray = metadata.get('userrole'); // ✅ Sửa key từ x-user-role thành userrole

        supplierId = supplierIdArray && supplierIdArray.length > 0 
          ? String(supplierIdArray[0]) 
          : undefined;
        userId = userIdArray && userIdArray.length > 0 
          ? String(userIdArray[0]) 
          : undefined;
        userRole = userRoleArray && userRoleArray.length > 0 
          ? String(userRoleArray[0]) 
          : undefined;

        console.log('- 📦 Extracted from gRPC Metadata:');
        console.log('  - userId:', userId);
        console.log('  - userRole:', userRole);
        console.log('  - supplierId (before role check):', supplierId);
      } else if (metadata && typeof metadata === 'object') {
        // Fallback: nếu metadata không phải là Metadata instance
        const metadataMap = metadata as any;
        
        if (metadataMap.get && typeof metadataMap.get === 'function') {
          // If it's a Map-like object
          const supplierIdVal = metadataMap.get('x-supplier-id');
          const userIdVal = metadataMap.get('userid'); // ✅ Sửa key
          const userRoleVal = metadataMap.get('userrole'); // ✅ Sửa key
          
          supplierId = supplierIdVal?.[0];
          userId = userIdVal?.[0];
          userRole = userRoleVal?.[0];
        } else {
          // If it's a plain object
          supplierId = metadataMap['x-supplier-id']?.[0];
          userId = metadataMap['userid']?.[0]; // ✅ Sửa key
          userRole = metadataMap['userrole']?.[0]; // ✅ Sửa key
        }
      }

      // Nếu không có supplierId nhưng có userId và role là supplier
      // thì xem userId như là supplierId
      if (!supplierId && userId && userRole) {
        const role = String(userRole).toLowerCase();
        if (role === 'supplier' || role.includes('supplier')) {
          supplierId = userId;
          console.log('  - ✅ Using userId as supplierId (role is supplier)');
        }
      }

      // Inject supplierId và userId vào request data nếu chưa có
      if (supplierId && !data.supplierId) {
        data.supplierId = supplierId;
      }
      if (userId && !data.userId) {
        data.userId = userId;
      }
      if (userRole && !data.userRole) {
        data.userRole = String(userRole);
      }

      console.log('- Extracted from metadata:');
      console.log('  - supplierId:', supplierId);
      console.log('  - userId:', userId);
      console.log('  - userRole:', userRole);
      console.log('- Data after injection:', JSON.stringify(data, null, 2));
    }

    return next.handle();
  }
}

