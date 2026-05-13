import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddModelGlbUrlToSupplierProducts1776500001000 implements MigrationInterface {
  name = 'AddModelGlbUrlToSupplierProducts1776500001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "supplier_products" ADD "model_glb_url" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "supplier_products" DROP COLUMN "model_glb_url"`);
  }
}
