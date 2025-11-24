import { ProductType } from '../enums/product-type.enum';
import { ProductStatus } from '../enums/product-status.enum';
import { ApprovalStatus } from '../enums/approval-status.enum';

/**
 * Utility class for mapping enums between domain and gRPC/protobuf formats
 */
export class EnumMapper {
  /**
   * Maps ProductStatus from gRPC format (number/string) to domain enum
   */
  static toProductStatus(val: string | number | undefined): ProductStatus | undefined {
    if (val === undefined || val === null || val === '') return undefined;
    
    if (typeof val === 'number') {
      const map: Record<number, ProductStatus> = {
        1: ProductStatus.DRAFT,
        2: ProductStatus.PUBLISHED,
        3: ProductStatus.OUT_OF_STOCK,
        4: ProductStatus.DELETED
      };
      return map[val];
    }
    
    const strVal = String(val).toUpperCase();
    
    // Thử map trực tiếp với enum value (ví dụ: "DRAFT" -> ProductStatus.DRAFT)
    if (strVal in ProductStatus) {
      return ProductStatus[strVal as keyof typeof ProductStatus];
    }
    
    // Nếu không tìm thấy, thử với prefix (ví dụ: "PRODUCT_STATUS_DRAFT")
    const keyWithPrefix = strVal.startsWith('PRODUCT_STATUS_')
      ? strVal
      : `PRODUCT_STATUS_${strVal}`;
    
    // Remove prefix và thử lại
    if (keyWithPrefix.startsWith('PRODUCT_STATUS_')) {
      const withoutPrefix = keyWithPrefix.replace('PRODUCT_STATUS_', '');
      if (withoutPrefix in ProductStatus) {
        return ProductStatus[withoutPrefix as keyof typeof ProductStatus];
      }
    }
    
    return undefined;
  }

  /**
   * Maps ApprovalStatus from gRPC format (number/string) to domain enum
   */
  static toApprovalStatus(val: string | number | undefined): ApprovalStatus | undefined {
    if (val === undefined || val === null || val === '') return undefined;
    
    if (typeof val === 'number') {
      const map: Record<number, ApprovalStatus> = {
        1: ApprovalStatus.PENDING,
        2: ApprovalStatus.APPROVED,
        3: ApprovalStatus.REJECTED
      };
      return map[val];
    }
    
    const strVal = String(val).toUpperCase();
    
    // Thử map trực tiếp với enum value (ví dụ: "PENDING" -> ApprovalStatus.PENDING)
    if (strVal in ApprovalStatus) {
      return ApprovalStatus[strVal as keyof typeof ApprovalStatus];
    }
    
    // Nếu không tìm thấy, thử với prefix (ví dụ: "APPROVAL_STATUS_PENDING")
    const keyWithPrefix = strVal.startsWith('APPROVAL_STATUS_')
      ? strVal
      : `APPROVAL_STATUS_${strVal}`;
    
    // Remove prefix và thử lại
    if (keyWithPrefix.startsWith('APPROVAL_STATUS_')) {
      const withoutPrefix = keyWithPrefix.replace('APPROVAL_STATUS_', '');
      if (withoutPrefix in ApprovalStatus) {
        return ApprovalStatus[withoutPrefix as keyof typeof ApprovalStatus];
      }
    }
    
    return undefined;
  }

  /**
   * Maps ProductType from gRPC format (number/string) to domain enum
   */
  static toProductType(val: string | number | undefined): ProductType | undefined {
    if (val === undefined || val === null || val === '') return undefined;
    
    if (typeof val === 'number') {
      const map: Record<number, ProductType> = {
        1: ProductType.PHYSICAL,
        2: ProductType.DIGITAL,
        3: ProductType.SERVICE
      };
      return map[val];
    }
    
    const strVal = String(val).toUpperCase();
    
    // Thử map trực tiếp với enum value (ví dụ: "PHYSICAL" -> ProductType.PHYSICAL)
    if (strVal in ProductType) {
      return ProductType[strVal as keyof typeof ProductType];
    }
    
    // Nếu không tìm thấy, thử với prefix (ví dụ: "PRODUCT_TYPE_PHYSICAL")
    const keyWithPrefix = strVal.startsWith('PRODUCT_TYPE_')
      ? strVal
      : `PRODUCT_TYPE_${strVal}`;
    
    // Remove prefix và thử lại
    if (keyWithPrefix.startsWith('PRODUCT_TYPE_')) {
      const withoutPrefix = keyWithPrefix.replace('PRODUCT_TYPE_', '');
      if (withoutPrefix in ProductType) {
        return ProductType[withoutPrefix as keyof typeof ProductType];
      }
    }
    
    return undefined;
  }

  /**
   * Normalizes ProductType to protobuf-friendly string format
   */
  static normalizeProductType(val: string | ProductType | undefined): string {
    if (!val) return '';
    if (typeof val === 'string' && !val.startsWith('PRODUCT_TYPE_')) {
      return `PRODUCT_TYPE_${val}`;
    }
    return String(val);
  }

  /**
   * Normalizes ProductStatus to protobuf-friendly string format
   */
  static normalizeProductStatus(val: string | ProductStatus | undefined): string {
    if (!val) return '';
    if (typeof val === 'string' && !val.startsWith('PRODUCT_STATUS_')) {
      return `PRODUCT_STATUS_${val}`;
    }
    return String(val);
  }

  /**
   * Normalizes ApprovalStatus to protobuf-friendly string format
   */
  static normalizeApprovalStatus(val: string | ApprovalStatus | undefined): string {
    if (!val) return '';
    if (typeof val === 'string' && !val.startsWith('APPROVAL_STATUS_')) {
      return `APPROVAL_STATUS_${val}`;
    }
    return String(val);
  }
}







