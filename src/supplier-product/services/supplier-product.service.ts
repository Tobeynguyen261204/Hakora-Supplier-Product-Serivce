import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ForbiddenException,
    Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { SupplierProduct } from '../entities/supplier-product.entity';
import { SupplierProductVariant } from '../entities/supplier-product-variant.entity';
import { SupplierProductImage } from '../entities/supplier-product-image.entity';
import { SupplierProductStatus } from '../entities/supplier-product-status.enum';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateVariantDto } from '../dto/create-variant.dto';
import { UpdateVariantDto } from '../dto/update-variant.dto';
import { AddProductImagesDto } from '../dto/add-product-images.dto';
import { UpdateInventorySnapshotDto } from '../dto/update-inventory-snapshot.dto';
import { GetSupplierProductsDto } from '../dto/get-supplier-products.dto';
import { Metadata } from '@grpc/grpc-js';
import { ArchiveProductDto } from '../dto/archive-product.dto';
import { UpdateModel3dDto } from '../dto/update-model-3d.dto';

interface InventoryGrpcService {
    addStock(data: { variantId: string; supplierId: string; quantity: number }): Observable<any>;
    updateInventory(data: { variantId: string; quantity: number }): Observable<any>;
}

@Injectable()
export class SupplierProductService {
    private inventoryGrpc!: InventoryGrpcService;

    constructor(
        @InjectRepository(SupplierProduct)
        private supplierProductRepository: Repository<SupplierProduct>,
        @InjectRepository(SupplierProductVariant)
        private supplierProductVariantRepository: Repository<SupplierProductVariant>,
        @InjectRepository(SupplierProductImage)
        private supplierProductImageRepository: Repository<SupplierProductImage>,
        @Inject('INVENTORY_SERVICE')
        private inventoryClient: ClientGrpc,
    ) { }

    async onModuleInit() {
        this.inventoryGrpc = this.inventoryClient.getService<InventoryGrpcService>('InventoryService');
    }

    // Helper methods to format responses
    private toGrpcStringMap(input: unknown): Record<string, string> {
        if (!input || typeof input !== 'object') return {};
        return Object.fromEntries(
            Object.entries(input as Record<string, unknown>).map(([k, v]) => [k, String(v)]),
        );
    }

    private formatProductResponse(product: SupplierProduct) {
        return {
            id: product.id,
            supplierId: product.supplierId || '',
            name: product.name,
            description: product.description,
            categoryId: product.categoryId || '',
            status: product.status,
            specifications: this.toGrpcStringMap(product.specifications), // ép chắc chắn
            tags: product.tags || [],
            ratingAvg: Number(product.ratingAvg || 0),
            ratingCount: product.ratingCount || 0,
            isFeatured: !!product.isFeatured,
            createdAt: product.createdAt?.toISOString() || new Date().toISOString(),
            updatedAt: product.updatedAt?.toISOString() || new Date().toISOString(),
            modelGlbUrl: product.modelGlbUrl ?? '',
            modelVideoUrl: product.modelVideoUrl ?? '',
            model3dStatus: product.model3dStatus ?? 'none',
            model3dJobId: product.model3dJobId ?? '',
            model3dPosterUrl: product.model3dPosterUrl ?? '',
            model3dSource: product.model3dSource ?? 'none',
            model3dError: product.model3dError ?? '',
            model3dProgress: Number(product.model3dProgress ?? 0),
            modelOrbitImageUrls: product.modelOrbitImageUrls ?? [],
        };
    }

    private formatVariantResponse(variant: SupplierProductVariant) {
        const rawAttrs =
            typeof variant.attributes === 'string'
                ? JSON.parse(variant.attributes || '{}')
                : (variant.attributes || {});

        return {
            id: variant.id,
            productId: (variant as any).productId || variant.product?.id || '',
            sku: variant.sku,
            supplierPrice: Number(variant.supplierPrice || 0),
            currency: variant.currency || 'USD',
            attributes: this.toGrpcStringMap(rawAttrs), // ép chắc chắn
            inventorySnapshot: variant.inventorySnapshot || 0,
        };
    }

    private formatImageResponse(image: SupplierProductImage) {
        return {
            id: image.id,
            productId: image.product?.id || '',
            url: image.url,
            altText: image.altText || '',
            isPrimary: image.isPrimary,
            sortOrder: image.sortOrder,
            width: image.width || 0,
            height: image.height || 0,
            variantId: image.variantId || '',
        };
    }

