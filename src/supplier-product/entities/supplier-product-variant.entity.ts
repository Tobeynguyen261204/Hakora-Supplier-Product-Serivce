import { Entity, Index } from "typeorm"
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { SupplierProduct } from "./supplier-product.entity"


@Entity('supplier_product_variants')
@Index(['product'])
@Index(['supplierPrice'])
@Index(['inventorySnapshot'])
@Index(['attributes'])
export class SupplierProductVariant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => SupplierProduct, product => product.variants)
    @JoinColumn({ name: 'product_id' })
    product: SupplierProduct;

    @Column({ name: 'sku' })
    sku: string;

    @Column('decimal', {
        precision: 10,
        scale: 2,
        name: 'supplier_price'
    })
    supplierPrice!: number;

    @Column({
        length: 3,
        default: 'USD'
    })
    currency!: string;

    @Column('integer', { default: 0, name: 'inventory_snapshot' })
    inventorySnapshot!: number;

    @Column('jsonb', { name: 'attributes' })
    attributes: Record<string, string>;
}