import { Controller, UnauthorizedException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateSupplierProductService } from '../services/create-supplier-product.service';
import { GetSupplierProductsService } from '../services/get-supplier-products.service';
import { GetSupplierProductService } from '../services/get-supplier-product.service';
import { ApproveSupplierProductService } from '../services/approve-supplier-product.service';
import { RejectSupplierProductService } from '../services/reject-supplier-product.service';
import { UpdateSupplierProductService } from '../services/update-supplier-product.service';
import { DeleteSupplierProductService } from '../services/delete-supplier-product.service';
import { HideSupplierProductService } from '../services/hide-supplier-product.service';
import { SuspendSupplierProductService } from '../services/suspend-supplier-product.service';
import { UnhideSupplierProductService } from '../services/unhide-supplier-product.service';
import { ListSupplierProductSellerViewService } from '../services/list-supplier-product-seller-view.service';
import { GetSupplierProductSellerViewService } from '../services/get-supplier-product-seller-view.service';
import { UnsuspendSupplierProductService } from '../services/unsuspend-supplier-product.service';
import { GetSupplierProductStatsService } from '../services/get-supplier-product-stats.service';
import { GetSupplierProductsByIdsService } from '../services/get-supplier-products-by-ids.service';
import { CreateShippingMethodService } from '../services/create-shipping-method.service';
import { GetShippingMethodsService } from '../services/get-shipping-methods.service';
import { GetShippingMethodService } from '../services/get-shipping-method.service';
import { UpdateShippingMethodService } from '../services/update-shipping-method.service';
import { DeleteShippingMethodService } from '../services/delete-shipping-method.service';
import { ToggleShippingMethodService } from '../services/toggle-shipping-method.service';
import { GrpcResponseMapper } from '../mappers/grpc-response.mapper';
import { CreateSupplierProductRequest } from '../dto/create-supplier-product-request.dto';
import { UpdateSupplierProductRequest } from '../dto/update-supplier-product-request.dto';
import {
  GetSupplierProductRequest,
  DeleteSupplierProductRequest,
  GetBySupplierIdRequest,
  GetSupplierProductsRequest,
  ApproveSupplierProductRequest,
  RejectSupplierProductRequest,
  HideSupplierProductRequest,
  UnhideSupplierProductRequest,
  SuspendSupplierProductRequest,
  UnsuspendSupplierProductRequest,
  GetSupplierProductsByIdsRequest,
  ListSupplierProductSellerViewRequest,
} from '../dto/common-request.dto';
import { Public } from '../decorators/public.decorator';

// gRPC Response type
interface GrpcResponse {
  success: boolean;
  message: string;
  data?: unknown;
  products?: unknown[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  stats?: {
    approved: number;
    pending: number;
    rejected: number;
    suspend: number;
    totalProducts: number;
    totalStock: number;
    lowStockAlert: number;
    outOfStock: number;
  };
}

@Controller()
export class SupplierProductController {
  constructor(
    private readonly createSupplierProductService: CreateSupplierProductService,
    private readonly getSupplierProductsService: GetSupplierProductsService,
    private readonly approveSupplierProductService: ApproveSupplierProductService,
    private readonly getSupplierProductService: GetSupplierProductService,
    private readonly rejectSupplierProductService: RejectSupplierProductService,
    private readonly updateSupplierProductService: UpdateSupplierProductService,
    private readonly deleteSupplierProductService: DeleteSupplierProductService,
    private readonly hideSupplierProductService: HideSupplierProductService,
    private readonly suspendSupplierProductService: SuspendSupplierProductService,
    private readonly unhideSupplierProductService: UnhideSupplierProductService,
    private readonly listSupplierProductSellerViewService: ListSupplierProductSellerViewService,
    private readonly getSupplierProductSellerViewService: GetSupplierProductSellerViewService,
    private readonly getSupplierProductStatsService: GetSupplierProductStatsService,
    private readonly unsuspendSupplierProductService: UnsuspendSupplierProductService,
    private readonly getSupplierProductsByIdsService: GetSupplierProductsByIdsService,
    private readonly createShippingMethodService: CreateShippingMethodService,
    private readonly getShippingMethodsService: GetShippingMethodsService,
    private readonly getShippingMethodService: GetShippingMethodService,
    private readonly updateShippingMethodService: UpdateShippingMethodService,
    private readonly deleteShippingMethodService: DeleteShippingMethodService,
    private readonly toggleShippingMethodService: ToggleShippingMethodService,
    private readonly grpcResponseMapper: GrpcResponseMapper,
  ) {}

