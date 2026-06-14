import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SupplierProductService } from '../services/supplier-product.service';
import { Metadata } from '@grpc/grpc-js';
import { GrpcAuthGuard } from '../../common/auth/grpc-auth.guard';
import { RolesGuard } from '../../common/auth/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ResponseView } from '../../common/decorators/response-view.decorator';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateVariantDto } from '../dto/create-variant.dto';
import { UpdateVariantDto } from '../dto/update-variant.dto';
import { AddProductImagesDto } from '../dto/add-product-images.dto';
import { PublishProductDto } from '../dto/publish-product.dto';
import { UnpublishProductDto } from '../dto/unpublish-product.dto';
import { GetSupplierProductsDto } from '../dto/get-supplier-products.dto';
import { GetSupplierProductDetailDto } from '../dto/get-supplier-product-detail.dto';
import { AdminSuspendProductDto } from '../dto/admin-suspend-product.dto';
import { AdminUnsuspendProductDto } from '../dto/admin-unsuspend-product.dto';
import { AdminApproveProductDto } from '../dto/admin-approve-product.dto';
import { AdminRejectProductDto } from '../dto/admin-reject-product.dto';
import { GetVariantsByProductIdDto } from '../dto/get-variants-by-product-id.dto';
import { BatchGetVariantsDto } from '../dto/batch-get-variants.dto';
import { UpdateInventorySnapshotDto } from '../dto/update-inventory-snapshot.dto';
import {
    ProductDetailResponseView,
    ProductListResponseView,
} from '../dto/common-response.view';
import { ArchiveProductDto } from '../dto/archive-product.dto';
import { UpdateModel3dDto } from '../dto/update-model-3d.dto';
import { validateDto } from 'src/common/validation/validate-dto.util';
import { extractAuth } from 'src/common/auth/grpc-metadata.util';

@UseGuards(GrpcAuthGuard, RolesGuard)
@Controller()
export class SupplierProductController {
    constructor(
        private readonly supplierProductService: SupplierProductService,
    ) { }

    // ===== Common APIs ====== Supplier, Seller, Admin, Internal
    @GrpcMethod('SupplierProductService', 'GetSupplierProducts')
    @Roles('SUPPLIER', 'SELLER', 'ADMIN', 'INTERNAL')
    @ResponseView(ProductListResponseView)
    async getSupplierProducts(data: GetSupplierProductsDto, metadata: Metadata) {
        const dto = await validateDto(GetSupplierProductsDto, data);
        const user = extractAuth(metadata);
        return await this.supplierProductService.getSupplierProducts(dto, user.role, user.userId);
    }

    @GrpcMethod('SupplierProductService', 'GetSupplierProductDetail')
    @Roles('SUPPLIER', 'SELLER', 'ADMIN', 'INTERNAL')
    @ResponseView(ProductDetailResponseView)
    async getSupplierProductDetail(data: GetSupplierProductDetailDto, metadata: Metadata) {
        const dto = await validateDto(GetSupplierProductDetailDto, data);
        const user = extractAuth(metadata);
        return await this.supplierProductService.getSupplierProductDetail(dto.productId, user.role, user.userId);
    }

    // ===== Supplier APIs =====

    @GrpcMethod('SupplierProductService', 'CreateProduct')
    @Roles('SUPPLIER')
    async createProduct(data: CreateProductDto, metadata: Metadata) {
        const dto = await validateDto(CreateProductDto, data);
        const user = extractAuth(metadata);
        return await this.supplierProductService.createProduct({
            ...dto,
        }, user.role, user.userId);
    }

    @GrpcMethod('SupplierProductService', 'UpdateProduct')
    @Roles('SUPPLIER')
    async updateProduct(data: UpdateProductDto, metadata: Metadata) {
        const dto = await validateDto(UpdateProductDto, data);
        const user = extractAuth(metadata);
        return await this.supplierProductService.updateProduct(
            dto.productId,
            user.userId,
            dto,
        );
    }

    @GrpcMethod('SupplierProductService', 'CreateVariant')
    @Roles('SUPPLIER')
    async createVariant(data: CreateVariantDto, metadata: Metadata) {
        const dto = await validateDto(CreateVariantDto, data);
        const user = extractAuth(metadata);
        return await this.supplierProductService.createVariant(user.userId, dto);
    }

    @GrpcMethod('SupplierProductService', 'UpdateVariant')
    @Roles('SUPPLIER')
    async updateVariant(data: UpdateVariantDto, metadata: Metadata) {
        const dto = await validateDto(UpdateVariantDto, data);
        const user = extractAuth(metadata);
        return await this.supplierProductService.updateVariant(
            dto.variantId,
            user.userId,
            dto,
        );
    }

