export enum ProductStatus {
  DRAFT = 'DRAFT',           // Bản nháp - Supplier đang tạo/chỉnh sửa
  PUBLISHED = 'PUBLISHED',   // Đã xuất bản - Sẵn sàng để bán
  OUT_OF_STOCK = 'OUT_OF_STOCK',  // Hết hàng - Tạm thời không có hàng
  DELETED = 'DELETED'        // Đã xóa - Không còn tồn tại
}
