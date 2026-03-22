export enum SupplierProductStatus {
    DRAFT = 'draft', // when the product is created by the seller
    PENDING_REVIEW = 'pending_review', // when the product is pending review by the admin
    REJECTED = 'rejected', // when the product is rejected by the admin
    ACTIVE = 'active', // when the product is active and visible to the public
    HIDDEN = 'hidden', // when the product is hidden by the seller
    OUT_OF_STOCK = 'out_of_stock', // when the product is out of stock
    DISCONTINUED = 'discontinued', // when the product is discontinued by the seller
    SUSPENDED = 'suspended', // when the product is suspended by the admin
    BANNED = 'banned', // when the product is banned by the admin
    ARCHIVED = 'archived', // when the product is archived by the supplier, this is not visible to the public
}