  @GrpcMethod('SupplierProductService', 'CreateSupplierProduct')
  async createSupplierProduct(data: CreateSupplierProductRequest): Promise<GrpcResponse> {
    // Pipe tự động transform và validate data → CreateSupplierProductRequest instance
    const result = await this.createSupplierProductService.execute(data);
    return this.grpcResponseMapper.toSuccessResponse('Product created successfully', result);
  }

  @GrpcMethod('SupplierProductService', 'GetSupplierProduct')
  async getSupplierProduct(data: GetSupplierProductRequest): Promise<GrpcResponse> {
    // Pipe tự động transform và validate data → GetSupplierProductRequest instance
    // supplierId đã được inject từ SupplierContextInterceptor (từ headers x-user-id hoặc x-supplier-id)
    const supplierId = data.supplierId;
    const result = await this.getSupplierProductService.execute(data.id, supplierId);
    return this.grpcResponseMapper.toSuccessResponse('Product retrieved successfully', result.data);
  }

  @GrpcMethod('SupplierProductService', 'GetSupplierProducts')
  async getSupplierProducts(data: GetSupplierProductsRequest): Promise<GrpcResponse> {
    // Pipe tự động transform và validate data → GetSupplierProductsRequest instance
    // supplierId đã được inject từ SupplierContextInterceptor và validated bởi SupplierProductAccessGuard
    const { page = 1, limit = 10, supplierId: filterSupplierId, ...filters } = data;
    // Use supplierId from context (injected by interceptor) - takes precedence to enforce supplier scope
    const supplierId = data.supplierId || filterSupplierId;
    
    // 🔒 SECURITY: supplierId validation is now handled by SupplierProductAccessGuard
    // No need for redundant validation here - Guard ensures supplierId is present
    
    const result = await this.getSupplierProductsService.execute(page, limit, filters, supplierId);
    
    // Include stats if supplierId provided
    let stats;
    if (supplierId) {
      const statsResult = await this.getSupplierProductStatsService.execute(supplierId);
      if (statsResult?.success) stats = statsResult.data;
    }

    return this.grpcResponseMapper.toPaginatedResponse(
      'Products retrieved successfully',
      result.products,
      result.total,
      result.page,
      result.limit,
      result.totalPages,
      stats
    );
  }

  @GrpcMethod('SupplierProductService', 'ApproveSupplierProduct')
  async approveSupplierProduct(data: ApproveSupplierProductRequest): Promise<GrpcResponse> {
    // Pipe tự động transform và validate data → ApproveSupplierProductRequest instance
    const result = await this.approveSupplierProductService.execute(data.id, data.approvedBy);
    return this.grpcResponseMapper.toSuccessResponse('Product approved successfully', result);
  }

  @GrpcMethod('SupplierProductService', 'RejectSupplierProduct')
  async rejectSupplierProduct(data: RejectSupplierProductRequest): Promise<GrpcResponse> {
    // Pipe tự động transform và validate data → RejectSupplierProductRequest instance
    const result = await this.rejectSupplierProductService.execute(data.id, data.reason, data.rejectedBy);
    return this.grpcResponseMapper.toSuccessResponse('Product rejected successfully', result);
  }