    private formatProductListItemResponse(product: SupplierProduct) {
        const variants = product.variants || [];
        const prices = variants.map((v) => Number(v.supplierPrice || 0));

        return {
            id: product.id,
            supplierId: product.supplierId || '',
            name: product.name,
            description: product.description,
            categoryId: product.categoryId || '',
            tags: product.tags || [],
            specifications: product.specifications || {},
            status: product.status,
            imageUrl: (product.images || []).find((i) => i.isPrimary)?.url || '',
            totalStock: variants.reduce((acc, variant) => acc + Number(variant.inventorySnapshot || 0), 0),
            minSupplierPrice: prices.length ? Math.min(...prices) : 0,
            maxSupplierPrice: prices.length ? Math.max(...prices) : 0,
            currency: variants[0]?.currency || 'USD',
            ratingAvg: Number(product.ratingAvg || 0),
            ratingCount: product.ratingCount || 0,
            isFeatured: !!product.isFeatured,
            createdAt: product.createdAt?.toISOString() || new Date().toISOString(),
            updatedAt: product.updatedAt?.toISOString() || new Date().toISOString(),
        };
    }

    private applySupplierStatusUpdate(
        product: SupplierProduct,
        requestedStatus: SupplierProductStatus,
    ) {
        const current = product.status;
        if (requestedStatus === current) {
            return;
        }

        const allowedTransitions: Partial<
            Record<SupplierProductStatus, SupplierProductStatus[]>
        > = {
            [SupplierProductStatus.DRAFT]: [
                SupplierProductStatus.DRAFT,
                SupplierProductStatus.PENDING_REVIEW,
            ],
            [SupplierProductStatus.REJECTED]: [
                SupplierProductStatus.DRAFT,
                SupplierProductStatus.PENDING_REVIEW,
            ],
            [SupplierProductStatus.ACTIVE]: [
                SupplierProductStatus.ACTIVE,
                SupplierProductStatus.HIDDEN,
                SupplierProductStatus.DISCONTINUED,
            ],
            [SupplierProductStatus.HIDDEN]: [
                SupplierProductStatus.ACTIVE,
                SupplierProductStatus.HIDDEN,
            ],
        };

        const allowed = allowedTransitions[current];
        if (!allowed || !allowed.includes(requestedStatus)) {
            throw new BadRequestException(
                `Cannot change product status from ${current} to ${requestedStatus}`,
            );
        }

        product.status = requestedStatus;
    }

    // ===== Supplier APIs =====

    async createProduct(dto: CreateProductDto, role: string, userId: string) {
        const normalizedRole = (role || '').toUpperCase();
        if (normalizedRole !== 'SUPPLIER') {
            throw new ForbiddenException('You are not authorized to create products');
        }

        return await this.supplierProductRepository.manager.transaction(async (em) => {
            const productRepo = em.getRepository(SupplierProduct);
            const imageRepo = em.getRepository(SupplierProductImage);
            const variantRepo = em.getRepository(SupplierProductVariant);
            const allowedCreateStatuses = new Set<SupplierProductStatus>([
                SupplierProductStatus.DRAFT,
                SupplierProductStatus.PENDING_REVIEW,
            ]);

            const requestedStatus = (dto.status as SupplierProductStatus | undefined) ?? SupplierProductStatus.DRAFT;
            if (!allowedCreateStatuses.has(requestedStatus)) {
                throw new BadRequestException('Invalid status for product creation');
            }

            const product = productRepo.create({
                supplierId: userId,
                name: dto.name,
                description: dto.description,
                categoryId: dto.categoryId,
                specifications: dto.specifications || {},
                status: requestedStatus,
                tags: dto.tags || [],
                ratingAvg: 0,
                ratingCount: 0,
                modelGlbUrl: dto.modelGlbUrl?.trim() ? dto.modelGlbUrl.trim() : null,
            });

            const savedProduct = await productRepo.save(product);

            if (Array.isArray(dto.images) && dto.images.length > 0) {
                const images = dto.images.map((img, index) =>
                    imageRepo.create({
                        product: savedProduct as any,
                        url: img.url,
                        altText: img.altText || '',
                        isPrimary: img.isPrimary ?? index === 0,
                        sortOrder: img.sortOrder ?? index,
                    }),
                );
                await imageRepo.save(images);
            }

            if (Array.isArray(dto.variants) && dto.variants.length > 0) {
                const variants = dto.variants.map((v) =>
                    variantRepo.create({
                        product: savedProduct as any,
                        sku: v.sku,
                        supplierPrice: v.supplierPrice,
                        currency: v.currency || 'USD',
                        attributes: v.attributes || {},
                        inventorySnapshot: v.inventorySnapshot || 0,
                    }),
                );
                const savedVariants = await variantRepo.save(variants);

                // sync inventory best-effort
                await Promise.allSettled(
                    savedVariants.map((v) =>
                        firstValueFrom(
                            this.inventoryGrpc.addStock({
                                variantId: v.id,
                                supplierId: userId,
                                quantity: Number(v.inventorySnapshot || 0),
                            }),
                        ),
                    ),
                );
            }

            return { product: this.formatProductResponse(savedProduct) };
        });
    }

