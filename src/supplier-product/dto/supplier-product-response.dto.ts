import { ProductStatus } from '../../domain/enums/product-status.enum';
import { ProductType } from '../../domain/enums/product-type.enum';
import { ApprovalStatus } from '../../domain/enums/approval-status.enum';
import { ProductPriceResponseDto } from './product-price.dto';

export class ProductInventoryResponseDto {
  quantity: number;
  availableQuantity: number;
  isInStock: boolean;
  isOutOfStock: boolean;
  stockLevel: 'IN_STOCK' | 'OUT_OF_STOCK';
}

export class ProductSpecificationsResponseDto {
  specifications: Record<string, string>;
  materials?: string[];
  colors?: string[];
  sizes?: string[];
  specificationCount: number;
}

export class ProductImageResponseDto {
  id: string;
  productId: string;
  url: string;
  altText?: string;
  sortOrder: number;
  isPrimary: boolean;
  width?: number;
  height?: number;
  fileSize?: number;
  mimeType?: string;
  aspectRatio?: number;
  isLandscape: boolean;
  isPortrait: boolean;
  isSquare: boolean;
  formattedFileSize?: string;
}

export class ProductReviewResponseDto {
  id: string;
  productId: string;
  customerId: string;
  rating: number;
  title?: string;
  comment?: string;
  isVerified: boolean;
  isPublished: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
  isHighRating: boolean;
  isLowRating: boolean;
  isMediumRating: boolean;
  hasComment: boolean;
  hasTitle: boolean;
  isRecent: boolean;
}

export class ProductDimensionsResponseDto {
  length?: number;
  width?: number;
  height?: number;
  unit?: string;
  formattedDimensions?: string;
  volume?: number;
}

export class ProductWeightResponseDto {
  value: number;
  unit: string;
  formattedWeight: string;
}

export class ProductSEOResponseDto {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export class SupplierProductResponseDto {
  id: string;
  supplierId: string;
  name: string;
  description: string;
  shortDescription?: string;
  sku: string;
  categoryName: string;
  price: ProductPriceResponseDto;
  inventory: ProductInventoryResponseDto;
  specifications: ProductSpecificationsResponseDto;
  type: ProductType;
  status: ProductStatus;
  approvalStatus: ApprovalStatus;
  images: ProductImageResponseDto[];
  reviews: ProductReviewResponseDto[];
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  isSuspend: boolean;
  weight?: number;
  dimensions?: ProductDimensionsResponseDto;
  seoData?: ProductSEOResponseDto;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
  
  // Computed properties
  isApproved: boolean;
  isPendingApproval: boolean;
  isRejected: boolean;
  isActiveAndApproved: boolean;
  averageRating: number;
  reviewCount: number;
  primaryImage?: ProductImageResponseDto;
  hasImages: boolean;
  formattedListingPrice: string;
  formattedRetailPrice: string;
  profitAmount: number;
}

export class SupplierProductListResponseDto {
  products: SupplierProductResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}