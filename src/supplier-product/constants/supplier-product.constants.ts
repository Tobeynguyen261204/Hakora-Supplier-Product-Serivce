export const SUPPLIER_PRODUCT_CONSTANTS = {
  // Pagination
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  MIN_PAGE: 1,
  MIN_LIMIT: 1,

  // Validation
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 255,
  MIN_DESCRIPTION_LENGTH: 1,
  MAX_DESCRIPTION_LENGTH: 5000,
  MIN_SKU_LENGTH: 1,
  MAX_SKU_LENGTH: 100,
  MIN_PRICE: 0,
  MIN_QUANTITY: 0,

  // Business Rules
  LOW_STOCK_THRESHOLD: 10,
  RECENT_DAYS_THRESHOLD: 30,
  MAX_IMAGES_PER_PRODUCT: 10,
  MAX_TAGS_PER_PRODUCT: 20,
  MAX_TAG_LENGTH: 50,

  // Error Messages
  ERRORS: {
    PRODUCT_NOT_FOUND: 'Product not found',
    INVALID_ID: 'Invalid product ID',
    SKU_ALREADY_EXISTS: 'Product with this SKU already exists',
    PRODUCT_ALREADY_APPROVED: 'Product is already approved',
    PRODUCT_ALREADY_REJECTED: 'Product is already rejected',
    PRODUCT_ALREADY_SUSPENDED: 'Product is already suspended',
    PRODUCT_ALREADY_HIDDEN: 'Product is already hidden',
    CANNOT_APPROVE_REJECTED: 'Cannot approve a rejected product',
    CANNOT_REJECT_APPROVED: 'Cannot reject an approved product',
    CANNOT_HIDE_SUSPENDED: 'Cannot hide a suspended product',
    CANNOT_SUSPEND_HIDDEN: 'Cannot suspend a hidden product',
    INVALID_PAGINATION: 'Invalid pagination parameters',
    VALIDATION_FAILED: 'Validation failed',
    UNAUTHORIZED_ACTION: 'Unauthorized action',
    INTERNAL_ERROR: 'Internal server error occurred',
  },

  // Success Messages
  SUCCESS: {
    PRODUCT_CREATED: 'Product created successfully',
    PRODUCT_UPDATED: 'Product updated successfully',
    PRODUCT_DELETED: 'Product deleted successfully',
    PRODUCT_APPROVED: 'Product approved successfully',
    PRODUCT_REJECTED: 'Product rejected successfully',
    PRODUCT_HIDDEN: 'Product hidden successfully',
    PRODUCT_SUSPENDED: 'Product suspended successfully',
    PRODUCT_UNHIDDEN: 'Product unhidden successfully',
    PRODUCT_UNSUSPENDED: 'Product unsuspended successfully',
  },

  // Repository Injection Tokens
  TOKENS: {
    SUPPLIER_PRODUCT_REPOSITORY: 'SUPPLIER_PRODUCT_REPOSITORY',
    PRODUCT_IMAGE_REPOSITORY: 'PRODUCT_IMAGE_REPOSITORY',
    PRODUCT_REVIEW_REPOSITORY: 'PRODUCT_REVIEW_REPOSITORY',
  },

  // Cache Keys
  CACHE_KEYS: {
    PRODUCT_BY_ID: 'product:id:',
    PRODUCT_BY_SKU: 'product:sku:',
    PRODUCTS_BY_SUPPLIER: 'products:supplier:',
    FEATURED_PRODUCTS: 'products:featured',
    TOP_RATED_PRODUCTS: 'products:top-rated',
  },

  // Cache TTL (in seconds)
  CACHE_TTL: {
    PRODUCT_DETAILS: 300, // 5 minutes
    PRODUCT_LIST: 60, // 1 minute
    FEATURED_PRODUCTS: 600, // 10 minutes
    STATS: 1800, // 30 minutes
  },
} as const;

export type SupplierProductError = keyof typeof SUPPLIER_PRODUCT_CONSTANTS.ERRORS;
export type SupplierProductSuccess = keyof typeof SUPPLIER_PRODUCT_CONSTANTS.SUCCESS;
