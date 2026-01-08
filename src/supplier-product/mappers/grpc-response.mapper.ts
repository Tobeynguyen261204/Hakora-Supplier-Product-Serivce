import { Injectable } from '@nestjs/common';
import { SupplierProductResponseDto } from '../dto/supplier-product-response.dto';
import { ProductType } from '../enums/product-type.enum';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';
import { EnumMapper } from '../utils/enum-mapper.util';

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

interface ServiceResponse {
  success: boolean;
  message: string;
  data?: unknown;
  products?: unknown[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

/**
 * ✅ GRPC RESPONSE MAPPER - Handles DTO to gRPC response conversion
 * 
 * Responsibilities:
 * - Convert internal DTOs to gRPC responses
 * - Handle error formatting
 * - Normalize enums for protobuf compatibility
 * - Format success/error responses consistently
 */
@Injectable()
export class GrpcResponseMapper {

  toSuccessResponse(message: string, data: unknown): GrpcResponse {
    return this.normalizeEnumsOut({
      success: true,
      message,
      data
    });
  }

  toErrorResponse(error: unknown): GrpcResponse {
    return {
      success: false,
      message: this.getErrorMessage(error),
      data: undefined
    };
  }

  toPaginatedResponse(
    message: string,
    products: unknown[],
    total: number,
    page: number,
    limit: number,
    totalPages: number,
    stats?: GrpcResponse['stats']
  ): GrpcResponse {
    return this.normalizeEnumsOut({
      success: true,
      message,
      products,
      total,
      page,
      limit,
      totalPages,
      stats
    });
  }

  toProductsResponse(message: string, products: SupplierProductResponseDto[]): GrpcResponse {
    const normalizedProducts = products.map(product => {
      const normalized = this.normalizeEnumsOut({ success: true, message: '', data: product });
      return normalized.data!;
    });

    return {
      success: true,
      message,
      products: normalizedProducts,
      total: products.length,
      page: 1,
      limit: products.length,
      totalPages: 1
    };
  }

  toServiceResponse(serviceResult: ServiceResponse): GrpcResponse {
    if (serviceResult.success) {
      return this.normalizeEnumsOut({
        success: serviceResult.success,
        message: serviceResult.message,
        data: serviceResult.data as unknown
      });
    } else {
      return {
        success: false,
        message: serviceResult.message || 'Failed'
      };
    }
  }

  toServicePaginatedResponse(serviceResult: ServiceResponse): GrpcResponse {
    if (serviceResult.success) {
      return {
        success: serviceResult.success,
        message: serviceResult.message,
        products: serviceResult.products as unknown[],
        total: serviceResult.total,
        page: serviceResult.page,
        limit: serviceResult.limit,
        totalPages: serviceResult.totalPages
      };
    } else {
      return {
        success: false,
        message: serviceResult.message || 'Failed'
      };
    }
  }

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
}
