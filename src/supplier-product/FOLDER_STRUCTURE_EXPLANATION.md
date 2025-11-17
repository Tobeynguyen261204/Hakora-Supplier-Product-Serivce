# Giải Thích Cấu Trúc Folder - Supplier Product Module

## 📋 Tổng Quan

Module này được tổ chức theo chuẩn NestJS, mỗi folder có vai trò riêng trong codeflow. Dưới đây là giải thích chi tiết từng folder và cách chúng tương tác với nhau.

---

## 🔄 Codeflow Tổng Quan

### Main Business Flow (Core Logic)
Flow chính xử lý business logic từ request đến response:

```
Client Request (gRPC)
    ↓
[controllers/] → Nhận request, gọi service
    ↓
[services/] → Xử lý business logic (use cases)
    ↓
[repositories/] → Truy vấn database
    ↓
[entities/] → TypeORM mapping với database
    ↓
[mappers/] → Convert Entity → DTO
    ↓
Response (gRPC) → Client
```

### Middleware Flow (Cross-Cutting Concerns)
Flow này CHẠY TRƯỚC và SAU business flow, xử lý các concerns chung:

```
Request vào
    ↓
[guards/] → Kiểm tra authentication/authorization
    ↓        (Nếu fail → throw exception → filter xử lý)
[pipes/] → Validate và transform input data
    ↓        (Nếu fail → throw exception → filter xử lý)
[interceptors/] → Logging (before controller), Transform response (after)
    ↓
Controller (main business flow ở trên)
    ↓
[interceptors/] → Transform response, Logging (after)
    ↓
[filters/] → Catch exceptions (từ mọi nơi: guards, pipes, services, repositories)
    ↓        Transform errors → standard format
Response ra
```

### ❓ Tại sao tách thành 2 flow riêng?

1. **Separation of Concerns (Tách biệt mối quan tâm)**
   - **Business Flow**: Xử lý logic nghiệp vụ (CRUD, business rules)
   - **Middleware Flow**: Xử lý các concerns chung (security, validation, logging, error handling)

2. **Không phải lúc nào cũng chạy**
   - Middleware có thể được apply ở **global**, **controller**, hoặc **method level**
   - Có thể **bỏ qua** hoặc **tùy chỉnh** cho từng endpoint
   - Ví dụ: Endpoint public không cần guard, endpoint private cần guard

3. **Cross-Cutting Concerns**
   - Guards, Pipes, Interceptors, Filters là **infrastructure concerns**
   - Áp dụng cho **tất cả** hoặc **nhiều** endpoints
   - Tách riêng để dễ maintain và reuse

4. **Thứ tự thực thi của NestJS**
   ```
   Request
   ↓
   Global Guards (chạy đầu tiên)
   ↓
   Controller Guards
   ↓
   Route Guards
   ↓
   Global Pipes (transform + validate)
   ↓
   Route Pipes
   ↓
   Global Interceptors (before)
   ↓
   Route Interceptors (before)
   ↓
   Controller Method (business logic)
   ↓
   Route Interceptors (after)
   ↓
   Global Interceptors (after)
   ↓
   Global Filters (catch exceptions nếu có)
   ↓
   Response
   ```

5. **Ví dụ thực tế:**
   ```typescript
   // supplier-product.module.ts
   // Đăng ký GLOBAL - chạy cho TẤT CẢ endpoints
   {
     provide: APP_GUARD,
     useClass: SupplierProductAccessGuard,  // Chạy trước MỌI request
   }
   
   // Có thể bỏ qua guard ở method level:
   @UseGuards()  // Không dùng guard cho method này
   async publicMethod() { ... }
   ```

### 📌 Điểm quan trọng:

- **Middleware chạy TRƯỚC và SAU** business logic
- **Có thể skip** middleware ở level thấp hơn (method > controller > global)
- **Filters** catch exceptions từ **MỌI NƠI** (guards, pipes, services, repositories)
- **Tách riêng** để dễ test, maintain, và apply linh hoạt

---

## 📁 Chi Tiết Từng Folder

### 1. **`controllers/`** - Entry Point
**Ý nghĩa:** Điểm vào của application, nhận request từ client (gRPC)