    async updateProduct(productId: string, supplierId: string, dto: UpdateProductDto) {
        console.dir(dto, { depth: null });
        const product = await this.supplierProductRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }
        if (product.supplierId !== supplierId) {
            throw new ForbiddenException('You are not authorized to update this product');
        }

        // Optimistic concurrency (nếu bạn đã có cột version hoặc updatedAt)
        if ((dto as any).version !== undefined && (product as any).version !== undefined) {
            if ((product as any).version !== (dto as any).version) {
                throw new BadRequestException('Product has been modified by another process');
            }
        }

        // Patch scalar fields (chỉ field nào có thì mới set)
        if (dto.name !== undefined) product.name = dto.name;
        if (dto.description !== undefined) product.description = dto.description;
        if (dto.categoryId !== undefined) product.categoryId = dto.categoryId;
        if (dto.specifications !== undefined) product.specifications = dto.specifications;
        if (dto.tags !== undefined) (product as any).tags = dto.tags; // nếu entity có tags
        if (dto.modelGlbUrl !== undefined) {
            const t = dto.modelGlbUrl.trim();
            product.modelGlbUrl = t ? t : null;
            if (t) {
                product.model3dSource = 'manual_glb';
                product.model3dStatus = 'ready';
                product.model3dProgress = 100;
                product.model3dError = null;
            }
        }
        if (dto.modelVideoUrl !== undefined) {
            const t = dto.modelVideoUrl.trim();
            product.modelVideoUrl = t ? t : null;
        }
        if (dto.modelOrbitImageUrls !== undefined) {
            const urls = (dto.modelOrbitImageUrls || [])
                .map((u) => String(u || '').trim())
                .filter(Boolean);
            product.modelOrbitImageUrls = urls.length ? urls : null;
            if (urls.length >= 1 && !product.model3dPosterUrl) {
                product.model3dPosterUrl = urls[0];
            }
            if (urls.length >= 2) {
                product.model3dSource = 'orbit_images';
                const generating = ['pending', 'extracting_frames', 'reconstructing', 'optimizing'];
                if (!generating.includes(String(product.model3dStatus || '').toLowerCase())) {
                    product.model3dStatus = 'ready';
                    product.model3dProgress = 100;
                    product.model3dError = null;
                }
            }
            if (urls.length === 0) {
                product.modelOrbitImageUrls = null;
                if (product.model3dSource === 'orbit_images') {
                    product.model3dSource = 'none';
                    if (!product.modelGlbUrl) {
                        product.model3dStatus = 'none';
                        product.model3dProgress = 0;
                    }
                }
            }
        }
        if (dto.status !== undefined) {
            if (dto.status === SupplierProductStatus.PENDING_REVIEW) {
                const withRelations = await this.supplierProductRepository.findOne({
                    where: { id: productId },
                    relations: ['variants', 'images'],
                });
                if (!withRelations?.variants?.length) {
                    throw new BadRequestException(
                        'Product must have at least one variant to submit for review',
                    );
                }
                if (!withRelations?.images?.length) {
                    throw new BadRequestException(
                        'Product must have at least one image to submit for review',
                    );
                }
            }
            this.applySupplierStatusUpdate(product, dto.status as SupplierProductStatus);
        }

