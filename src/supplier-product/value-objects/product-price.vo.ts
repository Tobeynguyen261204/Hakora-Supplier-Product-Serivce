export class ProductPrice {
  constructor(
    public readonly listingPrice: number,
    public readonly retailPrice: number,
    public readonly currency: string = 'VND'
  ) {
    this.validatePrice();
  }

  private clone(updates: Partial<ProductPrice>): ProductPrice {
    return new ProductPrice(
      updates.listingPrice ?? this.listingPrice,
      updates.retailPrice ?? this.retailPrice,
      updates.currency ?? this.currency
    );
  }

  private validatePrice(): void {
    if (this.listingPrice < 0) {
      throw new Error('Listing price cannot be negative');
    }
    if (this.retailPrice < 0) {
      throw new Error('Retail price cannot be negative');
    }
    if (!this.currency || this.currency.trim().length === 0) {
      throw new Error('Currency is required');
    }
    if (this.retailPrice < this.listingPrice) {
      throw new Error('Retail price cannot be less than listing price');
    }
  }

  get profitAmount(): number {
    return this.retailPrice - this.listingPrice;
  }

  updateListingPrice(newListingPrice: number): ProductPrice {
    return this.clone({ listingPrice: newListingPrice });
  }

  updateRetailPrice(newRetailPrice: number): ProductPrice {
    return this.clone({ retailPrice: newRetailPrice });
  }

  toJSON(): {
    listingPrice: number;
    retailPrice: number;
    currency: string;
    profitAmount: number;
  } {
    return {
      listingPrice: this.listingPrice,
      retailPrice: this.retailPrice,
      currency: this.currency,
      profitAmount: this.profitAmount
    };
  }
}