export class ProductReview {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly customerId: string,
    public readonly rating: number,
    public readonly title?: string,
    public readonly comment?: string,
    public readonly isVerified: boolean = false,
    public readonly isPublished: boolean = true,
    public readonly helpfulCount: number = 0,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {
    this.validateReview();
  }

  private validateReview(): void {
    if (!this.id || this.id.trim().length === 0) {
      throw new Error('Review ID is required');
    }
    if (!this.productId || this.productId.trim().length === 0) {
      throw new Error('Product ID is required');
    }
    if (!this.customerId || this.customerId.trim().length === 0) {
      throw new Error('Customer ID is required');
    }
    if (this.rating < 1 || this.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    if (this.helpfulCount < 0) {
      throw new Error('Helpful count cannot be negative');
    }
  }

  get isHighRating(): boolean {
    return this.rating >= 4;
  }

  get isLowRating(): boolean {
    return this.rating <= 2;
  }

  get isMediumRating(): boolean {
    return this.rating === 3;
  }

  get hasComment(): boolean {
    return !!(this.comment && this.comment.trim().length > 0);
  }

  get hasTitle(): boolean {
    return !!(this.title && this.title.trim().length > 0);
  }

  get isRecent(): boolean {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return this.createdAt >= thirtyDaysAgo;
  }

  private clone(updates: Partial<ProductReview>): ProductReview {
    return Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this,
      updates,
      { updatedAt: new Date() }
    );
  }

  updateRating(newRating: number): ProductReview {
    return this.clone({ rating: newRating });
  }

  updateComment(newComment: string): ProductReview {
    return this.clone({ comment: newComment });
  }

  updateTitle(newTitle: string): ProductReview {
    return this.clone({ title: newTitle });
  }

  markAsVerified(): ProductReview {
    return this.clone({ isVerified: true });
  }

  publish(): ProductReview {
    return this.clone({ isPublished: true });
  }

  unpublish(): ProductReview {
    return this.clone({ isPublished: false });
  }

  incrementHelpfulCount(): ProductReview {
    return this.clone({ helpfulCount: this.helpfulCount + 1 });
  }

  decrementHelpfulCount(): ProductReview {
    const newCount = Math.max(0, this.helpfulCount - 1);
    return this.clone({ helpfulCount: newCount });
  }
}