        const inventoryDeltas: Array<{ variantId: string; supplierId: string; delta: number }> = [];
        // Transaction để đảm bảo nhất quán khi xử lý images/variants
        await this.supplierProductRepository.manager.transaction(async (em) => {
            const productRepo = em.getRepository(SupplierProduct);
            const imageRepo = em.getRepository(SupplierProductImage);
            const variantRepo = em.getRepository(SupplierProductVariant);

            // Lưu product trước (tăng version nếu bạn có cơ chế này ở entity)
            const savedProduct = await productRepo.save(product);

            // IMAGES: operation-based patch
            if (dto.images !== undefined && Array.isArray(dto.images)) {
                const deleteIds = dto.images
                    .filter((x: any) => x.operation === 'DELETE')
                    .map((x: any) => x.id)
                    .filter((id: any) => !!id);

                if (deleteIds.length > 0) {
                    await imageRepo.delete({
                        id: In(deleteIds),
                        product: { id: savedProduct.id } as any,
                    });
                }

                const upserts = dto.images.filter((x: any) => x.operation === undefined || x.operation === 'UPSERT');

                // Business validation (isPrimary <= 1, sortOrder unique) trên payload upsert
                if (upserts.length > 0) {
                    const primaryCount = upserts.reduce((acc: number, it: any) => acc + (it.isPrimary ? 1 : 0), 0);
                    if (primaryCount > 1) {
                        throw new BadRequestException('Only one image can have isPrimary=true within this request');
                    }
                    const sortSet = new Set<number>();
                    for (const it of upserts) {
                        if (it.sortOrder !== undefined) {
                            if (sortSet.has(it.sortOrder)) {
                                throw new BadRequestException('Duplicate sortOrder in images');
                            }
                            sortSet.add(it.sortOrder);
                        }
                    }
                }

                for (const img of upserts) {
                    if (img.id) {
                        // update existing
                        const exist = await imageRepo.findOne({
                            where: {
                                id: img.id,
                                product: { id: savedProduct.id } as any,
                            },
                        });
                        if (!exist) {
                            throw new NotFoundException(`Image ${img.id} not found in product ${savedProduct.id}`);
                        }

                        if (img.url !== undefined) exist.url = img.url;
                        if (img.altText !== undefined) exist.altText = img.altText;
                        if (img.isPrimary !== undefined) exist.isPrimary = img.isPrimary;
                        if (img.sortOrder !== undefined) exist.sortOrder = img.sortOrder;
                        await imageRepo.save(exist);
                    } else {
                        // create new
                        const imageEntity = imageRepo.create({
                            product: savedProduct as any,
                            url: img.url,
                            altText: img.altText,
                            isPrimary: img.isPrimary,
                            sortOrder: img.sortOrder,
                        });
                        await imageRepo.save(imageEntity);
                    }
                }
            }

            // VARIANTS: operation-based patch
            if (dto.variants !== undefined && Array.isArray(dto.variants)) {
                // Validate operation contract trước khi xử lý
                for (const item of dto.variants as any[]) {
                    if (item.operation === 'DELETE' && !item.id) {
                        throw new BadRequestException('id is required when operation=DELETE');
                    }
                }

                const deleteIds = dto.variants
                    .filter((x: any) => x.operation === 'DELETE')
                    .map((x: any) => x.id)
                    .filter((id: any) => !!id);

                const toDelete = await variantRepo.find({
                    where: {
                        id: In(deleteIds),
                        product: { id: savedProduct.id } as any,
                    },
                });

                for (const v of toDelete) {
                    inventoryDeltas.push({
                        variantId: v.id,
                        supplierId,
                        delta: -Number(v.inventorySnapshot || 0),
                    });
                }

                if (deleteIds.length > 0) {
                    await variantRepo.delete({
                        id: In(deleteIds),
                        product: { id: savedProduct.id } as any,
                    });
                }

                const upserts = dto.variants.filter((x: any) => x.operation === undefined || x.operation === 'UPSERT');

                // Business validation: SKU duplicate trong payload
                if (upserts.length > 0) {
                    const skuSet = new Set<string>();
                    for (const v of upserts) {
                        if (v.sku !== undefined) {
                            const key = String(v.sku).trim().toLowerCase();
                            if (skuSet.has(key)) {
                                throw new BadRequestException('Duplicate SKU in variants');
                            }
                            skuSet.add(key);
                        }
                    }
                }

                for (const v of upserts) {
                    if (v.id) {
                        // update existing
                        const exist = await variantRepo.findOne({
                            where: {
                                id: v.id,
                                product: { id: savedProduct.id } as any,
                            },
                        });

                        const oldQty = Number(exist?.inventorySnapshot || 0);
                        const newQty = v.inventorySnapshot !== undefined
                            ? Number(v.inventorySnapshot || 0)
                            : oldQty;

                        if (!exist) {
                            throw new NotFoundException(`Variant ${v.id} not found in product ${savedProduct.id}`);
                        }

                        if (v.sku !== undefined) exist.sku = v.sku;
                        if (v.supplierPrice !== undefined) exist.supplierPrice = v.supplierPrice;
                        if (v.currency !== undefined) exist.currency = v.currency || 'USD';
                        if (v.attributes !== undefined) exist.attributes = v.attributes || {};
                        if (v.inventorySnapshot !== undefined) exist.inventorySnapshot = v.inventorySnapshot || 0;
                        await variantRepo.save(exist);

                        const delta = newQty - oldQty;
                        if (delta !== 0) {
                            inventoryDeltas.push({ variantId: exist.id, supplierId, delta });
                        }
                    } else {
                        // create new
                        const variantEntity = variantRepo.create({
                            product: savedProduct as any,
                            sku: v.sku,
                            supplierPrice: v.supplierPrice,
                            currency: v.currency || 'USD',
                            attributes: v.attributes || {},
                            inventorySnapshot: v.inventorySnapshot || 0,
                        });
                        const savedNew = await variantRepo.save(variantEntity);
                        const qty = Number(savedNew.inventorySnapshot || 0);
                        if (qty !== 0) {
                            inventoryDeltas.push({ variantId: savedNew.id, supplierId, delta: qty });
                        }
                    }
                }
            }
        });

