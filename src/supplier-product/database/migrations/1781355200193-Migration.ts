import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1781355200193 implements MigrationInterface {
    name = 'Migration1781355200193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier_products" ADD "model_orbit_image_urls" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier_products" DROP COLUMN "model_orbit_image_urls"`);
    }

}
