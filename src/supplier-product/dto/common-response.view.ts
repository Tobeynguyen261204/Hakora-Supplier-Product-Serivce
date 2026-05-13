import { Expose, Transform, Type } from 'class-transformer';
import { FieldRoles } from '../../common/decorators/field-roles.decorator';

export class ProductListItemView {
    @Expose()
    id: string;

    @Expose()
    @FieldRoles('SUPPLIER', 'ADMIN', 'SELLER', 'INTERNAL')
    supplierId: string;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    categoryId: string;

    @Expose()
    status: string;

    @Expose()
    imageUrl: string;

    @Expose()
    totalStock: number;

    @Expose()
    minSupplierPrice: number;

    @Expose()
    maxSupplierPrice: number;

    @Expose()
    currency: string;

    @Expose()
    ratingAvg: number;

    @Expose()
    ratingCount: number;

    @Expose()
    isFeatured: boolean;

    @Expose()
    createdAt: string;

    @Expose()
    updatedAt: string;
}

export class ProductView {
    @Expose()
    id: string;

    @Expose()
    @FieldRoles('SUPPLIER', 'ADMIN', 'SELLER', 'INTERNAL')
    supplierId: string;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    categoryId: string;

    @Expose()
    status: string;

    @Expose()
    @Transform(({ obj }) => {
        const raw = obj?.specifications;
        return raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
    }, { toClassOnly: true })
    specifications: Record<string, any>;

    @Expose()
    tags: string[];

    @Expose()
    ratingAvg: number;

    @Expose()
    ratingCount: number;

    @Expose()
    isFeatured: boolean;

    @Expose()
    createdAt: string;

    @Expose()
    updatedAt: string;

    @Expose()
    @FieldRoles('SUPPLIER', 'ADMIN', 'SELLER', 'INTERNAL')
    modelGlbUrl: string;
}

export class VariantView {
    @Expose()
    id: string;

    @Expose()
    productId: string;

    @Expose()
    sku: string;

    @Expose()
    @FieldRoles('SUPPLIER', 'ADMIN', 'SELLER', 'INTERNAL')
    supplierPrice: number;

    @Expose()
    @FieldRoles('SUPPLIER', 'ADMIN', 'SELLER', 'INTERNAL')
    currency: string;

    @Expose()
    @Transform(({ obj }) => {
        const raw = obj?.attributes;
        return raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
    }, { toClassOnly: true })
    attributes: Record<string, any>;

    @Expose()
    @FieldRoles('SUPPLIER', 'ADMIN', 'SELLER', 'INTERNAL')
    inventorySnapshot: number;
}

export class ProductImageView {
    @Expose()
    id: string;

    @Expose()
    productId: string;

    @Expose()
    url: string;

    @Expose()
    altText: string;

    @Expose()
    isPrimary: boolean;

    @Expose()
    sortOrder: number;

    @Expose()
    width: number;

    @Expose()
    height: number;

    @Expose()
    variantId: string;
}

export class ProductListResponseView {
    @Expose()
    @Type(() => ProductListItemView)
    products: ProductListItemView[];

    @Expose()
    total: number;

    @Expose()
    page: number;

    @Expose()
    limit: number;
}

export class ProductDetailResponseView {
    @Expose()
    @Type(() => ProductView)
    product: ProductView;

    @Expose()
    @Type(() => VariantView)
    variants: VariantView[];

    @Expose()
    @Type(() => ProductImageView)
    images: ProductImageView[];
}