  @GrpcMethod('SupplierProductService', 'UpdateSupplierProduct')
  async updateSupplierProduct(data: UpdateSupplierProductRequest): Promise<GrpcResponse> {
    // Log raw data nhận được từ gRPC để debug
    console.log('='.repeat(80));
    console.log('[SupplierProductController] ========== UPDATE REQUEST RECEIVED ==========');
    console.log('[SupplierProductController] Raw data type:', typeof data);
    console.log('[SupplierProductController] Raw data keys:', data ? Object.keys(data) : []);
    console.log('[SupplierProductController] Raw data (JSON):', JSON.stringify(data, null, 2));
    console.log('[SupplierProductController] Data structure check:', {
      hasId: !!data?.id,
      id: data?.id,
      hasName: !!data?.name,
      name: data?.name,
      hasPrice: !!data?.price,
      price: data?.price,
      hasSpecifications: !!data?.specifications,
      specifications: data?.specifications,
      hasSupplierId: !!data?.supplierId,
      supplierId: data?.supplierId,
      hasCategoryName: !!data?.categoryName,
      categoryName: data?.categoryName,
      hasCategoryId: !!data?.categoryId,
      categoryId: data?.categoryId,
    });
    
    // Clean và validate data trước khi xử lý
    const cleanedData = this.cleanAndValidateUpdateData(data);
    
    console.log('[SupplierProductController] After cleaning:', {
      id: cleanedData.id,
      keys: Object.keys(cleanedData),
      hasPrice: !!cleanedData.price,
      price: cleanedData.price,
      hasCategoryName: 'categoryName' in cleanedData,
      categoryName: cleanedData.categoryName,
      hasCategoryId: 'categoryId' in cleanedData,
      categoryId: cleanedData.categoryId,
    });
    console.log('[SupplierProductController] Cleaned data (JSON):', JSON.stringify(cleanedData, null, 2));
    console.log('='.repeat(80));
    
    // Pipe tự động transform và validate data → UpdateSupplierProductRequest instance
    // supplierId đã được inject từ SupplierContextInterceptor (từ headers x-user-id hoặc x-supplier-id)
    const result = await this.updateSupplierProductService.execute(cleanedData as UpdateSupplierProductRequest);
    return this.grpcResponseMapper.toSuccessResponse(result.message, result.data);
  }
  