**Vai trò:**
- Định nghĩa các gRPC endpoints
- Nhận request từ client
- Gọi service tương ứng
- Trả về response

**Import vào:**
- `supplier-product.module.ts` (đăng ký controller)
- Không import từ folder khác

**Import từ:**
- `../services/*` - Gọi business logic
- `../dto/*` - Type definitions cho request/response
- `../enums/*` - Enum types
- `../utils/*` - Helper functions

**Ví dụ:**
```typescript
// controllers/supplier-product.controller.ts
@Controller()
export class SupplierProductController {
  constructor(
    private readonly createService: CreateSupplierProductService  // từ services/
  ) {}
  
  @GrpcMethod('SupplierProductService', 'CreateSupplierProduct')
  async create(request: CreateSupplierProductRequest) {  // từ dto/
    return this.createService.execute(request);
  }
}
```

**Codeflow:** Client → Controller → Service

---

### 2. **`services/`** - Business Logic Layer
**Ý nghĩa:** Chứa tất cả business logic (use cases), xử lý nghiệp vụ

**Vai trò:**
- Thực hiện business logic
- Orchestrate giữa repository, entities, mappers
- Validate business rules
- Xử lý transactions

**Import vào:**
- `supplier-product.module.ts` (đăng ký providers)
- `controllers/*` (được gọi từ controller)

**Import từ:**
- `../repositories/*` - Truy vấn database
- `../entities/*` - Domain models
- `../dto/*` - Request/Response types
- `../mappers/*` - Convert Entity ↔ DTO
- `../value-objects/*` - Domain value objects
- `../enums/*` - Enum types
- `../exceptions/*` - Custom exceptions
- `../constants/*` - Business constants
- `../interfaces/*` - Service contracts

**Ví dụ:**
```typescript
// services/create-supplier-product.service.ts
@Injectable()
export class CreateSupplierProductService {
  constructor(
    private readonly repository: SupplierProductRepository  // từ repositories/
  ) {}
  
  async execute(request: CreateSupplierProductRequest) {  // từ dto/
    // 1. Validate request
    // 2. Create value objects (từ value-objects/)
    const price = new ProductPrice(...);  // từ value-objects/
    
    // 3. Create entity
    const product = SupplierProductOrm.create(...);  // từ entities/
    
    // 4. Save to database
    await this.repository.save(product);
    
    // 5. Map to DTO
    return SupplierProductMapper.toResponseDto(product);  // từ mappers/
  }
}
```

**Codeflow:** Controller → Service → Repository → Entity

---

### 3. **`repositories/`** - Data Access Layer
**Ý nghĩa:** Abstraction layer cho database operations, xử lý truy vấn

**Vai trò:**
- Thực hiện CRUD operations
- Complex queries (pagination, filtering, search)
- Transaction management
- Query optimization

**Import vào:**
- `supplier-product.module.ts` (đăng ký repository)
- `services/*` (được inject vào services)

**Import từ:**
- `../entities/*` - Entity types cho queries
- `../enums/*` - Enum types cho filtering
- `../interfaces/*` - Repository contract
- `../value-objects/*` - Domain objects (nếu cần convert)

**Ví dụ:**
```typescript
// repositories/supplier-product.repository.ts
@Injectable()
export class SupplierProductRepository extends Repository<SupplierProductOrm> {
  async findById(id: string): Promise<SupplierProductOrm | null> {
    return this.findOne({
      where: { id },
      relations: ['images', 'reviews']
    });
  }
  
  async findWithPagination(
    page: number,
    limit: number,
    filters?: GetSupplierProductsFilters
  ): Promise<PaginationResult<SupplierProductOrm>> {
    // Complex query logic
  }
}
```

**Codeflow:** Service → Repository → Database (TypeORM)

---

### 4. **`entities/`** - Database Models
**Ý nghĩa:** Định nghĩa database schema, TypeORM entities

**Vai trò:**
- Map với database tables
- Define relationships (OneToMany, ManyToOne)
- Business logic getters/methods
- Factory methods

