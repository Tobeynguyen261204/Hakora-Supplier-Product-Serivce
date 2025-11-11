import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateSupplierProductUseCase } from '../../application/use-cases/create-supplier-product.use-case';
import { GetSupplierProductsUseCase } from '../../application/use-cases/get-supplier-products.use-case';
import { GetSupplierProductUseCase } from '../../application/use-cases/get-supplier-product.use-case';
import { ApproveSupplierProductUseCase } from '../../application/use-cases/approve-supplier-product.use-case';
import { RejectSupplierProductUseCase } from '../../application/use-cases/reject-supplier-product.use-case';
import { UpdateSupplierProductUseCase } from '../../application/use-cases/update-supplier-product.use-case';
import { DeleteSupplierProductUseCase } from '../../application/use-cases/delete-supplier-product.use-case';
import { HideSupplierProductUseCase } from '../../application/use-cases/hide-supplier-product.use-case';
import { SuspendSupplierProductUseCase } from '../../application/use-cases/suspend-supplier-product.use-case';
import { UnhideSupplierProductUseCase } from '../../application/use-cases/unhide-supplier-product.use-case';
import { CreateSupplierProductRequest } from '../../application/dto/create-supplier-product-request.dto';
import { ListSupplierProductSellerViewUseCase } from '../../application/use-cases/list-supplier-product-seller-view.use-case';
import { GetSupplierProductSellerViewUseCase } from '../../application/use-cases/get-supplier-product-seller-view.use-case';
import { UnsuspendSupplierProductUseCase } from '../../application/use-cases/unsuspend-supplier-product.use-case';
import { GetSupplierProductStatsUseCase } from '../../application/use-cases/get-supplier-product-stats.use-case';
import { GetSupplierProductsByIdsUseCase } from '../../application/use-cases/get-supplier-products-by-ids.use-case';
import { ProductType } from '../../domain/enums/product-type.enum';
import { ProductStatus } from '../../domain/enums/product-status.enum';
import { ApprovalStatus } from '../../domain/enums/approval-status.enum';
import { SupplierProductResponseDto } from '../../application/dto/supplier-product-response.dto';
import { EnumMapper } from '../../application/utils/enum-mapper.util';

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
  data?: SupplierProductResponseDto | unknown;
  products?: SupplierProductResponseDto[] | unknown[];
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
    private readonly createSupplierProductUseCase: CreateSupplierProductUseCase,
    private readonly getSupplierProductsUseCase: GetSupplierProductsUseCase,
    private readonly approveSupplierProductUseCase: ApproveSupplierProductUseCase,
    private readonly getSupplierProductUseCase: GetSupplierProductUseCase,
    private readonly rejectSupplierProductUseCase: RejectSupplierProductUseCase,
    private readonly updateSupplierProductUseCase: UpdateSupplierProductUseCase,
    private readonly deleteSupplierProductUseCase: DeleteSupplierProductUseCase,
    private readonly hideSupplierProductUseCase: HideSupplierProductUseCase,
    private readonly suspendSupplierProductUseCase: SuspendSupplierProductUseCase,
    private readonly unhideSupplierProductUseCase: UnhideSupplierProductUseCase,
    private readonly listSupplierProductSellerViewUseCase: ListSupplierProductSellerViewUseCase,
    private readonly getSupplierProductSellerViewUseCase: GetSupplierProductSellerViewUseCase,
    private readonly getSupplierProductStatsUseCase: GetSupplierProductStatsUseCase,
    private readonly unsuspendSupplierProductUseCase: UnsuspendSupplierProductUseCase,
    private readonly getSupplierProductsByIdsUseCase: GetSupplierProductsByIdsUseCase,
  ) {}

  // Helper method to safely extract error message
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'An unknown error occurred';
  }

  // Map domain strings to protobuf enum-friendly strings
  private normalizeEnumsOut<T extends GrpcResponse>(payload: T): T {
    const mapProduct = (p: SupplierProductResponseDto | unknown): SupplierProductResponseDto => {
      const product = p as SupplierProductResponseDto;
      return {
        ...product,
        type: EnumMapper.normalizeProductType(product.type) as ProductType,
        status: EnumMapper.normalizeProductStatus(product.status) as ProductStatus,
        approvalStatus: EnumMapper.normalizeApprovalStatus(product.approvalStatus) as ApprovalStatus
      };
    };

    if (payload.data && typeof payload.data === 'object' && payload.data !== null) {
      return { ...payload, data: mapProduct(payload.data) } as T;
    }
    if (payload.products && Array.isArray(payload.products)) {
      return { ...payload, products: payload.products.map(mapProduct) } as T;
    }
    return payload;
  }

  @GrpcMethod('SupplierProductService', 'CreateSupplierProduct')
  async createSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      // Validate required fields
      if (!data.supplierId || !data.name || !data.description || !data.sku || !data.categoryName) {
        return {
          success: false,
          message: 'Missing required fields: supplierId, name, description, sku, categoryName',
          data: undefined
        };
      }
      if (!data.price || data.price.listingPrice === undefined || data.price.retailPrice === undefined || !data.price.currency) {
        return {
          success: false,
          message: 'Missing required price fields: listingPrice, retailPrice, currency',
          data: undefined
        };
      }
      if (!data.inventory || data.inventory.quantity === undefined) {
        return {
          success: false,
          message: 'Missing required inventory field: quantity',
          data: undefined
        };
      }

      const request: CreateSupplierProductRequest = {
        supplierId: data.supplierId,
        name: data.name,
        description: data.description,
        shortDescription: data.shortDescription,
        sku: data.sku,
        categoryName: data.categoryName,
        price: {
          listingPrice: data.price.listingPrice,
          retailPrice: data.price.retailPrice,
          currency: data.price.currency
        },
        inventory: {
          quantity: data.inventory.quantity
        },
        specifications: data.specifications ? {
          specifications: (data.specifications as { specifications?: Record<string, string> }).specifications as Record<string, string> | undefined,
          materials: (data.specifications as { materials?: string[] }).materials,
          colors: (data.specifications as { colors?: string[] }).colors,
          sizes: (data.specifications as { sizes?: string[] }).sizes
        } : undefined,
        type: data.type as ProductType,
        tags: data.tags || [],
        isActive: data.isActive !== undefined ? data.isActive : true,
        isFeatured: data.isFeatured !== undefined ? data.isFeatured : false,
        weight: typeof data.weight === 'number' ? data.weight : (data.weight?.value !== undefined ? data.weight.value : undefined),
        dimensions: data.dimensions && 
          data.dimensions.length !== undefined && 
          data.dimensions.width !== undefined && 
          data.dimensions.height !== undefined && 
          data.dimensions.unit !== undefined
          ? {
              length: data.dimensions.length,
              width: data.dimensions.width,
              height: data.dimensions.height,
              unit: data.dimensions.unit
            }
          : undefined,
        seoData: data.seoData,
        images: (data.images || []) as CreateSupplierProductRequest['images']
      };

      const result = await this.createSupplierProductUseCase.execute(request);
      
      return {
        success: true,
        message: 'Product created successfully',
        data: result
      };
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error),
        data: undefined
      };
    }
  }

  @GrpcMethod('SupplierProductService', 'GetSupplierProduct')
  async getSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      if (!data.id) {
        return {
          success: false,
          message: 'Missing required field: id',
          data: undefined
        };
      }
      const result = await this.getSupplierProductUseCase.execute(data.id);
      return this.normalizeEnumsOut(result);
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error),
        data: undefined
      };
    }
  }

  @GrpcMethod('SupplierProductService', 'GetSupplierProducts')
  async getSupplierProducts(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const page = data.page || 1;
      const limit = data.limit || 10;
      
      // Normalize inbound enums using EnumMapper utility
      const filters = {
        status: EnumMapper.toProductStatus(data.status),
        approvalStatus: EnumMapper.toApprovalStatus(data.approvalStatus),
        supplierId: data.supplierId,
        categoryName: data.categoryName,
        type: EnumMapper.toProductType(data.type),
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
        tags: data.tags,
        search: data.search,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        isSuspend: typeof data.isSuspend === 'boolean' ? data.isSuspend : undefined
      };

      const result = await this.getSupplierProductsUseCase.execute(page, limit, filters);
      // If supplierId provided, include stats block for quick dashboard
      let stats: GrpcResponse['stats'];
      if (data.supplierId) {
        const s = await this.getSupplierProductStatsUseCase.execute(data.supplierId);
        if (s?.success) stats = s.data;
      }
      const resp = {
        success: true,
        message: 'Products retrieved successfully',
        products: result.products,
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
        stats
      };
      return this.normalizeEnumsOut(resp);
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error),
        products: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
        stats: undefined
      };
    }
  }

  @GrpcMethod('SupplierProductService', 'ApproveSupplierProduct')
  async approveSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      if (!data.id || !data.approvedBy) {
        return {
          success: false,
          message: 'Missing required fields: id, approvedBy',
          data: undefined
        };
      }
      const result = await this.approveSupplierProductUseCase.execute(data.id, data.approvedBy);
      
      return {
        success: true,
        message: 'Product approved successfully',
        data: result
      };
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error),
        data: undefined
      };
    }
  }

  @GrpcMethod('SupplierProductService', 'RejectSupplierProduct')
  async rejectSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      if (!data.id || !data.reason || !data.rejectedBy) {
        return {
          success: false,
          message: 'Missing required fields: id, reason, rejectedBy',
          data: undefined
        };
      }
      const result = await this.rejectSupplierProductUseCase.execute(data.id, data.reason, data.rejectedBy);
      
      return {
        success: true,
        message: 'Product rejected successfully',
        data: result
      };
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error),
        data: undefined
      };
    }
  }

  @GrpcMethod('SupplierProductService', 'UpdateSupplierProduct')
  async updateSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      // Sanitize inbound payload to avoid type mismatches when persisting
      const payload: Record<string, unknown> = { ...(data || {}), id: data?.id };
      // dimensions may arrive as a JSON string from Swagger; parse if needed
      if (typeof payload.dimensions === 'string') {
        try { payload.dimensions = JSON.parse(payload.dimensions); } catch {}
      }
      // price may come partially as strings; coerce basic fields
      if (payload.price && typeof payload.price === 'object' && !Array.isArray(payload.price)) {
        const price = payload.price as { listingPrice?: unknown; retailPrice?: unknown; currency?: unknown };
        if (price.listingPrice !== undefined) price.listingPrice = Number(price.listingPrice);
        if (price.retailPrice !== undefined) price.retailPrice = Number(price.retailPrice);
      }
      // inventory.quantity could be string
      if (payload.inventory && typeof payload.inventory === 'object' && !Array.isArray(payload.inventory)) {
        const inventory = payload.inventory as { quantity?: unknown };
        if (inventory.quantity !== undefined) {
          inventory.quantity = Number(inventory.quantity);
        }
      }
      // Prevent field swap: if seoData contains dimension-like fields, swap back
      if (payload.seoData && typeof payload.seoData === 'object' && !Array.isArray(payload.seoData)) {
        const s = payload.seoData as { length?: unknown; width?: unknown; height?: unknown; unit?: unknown };
        const looksLikeDimensions = s && (s.length !== undefined || s.width !== undefined || s.height !== undefined || s.unit !== undefined);
        if (looksLikeDimensions && !payload.dimensions) {
          payload.dimensions = { 
            length: Number(s.length), 
            width: Number(s.width), 
            height: Number(s.height), 
            unit: String(s.unit) 
          };
          payload.seoData = undefined;
        }
      }

      // weight might be string or object; take numeric value if present
      if (payload.weight !== undefined) {
        if (typeof payload.weight === 'object' && payload.weight !== null && !Array.isArray(payload.weight)) {
          const weightObj = payload.weight as { value?: unknown };
          if (weightObj.value !== undefined) {
            payload.weight = Number(weightObj.value);
          }
        } else {
          payload.weight = Number(payload.weight);
        }
      }
      const result = await this.updateSupplierProductUseCase.execute(payload as unknown as Parameters<UpdateSupplierProductUseCase['execute']>[0]);
      return this.normalizeEnumsOut(result);
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error),
        data: undefined
      };
    }
  }

  @GrpcMethod('SupplierProductService', 'DeleteSupplierProduct')
  async deleteSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      if (!data.id) {
        return {
          success: false,
          message: 'Missing required field: id',
          data: undefined
        };
      }
      const result = await this.deleteSupplierProductUseCase.execute(data.id);
      return result;
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error)
      };
    }
  }

  @GrpcMethod('SupplierProductService', 'HideSupplierProduct')
  async hideSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      if (!data.id || !data.reason || !data.hiddenBy) {
        return {
          success: false,
          message: 'Missing required fields: id, reason, hiddenBy',
          data: undefined
        };
      }
      const request = {
        id: data.id,
        reason: data.reason,
        hiddenBy: data.hiddenBy
      };
      const result = await this.hideSupplierProductUseCase.execute(request);
      return result;
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error),
        data: undefined
      };
    }
  }

  @GrpcMethod('SupplierProductService', 'SuspendSupplierProduct')
  async suspendSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      if (!data.id || !data.reason || !data.suspendedBy) {
        return {
          success: false,
          message: 'Missing required fields: id, reason, suspendedBy',
          data: undefined
        };
      }
      const { id, reason, suspendedBy, suspensionDuration } = data;
      const result = await this.suspendSupplierProductUseCase.execute(id, reason, suspendedBy, suspensionDuration);
      return {
        success: result.success,
        message: result.message,
        data: result.data as unknown
      };
    } catch (error) {
      return { success: false, message: this.getErrorMessage(error) || 'Failed' };
    }
  }

  @GrpcMethod('SupplierProductService', 'UnsuspendSupplierProduct')
  async unsuspendSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      if (!data.id || !data.reason || !data.unsuspendedBy) {
        return {
          success: false,
          message: 'Missing required fields: id, reason, unsuspendedBy',
          data: undefined
        };
      }
      const { id, reason, unsuspendedBy } = data;
      const result = await this.unsuspendSupplierProductUseCase.execute(id, reason, unsuspendedBy);
      return {
        success: result.success,
        message: result.message,
        data: result.data as unknown
      };
    } catch (error) {
      return { success: false, message: this.getErrorMessage(error) || 'Failed' };
    }
  }


  @GrpcMethod('SupplierProductService', 'UnhideSupplierProduct')
  async unhideSupplierProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      if (!data.id || !data.unhiddenBy) {
        return {
          success: false,
          message: 'Missing required fields: id, unhiddenBy',
          data: undefined
        };
      }
      const request = {
        id: data.id,
        unhiddenBy: data.unhiddenBy
      };
      const result = await this.unhideSupplierProductUseCase.execute(request);
      return result;
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error),
        data: undefined
      };
    }
  }

  // Seller view endpoints
  @GrpcMethod('SupplierProductService', 'GetSupplierProductSellerView')
  async getSellerProduct(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      if (!data.id) {
        return {
          success: false,
          message: 'Missing required field: id',
          data: undefined
        };
      }
      const result = await this.getSupplierProductSellerViewUseCase.execute(data.id);
      return {
        success: result.success,
        message: result.message,
        data: result.data as unknown
      };
    } catch (error) {
      return { success: false, message: this.getErrorMessage(error) || 'Failed' };
    }
  }

  @GrpcMethod('SupplierProductService', 'ListSupplierProductSellerView')
  async listSellerProducts(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      const page = data.page || 1;
      const limit = data.limit || 10;
      const filters = { categoryId: data.categoryId, search: data.search, supplierId: data.supplierId };
      const result = await this.listSupplierProductSellerViewUseCase.execute(page, limit, filters);
      return {
        success: result.success,
        message: result.message,
        products: result.products as unknown[],
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages
      };
    } catch (error) {
      return { success: false, message: this.getErrorMessage(error) || 'Failed' };
    }
  }

  // =============== Supplier Management Methods ===============

  @GrpcMethod('SupplierProductService', 'GetSupplierProductStats')
  async getSupplierProductStats(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      if (!data.supplierId) {
        return {
          success: false,
          message: 'Missing required field: supplierId',
          data: undefined
        };
      }
      const result = await this.getSupplierProductStatsUseCase.execute(data.supplierId);
      return {
        success: result.success,
        message: result.message,
        data: result.data as unknown
      };
    } catch (error) {
      return {
        success: false,
        message: this.getErrorMessage(error),
        data: undefined
      };
    }
  }

  @GrpcMethod('SupplierProductService', 'getSupplierProductsByIds')
  async getSupplierProductsByIds(data: GrpcRequest): Promise<GrpcResponse> {
    try {
      if (!data.productIds || !Array.isArray(data.productIds)) {
        return {
          success: false,
          message: 'productIds is required and must be an array',
          products: [],
          total: 0,
          page: 1,
          limit: 0,
          totalPages: 0
        };
      }
      const products = await this.getSupplierProductsByIdsUseCase.execute(data.productIds);
      return {
        success: true,
        message: 'Products retrieved successfully',
        products: products.map(product => {
          const normalized = this.normalizeEnumsOut({ success: true, message: '', data: product } as GrpcResponse);
          return normalized.data!;
        }),
        total: products.length,
        page: 1,
        limit: products.length,
        totalPages: 1
      };
    } catch (error) {
      console.error('Error in getSupplierProductsByIds:', error);
      return {
        success: false,
        message: this.getErrorMessage(error) || 'Failed to fetch products by IDs',
        data: undefined
      };
    }
  }
}



