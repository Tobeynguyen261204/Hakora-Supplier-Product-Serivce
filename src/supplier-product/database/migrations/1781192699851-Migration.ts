import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1781192699851 implements MigrationInterface {
    name = 'Migration1781192699851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier_products" ADD "model_video_url" text`);
        await queryRunner.query(`ALTER TABLE "supplier_products" ADD "model_3d_status" character varying(32) NOT NULL DEFAULT 'none'`);
        await queryRunner.query(`ALTER TABLE "supplier_products" ADD "model_3d_job_id" character varying(64)`);
        await queryRunner.query(`ALTER TABLE "supplier_products" ADD "model_3d_poster_url" text`);
        await queryRunner.query(`ALTER TABLE "supplier_products" ADD "model_3d_source" character varying(32) NOT NULL DEFAULT 'none'`);
        await queryRunner.query(`ALTER TABLE "supplier_products" ADD "model_3d_error" text`);
        await queryRunner.query(`ALTER TABLE "supplier_products" ADD "model_3d_progress" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "supplier_products" ADD "model_3d_updated_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier_products" DROP COLUMN "model_3d_updated_at"`);
        await queryRunner.query(`ALTER TABLE "supplier_products" DROP COLUMN "model_3d_progress"`);
        await queryRunner.query(`ALTER TABLE "supplier_products" DROP COLUMN "model_3d_error"`);
        await queryRunner.query(`ALTER TABLE "supplier_products" DROP COLUMN "model_3d_source"`);
        await queryRunner.query(`ALTER TABLE "supplier_products" DROP COLUMN "model_3d_poster_url"`);
        await queryRunner.query(`ALTER TABLE "supplier_products" DROP COLUMN "model_3d_job_id"`);
        await queryRunner.query(`ALTER TABLE "supplier_products" DROP COLUMN "model_3d_status"`);
        await queryRunner.query(`ALTER TABLE "supplier_products" DROP COLUMN "model_video_url"`);
    }

}
