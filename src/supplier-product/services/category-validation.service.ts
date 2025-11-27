import { Injectable, Inject, Logger, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SupplierProductValidationException } from '../exceptions/supplier-product.exceptions';

interface CategoryResponse {
  success: boolean;
  categories?: Array<{ id: string; name: string; status: string }>;
  data?: { id: string; name: string; status: string };
}

interface CategoryGrpcService {
  getCategory(data: { id: string }): any;
  getCategories(data: any): any;
}

@Injectable()
export class CategoryValidationService implements OnModuleInit {
  private readonly logger = new Logger(CategoryValidationService.name);
  private categoryService: CategoryGrpcService;

  constructor(
    // ✅ FIXED: Now using API Gateway instead of direct category-service connection
    @Inject('API_GATEWAY_CATEGORY_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    // ✅ FIXED: Getting CategoryService from API Gateway (not directly from category-service)
    this.categoryService = this.client.getService<CategoryGrpcService>('CategoryService');
    this.logger.log('CategoryValidationService initialized - using API Gateway for category operations');
  }

  /**
   * Validate category by name - check if category exists and is active
   */
  async validateCategoryByName(categoryName: string): Promise<{ id: string; name: string }> {
    try {
      this.logger.log(`Validating category by name: ${categoryName}`);
      
      const result = await firstValueFrom(
        this.categoryService.getCategories({
          search: categoryName,
          status: 'active',
          limit: 100,
        })
      ) as CategoryResponse;

      if (result.success && result.categories) {
        // Find exact match by name (case-insensitive)
        const category = result.categories.find(
          (cat: any) => cat.name.toLowerCase() === categoryName.toLowerCase()
        );

        if (category && category.status === 'active') {
          this.logger.log(`Category validated: ${category.name} (${category.id})`);
          return { id: category.id, name: category.name };
        }
      }

      throw new SupplierProductValidationException(
        `Category "${categoryName}" not found or is not active`
      );
    } catch (error) {
      this.logger.error(`Error validating category: ${categoryName}`, error);
      
      if (error instanceof SupplierProductValidationException) {
        throw error;
      }
      
      throw new SupplierProductValidationException(
        `Failed to validate category "${categoryName}": ${error.message || 'Unknown error'}`
      );
    }
  }

  /**
   * Validate category by ID
   */
  async validateCategoryById(categoryId: string): Promise<{ id: string; name: string }> {
    try {
      this.logger.log(`Validating category by ID: ${categoryId}`);
      
      const result = await firstValueFrom(
        this.categoryService.getCategory({ id: categoryId })
      ) as CategoryResponse;

      if (result.success && result.data) {
        const category = result.data;
        
        if (category.status !== 'active') {
          throw new SupplierProductValidationException(
            `Category "${category.name}" is not active`
          );
        }

        this.logger.log(`Category validated: ${category.name} (${category.id})`);
        return { id: category.id, name: category.name };
      }

      throw new SupplierProductValidationException(
        `Category with ID "${categoryId}" not found`
      );
    } catch (error) {
      this.logger.error(`Error validating category ID: ${categoryId}`, error);
      
      if (error instanceof SupplierProductValidationException) {
        throw error;
      }
      
      throw new SupplierProductValidationException(
        `Failed to validate category ID "${categoryId}": ${error.message || 'Unknown error'}`
      );
    }
  }

  /**
   * Get category by name or ID (flexible validation)
   */
  async getCategoryInfo(categoryNameOrId: string): Promise<{ id: string; name: string }> {
    // Try as ID first (UUID format)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (uuidRegex.test(categoryNameOrId)) {
      try {
        return await this.validateCategoryById(categoryNameOrId);
      } catch {
        // If ID validation fails, try as name
        return await this.validateCategoryByName(categoryNameOrId);
      }
    }
    
    // Try as name
    return await this.validateCategoryByName(categoryNameOrId);
  }
}

