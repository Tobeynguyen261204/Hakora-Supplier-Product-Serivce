import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateShippingMethodsTable1765000000000 implements MigrationInterface {
    name = 'CreateShippingMethodsTable1765000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'shipping_methods',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'supplierId',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: 'estimatedDays',
                        type: 'varchar',
                        length: '50',
                        isNullable: true,
                    },
                    {
                        name: 'isActive',
                        type: 'boolean',
                        default: true,
                        isNullable: false,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        // Create indexes
        await queryRunner.createIndex(
            'shipping_methods',
            new TableIndex({
                name: 'IDX_shipping_methods_supplierId',
                columnNames: ['supplierId'],
            }),
        );

        await queryRunner.createIndex(
            'shipping_methods',
            new TableIndex({
                name: 'IDX_shipping_methods_supplierId_isActive',
                columnNames: ['supplierId', 'isActive'],
            }),
        );

        await queryRunner.createIndex(
            'shipping_methods',
            new TableIndex({
                name: 'IDX_shipping_methods_isActive',
                columnNames: ['isActive'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.dropIndex('shipping_methods', 'IDX_shipping_methods_isActive');
        await queryRunner.dropIndex('shipping_methods', 'IDX_shipping_methods_supplierId_isActive');
        await queryRunner.dropIndex('shipping_methods', 'IDX_shipping_methods_supplierId');
        
        // Drop table
        await queryRunner.dropTable('shipping_methods');
    }
}