**Import vào:**
- `supplier-product.module.ts` (đăng ký với TypeORM)
- `repositories/*` (query entities)
- `services/*` (tạo/update entities)
- `mappers/*` (map entity → DTO)

**Import từ:**
- `../enums/*` - Enum types
- Các entities khác (relationships)

**Ví dụ:**
```typescript
// entities/supplier-product.entity.ts
@Entity('supplier_products')
export class SupplierProductOrm {
  @PrimaryColumn('uuid')
  id!: string;
  
  @Column()
  name!: string;
  
  @OneToMany(() => ProductImageOrm, image => image.product)
  images!: ProductImageOrm[];  // từ entities/product-image.entity.ts
  
  // Business logic getters
  get isInStock(): boolean {
    return this.inventory.quantity > 0;
  }
  
  // Factory method
  static create(...): SupplierProductOrm {
    // Creation logic
  }
}
```

**Codeflow:** Repository ↔ Entity ↔ Database

---

### 5. **`dto/`** - Data Transfer Objects
**Ý nghĩa:** Định nghĩa structure cho data transfer (Request/Response)

**Vai trò:**
- Validate input data (class-validator)
- Type safety cho API contracts
- Transform data structure
- Documentation (Swagger/OpenAPI)

**Import vào:**
- `controllers/*` (request/response types)
- `services/*` (input/output types)
- `mappers/*` (target DTO types)

**Import từ:**
- `../enums/*` - Enum types
- `../constants/*` - Validation constants
- Nested DTOs khác (ProductPriceDto, etc.)

**Ví dụ:**
```typescript
// dto/create-supplier-product-request.dto.ts
export class CreateSupplierProductRequest {
  @IsString()
  @Length(1, 255)
  name!: string;
  
  @ValidateNested()
  @Type(() => ProductPriceDto)
  price!: ProductPriceDto;  // từ dto/product-price.dto.ts
  
  @IsEnum(ProductType)  // từ enums/
  type!: ProductType;
}
```

**Codeflow:** Client → DTO (Request) → Service → DTO (Response) → Client

---

### 6. **`mappers/`** - Entity-DTO Transformers
**Ý nghĩa:** Chuyển đổi giữa Entity (database model) và DTO (API response)

**Vai trò:**
- Convert Entity → DTO
- Transform nested objects
- Compute derived properties
- Handle null/undefined cases

**Import vào:**
- `services/*` (được gọi để transform response)

**Import từ:**
- `../entities/*` - Source entities
- `../dto/*` - Target DTOs
- `../enums/*` - Enum types

**Ví dụ:**
```typescript
// mappers/supplier-product.mapper.ts
export class SupplierProductMapper {
  static toResponseDto(product: SupplierProductOrm): SupplierProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      // Transform nested objects
      price: {
        listingPrice: product.price.listingPrice,
        retailPrice: product.price.retailPrice,
      },
      // Compute properties
      isApproved: product.isApproved,  // getter từ entity
    };
  }
}
```

**Codeflow:** Entity → Mapper → DTO → Response

---

### 7. **`value-objects/`** - Domain Value Objects
**Ý nghĩa:** Domain objects với business logic, immutable

**Vai trò:**
- Encapsulate business logic
- Validate domain rules
- Immutable objects
- Reusable domain concepts

**Import vào:**
- `services/*` (tạo value objects từ DTO)

**Import từ:**
- Không import từ folder khác (pure domain logic)

**Ví dụ:**
```typescript
// value-objects/product-price.vo.ts
export class ProductPrice {
  constructor(
    public readonly listingPrice: number,
    public readonly retailPrice: number,
    public readonly currency: string
  ) {
    if (listingPrice > retailPrice) {
      throw new Error('Listing price cannot exceed retail price');
    }
  }
  
  get profitAmount(): number {
    return this.retailPrice - this.listingPrice;
  }
}
```

**Codeflow:** Service → Create VO → Business Logic → Convert to Entity

---

### 8. **`enums/`** - Business Enums
**Ý nghĩa:** Định nghĩa các enum values cho business domain

**Vai trò:**
- Type safety cho constants
- Business status values
- Shared across layers

