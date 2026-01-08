# Supplier Product Module

## Tổng quan

Module Supplier Product được thiết kế theo chuẩn NestJS chuyên nghiệp, tuân thủ NestJS conventions và best practices.

## Cấu trúc thư mục - NestJS Convention Chuẩn

```
src/supplier-product/
├── controllers/               # HTTP/gRPC Controllers
│   └── supplier-product.controller.ts
├── services/                 # Business Logic (Use Cases)
│   ├── create-supplier-product.service.ts
│   ├── get-supplier-product.service.ts
│   ├── update-supplier-product.service.ts
│   ├── delete-supplier-product.service.ts
│   ├── approve-supplier-product.service.ts
│   ├── reject-supplier-product.service.ts
│   ├── hide-supplier-product.service.ts
│   ├── suspend-supplier-product.service.ts
│   ├── get-supplier-products.service.ts
│   ├── get-supplier-products-by-ids.service.ts
│   ├── get-supplier-product-stats.service.ts
│   ├── list-supplier-product-seller-view.service.ts
│   ├── get-supplier-product-seller-view.service.ts
│   ├── unhide-supplier-product.service.ts
│   └── unsuspend-supplier-product.service.ts
├── repositories/             # Data Access Layer
│   └── supplier-product.repository.ts
├── entities/                 # TypeORM Entities
│   ├── supplier-product.entity.ts
│   ├── product-image.entity.ts
│   └── product-review.entity.ts
├── dto/                      # Data Transfer Objects
│   ├── create-supplier-product-request.dto.ts
│   ├── update-supplier-product-request.dto.ts
│   ├── supplier-product-response.dto.ts
│   ├── supplier-product-seller-view.dto.ts
│   └── product-price.dto.ts
├── enums/                    # Business Enums
│   ├── product-status.enum.ts
│   ├── approval-status.enum.ts
│   └── product-type.enum.ts
├── interfaces/               # TypeScript Interfaces
│   ├── supplier-product-repository.interface.ts
│   └── supplier-product-service.interface.ts
├── exceptions/               # Custom Exceptions
│   └── supplier-product.exceptions.ts
├── filters/                  # Exception Filters
│   └── supplier-product-exception.filter.ts
├── guards/                   # Authorization Guards
│   └── supplier-product-access.guard.ts
├── interceptors/             # Request/Response Interceptors
│   ├── supplier-product-logging.interceptor.ts
│   └── supplier-product-transform.interceptor.ts
├── pipes/                    # Validation Pipes
│   └── supplier-product-validation.pipe.ts
├── decorators/               # Custom Decorators
│   └── supplier-product.decorators.ts
├── mappers/                  # Entity-DTO Mappers
│   ├── supplier-product.mapper.ts
│   └── price.mapper.ts
├── value-objects/            # Domain Value Objects
│   ├── product-price.vo.ts
│   ├── product-inventory.vo.ts
│   └── product-specifications.vo.ts
├── constants/                # Constants & Configuration
│   └── supplier-product.constants.ts
├── config/                   # Configuration Management
│   ├── supplier-product.config.ts
│   └── validation.config.ts
├── utils/                    # Utility Functions
│   └── enum-mapper.util.ts
├── database/                 # Database Specific
│   ├── data-source.ts
│   └── migrations/
├── tests/                    # Unit & Integration Tests
│   └── .gitkeep
├── supplier-product.module.ts # Module Definition
├── README.md                 # Documentation
└── STRUCTURE.md              # Architecture Guide
```

## Kiến trúc và Design Patterns

### 1. NestJS Architecture
- **Controllers**: Handle HTTP/gRPC requests
- **Services**: Business logic và use cases
- **Repositories**: Data access layer với TypeORM
- **Entities**: Database models với TypeORM decorators

### 2. Design Patterns được sử dụng
- **Repository Pattern**: Abstraction cho data access
- **Service Layer Pattern**: Business logic separation
- **DTO Pattern**: Data transfer và validation
- **Mapper Pattern**: Entity-DTO transformation

