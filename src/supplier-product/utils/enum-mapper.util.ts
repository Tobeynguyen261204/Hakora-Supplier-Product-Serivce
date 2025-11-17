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
    
    const key = String(val).toUpperCase().startsWith('PRODUCT_STATUS_')
      ? String(val).toUpperCase()
      : `PRODUCT_STATUS_${String(val).toUpperCase()}`;
    return (ProductStatus as Record<string, ProductStatus>)[key];
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
    
    const key = String(val).toUpperCase().startsWith('APPROVAL_STATUS_')
      ? String(val).toUpperCase()
      : `APPROVAL_STATUS_${String(val).toUpperCase()}`;
    return (ApprovalStatus as Record<string, ApprovalStatus>)[key];
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
    
    const key = String(val).toUpperCase().startsWith('PRODUCT_TYPE_')
      ? String(val).toUpperCase()
      : `PRODUCT_TYPE_${String(val).toUpperCase()}`;
    return (ProductType as Record<string, ProductType>)[key];
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