**Import vào:**
- `entities/*` (enum properties)
- `dto/*` (enum validation)
- `controllers/*` (enum mapping)
- `services/*` (enum checks)
- `repositories/*` (enum filtering)
- `mappers/*` (enum conversion)

**Ví dụ:**
```typescript
// enums/product-status.enum.ts
export enum ProductStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  DELETED = 'DELETED',
}
```

**Codeflow:** Used everywhere for type safety

---

### 9. **`interfaces/`** - TypeScript Contracts (Optional)
**Ý nghĩa:** Định nghĩa contracts/abstractions (không bắt buộc cho project sinh viên)

**Lưu ý:**
- Project sinh viên không cần interface pattern (đơn giản hơn)
- Services và Repository inject class trực tiếp
- Interface chỉ dùng khi cần loose coupling phức tạp (không cần cho project sinh viên)

**Codeflow:** Optional - không sử dụng trong project này

---

### 10. **`exceptions/`** - Custom Exceptions
**Ý nghĩa:** Domain-specific exception classes

**Vai trò:**
- Business-specific error handling
- Meaningful error messages
- HTTP status mapping
- Error context

**Import vào:**
- `services/*` (throw custom exceptions)
- `filters/*` (catch và handle exceptions)

**Import từ:**
- `../constants/*` - Error messages

**Ví dụ:**
```typescript
// exceptions/supplier-product.exceptions.ts
export class SupplierProductNotFoundException extends HttpException {
  constructor(id?: string) {
    super(`Product not found: ${id}`, HttpStatus.NOT_FOUND);
  }
}

// services/get-supplier-product.service.ts
if (!product) {
  throw new SupplierProductNotFoundException(id);  // từ exceptions/
}
```

**Codeflow:** Service throws → Filter catches → Response

---

### 11. **`filters/`** - Exception Filters
**Ý nghĩa:** Global exception handling, transform errors to responses

**Vai trò:**
- Catch all exceptions
- Transform to standard error format
- Log errors
- gRPC/HTTP error mapping

**Import vào:**
- `supplier-product.module.ts` (global filter provider)

**Import từ:**
- `../constants/*` - Error messages
- `../exceptions/*` - Custom exception types

**Ví dụ:**
```typescript
// filters/supplier-product-exception.filter.ts
@Catch()
export class SupplierProductExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // Transform exception to gRPC/HTTP response
    // Log error
    // Return standard error format
  }
}
```

**Codeflow:** Exception thrown → Filter catches → Transform → Response

---

### 12. **`guards/`** - Authorization Guards
**Ý nghĩa:** Bảo vệ routes, kiểm tra quyền truy cập

**Vai trò:**
- Authentication check
- Authorization check
- Role-based access
- Permission validation

**Import vào:**
- `supplier-product.module.ts` (global guard provider)
- `controllers/*` (method-level guards via decorators)

**Import từ:**
- `../constants/*` - Permission constants
- `../decorators/*` - Metadata decorators

**Ví dụ:**
```typescript
// guards/supplier-product-access.guard.ts
@Injectable()
export class SupplierProductAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Check if user has permission
    // Validate supplier ownership
    return true/false;
  }
}
```

**Codeflow:** Request → Guard checks → Allow/Deny → Controller

---

### 13. **`interceptors/`** - Request/Response Interceptors
**Ý nghĩa:** Xử lý cross-cutting concerns (logging, transformation)

**Vai trò:**
- Request/Response logging
- Response transformation
- Performance monitoring
- Data sanitization

**Import vào:**
- `supplier-product.module.ts` (global interceptor providers)

**Import từ:**
- `../constants/*` - Configuration

**Ví dụ:**
```typescript
// interceptors/supplier-product-logging.interceptor.ts
@Injectable()
export class SupplierProductLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Log request
    const startTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        // Log response time
      })
    );
  }
}
```

**Codeflow:** Request → Interceptor (before) → Controller → Interceptor (after) → Response

---

### 14. **`pipes/`** - Validation Pipes
**Ý nghĩa:** Validate và transform input data

**Vai trò:**
- DTO validation
- Type transformation
- Data sanitization
- Parse query parameters

**Import vào:**
- `supplier-product.module.ts` (global pipe provider)
- `controllers/*` (parameter-level pipes)