    @GrpcMethod('SupplierProductService', 'AddProductImages')
    @Roles('SUPPLIER')
    async addProductImages(data: AddProductImagesDto, metadata: Metadata) {
        const dto = await validateDto(AddProductImagesDto, data);
        const user = extractAuth(metadata);
        return await this.supplierProductService.addProductImages(
            dto.productId,
            user.userId,
            dto,
        );
    }

    @GrpcMethod('SupplierProductService', 'PublishProduct')
    @Roles('SUPPLIER')
    async publishProduct(data: PublishProductDto, metadata: Metadata) {
        const dto = await validateDto(PublishProductDto, data);
        const user = extractAuth(metadata);
        return await this.supplierProductService.publishProduct(
            dto.productId,
            user.userId,
        );
    }

    @GrpcMethod('SupplierProductService', 'UnpublishProduct')
    @Roles('SUPPLIER')
    async unpublishProduct(data: UnpublishProductDto, metadata: Metadata) {
        const dto = await validateDto(UnpublishProductDto, data);
        const user = extractAuth(metadata);
        return await this.supplierProductService.unpublishProduct(
            dto.productId,
            user.userId,
        );
    }

    @GrpcMethod('SupplierProductService', 'ArchiveProduct')
    @Roles('SUPPLIER')
    async archiveProduct(data: ArchiveProductDto, metadata: Metadata) {
        const dto = await validateDto(ArchiveProductDto, data);
        const user = extractAuth(metadata);
        return await this.supplierProductService.archiveProduct(dto.productId, user.userId);
    }

    // ===== Admin APIs =====

    @GrpcMethod('SupplierProductService', 'AdminSuspendProduct')
    @Roles('ADMIN')
    async adminSuspendProduct(data: AdminSuspendProductDto, metadata: Metadata) {
        const dto = await validateDto(AdminSuspendProductDto, data);
        const user = extractAuth(metadata);
        return await this.supplierProductService.adminSuspendProduct(dto.productId, dto.reason, user.role);
    }

    @GrpcMethod('SupplierProductService', 'AdminUnsuspendProduct')
    @Roles('ADMIN')
    async adminUnsuspendProduct(data: AdminUnsuspendProductDto, metadata: Metadata) {
        const dto = await validateDto(AdminUnsuspendProductDto, data);
        const user = extractAuth(metadata);
        return await this.supplierProductService.adminUnsuspendProduct(dto.productId, user.role);
    }

    @GrpcMethod('SupplierProductService', 'AdminApproveProduct')
    @Roles('ADMIN')
    async adminApproveProduct(data: AdminApproveProductDto, metadata: Metadata) {
        const dto = await validateDto(AdminApproveProductDto, data);
        const user = extractAuth(metadata);
        return await this.supplierProductService.adminApproveProduct(dto.productId, user.role);
    }

    @GrpcMethod('SupplierProductService', 'AdminRejectProduct')
    @Roles('ADMIN')
    async adminRejectProduct(data: AdminRejectProductDto, metadata: Metadata) {
        const dto = await validateDto(AdminRejectProductDto, data);
        const user = extractAuth(metadata);
        return await this.supplierProductService.adminRejectProduct(
            dto.productId,
            dto.reason,
            user.role,
        );
    }

    // ===== Internal APIs =====

    @GrpcMethod('SupplierProductService', 'GetVariantsByProductId')
    async getVariantsByProductId(
        data: GetVariantsByProductIdDto,
        metadata: Metadata,
    ) {
        const dto = await validateDto(GetVariantsByProductIdDto, data);
        return await this.supplierProductService.getVariantsByProductId(dto.productId);
    }

    @GrpcMethod('SupplierProductService', 'BatchGetVariants')
    async batchGetVariants(data: BatchGetVariantsDto, metadata: Metadata) {
        const dto = await validateDto(BatchGetVariantsDto, data);
        return await this.supplierProductService.batchGetVariants(dto.variantIds);
    }

    @GrpcMethod('SupplierProductService', 'UpdateInventorySnapshot')
    async updateInventorySnapshot(
        data: UpdateInventorySnapshotDto,
        metadata: Metadata,
    ) {
        const dto = await validateDto(UpdateInventorySnapshotDto, data);
        return await this.supplierProductService.updateInventorySnapshot(dto);
    }

    @GrpcMethod('SupplierProductService', 'InternalUpdateModel3d')
    @Roles('INTERNAL')
    async internalUpdateModel3d(data: UpdateModel3dDto, metadata: Metadata) {
        const dto = await validateDto(UpdateModel3dDto, data);
        return await this.supplierProductService.internalUpdateModel3d(dto);
    }
}
