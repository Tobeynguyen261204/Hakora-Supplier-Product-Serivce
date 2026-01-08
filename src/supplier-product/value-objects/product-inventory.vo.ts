export class ProductInventory {
  constructor(
    public readonly quantity: number
  ) {
    this.validateInventory();
  }

  private clone(updates: Partial<ProductInventory>): ProductInventory {
    return new ProductInventory(updates.quantity ?? this.quantity);
  }

  private validateInventory(): void {
    if (this.quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }
  }

  get availableQuantity(): number {
    return this.quantity;
  }

  get isInStock(): boolean {
    return this.quantity > 0;
  }

  get isLowStock(): boolean {
    return false;
  }

  get isOutOfStock(): boolean {
    return this.quantity === 0;
  }

  get stockLevel(): 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' {
    if (this.isOutOfStock) return 'OUT_OF_STOCK';
    return 'IN_STOCK';
  }

  updateQuantity(newQuantity: number): ProductInventory {
    if (newQuantity < 0) {
      throw new Error('Quantity cannot be negative');
    }
    return this.clone({ quantity: newQuantity });
  }
}
