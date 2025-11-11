export class ProductImage {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly url: string,
    public readonly altText?: string,
    public readonly sortOrder: number = 0,
    public readonly isPrimary: boolean = false,
    public readonly width?: number,
    public readonly height?: number,
    public readonly fileSize?: number,
    public readonly mimeType?: string
  ) {
    this.validateImage();
  }

  private validateImage(): void {
    if (!this.id || this.id.trim().length === 0) {
      throw new Error('Image ID is required');
    }
    if (!this.productId || this.productId.trim().length === 0) {
      throw new Error('Product ID is required');
    }
    if (!this.url || this.url.trim().length === 0) {
      throw new Error('Image URL is required');
    }
    if (this.sortOrder < 0) {
      throw new Error('Sort order cannot be negative');
    }
    if (this.width && this.width <= 0) {
      throw new Error('Width must be positive');
    }
    if (this.height && this.height <= 0) {
      throw new Error('Height must be positive');
    }
    if (this.fileSize && this.fileSize <= 0) {
      throw new Error('File size must be positive');
    }
  }

  get aspectRatio(): number | null {
    if (!this.width || !this.height) return null;
    return this.width / this.height;
  }

  get isLandscape(): boolean {
    return this.aspectRatio !== null && this.aspectRatio > 1;
  }

  get isPortrait(): boolean {
    return this.aspectRatio !== null && this.aspectRatio < 1;
  }

  get isSquare(): boolean {
    return this.aspectRatio === 1;
  }

  get formattedFileSize(): string | null {
    if (!this.fileSize) return null;
    
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = this.fileSize;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)}${units[unitIndex]}`;
  }

  private clone(updates: Partial<ProductImage>): ProductImage {
    return Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
      updates
    );
  }

  updateAltText(newAltText: string): ProductImage {
    return this.clone({ altText: newAltText });
  }

  updateSortOrder(newSortOrder: number): ProductImage {
    return this.clone({ sortOrder: newSortOrder });
  }

  setAsPrimary(): ProductImage {
    return this.clone({ isPrimary: true });
  }

  setAsSecondary(): ProductImage {
    return this.clone({ isPrimary: false });
  }

  updateDimensions(width: number, height: number): ProductImage {
    return this.clone({ width, height });
  }
}