**Import từ:**
- `../constants/*` - Validation rules

**Ví dụ:**
```typescript
// pipes/supplier-product-validation.pipe.ts
@Injectable()
export class SupplierProductValidationPipe implements PipeTransform {
  transform(value: any, { metatype }: ArgumentMetadata) {
    // Validate DTO
    // Transform types
    return validatedValue;
  }
}
```

**Codeflow:** Request → Pipe validates → Controller

---

### 15. **`decorators/`** - Custom Decorators
**Ý nghĩa:** Metadata decorators, code reuse

**Vai trò:**
- Extract request data
- Set metadata
- Parameter extraction
- Authorization metadata

**Import vào:**
- `controllers/*` (use decorators on methods)
- `guards/*` (read metadata)

**Import từ:**
- `../constants/*` - Metadata keys

**Ví dụ:**
```typescript
// decorators/supplier-product.decorators.ts
export const GetCurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // Extract user from request
    return user;
  }
);

// controllers/supplier-product.controller.ts
async create(@GetCurrentUser() user: User) {  // từ decorators/
  // Use user
}
```

**Codeflow:** Request → Decorator extracts → Controller receives

---

### 16. **`constants/`** - Constants & Configuration
**Ý nghĩa:** Centralized constants, magic numbers/strings

**Vai trò:**
- Business constants
- Validation rules
- Error messages
- Cache keys
- Configuration values

**Import vào:**
- Tất cả folders (shared constants)

**Import từ:**
- Không import từ folder khác

**Ví dụ:**
```typescript
// constants/supplier-product.constants.ts
export const SUPPLIER_PRODUCT_CONSTANTS = {
  DEFAULT_PAGE: 1,
  MAX_LIMIT: 100,
  ERRORS: {
    PRODUCT_NOT_FOUND: 'Product not found',
  },
};
```

**Codeflow:** Used everywhere for constants

---

### 17. **`config/`** - Configuration Management
**Ý nghĩa:** Environment configuration, validation

**Vai trò:**
- Environment variables
- Configuration validation
- Type-safe config
- Default values

**Import vào:**
- `supplier-product.module.ts` (config module)
- `services/*` (use config service)

**Import từ:**
- `../constants/*` - Default values

**Ví dụ:**
```typescript
// config/supplier-product.config.ts
@Injectable()
export class SupplierProductConfigService {
  get database() {
    return {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
    };
  }
}
```

**Codeflow:** Environment → Config → Services use

---

### 18. **`utils/`** - Utility Functions
**Ý nghĩa:** Helper functions, shared utilities

**Vai trò:**
- Reusable functions
- Type conversions
- Formatting
- Common operations

**Import vào:**
- Tất cả folders (shared utilities)

**Import từ:**
- `../enums/*` - Enum types (for mapping)

**Ví dụ:**
```typescript
// utils/enum-mapper.util.ts
export class EnumMapper {
  static mapProductStatus(status: string): ProductStatus {
    // Map string to enum
  }
}
```

**Codeflow:** Used everywhere for utilities

---

### 19. **`database/`** - Database Specific
**Ý nghĩa:** Database configuration, migrations

**Vai trò:**
- TypeORM data source
- Migration files
- Database connection config

**Import vào:**
- TypeORM CLI (migration commands)
- Không import trong code (chỉ CLI)

**Import từ:**
- `../entities/*` - Entities for migrations

**Ví dụ:**
```typescript
// database/data-source.ts
export default new DataSource({
  type: 'postgres',
  entities: [SupplierProductOrm],  // từ entities/
  migrations: [__dirname + '/migrations/*.ts'],
});
```

**Codeflow:** Migration CLI → data-source.ts → Entities → Database

---

### 20. **`tests/`** - Unit & Integration Tests
**Ý nghĩa:** Test files cho module

**Vai trò:**
- Unit tests
- Integration tests
- E2E tests
- Test utilities

**Import vào:**
- Test runners (Jest)

**Import từ:**
- Tất cả folders (test các components)

**Codeflow:** Test → Mock dependencies → Test components

---

## 🔗 Dependency Graph

