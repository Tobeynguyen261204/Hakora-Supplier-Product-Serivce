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

/**
 * ✅ CLEAN CONTROLLER - Only handles HTTP/gRPC routing
 * 
 * Responsibilities:
 * - Route gRPC calls to appropriate services
 * - Delegate all business logic to services
 * - Delegate all validation to pipes/DTOs (Pipe tự động transform & validate)
 * - Delegate all mapping to dedicated mappers (chỉ cho response mapping)
 * - Delegate all error handling to ExceptionFilter (APP_FILTER)
 * 
 * @note 
 * - Không cần try-catch ở đây vì ExceptionFilter sẽ tự động catch và xử lý
 * - Tất cả methods đều dùng DTO classes → Pipe tự động transform và validate
 * - Chỉ một số endpoint cụ thể được đánh dấu @Public(), còn lại cần authentication
 */
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
    // Pipe tự động transform và validate data → UpdateSupplierProductRequest instance
    // supplierId đã được inject từ SupplierContextInterceptor (từ headers x-user-id hoặc x-supplier-id)
    const result = await this.updateSupplierProductService.execute(data);
    return this.grpcResponseMapper.toSuccessResponse(result.message, result.data);
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
  async listSellerProducts(data: ListSupplierProductSellerViewRequest): Promise<GrpcResponse> {
    // Pipe tự động transform và validate data → ListSupplierProductSellerViewRequest instance
    const { page = 1, limit = 10, ...filters } = data;
    const result = await this.listSupplierProductSellerViewService.execute(page, limit, filters);
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
    // Pipe tự động transform và validate data → GetSupplierProductsByIdsRequest instance
    // supplierId đã được inject từ SupplierContextInterceptor (từ headers x-user-id hoặc x-supplier-id)
    const supplierId = data.supplierId;
    const products = await this.getSupplierProductsByIdsService.execute(data.productIds, supplierId);
    return this.grpcResponseMapper.toProductsResponse('Products retrieved successfully', products);
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