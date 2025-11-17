# Postman gRPC Requests - Supplier Product Service

## Cấu hình cơ bản
- **URL:** `localhost:50052`
- **Proto File:** `src/presentation/proto/supplier-product.proto`

---

## 1. CreateSupplierProduct

**Method:** `SupplierProductService / CreateSupplierProduct`

**Message:**
```json
{
  "supplierId": "supplier-123",
  "name": "Áo thun nam cao cấp",
  "description": "Áo thun nam chất liệu cotton 100%, thoáng mát, dễ giặt",
  "shortDescription": "Áo thun nam cotton 100%",
  "sku": "SKU-001",
  "categoryName": "Thời trang nam",
  "price": {
    "listingPrice": 150000,
    "retailPrice": 200000,
    "currency": "VND"
  },
  "inventory": {
    "quantity": 100
  },
  "type": 1,
  "tags": ["áo thun", "nam", "cotton"],
  "isActive": true,
  "isFeatured": false
}
```

---

## 2. GetSupplierProduct

**Method:** `SupplierProductService / GetSupplierProduct`

**Message:**
```json
{
  "id": "product-id-here"
}
```

---

## 3. GetSupplierProducts

**Method:** `SupplierProductService / GetSupplierProducts`

**Message:**
```json
{
  "page": 1,
  "limit": 10,
  "supplierId": "supplier-123"
}
```

---

## 4. UpdateSupplierProduct

**Method:** `SupplierProductService / UpdateSupplierProduct`

**Message:**
```json
{
  "id": "product-id-here",
  "name": "Tên sản phẩm đã cập nhật",
  "description": "Mô tả mới",
  "price": {
    "listingPrice": 180000,
    "retailPrice": 220000,
    "currency": "VND"
  }
}
```

---

## 5. ApproveSupplierProduct

**Method:** `SupplierProductService / ApproveSupplierProduct`

**Message:**
```json
{
  "id": "product-id-here",
  "approvedBy": "admin-123"
}
```

---

## 6. RejectSupplierProduct

**Method:** `SupplierProductService / RejectSupplierProduct`

**Message:**
```json
{
  "id": "product-id-here",
  "reason": "Sản phẩm không đạt yêu cầu chất lượng",
  "rejectedBy": "admin-123"
}
```

---

## 7. DeleteSupplierProduct

**Method:** `SupplierProductService / DeleteSupplierProduct`

**Message:**
```json
{
  "id": "product-id-here"
}
```

---

## 8. HideSupplierProduct

**Method:** `SupplierProductService / HideSupplierProduct`

**Message:**
```json
{
  "id": "product-id-here",
  "reason": "Tạm thời ẩn sản phẩm",
  "hiddenBy": "admin-123"
}
```

---

## 9. UnhideSupplierProduct

**Method:** `SupplierProductService / UnhideSupplierProduct`

**Message:**
```json
{
  "id": "product-id-here",
  "unhiddenBy": "admin-123"
}
```

---

## 10. SuspendSupplierProduct

**Method:** `SupplierProductService / SuspendSupplierProduct`

**Message:**
```json
{
  "id": "product-id-here",
  "reason": "Vi phạm chính sách",
  "suspendedBy": "admin-123",
  "suspensionDuration": 7
}
```

---

## 11. UnsuspendSupplierProduct

**Method:** `SupplierProductService / UnsuspendSupplierProduct`

**Message:**
```json
{
  "id": "product-id-here",
  "reason": "Đã xử lý xong",
  "unsuspendedBy": "admin-123"
}
```

---

## 12. GetSupplierProductSellerView

**Method:** `SupplierProductService / GetSupplierProductSellerView`

**Message:**
```json
{
  "id": "product-id-here"
}
```

---

## 13. ListSupplierProductSellerView

**Method:** `SupplierProductService / ListSupplierProductSellerView`

**Message:**
```json
{
  "page": 1,
  "limit": 10,
  "categoryId": "category-123",
  "search": "áo thun"
}
```

---

## 14. GetSupplierProductStats

**Method:** `SupplierProductService / GetSupplierProductStats`

**Message:**
```json
{
  "supplierId": "supplier-123"
}
```

---

## 15. GetSupplierProductsByIds

**Method:** `SupplierProductService / GetSupplierProductsByIds`

**Message:**
```json
{
  "productIds": ["product-id-1", "product-id-2", "product-id-3"]
}
```

---

## Lưu ý:
- Thay `product-id-here` và `supplier-123` bằng ID thực tế từ database
- `type`: 1 = PHYSICAL, 2 = DIGITAL, 3 = SERVICE
- Tất cả các request đều gửi đến `localhost:50052`








