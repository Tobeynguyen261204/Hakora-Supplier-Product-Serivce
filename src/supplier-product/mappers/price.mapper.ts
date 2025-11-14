import { ProductPrice } from '../value-objects/product-price.vo';
import { ProductPriceResponseDto } from '../dto/product-price.dto';

export class PriceMapper {
  static mapPrice(price: ProductPrice): ProductPriceResponseDto {
    return {
      listingPrice: price.listingPrice,
      retailPrice: price.retailPrice,
      currency: price.currency,
      profitAmount: price.profitAmount
    };
  }

  // For backward compatibility
  static mapListingPrice = PriceMapper.mapPrice;
}