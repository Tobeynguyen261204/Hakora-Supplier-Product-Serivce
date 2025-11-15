import { Controller } from '@nestjs/common';
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
import { GrpcRequestMapper } from '../mappers/grpc-request.mapper';
import { GrpcResponseMapper } from '../mappers/grpc-response.mapper';

// gRPC Request/Response types
interface GrpcRequest {
  id?: string;
  supplierId?: string;
  page?: number;
  limit?: number;
  status?: string | number;
  approvalStatus?: string | number;
  type?: string | number;
  categoryId?: string;
  categoryName?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  search?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isSuspend?: boolean;
  name?: string;
  description?: string;
  shortDescription?: string;
  sku?: string;
  price?: { listingPrice?: number; retailPrice?: number; currency?: string };
  inventory?: { quantity?: number };
  specifications?: Record<string, unknown>;
  dimensions?: { length?: number; width?: number; height?: number; unit?: string };
  seoData?: { metaTitle?: string; metaDescription?: string; keywords?: string[] };
  weight?: number | { value: number };
  images?: unknown[];
  reason?: string;
  approvedBy?: string;
  rejectedBy?: string;
  hiddenBy?: string;
  unhiddenBy?: string;
  suspendedBy?: string;
  unsuspendedBy?: string;
  suspensionDuration?: number;
  productIds?: string[];
}

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
 * - Handle basic error responses
 * - Delegate all business logic to services
 * - Delegate all validation to pipes/DTOs
 * - Delegate all mapping to dedicated mappers
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
    private readonly grpcRequestMapper: GrpcRequestMapper,
    private readonly grpcResponseMapper: GrpcResponseMapper,
  ) {}

  @GrpcMethod('SupplierProductService', 'CreateSupplierProduct')
  async createSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const request = this.grpcRequestMapper.toCreateSupplierProductRequest(data);
      const result = await this.createSupplierProductService.execute(request);
      return this.grpcResponseMapper.toSuccessResponse('Product created successfully', result);
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }

  @GrpcMethod('SupplierProductService', 'GetSupplierProduct')
  async getSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const id = this.grpcRequestMapper.extractRequiredId(data);
      const result = await this.getSupplierProductService.execute(id);
      return this.grpcResponseMapper.toSuccessResponse('Product retrieved successfully', result);
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }

  @GrpcMethod('SupplierProductService', 'GetSupplierProducts')
  async getSupplierProducts(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const { page, limit, filters } = this.grpcRequestMapper.toGetSupplierProductsRequest(data);
      const result = await this.getSupplierProductsService.execute(page, limit, filters);
      
      // Include stats if supplierId provided
      let stats;
      if (data.supplierId) {
        const statsResult = await this.getSupplierProductStatsService.execute(data.supplierId);
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
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }

  @GrpcMethod('SupplierProductService', 'ApproveSupplierProduct')
  async approveSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const { id, approvedBy } = this.grpcRequestMapper.toApproveSupplierProductRequest(data);
      const result = await this.approveSupplierProductService.execute(id, approvedBy);
      return this.grpcResponseMapper.toSuccessResponse('Product approved successfully', result);
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }

  @GrpcMethod('SupplierProductService', 'RejectSupplierProduct')
  async rejectSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const { id, reason, rejectedBy } = this.grpcRequestMapper.toRejectSupplierProductRequest(data);
      const result = await this.rejectSupplierProductService.execute(id, reason, rejectedBy);
      return this.grpcResponseMapper.toSuccessResponse('Product rejected successfully', result);
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }

  @GrpcMethod('SupplierProductService', 'UpdateSupplierProduct')
  async updateSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const request = this.grpcRequestMapper.toUpdateSupplierProductRequest(data);
      const result = await this.updateSupplierProductService.execute(request);
      return this.grpcResponseMapper.toSuccessResponse('Product updated successfully', result);
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }

  @GrpcMethod('SupplierProductService', 'DeleteSupplierProduct')
  async deleteSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const id = this.grpcRequestMapper.extractRequiredId(data);
      const result = await this.deleteSupplierProductService.execute(id);
      return result;
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }

  @GrpcMethod('SupplierProductService', 'HideSupplierProduct')
  async hideSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const request = this.grpcRequestMapper.toHideSupplierProductRequest(data);
      const result = await this.hideSupplierProductService.execute(request);
      return result;
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }

  @GrpcMethod('SupplierProductService', 'SuspendSupplierProduct')
  async suspendSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const { id, reason, suspendedBy, suspensionDuration } = this.grpcRequestMapper.toSuspendSupplierProductRequest(data);
      const result = await this.suspendSupplierProductService.execute(id, reason, suspendedBy, suspensionDuration);
      return this.grpcResponseMapper.toServiceResponse(result);
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }

  @GrpcMethod('SupplierProductService', 'UnsuspendSupplierProduct')
  async unsuspendSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const { id, reason, unsuspendedBy } = this.grpcRequestMapper.toUnsuspendSupplierProductRequest(data);
      const result = await this.unsuspendSupplierProductService.execute(id, reason, unsuspendedBy);
      return this.grpcResponseMapper.toServiceResponse(result);
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }

  @GrpcMethod('SupplierProductService', 'UnhideSupplierProduct')
  async unhideSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const request = this.grpcRequestMapper.toUnhideSupplierProductRequest(data);
      const result = await this.unhideSupplierProductService.execute(request);
      return result;
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }

  @GrpcMethod('SupplierProductService', 'GetSupplierProductSellerView')
  async getSellerProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const id = this.grpcRequestMapper.extractRequiredId(data);
      const result = await this.getSupplierProductSellerViewService.execute(id);
      return this.grpcResponseMapper.toServiceResponse(result);
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }

  @GrpcMethod('SupplierProductService', 'ListSupplierProductSellerView')
  async listSellerProducts(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const { page, limit, filters } = this.grpcRequestMapper.toListSupplierProductSellerViewRequest(data);
      const result = await this.listSupplierProductSellerViewService.execute(page, limit, filters);
      return this.grpcResponseMapper.toServicePaginatedResponse(result);
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }

  @GrpcMethod('SupplierProductService', 'GetSupplierProductStats')
  async getSupplierProductStats(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const supplierId = this.grpcRequestMapper.extractRequiredSupplierId(data);
      const result = await this.getSupplierProductStatsService.execute(supplierId);
      return this.grpcResponseMapper.toServiceResponse(result);
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }

  @GrpcMethod('SupplierProductService', 'getSupplierProductsByIds')
  async getSupplierProductsByIds(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const productIds = this.grpcRequestMapper.extractRequiredProductIds(data);
      const products = await this.getSupplierProductsByIdsService.execute(productIds);
      return this.grpcResponseMapper.toProductsResponse('Products retrieved successfully', products);
    } catch (error) {
      return this.grpcResponseMapper.toErrorResponse(error);
    }
  }
}