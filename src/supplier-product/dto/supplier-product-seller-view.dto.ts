import { ProductPriceResponseDto } from './product-price.dto';

export interface SupplierProductSellerViewListItemDto {
  id: string;
  name: string;
  shortDescription?: string;
  price?: ProductPriceResponseDto;
  categoryName?: string | null;
  categoryId?: string | null; // ✅ THÊM: categoryId
  imageUrl?: string | null;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SupplierProductSellerViewDetailDto extends SupplierProductSellerViewListItemDto {
  price?: ProductPriceResponseDto;
  description?: string;
  images: Array<{ id?: string; url?: string; altText?: string; isPrimary?: boolean; width?: number; height?: number }>;
  reviews: Array<{ id?: string; rating?: number; title?: string; comment?: string; isVerified?: boolean; createdAt?: string }>;
  reviewSummary: { count: number; averageRating: number };
  inventory?: { quantity?: number };
  specifications?: {
    specifications?: Record<string, string>;
    materials?: string[];
    colors?: string[];
    sizes?: string[];
  };
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  type?: string;
  tags?: string[];
  supplierId?: string;
  sku?: string;
  weight?: number;
}