  /**
   * Clean và validate data từ gRPC để tránh corrupt data
   */
  private cleanAndValidateUpdateData(data: any): any {
    if (!data || typeof data !== 'object') {
      return data;
    }
    
    const cleaned: any = {};
    
    // Chỉ giữ các field hợp lệ trong UpdateSupplierProductRequest proto
    const validFields = [
      'id', 'name', 'description', 'shortDescription', 'sku', 'categoryName',
      'price', 'inventory', 'specifications', 'type', 'tags',
      'isActive', 'isFeatured', 'weight', 'dimensions', 'seoData', 'images', 'supplierId'
    ];
    
    validFields.forEach((field) => {
      if (data[field] !== undefined && data[field] !== null) {
        cleaned[field] = data[field];
      }
    });
    
    // Clean string fields - remove binary data và non-printable characters
    ['id', 'name', 'description', 'shortDescription', 'sku', 'categoryName'].forEach((field) => {
      if (cleaned[field] && typeof cleaned[field] === 'string') {
        // Remove non-printable characters (giữ lại \n, \r, \t)
        const original = cleaned[field];
        cleaned[field] = original.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
        if (cleaned[field].length !== original.length) {
          console.warn(`[SupplierProductController] Removed non-printable chars from ${field}`);
        }
        // Validate không có binary data (nếu string quá dài hoặc có pattern binary)
        if (cleaned[field].length > 10000) {
          console.warn(`[SupplierProductController] Field ${field} is too long, truncating`);
          cleaned[field] = cleaned[field].substring(0, 10000);
        }
      }
    });
    
    // Validate và clean price structure
    if (cleaned.price && typeof cleaned.price === 'object') {
      const price = cleaned.price;
      cleaned.price = {
        listingPrice: price.listingPrice !== undefined ? Number(price.listingPrice) : undefined,
        retailPrice: price.retailPrice !== undefined ? Number(price.retailPrice) : undefined,
        currency: typeof price.currency === 'string' ? price.currency : 'VND',
        profitAmount: price.profitAmount !== undefined ? Number(price.profitAmount) : undefined,
      };
      
      // Validate price values
      if (cleaned.price.listingPrice !== undefined) {
        if (isNaN(cleaned.price.listingPrice) || !isFinite(cleaned.price.listingPrice) || cleaned.price.listingPrice < 0) {
          console.warn('[SupplierProductController] Invalid listingPrice, removing price');
          delete cleaned.price;
        }
      }
    }
    
    // Validate và clean specifications
    if (cleaned.specifications && typeof cleaned.specifications === 'object') {
      const specs = cleaned.specifications;
      if (specs.specifications && typeof specs.specifications === 'object') {
        // Ensure specifications is a map<string, string>
        const specsMap: Record<string, string> = {};
        Object.keys(specs.specifications).forEach((key) => {
          const value = specs.specifications[key];
          if (typeof value === 'string') {
            specsMap[key] = value;
          } else if (value !== undefined && value !== null) {
            specsMap[key] = String(value);
          }
        });
        cleaned.specifications = {
          specifications: specsMap,
          materials: Array.isArray(specs.materials) ? specs.materials.filter((m: any) => typeof m === 'string') : [],
          colors: Array.isArray(specs.colors) ? specs.colors.filter((c: any) => typeof c === 'string') : [],
          sizes: Array.isArray(specs.sizes) ? specs.sizes.filter((s: any) => typeof s === 'string') : [],
        };
      }
    }
    
    // Validate type
    if (cleaned.type !== undefined) {
      if (typeof cleaned.type === 'number') {
        // Convert number to enum string
        const typeMap: Record<number, string> = {
          1: 'PRODUCT_TYPE_PHYSICAL',
          2: 'PRODUCT_TYPE_DIGITAL',
          3: 'PRODUCT_TYPE_SERVICE',
        };
        if (typeMap[cleaned.type]) {
          cleaned.type = typeMap[cleaned.type];
        } else {
          console.warn('[SupplierProductController] Invalid type number, removing');
          delete cleaned.type;
        }
      } else if (typeof cleaned.type === 'string') {
        // Ensure enum format
        if (!cleaned.type.startsWith('PRODUCT_TYPE_')) {
          const upper = cleaned.type.toUpperCase();
          if (upper === 'PHYSICAL' || upper === 'DIGITAL' || upper === 'SERVICE') {
            cleaned.type = `PRODUCT_TYPE_${upper}`;
          }
        }
      }
    }
    
    // Validate weight
    if (cleaned.weight !== undefined) {
      const weight = Number(cleaned.weight);
      if (isNaN(weight) || !isFinite(weight) || weight < 0) {
        console.warn('[SupplierProductController] Invalid weight, removing');
        delete cleaned.weight;
      } else {
        cleaned.weight = weight;
      }
    }
    
    // Validate tags
    if (cleaned.tags && Array.isArray(cleaned.tags)) {
      cleaned.tags = cleaned.tags
        .filter((tag: any) => typeof tag === 'string')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0 && tag.length < 100); // Max length per tag
    }
    
    return cleaned;
  }

  @GrpcMethod('SupplierProductService', 'DeleteSupplierProduct')
  async deleteSupplierProduct(data: DeleteSupplierProductRequest): Promise<GrpcResponse> {
    // Pipe tự động transform và validate data → DeleteSupplierProductRequest instance
    const result = await this.deleteSupplierProductService.execute(data.id, data.supplierId);
    return this.grpcResponseMapper.toSuccessResponse(result.message, undefined);
  }

  @GrpcMethod('SupplierProductService', 'HideSupplierProduct')
  async hideSupplierProduct(data: HideSupplierProductRequest): Promise<GrpcResponse> {
    // Pipe tự động transform và validate data → HideSupplierProductRequest instance
    const result = await this.hideSupplierProductService.execute(data);
    return this.grpcResponseMapper.toSuccessResponse(result.message, result.data);
  }

