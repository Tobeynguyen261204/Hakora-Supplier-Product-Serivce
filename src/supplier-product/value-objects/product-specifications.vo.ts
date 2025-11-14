export class ProductSpecifications {
  constructor(
    public readonly specifications: Map<string, string>,
    public readonly materials?: string[],
    public readonly colors?: string[],
    public readonly sizes?: string[]
  ) {}

  private clone(updates: Partial<ProductSpecifications>): ProductSpecifications {
    return new ProductSpecifications(
      updates.specifications ?? this.specifications,
      updates.materials ?? this.materials,
      updates.colors ?? this.colors,
      updates.sizes ?? this.sizes
    );
  }

  get specificationCount(): number {
    return this.specifications.size;
  }

  hasSpecification(key: string): boolean {
    return this.specifications.has(key);
  }

  getSpecification(key: string): string | undefined {
    return this.specifications.get(key);
  }

  addSpecification(key: string, value: string): ProductSpecifications {
    const newSpecs = new Map(this.specifications);
    newSpecs.set(key, value);
    return this.clone({ specifications: newSpecs });
  }

  removeSpecification(key: string): ProductSpecifications {
    const newSpecs = new Map(this.specifications);
    newSpecs.delete(key);
    return this.clone({ specifications: newSpecs });
  }

  updateSpecification(key: string, value: string): ProductSpecifications {
    return this.addSpecification(key, value);
  }

  toJSON(): {
    specifications: Record<string, string>;
    materials?: string[];
    colors?: string[];
    sizes?: string[];
  } {
    return {
      specifications: Object.fromEntries(this.specifications),
      materials: this.materials,
      colors: this.colors,
      sizes: this.sizes
    };
  }

  static fromJSON(data: {
    specifications?: Record<string, string>;
    materials?: string[];
    colors?: string[];
    sizes?: string[];
  }): ProductSpecifications {
    return new ProductSpecifications(
      new Map(Object.entries(data.specifications || {})),
      data.materials,
      data.colors,
      data.sizes
    );
  }
}
