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

      // Lấy method name để biết method nào cần validate id
      const handler = context.getHandler();
      const methodName = handler?.name || '';

      console.log('🔍 SupplierContextInterceptor - Debug Info:');
      console.log('- Context type:', contextType);
      console.log('- Method name:', methodName);
      console.log('- Metadata type:', typeof metadata);
      console.log('- Metadata instanceof Metadata:', metadata instanceof Metadata);
      console.log('- Data before injection:', JSON.stringify(data, null, 2));

      // FIX: Clean và validate data TRƯỚC khi inject supplierId
      // Data có thể bị corrupt từ gRPC deserialization
      // Chỉ validate id cho các method cần nó (update, delete, get by id)
      const methodsRequiringId = [
        'updateSupplierProduct',
        'deleteSupplierProduct', 
        'getSupplierProduct',
        'approveSupplierProduct',
        'rejectSupplierProduct',
        'hideSupplierProduct',
        'unhideSupplierProduct',
        'suspendSupplierProduct',
        'unsuspendSupplierProduct'
      ];
      const requiresId = methodsRequiringId.includes(methodName);
      
      // CRITICAL: Nếu data bị corrupt hoàn toàn (id không hợp lệ), không thể clean
      // Trong trường hợp này, có thể do proto definition không match hoặc proto files chưa được reload
      // Log chi tiết để debug
      if (requiresId && data.id && typeof data.id === 'string') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(data.id)) {
          console.error('[SupplierContextInterceptor] ========== CRITICAL: DATA CORRUPTION DETECTED ==========');
          console.error('[SupplierContextInterceptor] Method:', methodName);
          console.error('[SupplierContextInterceptor] Corrupted id value:', data.id);
          console.error('[SupplierContextInterceptor] Full corrupted data:', JSON.stringify(data, null, 2));
          console.error('[SupplierContextInterceptor] This indicates gRPC deserialization failed - proto definition may not match!');
          console.error('[SupplierContextInterceptor] ============================================================');
          // Không throw error ngay, để validation pipe xử lý và trả về error message rõ ràng hơn
          // throw new Error(`Invalid request data: corrupted id field (${data.id.substring(0, 50)}...)`);
        }
      }
      
      // CRITICAL: Chỉ clean data nếu method yêu cầu id (update, delete, etc.)
      // Với list methods, không clean vì có thể làm mất page/limit/filters
      let cleanedData = data;
      if (requiresId) {
        cleanedData = this.cleanCorruptedData(data, requiresId);
        
        // Validate cleaned data - chỉ validate id nếu method yêu cầu
        if (!cleanedData.id || typeof cleanedData.id !== 'string') {
          console.error('[SupplierContextInterceptor] Data is completely corrupted, missing or invalid id');
          // Throw error với message rõ ràng hơn
          throw new Error(`Invalid request data: corrupted or missing id field. This may indicate proto definition mismatch. Please ensure proto files are synced and services are restarted.`);
        }
        
        // Replace data với cleaned data (chỉ cho methods cần id)
        Object.keys(data).forEach((key) => delete data[key]);
        Object.assign(data, cleanedData);
      } else {
        // Với list methods, chỉ inject userId/userRole, KHÔNG replace toàn bộ data
        // Giữ nguyên tất cả fields từ gRPC (page, limit, categoryId, etc.)
        console.log('- Data before injection (list method, keeping all fields):', JSON.stringify(data, null, 2));
      }
      
      console.log('- Data after cleaning/injection:', JSON.stringify(data, null, 2));

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

      // CRITICAL: Chỉ inject userId/userRole vào data, KHÔNG override các field khác
      // Chỉ inject nếu method KHÔNG yêu cầu id (list methods)
      if (!requiresId) {
        // Chỉ inject cho list methods, không inject cho update/delete/get by id
        if (userId && !data.userId) {
          data.userId = userId;
        }
        if (userRole && !data.userRole) {
          data.userRole = String(userRole);
        }
        // supplierId chỉ inject cho methods cần nó (update, delete, etc.)
        if (supplierId && requiresId) {
          data.supplierId = supplierId;
          console.log('  - ✅ Injected supplierId from metadata:', supplierId);
        }
      } else {
        // Cho methods cần id (update, delete, etc.), luôn inject supplierId
        if (supplierId) {
          data.supplierId = supplierId;
          console.log('  - ✅ Injected supplierId from metadata:', supplierId);
        }
      }

      console.log('- Extracted from metadata:');
      console.log('  - supplierId:', supplierId);
      console.log('  - userId:', userId);
      console.log('  - userRole:', userRole);
      console.log('- Data after injection:', JSON.stringify(data, null, 2));
    }

    return next.handle();
  }

  /**
   * Clean corrupted data từ gRPC deserialization
   * @param requiresId - true nếu method này yêu cầu id field
   * Data có thể bị corrupt do field numbers misaligned
   */
  private cleanCorruptedData(data: any, requiresId: boolean = false): any {
    if (!data || typeof data !== 'object') {
      return data;
    }

    const cleaned: any = {};

    // CRITICAL: Validate id (phải là UUID) - CHỈ nếu method yêu cầu
    if (requiresId) {
      if (data.id && typeof data.id === 'string') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(data.id)) {
          cleaned.id = data.id;
        } else {
          console.error('[SupplierContextInterceptor] CRITICAL: Invalid id detected, data is completely corrupted!');
          console.error('[SupplierContextInterceptor] Corrupted id value:', data.id);
          console.error('[SupplierContextInterceptor] Expected: UUID format (e.g., 0bc1eb94-1388-4ded-913e-bb7b2246803e)');
          console.error('[SupplierContextInterceptor] Received:', data.id.substring(0, 100));
          console.error('[SupplierContextInterceptor]');
          console.error('[SupplierContextInterceptor] ========== POSSIBLE CAUSES ==========');
          console.error('[SupplierContextInterceptor] 1. Proto definition mismatch between API Gateway and Supplier Product Service');
          console.error('[SupplierContextInterceptor] 2. Proto files not reloaded after changes (need to restart services)');
          console.error('[SupplierContextInterceptor] 3. Field numbers misaligned in proto definition');
          console.error('[SupplierContextInterceptor] =====================================');
          // Nếu id không hợp lệ, data bị corrupt hoàn toàn - không thể clean
          throw new Error(`Invalid request data: corrupted id field. This indicates proto definition mismatch or proto files not reloaded. Please ensure proto files are synced and both API Gateway and Supplier Product Service are restarted.`);
        }
      } else if (!data.id) {
        console.error('[SupplierContextInterceptor] CRITICAL: Missing id field, data is invalid!');
        throw new Error('Invalid request data: missing id field');
      }
    } else {
      // Nếu không yêu cầu id, chỉ copy nếu có (không validate)
      if (data.id !== undefined) {
        cleaned.id = data.id;
      }
    }

    // CRITICAL: Validate supplierId - nếu không phải UUID thì data bị corrupt
    // supplierId sẽ được inject từ metadata, KHÔNG nên có trong data từ client
    // Nếu có supplierId trong data và không phải UUID → data bị corrupt hoàn toàn
    if (data.supplierId && typeof data.supplierId === 'string') {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(data.supplierId)) {
        console.error('[SupplierContextInterceptor] CRITICAL: supplierId is not a valid UUID, data is corrupted!');
        console.error('[SupplierContextInterceptor] Corrupted supplierId value:', data.supplierId);
        console.error('[SupplierContextInterceptor] This indicates gRPC deserialization failed');
        // Xóa supplierId corrupt, sẽ được inject từ metadata
        delete data.supplierId;
        // Nếu supplierId bị corrupt, có thể các field khác cũng bị corrupt
        // Cần validate thêm các field quan trọng
      }
    }

    // Clean string fields - remove binary data
    ['name', 'description', 'shortDescription', 'sku', 'categoryName'].forEach((field) => {
      if (data[field] !== undefined && data[field] !== null) {
        if (typeof data[field] === 'string') {
          // Remove non-printable characters (giữ lại \n, \r, \t)
          const cleanedStr = data[field].replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
          
          // Nếu string có quá nhiều non-printable chars, có thể bị corrupt
          if (cleanedStr.length < data[field].length * 0.5) {
            console.warn(`[SupplierContextInterceptor] Field ${field} may be corrupted, contains too many non-printable chars`);
          }
          
          // Nếu string quá dài hoặc có pattern binary, có thể bị corrupt
          if (cleanedStr.length > 10000 || /[\x80-\xFF]{10,}/.test(cleanedStr)) {
            console.warn(`[SupplierContextInterceptor] Field ${field} may be corrupted, too long or contains binary pattern`);
            // Không set field này, để validation pipe xử lý
            return;
          }
          
          cleaned[field] = cleanedStr;
        } else {
          cleaned[field] = data[field];
        }
      }
    });

    // Validate và clean price
    if (data.price && typeof data.price === 'object') {
      const price = data.price;
      const listingPrice = price.listingPrice !== undefined ? Number(price.listingPrice) : undefined;
      const retailPrice = price.retailPrice !== undefined ? Number(price.retailPrice) : undefined;
      
      // Validate price values - nếu không hợp lệ thì có thể bị corrupt
      if (listingPrice !== undefined) {
        if (isNaN(listingPrice) || !isFinite(listingPrice) || listingPrice < 0 || listingPrice > Number.MAX_SAFE_INTEGER) {
          console.warn('[SupplierContextInterceptor] Invalid listingPrice detected, may be corrupted:', listingPrice);
          // Không set price, để validation pipe xử lý
        } else {
          cleaned.price = {
            listingPrice,
            retailPrice: retailPrice !== undefined && !isNaN(retailPrice) && isFinite(retailPrice) && retailPrice >= 0 
              ? retailPrice 
              : listingPrice,
            currency: typeof price.currency === 'string' ? price.currency : 'VND',
            profitAmount: price.profitAmount !== undefined ? Number(price.profitAmount) : undefined,
          };
        }
      }
    }

    // Validate và clean type
    if (data.type !== undefined) {
      if (typeof data.type === 'number') {
        // Convert number to enum string
        const typeMap: Record<number, string> = {
          1: 'PRODUCT_TYPE_PHYSICAL',
          2: 'PRODUCT_TYPE_DIGITAL',
          3: 'PRODUCT_TYPE_SERVICE',
        };
        if (typeMap[data.type]) {
          cleaned.type = typeMap[data.type];
        } else {
          console.warn('[SupplierContextInterceptor] Invalid type number, may be corrupted:', data.type);
        }
      } else if (typeof data.type === 'string') {
        cleaned.type = data.type;
      }
    }

    // Validate và clean specifications
    if (data.specifications && typeof data.specifications === 'object') {
      const specs = data.specifications;
      if (specs.specifications && typeof specs.specifications === 'object') {
        cleaned.specifications = {
          specifications: specs.specifications,
          materials: Array.isArray(specs.materials) ? specs.materials : [],
          colors: Array.isArray(specs.colors) ? specs.colors : [],
          sizes: Array.isArray(specs.sizes) ? specs.sizes : [],
        };
      } else {
        cleaned.specifications = specs;
      }
    }

    // Validate và clean tags
    if (data.tags && Array.isArray(data.tags)) {
      cleaned.tags = data.tags
        .filter((tag: any) => typeof tag === 'string')
        .map((tag: string) => tag.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, ''))
        .filter((tag: string) => tag.length > 0 && tag.length < 1000);
    }

    // Copy các field khác
    ['inventory', 'dimensions', 'seoData', 'images', 'weight', 'isActive', 'isFeatured'].forEach((field) => {
      if (data[field] !== undefined) {
        cleaned[field] = data[field];
      }
    });

    // Đảm bảo có id
    if (!cleaned.id && data.id) {
      cleaned.id = data.id;
    }

    return cleaned;
  }
}