  @GrpcMethod('SupplierProductService', 'SuspendSupplierProduct')
  async suspendSupplierProduct(data: SuspendSupplierProductRequest): Promise<GrpcResponse> {
    // Log raw data nhận được từ gRPC (trước khi pipe transform)
    console.log('='.repeat(80));
    console.log('[SupplierProductController] suspendSupplierProduct - Raw data received:');
    console.log('[SupplierProductController] Data type:', typeof data);
    console.log('[SupplierProductController] Data keys:', data ? Object.keys(data) : 'null');
    console.log('[SupplierProductController] Data:', JSON.stringify(data, null, 2));
    console.log('[SupplierProductController] data.id:', data?.id, 'type:', typeof data?.id);
    console.log('[SupplierProductController] data.reason:', data?.reason, 'type:', typeof data?.reason);
    console.log('[SupplierProductController] data.suspendedBy:', data?.suspendedBy, 'type:', typeof data?.suspendedBy);
    console.log('[SupplierProductController] data.suspensionDuration:', data?.suspensionDuration, 'type:', typeof data?.suspensionDuration);
    console.log('[SupplierProductController] data.supplierId:', data?.supplierId, 'type:', typeof data?.supplierId);
    console.log('='.repeat(80));
    
    // Pipe tự động transform và validate data → SuspendSupplierProductRequest instance
    // supplierId đã được inject từ SupplierContextInterceptor (từ headers x-user-id hoặc x-supplier-id)
    const supplierId = data.supplierId;
    const result = await this.suspendSupplierProductService.execute(data.id, data.reason, data.suspendedBy, data.suspensionDuration, supplierId);
    return this.grpcResponseMapper.toServiceResponse(result);
  }

  @GrpcMethod('SupplierProductService', 'UnsuspendSupplierProduct')
  async unsuspendSupplierProduct(data: UnsuspendSupplierProductRequest): Promise<GrpcResponse> {
    // Pipe tự động transform và validate data → UnsuspendSupplierProductRequest instance
    // supplierId đã được inject từ SupplierContextInterceptor (từ headers x-user-id hoặc x-supplier-id)
    const supplierId = data.supplierId;
    const result = await this.unsuspendSupplierProductService.execute(data.id, data.reason, data.unsuspendedBy, supplierId);
    return this.grpcResponseMapper.toServiceResponse(result);
  }

  @GrpcMethod('SupplierProductService', 'UnhideSupplierProduct')
  async unhideSupplierProduct(data: UnhideSupplierProductRequest): Promise<GrpcResponse> {
    // Pipe tự động transform và validate data → UnhideSupplierProductRequest instance
    const result = await this.unhideSupplierProductService.execute(data);
    return this.grpcResponseMapper.toSuccessResponse(result.message, result.data);
  }

  @Public()
  @GrpcMethod('SupplierProductService', 'GetSupplierProductSellerView')
  async getSellerProduct(data: GetSupplierProductRequest): Promise<GrpcResponse> {
    // Pipe tự động transform và validate data → GetSupplierProductRequest instance
    const result = await this.getSupplierProductSellerViewService.execute(data.id);
    return this.grpcResponseMapper.toServiceResponse(result);
  }

  @Public()
  @GrpcMethod('SupplierProductService', 'ListSupplierProductSellerView')
  async listSellerProducts(data: GetSupplierProductsRequest): Promise<GrpcResponse> {
    // Log request để debug
    console.log('[SupplierProductController] ListSupplierProductSellerView request:', {
      page: data.page,
      limit: data.limit,
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      search: data.search,
      supplierId: data.supplierId,
      keys: Object.keys(data),
      fullData: JSON.stringify(data, null, 2),
    });
    
    const page = data.page !== undefined && data.page !== null ? Number(data.page) : 1;
    const limit = data.limit !== undefined && data.limit !== null ? Number(data.limit) : 10;
    
    const filters: any = {
      search: data.search,
      supplierId: data.supplierId,
    };
    if (data.categoryId) {
      filters.categoryId = data.categoryId;
    } else if (data.categoryName) {
      filters.categoryName = data.categoryName;
    }
    
    // ✅ FIXED: Thêm các filters còn lại
    if (data.isFeatured !== undefined) {
      filters.isFeatured = data.isFeatured;
    }
    if (data.type) {
      filters.type = data.type;
    }
    if (data.minPrice !== undefined) {
      filters.minPrice = data.minPrice;
    }
    if (data.maxPrice !== undefined) {
      filters.maxPrice = data.maxPrice;
    }
    if (data.tags && data.tags.length > 0) {
      filters.tags = data.tags;
    }
    
    console.log('[SupplierProductController] Parsed pagination:', { page, limit, filters });
    
    const result = await this.listSupplierProductSellerViewService.execute(page, limit, filters);
    
    console.log('[SupplierProductController] Result:', {
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
      productsCount: result.products.length,
    });
    
    return this.grpcResponseMapper.toServicePaginatedResponse(result);
  }