```
controllers/
  ↓ imports
services/ → repositories/ → entities/ → database
  ↓           ↓              ↓
dto/        interfaces/    enums/
  ↓           ↓              ↓
mappers/   value-objects/  constants/
  ↓           ↓              ↓
            utils/         config/
                           ↓
                  filters/guards/interceptors/pipes/
                  exceptions/decorators/
```

---

## 🎯 Best Practices

1. **Controllers**: Chỉ nhận request, gọi service, return response
2. **Services**: Business logic, orchestrate repositories
3. **Repositories**: Data access only, no business logic
4. **Entities**: Database mapping + domain methods
5. **DTOs**: Validation + type safety
6. **Mappers**: Transform between layers
7. **Value Objects**: Pure domain logic
8. **Constants**: Centralized, no magic numbers
9. **Interfaces**: Contracts for DI
10. **Infrastructure**: Reusable across modules

---

## 📊 Phân Tích Cấu Trúc Folder

### Thống Kê Hiện Tại

**Tổng số folders: 19**

**Phân loại:**
- **Business Flow (9 folders)**: `controllers/`, `services/`, `repositories/`, `entities/`, `dto/`, `mappers/`, `value-objects/`, `interfaces/`, `enums/`
- **Middleware Flow (6 folders)**: `guards/`, `pipes/`, `interceptors/`, `filters/`, `decorators/`, `exceptions/`
- **Infrastructure/Shared (4 folders)**: `constants/`, `config/`, `utils/`, `database/`

**Middleware Flow chiếm: 6/19 = 31.6%** (không phải phân nửa, nhưng khá nhiều)

### ✅ Folders Middleware **CẦN THIẾT** (4 folders cốt lõi)

Theo chuẩn NestJS enterprise, **4 folders này là BẮT BUỘC** cho mọi dự án:

1. **`guards/`** ✅ - Authentication/Authorization (CỐT LÕI)
2. **`pipes/`** ✅ - Validation & Transformation (CỐT LÕI)
3. **`interceptors/`** ✅ - Logging, Transform Response (CỐT LÕI)
4. **`filters/`** ✅ - Exception Handling (CỐT LÕI)

→ **4 folders này KHÔNG THỪA**, là best practice của NestJS.

### ⚠️ Folders Middleware **CÓ THỂ TỐI ƯU** (2 folders)

#### 1. **`decorators/`** - Có thể gộp với `guards/`

**Lý do:**
- Decorators thường dùng để set metadata cho guards (ví dụ: `@Roles()`, `@Public()`, `@GetCurrentUser()`)
- Trong project hiện tại: chỉ có **1 file** với 3 decorators
- Trong enterprise apps lớn: thường gộp vào `guards/` vì liên quan chặt chẽ

**Recommendation:**
- **Dự án nhỏ** (1-5 modules): Gộp `decorators/` vào `guards/decorators.ts`
- **Dự án lớn** (>5 modules): Giữ riêng `decorators/` nếu có >3 files

**Code hiện tại:**
```typescript
// decorators/supplier-product.decorators.ts
// Chỉ có 3 decorators: GetCurrentUser, GetRequestData, GetPagination
// → Có thể gộp vào guards/
```

#### 2. **`exceptions/`** - Có thể gộp với `filters/`

**Lý do:**
- Exceptions được sử dụng bởi filters để xử lý errors
- Trong project hiện tại: chỉ có **1 file** với 6 custom exceptions
- Trong enterprise apps lớn: thường gộp vào `filters/` hoặc `common/exceptions/`

**Recommendation:**
- **Dự án nhỏ**: Gộp `exceptions/` vào `filters/exceptions.ts`
- **Dự án lớn**: Giữ riêng `exceptions/` nếu có >5 custom exception classes

**Code hiện tại:**
```typescript
// exceptions/supplier-product.exceptions.ts
// Chỉ có 6 custom exceptions
// → Có thể gộp vào filters/
```

### 🏢 So Sánh Với NestJS Enterprise

**Trong các dự án enterprise chuyên nghiệp:**

1. **Thông thường** (nhỏ - trung bình):
   ```
   guards/
   pipes/
   interceptors/
   filters/ (gộp exceptions/)
   common/ (gộp decorators/)
   ```
   → **4-5 folders** cho middleware

