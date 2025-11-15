import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateSupplierProductRequest } from '../dto/create-supplier-product-request.dto';
import { ProductType } from '../enums/product-type.enum';
import { EnumMapper } from '../utils/enum-mapper.util';
import { GetSupplierProductsFilters } from '../services/get-supplier-products.service';

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

/**
 * ✅ GRPC REQUEST MAPPER - Handles gRPC to DTO conversion
 * 
 * Responsibilities:
 * - Convert gRPC requests to internal DTOs
 * - Validate required fields
 * - Handle type conversions
 * - Sanitize input data
 */
@Injectable()
export class GrpcRequestMapper {

  toCreateSupplierProductRequest(data: GrpcRequest): CreateSupplierProductRequest {
    this.validateCreateRequest(data);

    return {
      supplierId: data.supplierId!,
      name: data.name!,
      description: data.description!,
      shortDescription: data.shortDescription,
      sku: data.sku!,
      categoryName: data.categoryName!,
      price: {
        listingPrice: data.price!.listingPrice!,
        retailPrice: data.price!.retailPrice!,
        currency: data.price!.currency!
      },
      inventory: {
        quantity: data.inventory!.quantity!
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
      weight: this.extractWeight(data.weight),
      dimensions: this.extractDimensions(data.dimensions),
      seoData: data.seoData,
      images: (data.images || []) as CreateSupplierProductRequest['images']
    };
  }

  toGetSupplierProductsRequest(data: GrpcRequest): {
    page: number;
    limit: number;
    filters: GetSupplierProductsFilters;
  } {
    const page = data.page || 1;
    const limit = data.limit || 10;
    
    const filters: GetSupplierProductsFilters = {
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

    return { page, limit, filters };
  }

  toUpdateSupplierProductRequest(data: GrpcRequest): Record<string, unknown> {
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
      payload.weight = this.extractWeight(payload.weight);
    }

    return payload;
  }

  toApproveSupplierProductRequest(data: GrpcRequest): { id: string; approvedBy: string } {
    if (!data.id || !data.approvedBy) {
      throw new BadRequestException('Missing required fields: id, approvedBy');
    }
    return { id: data.id, approvedBy: data.approvedBy };
  }

  toRejectSupplierProductRequest(data: GrpcRequest): { id: string; reason: string; rejectedBy: string } {
    if (!data.id || !data.reason || !data.rejectedBy) {
      throw new BadRequestException('Missing required fields: id, reason, rejectedBy');
    }
    return { id: data.id, reason: data.reason, rejectedBy: data.rejectedBy };
  }

  toHideSupplierProductRequest(data: GrpcRequest): { id: string; reason: string; hiddenBy: string } {
    if (!data.id || !data.reason || !data.hiddenBy) {
      throw new BadRequestException('Missing required fields: id, reason, hiddenBy');
    }
    return { id: data.id, reason: data.reason, hiddenBy: data.hiddenBy };
  }

  toUnhideSupplierProductRequest(data: GrpcRequest): { id: string; unhiddenBy: string } {
    if (!data.id || !data.unhiddenBy) {
      throw new BadRequestException('Missing required fields: id, unhiddenBy');
    }
    return { id: data.id, unhiddenBy: data.unhiddenBy };
  }

  toSuspendSupplierProductRequest(data: GrpcRequest): { 
    id: string; 
    reason: string; 
    suspendedBy: string; 
    suspensionDuration?: number 
  } {
    if (!data.id || !data.reason || !data.suspendedBy) {
      throw new BadRequestException('Missing required fields: id, reason, suspendedBy');
    }
    return { 
      id: data.id, 
      reason: data.reason, 
      suspendedBy: data.suspendedBy,
      suspensionDuration: data.suspensionDuration
    };
  }

  toUnsuspendSupplierProductRequest(data: GrpcRequest): { id: string; reason: string; unsuspendedBy: string } {
    if (!data.id || !data.reason || !data.unsuspendedBy) {
      throw new BadRequestException('Missing required fields: id, reason, unsuspendedBy');
    }
    return { id: data.id, reason: data.reason, unsuspendedBy: data.unsuspendedBy };
  }

  toListSupplierProductSellerViewRequest(data: GrpcRequest): {
    page: number;
    limit: number;
    filters: { categoryId?: string; search?: string; supplierId?: string };
  } {
    const page = data.page || 1;
    const limit = data.limit || 10;
    const filters = { 
      categoryId: data.categoryId, 
      search: data.search, 
      supplierId: data.supplierId 
    };
    return { page, limit, filters };
  }

  extractRequiredId(data: GrpcRequest): string {
    if (!data.id) {
      throw new BadRequestException('Missing required field: id');
    }
    return data.id;
  }

  extractRequiredSupplierId(data: GrpcRequest): string {
    if (!data.supplierId) {
      throw new BadRequestException('Missing required field: supplierId');
    }
    return data.supplierId;
  }

  extractRequiredProductIds(data: GrpcRequest): string[] {
    if (!data.productIds || !Array.isArray(data.productIds)) {
      throw new BadRequestException('productIds is required and must be an array');
    }
    return data.productIds;
  }

  private validateCreateRequest(data: GrpcRequest): void {
    if (!data.supplierId || !data.name || !data.description || !data.sku || !data.categoryName) {
      throw new BadRequestException('Missing required fields: supplierId, name, description, sku, categoryName');
    }
    if (!data.price || data.price.listingPrice === undefined || data.price.retailPrice === undefined || !data.price.currency) {
      throw new BadRequestException('Missing required price fields: listingPrice, retailPrice, currency');
    }
    if (!data.inventory || data.inventory.quantity === undefined) {
      throw new BadRequestException('Missing required inventory field: quantity');
    }
  }

  private extractWeight(weight: unknown): number | undefined {
    if (weight === undefined) return undefined;
    
    if (typeof weight === 'object' && weight !== null && !Array.isArray(weight)) {
      const weightObj = weight as { value?: unknown };
      if (weightObj.value !== undefined) {
        return Number(weightObj.value);
      }
    }
    
    return Number(weight);
  }

  private extractDimensions(dimensions: unknown): CreateSupplierProductRequest['dimensions'] {
    if (!dimensions || typeof dimensions !== 'object' || Array.isArray(dimensions)) {
      return undefined;
    }

    const dim = dimensions as { length?: number; width?: number; height?: number; unit?: string };
    
    if (dim.length !== undefined && 
        dim.width !== undefined && 
        dim.height !== undefined && 
        dim.unit !== undefined) {
      return {
        length: dim.length,
        width: dim.width,
        height: dim.height,
        unit: dim.unit
      };
    }

    return undefined;
  }
}