  @GrpcMethod('SupplierProductService', 'GetSupplierProductStats')
  async getSupplierProductStats(data: GetBySupplierIdRequest): Promise<GrpcResponse> {
    // Pipe tự động transform và validate data → GetBySupplierIdRequest instance
    const result = await this.getSupplierProductStatsService.execute(data.supplierId);
    return this.grpcResponseMapper.toServiceResponse(result);
  }

  @Public()
  @GrpcMethod('SupplierProductService', 'getSupplierProductsByIds')
  async getSupplierProductsByIds(data: GetSupplierProductsByIdsRequest): Promise<GrpcResponse> {
    const supplierId = data.supplierId;
    const products = await this.getSupplierProductsByIdsService.execute(data.productIds, supplierId);
    return this.grpcResponseMapper.toProductsResponse('Products retrieved successfully', products);
  }

  // =============== Shipping Methods APIs ===============
  @GrpcMethod('SupplierProductService', 'CreateShippingMethod')
  async createShippingMethod(data: any): Promise<GrpcResponse> {
    const result = await this.createShippingMethodService.execute({
      supplierId: data.supplierId,
      name: data.name,
      description: data.description,
      price: data.price,
      estimatedDays: data.estimatedDays,
      isActive: data.isActive !== undefined ? data.isActive : true,
    });
    return this.grpcResponseMapper.toSuccessResponse('Shipping method created successfully', result);
  }

  @GrpcMethod('SupplierProductService', 'GetShippingMethod')
  async getShippingMethod(data: any): Promise<GrpcResponse> {
    const result = await this.getShippingMethodService.execute(data.id);
    return this.grpcResponseMapper.toSuccessResponse('Shipping method retrieved successfully', result);
  }

  @GrpcMethod('SupplierProductService', 'GetShippingMethods')
  async getShippingMethods(data: any): Promise<GrpcResponse> {
    const result = await this.getShippingMethodsService.execute(
      data.supplierId,
      data.isActive !== undefined ? data.isActive : undefined
    );
    return {
      success: true,
      message: 'Shipping methods retrieved successfully',
      data: result,
    };
  }

  @GrpcMethod('SupplierProductService', 'UpdateShippingMethod')
  async updateShippingMethod(data: any): Promise<GrpcResponse> {
    const result = await this.updateShippingMethodService.execute(
      data.id,
      data.supplierId,
      {
        name: data.name,
        description: data.description,
        price: data.price,
        estimatedDays: data.estimatedDays,
        isActive: data.isActive,
      }
    );
    return this.grpcResponseMapper.toSuccessResponse('Shipping method updated successfully', result);
  }

  @GrpcMethod('SupplierProductService', 'DeleteShippingMethod')
  async deleteShippingMethod(data: any): Promise<GrpcResponse> {
    await this.deleteShippingMethodService.execute(data.id, data.supplierId);
    return this.grpcResponseMapper.toSuccessResponse('Shipping method deleted successfully', undefined);
  }

  @GrpcMethod('SupplierProductService', 'ToggleShippingMethod')
  async toggleShippingMethod(data: any): Promise<GrpcResponse> {
    const result = await this.toggleShippingMethodService.execute(
      data.id,
      data.supplierId,
      data.isActive
    );
    return this.grpcResponseMapper.toSuccessResponse('Shipping method toggled successfully', result);
  }

  @Public()
  @GrpcMethod('SupplierProductService', 'DebugMetadata')
  async debugMetadata(data: any): Promise<GrpcResponse> {
    console.log('🐛 Debug Metadata Endpoint:');
    console.log('- Received data:', JSON.stringify(data, null, 2));
    
    return {
      success: true,
      message: 'Debug info logged to console',
      data: {
        receivedData: data,
        timestamp: new Date().toISOString()
      }
    };
  }
}