2. **Lớn** (enterprise scale):
   ```
   guards/
   pipes/
   interceptors/
   filters/
   exceptions/ (tách riêng nếu >10 custom exceptions)
   decorators/ (tách riêng nếu >5 files)
   ```
   → **6 folders** như hiện tại

3. **Shared/Common** (nếu dùng chung giữa modules):
   ```
   src/common/guards/
   src/common/pipes/
   src/common/interceptors/
   src/common/filters/
   src/common/decorators/
   src/common/exceptions/
   ```
   → **Nâng lên global level** thay vì module level

### 💡 Recommendations

#### Option 1: **Tối ưu cho dự án nhỏ** (Recommended cho project hiện tại)

**Gộp 2 folders:**
- `decorators/` → Gộp vào `guards/decorators.ts`
- `exceptions/` → Gộp vào `filters/exceptions.ts`

**Kết quả:** Giảm từ **6 folders** → **4 folders** middleware
```
guards/
  - supplier-product-access.guard.ts
  - decorators.ts (moved from decorators/)
pipes/
interceptors/
filters/
  - supplier-product-exception.filter.ts
  - exceptions.ts (moved from exceptions/)
```

**Ưu điểm:**
- ✅ Giảm số lượng folders
- ✅ Vẫn giữ được tính tổ chức
- ✅ Phù hợp với dự án nhỏ-trung bình

#### Option 2: **Giữ nguyên** (Nếu dự án sẽ mở rộng)

**Lý do giữ nguyên:**
- ✅ Chuẩn bị cho việc mở rộng sau này
- ✅ Dễ tách khi có nhiều files hơn
- ✅ Tổ chức rõ ràng từ đầu

**Nên giữ nếu:**
- Dự án sẽ có >5 modules
- Sẽ có nhiều custom decorators/exceptions
- Team lớn, cần tách biệt rõ ràng

#### Option 3: **Nâng lên Global** (Nếu dùng chung)

**Nếu middleware dùng chung giữa nhiều modules:**
```
src/common/
  - guards/
  - pipes/
  - interceptors/
  - filters/
  - decorators/
  - exceptions/
```

**Ưu điểm:**
- ✅ Reuse giữa các modules
- ✅ Centralized configuration
- ✅ Phù hợp với microservices architecture

### 📌 Kết Luận về Middleware Folders

| Folder | Cần thiết? | Có thể gộp? | Recommendation |
|--------|-----------|-------------|----------------|
| `guards/` | ✅ **CỐT LÕI** | ❌ Không | **Giữ riêng** |
| `pipes/` | ✅ **CỐT LÕI** | ❌ Không | **Giữ riêng** |
| `interceptors/` | ✅ **CỐT LÕI** | ❌ Không | **Giữ riêng** |
| `filters/` | ✅ **CỐT LÕI** | ❌ Không | **Giữ riêng** |
| `decorators/` | ⚠️ **Tùy** | ✅ Có thể | **Gộp vào guards/** (nếu <5 files) |
| `exceptions/` | ⚠️ **Tùy** | ✅ Có thể | **Gộp vào filters/** (nếu <10 classes) |

**Kết luận:**
- **4 folders cốt lõi (guards, pipes, interceptors, filters) là BẮT BUỘC** ✅
- **2 folders (decorators, exceptions) CÓ THỂ TỐI ƯU** tùy quy mô dự án
- **Cấu trúc hiện tại KHÔNG THỪA**, nhưng có thể tối ưu cho dự án nhỏ

---

## 📝 Kết Luận

Mỗi folder có vai trò rõ ràng trong codeflow, tuân thủ Single Responsibility Principle. Cấu trúc này giúp code dễ maintain, test, và scale.

**Về middleware flow:**
- ✅ **4 folders cốt lõi (guards, pipes, interceptors, filters) là chuẩn NestJS** - KHÔNG THỪA
- ⚠️ **2 folders (decorators, exceptions) có thể tối ưu** - Gộp vào guards/filters nếu dự án nhỏ
- 📊 **Middleware chiếm 31.6%** là bình thường cho dự án enterprise
