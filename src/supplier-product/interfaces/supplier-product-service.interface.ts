import { SupplierProductResponseDto, SupplierProductListResponseDto } from '../dto/supplier-product-response.dto';
import { CreateSupplierProductRequest } from '../dto/create-supplier-product-request.dto';
import { UpdateSupplierProductRequest } from '../dto/update-supplier-product-request.dto';

export interface ServiceResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ISupplierProductService {
  execute(...args: any[]): Promise<any>;
}

export interface ICreateSupplierProductService extends ISupplierProductService {
  execute(request: CreateSupplierProductRequest): Promise<SupplierProductResponseDto>;
}

export interface IGetSupplierProductService extends ISupplierProductService {
  execute(id: string): Promise<ServiceResponse<SupplierProductResponseDto>>;
}

export interface IGetSupplierProductsService extends ISupplierProductService {
  execute(page?: number, limit?: number, filters?: any): Promise<SupplierProductListResponseDto>;
}

export interface IUpdateSupplierProductService extends ISupplierProductService {
  execute(request: UpdateSupplierProductRequest): Promise<ServiceResponse<SupplierProductResponseDto>>;
}

export interface IDeleteSupplierProductService extends ISupplierProductService {
  execute(id: string): Promise<ServiceResponse>;
}

export interface IApproveSupplierProductService extends ISupplierProductService {
  execute(productId: string, approvedBy: string): Promise<SupplierProductResponseDto>;
}

export interface IRejectSupplierProductService extends ISupplierProductService {
  execute(productId: string, reason: string, rejectedBy: string): Promise<SupplierProductResponseDto>;
}