### 3. SOLID Principles (Áp dụng hợp lý)
- **Single Responsibility**: Mỗi class có một trách nhiệm duy nhất
- **Open/Closed**: Mở rộng thông qua interfaces, đóng với modification
- **Liskov Substitution**: Interfaces có thể thay thế implementations
- **Interface Segregation**: Interfaces nhỏ và focused
- **Dependency Inversion**: Phụ thuộc vào abstractions, không phụ thuộc vào concrete classes

## Tính năng chuyên nghiệp

### 1. Configuration Management
- **Environment Validation**: Validate environment variables
- **Type-safe Configuration**: Strongly typed config objects
- **Centralized Constants**: Tất cả magic numbers/strings trong constants

### 2. Error Handling
- **Custom Exceptions**: Domain-specific exceptions
- **Global Exception Filter**: Centralized error handling
- **Structured Error Responses**: Consistent error format

### 3. Validation & Security
- **DTO Validation**: Comprehensive input validation với class-validator
- **Custom Pipes**: Business-specific validation logic
- **Access Guards**: Authorization và access control
- **Input Sanitization**: Prevent injection attacks

### 4. Logging & Monitoring
- **Request Logging**: Log tất cả requests/responses
- **Performance Monitoring**: Track execution time
- **Error Tracking**: Detailed error logging với stack traces

### 5. Response Transformation
- **Consistent Response Format**: Standardized API responses
- **Data Transformation**: Clean data output
- **Alias Support**: Backward compatibility

### 6. Dependency Injection
- **Interface-based DI**: Inject interfaces thay vì concrete classes
- **Token-based Injection**: Use injection tokens cho flexibility
- **Modular Design**: Clear separation of concerns

## Best Practices được áp dụng

### 1. Code Organization
- **Feature-based Structure**: Organize theo business features
- **Separation of Concerns**: Clear boundaries giữa layers
- **Consistent Naming**: Naming conventions rõ ràng

### 2. Type Safety
- **Strong Typing**: TypeScript được sử dụng triệt để
- **Interface Contracts**: Clear contracts giữa components
- **Generic Types**: Reusable type definitions

### 3. Testing Support
- **Mockable Dependencies**: Interfaces cho easy mocking
- **Testable Architecture**: Loose coupling cho unit tests
- **Clear Boundaries**: Easy to test individual components

### 4. Performance
- **Efficient Queries**: Optimized database queries
- **Caching Strategy**: Cache configuration ready
- **Pagination**: Built-in pagination support

### 5. Maintainability
- **Documentation**: Comprehensive code documentation
- **Error Messages**: Clear, actionable error messages
- **Configuration**: Environment-based configuration

## Sử dụng

### 1. Environment Setup
```bash
# Required environment variables
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=SupplierProductService
NODE_ENV=development
LOG_LEVEL=info
```

### 2. Module Import
```typescript
import { SupplierProductModule } from './supplier-product/supplier-product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    SupplierProductModule,
  ],
})
export class AppModule {}
```

### 3. Service Usage
```typescript
// Inject service
constructor(
  private readonly createProductService: CreateSupplierProductService,
) {}

// Use service
const product = await this.createProductService.execute(request);
```

## Migration Commands

```bash
# Generate migration
npm run migration:generate

# Create empty migration
npm run migration:create

# Run migrations
npm run migration:run

# Revert migration
npm run migration:revert

# Show migration status
npm run migration:show
```

## Cải tiến so với code cũ

### 1. Structure
- ✅ Organized theo feature modules
- ✅ Clear separation of concerns
- ✅ Consistent file naming

### 2. Error Handling
- ✅ Custom exception classes
- ✅ Global exception filter
- ✅ Structured error responses

### 3. Validation
- ✅ Comprehensive DTO validation
- ✅ Custom validation pipes
- ✅ Business rule validation

### 4. Configuration
- ✅ Environment validation
- ✅ Type-safe configuration
- ✅ Centralized constants

### 5. Security
- ✅ Input validation
- ✅ Access guards
- ✅ Authorization decorators

### 6. Monitoring
- ✅ Request/response logging
- ✅ Performance tracking
- ✅ Error monitoring

### 7. Architecture
- ✅ Interface-based design
- ✅ Dependency injection
- ✅ SOLID principles

Với những cải tiến này, module Supplier Product đã đạt chuẩn enterprise-level và ready cho production deployment.