        await Promise.allSettled(
            inventoryDeltas
                .filter((x) => x.delta !== 0)
                .map((x) =>
                    firstValueFrom(
                        this.inventoryGrpc.addStock({
                            variantId: x.variantId,
                            supplierId: x.supplierId,
                            quantity: x.delta,
                        }),
                    ),
                ),
        );

        // Load lại product nếu cần để trả view đầy đủ
        const fresh = await this.supplierProductRepository.findOne({ where: { id: productId } });
        return { product: this.formatProductResponse(fresh!) };
    }

    async createVariant(supplierId: string, dto: CreateVariantDto) {
        const product = await this.supplierProductRepository.findOne({
            where: { id: dto.productId },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.supplierId !== supplierId) {
            throw new ForbiddenException('You are not authorized to add variants to this product');
        }

        const variant = this.supplierProductVariantRepository.create({
            product: product,
            sku: dto.sku,
            supplierPrice: dto.supplierPrice,
            currency: dto.currency || 'USD',
            attributes: dto.attributes || {},
            inventorySnapshot: dto.inventorySnapshot || 0,
        });

        const savedVariant = await this.supplierProductVariantRepository.save(variant);
        return { variant: this.formatVariantResponse(savedVariant) };
    }

    async updateVariant(variantId: string, supplierId: string, dto: UpdateVariantDto) {
        const variant = await this.supplierProductVariantRepository.findOne({
            where: { id: variantId },
            relations: ['product'],
        });

        if (!variant) {
            throw new NotFoundException('Variant not found');
        }

        if (variant.product.supplierId !== supplierId) {
            throw new ForbiddenException('You are not authorized to update this variant');
        }

        if (dto.supplierPrice < 0) {
            throw new BadRequestException('Supplier price cannot be negative');
        }

        variant.supplierPrice = dto.supplierPrice;
        if (dto.currency) {
            variant.currency = dto.currency;
        }
        if (dto.inventorySnapshot !== undefined) {
            variant.inventorySnapshot = dto.inventorySnapshot;
        }
        const savedVariant = await this.supplierProductVariantRepository.save(variant);
        return { variant: this.formatVariantResponse(savedVariant) };
    }

    async addProductImages(productId: string, supplierId: string, dto: AddProductImagesDto) {
        const product = await this.supplierProductRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.supplierId !== supplierId) {
            throw new ForbiddenException('You are not authorized to add images to this product');
        }

        const images = dto.images.map((img, index) => {
            return this.supplierProductImageRepository.create({
                product: product,
                url: img.url,
                altText: img.altText,
                isPrimary: img.isPrimary || false,
                sortOrder: img.sortOrder || index,
                width: img.width,
                height: img.height,
                variantId: img.variantId,
            });
        });

        await this.supplierProductImageRepository.save(images);
        return { success: true };
    }

    async publishProduct(productId: string, supplierId: string) {
        const product = await this.supplierProductRepository.findOne({
            where: { id: productId },
            relations: ['variants', 'images'],
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.supplierId !== supplierId) {
            throw new ForbiddenException('You are not authorized to publish this product');
        }

        if (!product.variants || product.variants.length === 0) {
            throw new BadRequestException('Product must have at least one variant to be published');
        }

        if (!product.images || product.images.length === 0) {
            throw new BadRequestException('Product must have at least one image to be published');
        }

        product.status = SupplierProductStatus.ACTIVE;
        const savedProduct = await this.supplierProductRepository.save(product);
        return { product: this.formatProductResponse(savedProduct) };
    }

    async unpublishProduct(productId: string, supplierId: string) {
        const product = await this.supplierProductRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.supplierId !== supplierId) {
            throw new ForbiddenException('You are not authorized to unpublish this product');
        }

        product.status = SupplierProductStatus.DRAFT;
        const savedProduct = await this.supplierProductRepository.save(product);
        return { product: this.formatProductResponse(savedProduct) };
    }

    async getSupplierProducts(dto: GetSupplierProductsDto, role: string, userId: string) {
        const { supplierId, keyword, statuses, categoryId, categoryIds, page = 1, limit = 20 } = dto;
        const skip = (page - 1) * limit;
        const where: any = {};

        const normalizedRole = (role || '').toUpperCase();
        switch (normalizedRole) {
            case 'SUPPLIER':
                // Supplier chỉ được xem sản phẩm của chính mình
                if (supplierId && supplierId !== userId) {
                    throw new ForbiddenException('You are not authorized to view products of another supplier');
                }
                where.supplierId = userId;
                break;

            case 'SELLER':
                // Seller có thể lọc theo supplier nếu FE truyền
                if (supplierId) {
                    where.supplierId = supplierId;
                }
                break;

            case 'ADMIN':
            case 'INTERNAL':
                if (supplierId) {
                    where.supplierId = supplierId;
                }
                break;

            default:
                throw new ForbiddenException('Unsupported role');
        }

        const normalizedStatuses = (statuses || [])
            .map((s) => String(s).trim().toLowerCase())
            .filter(Boolean);

        // 2) Status policy theo role (dùng enum value thật trong DB)
        const allowedStatusesByRole: Record<string, SupplierProductStatus[]> = {
            SUPPLIER: [
                SupplierProductStatus.DRAFT,
                SupplierProductStatus.PENDING_REVIEW,
                SupplierProductStatus.REJECTED,
                SupplierProductStatus.ACTIVE,
                SupplierProductStatus.HIDDEN,
                SupplierProductStatus.OUT_OF_STOCK,
                SupplierProductStatus.DISCONTINUED,
                SupplierProductStatus.SUSPENDED,
                SupplierProductStatus.BANNED,
                SupplierProductStatus.ARCHIVED,
            ],
            SELLER: [
                SupplierProductStatus.ACTIVE,
                SupplierProductStatus.OUT_OF_STOCK, // nếu seller vẫn được xem hàng hết tồn
            ],
            ADMIN: Object.values(SupplierProductStatus),
            INTERNAL: Object.values(SupplierProductStatus),
        };

        const allowed = allowedStatusesByRole[normalizedRole] || [];

        if (normalizedStatuses.length > 0) {
            const filtered = normalizedStatuses.filter((s) =>
                allowed.includes(s as SupplierProductStatus),
            );

            if (filtered.length === 0) {
                // fail-fast sẽ dễ debug hơn trả empty ngầm
                throw new BadRequestException('No valid statuses for current role');
            }

            where.status = In(filtered);
        } else if (normalizedRole === 'SELLER') {
            // default cho seller nếu FE không truyền status
            where.status = In([SupplierProductStatus.ACTIVE]);
        }

        // 3) Keyword + pagination
        if (keyword) {
            where.name = Like(`%${keyword}%`);
        }

        const scopedCategoryIds = [
            ...new Set(
                [
                    ...(Array.isArray(categoryIds) ? categoryIds : []),
                    ...(categoryId ? [categoryId] : []),
                ]
                    .map((id) => String(id || '').trim())
                    .filter(Boolean),
            ),
        ];
        if (scopedCategoryIds.length === 1) {
            where.categoryId = scopedCategoryIds[0];
        } else if (scopedCategoryIds.length > 1) {
            where.categoryId = In(scopedCategoryIds);
        }

        const [products, total] = await this.supplierProductRepository.findAndCount({
            where,
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
            relations: ['variants', 'images'],
        });

        return {
            products: products.map((p) => this.formatProductListItemResponse(p)),
            total,
            page,
            limit,
        };
    }

    async getSupplierProductDetail(productId: string, role: string, userId: string) {
        const product = await this.supplierProductRepository.findOne({
            where: { id: productId },
            relations: ['variants', 'images'],
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const normalizedRole = (role || '').toUpperCase();

        switch (normalizedRole) {
            case 'SUPPLIER':
                if (product.supplierId !== userId) {
                    throw new ForbiddenException('You are not authorized to view this product');
                }
                break;

            case 'SELLER':
                // Seller chỉ xem được sản phẩm đang public để bán/import
                if (product.status !== SupplierProductStatus.ACTIVE) {
                    throw new ForbiddenException('You are not authorized to view this product');
                }
                break;

            case 'ADMIN':
            case 'INTERNAL':
                // full read access
                break;

            default:
                throw new ForbiddenException('Unsupported role');
        }

        return {
            product: this.formatProductResponse(product),
            variants: (product.variants || []).map((v) => this.formatVariantResponse(v)),
            images: (product.images || []).map((i) => this.formatImageResponse(i)),
        };
    }

    async archiveProduct(productId: string, supplierId: string) {
        const product = await this.supplierProductRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.supplierId !== supplierId) {
            throw new ForbiddenException('You are not authorized to archive this product');
        }

        product.status = SupplierProductStatus.ARCHIVED;
        const savedProduct = await this.supplierProductRepository.save(product);
        return { product: this.formatProductResponse(savedProduct) };
    }

    // ===== Admin APIs =====

    async adminSuspendProduct(productId: string, reason: string, role: string) {
        const normalizedRole = (role || '').toUpperCase();
        if (normalizedRole !== 'ADMIN' && normalizedRole !== 'INTERNAL') {
            throw new ForbiddenException('You are not authorized to suspend products');
        }

        if (!reason || !reason.trim()) {
            throw new BadRequestException('Suspend reason is required');
        }

        const product = await this.supplierProductRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.status === SupplierProductStatus.SUSPENDED) {
            return { product: this.formatProductResponse(product) };
        }

        product.status = SupplierProductStatus.SUSPENDED;
        const savedProduct = await this.supplierProductRepository.save(product);

        // TODO: save reason to audit table / event
        return { product: this.formatProductResponse(savedProduct) };
    }

    async adminUnsuspendProduct(productId: string, role: string) {
        const normalizedRole = (role || '').toUpperCase();
        if (normalizedRole !== 'ADMIN' && normalizedRole !== 'INTERNAL') {
            throw new ForbiddenException('You are not authorized to unsuspend products');
        }

        const product = await this.supplierProductRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.status !== SupplierProductStatus.SUSPENDED) {
            throw new BadRequestException('Product is not suspended');
        }

        // Tùy business: ACTIVE hoặc PENDING_REVIEW
        product.status = SupplierProductStatus.ACTIVE;

        const savedProduct = await this.supplierProductRepository.save(product);
        return { product: this.formatProductResponse(savedProduct) };
    }

    async adminApproveProduct(productId: string, role: string) {
        const normalizedRole = (role || '').toUpperCase();
        if (normalizedRole !== 'ADMIN' && normalizedRole !== 'INTERNAL') {
            throw new ForbiddenException('You are not authorized to approve products');
        }

        const product = await this.supplierProductRepository.findOne({
            where: { id: productId },
            relations: ['variants', 'images'],
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.status === SupplierProductStatus.ACTIVE) {
            return { product: this.formatProductResponse(product) };
        }

        if (product.status !== SupplierProductStatus.PENDING_REVIEW) {
            throw new BadRequestException('Only products pending review can be approved');
        }

        if (!product.variants || product.variants.length === 0) {
            throw new BadRequestException('Product must have at least one variant to be approved');
        }

        if (!product.images || product.images.length === 0) {
            throw new BadRequestException('Product must have at least one image to be approved');
        }

        product.status = SupplierProductStatus.ACTIVE;
        const savedProduct = await this.supplierProductRepository.save(product);
        return { product: this.formatProductResponse(savedProduct) };
    }

    async adminRejectProduct(productId: string, reason: string, role: string) {
        const normalizedRole = (role || '').toUpperCase();
        if (normalizedRole !== 'ADMIN' && normalizedRole !== 'INTERNAL') {
            throw new ForbiddenException('You are not authorized to reject products');
        }

        if (!reason || !reason.trim()) {
            throw new BadRequestException('Rejection reason is required');
        }

        const product = await this.supplierProductRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (product.status === SupplierProductStatus.REJECTED) {
            return { product: this.formatProductResponse(product) };
        }

        if (product.status !== SupplierProductStatus.PENDING_REVIEW) {
            throw new BadRequestException('Only products pending review can be rejected');
        }

        product.status = SupplierProductStatus.REJECTED;
        const savedProduct = await this.supplierProductRepository.save(product);
        // TODO: persist rejection reason to audit table / event
        return { product: this.formatProductResponse(savedProduct) };
    }

    // ===== Internal APIs =====

    async internalUpdateModel3d(dto: UpdateModel3dDto) {
        const product = await this.supplierProductRepository.findOne({
            where: { id: dto.productId },
        });
        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (dto.model3dStatus !== undefined) product.model3dStatus = dto.model3dStatus;
        if (dto.modelGlbUrl !== undefined) {
            const t = dto.modelGlbUrl.trim();
            product.modelGlbUrl = t ? t : null;
        }
        if (dto.modelVideoUrl !== undefined) {
            const t = dto.modelVideoUrl.trim();
            product.modelVideoUrl = t ? t : null;
        }
        
        let shouldAddPosterImage = false;
        let posterUrl = '';
        if (dto.model3dPosterUrl !== undefined) {
            const t = dto.model3dPosterUrl.trim();
            product.model3dPosterUrl = t ? t : null;
            if (t && dto.model3dStatus === 'ready') {
                posterUrl = t;
                shouldAddPosterImage = true;
            }
        }
        
        if (dto.model3dJobId !== undefined) {
            product.model3dJobId = dto.model3dJobId || null;
        }
        if (dto.model3dSource !== undefined) product.model3dSource = dto.model3dSource;
        if (dto.model3dError !== undefined) {
            product.model3dError = dto.model3dError?.trim() ? dto.model3dError.trim() : null;
        }
        if (dto.model3dProgress !== undefined) {
            product.model3dProgress = Math.max(0, Math.min(100, Number(dto.model3dProgress)));
        }
        product.model3dUpdatedAt = new Date();

        const saved = await this.supplierProductRepository.save(product);

        // Auto-add poster image to product images if 3D reconstruction completed
        if (shouldAddPosterImage && posterUrl) {
            const existingImages = await this.supplierProductImageRepository.find({
                where: { product: { id: dto.productId } },
            });
            
            // Check if poster already exists (avoid duplicate)
            const posterExists = existingImages.some(img => img.url === posterUrl);
            
            if (!posterExists) {
                const maxSortOrder = existingImages.length > 0
                    ? Math.max(...existingImages.map(img => img.sortOrder || 0))
                    : -1;

                // Unset existing primary so poster becomes the new primary
                const currentPrimary = existingImages.filter(img => img.isPrimary);
                if (currentPrimary.length > 0) {
                    await this.supplierProductImageRepository.update(
                        currentPrimary.map(img => img.id),
                        { isPrimary: false },
                    );
                }
                
                const posterImage = this.supplierProductImageRepository.create({
                    product: saved,
                    url: posterUrl,
                    altText: '3D Model Poster',
                    isPrimary: true,
                    sortOrder: maxSortOrder + 1,
                    width: 0,
                    height: 0,
                });
                
                await this.supplierProductImageRepository.save(posterImage);
            }
        }

        return { product: this.formatProductResponse(saved) };
    }

    async getVariantsByProductId(productId: string) {
        const product = await this.supplierProductRepository.findOne({
            where: { id: productId },
            relations: ['variants'],
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return {
            variants: (product.variants || []).map((v) => this.formatVariantResponse(v)),
        };
    }

    async batchGetVariants(variantIds: string[]) {
        if (!variantIds || variantIds.length === 0) {
            return { variants: [] };
        }

        const variants = await this.supplierProductVariantRepository.find({
            where: {
                id: In(variantIds),
            },
            relations: ['product'],
        });

        return {
            variants: variants.map((v) => this.formatVariantResponse(v)),
        };
    }

    async updateInventorySnapshot(dto: UpdateInventorySnapshotDto) {
        const variant = await this.supplierProductVariantRepository.findOne({
            where: { id: dto.variantId },
        });

        if (!variant) {
            throw new NotFoundException('Variant not found');
        }

        if (dto.inventory < 0) {
            throw new BadRequestException('Inventory cannot be negative');
        }

        // Update local snapshot
        variant.inventorySnapshot = dto.inventory;
        await this.supplierProductVariantRepository.save(variant);

        // Optionally: Call inventory service to sync
        try {
            await firstValueFrom(
                this.inventoryGrpc.updateInventory({
                    variantId: dto.variantId,
                    quantity: dto.inventory,
                })
            );
        } catch (error) {
            // Log error but don't fail the operation
            console.error('Failed to sync with inventory service:', error);
        }

        return { success: true };
    }
}
