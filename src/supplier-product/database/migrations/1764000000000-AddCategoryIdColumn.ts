import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryIdColumn1764000000000 implements MigrationInterface {
    name = 'AddCategoryIdColumn1764000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add categoryId column
        await queryRunner.query(`ALTER TABLE "supplier_products" ADD COLUMN "categoryId" uuid`);
        
        // Create index for categoryId
        await queryRunner.query(`CREATE INDEX "IDX_supplier_products_categoryId" ON "supplier_products" ("categoryId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop index
        await queryRunner.query(`DROP INDEX "public"."IDX_supplier_products_categoryId"`);
        
        // Drop column
        await queryRunner.query(`ALTER TABLE "supplier_products" DROP COLUMN "categoryId"`);
    }
}


