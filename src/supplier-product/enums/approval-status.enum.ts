export enum ApprovalStatus {
  PENDING = 'PENDING',         // Chờ phê duyệt - Admin chưa xem xét
  APPROVED = 'APPROVED',        // Đã phê duyệt - Có thể hiển thị trên sàn
  REJECTED = 'REJECTED'         // Bị từ chối - Không được phép bán
}
