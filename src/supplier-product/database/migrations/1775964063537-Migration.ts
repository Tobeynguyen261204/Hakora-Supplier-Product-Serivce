import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1775964063537 implements MigrationInterface {
    name = 'Migration1775964063537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "supplier_product_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "alt_text" character varying, "sort_order" integer NOT NULL DEFAULT '0', "is_primary" boolean NOT NULL DEFAULT false, "width" integer, "height" integer, "variant_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" uuid, CONSTRAINT "PK_fbbacf341d2ba9598ccc978a27f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2119b84cbcc3d9647a445121c6" ON "supplier_product_images" ("sort_order") `);
        await queryRunner.query(`CREATE INDEX "IDX_d32e74552bfb7bf4b00a006049" ON "supplier_product_images" ("product_id") `);
        await queryRunner.query(`CREATE TABLE "supplier_product_variants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sku" character varying NOT NULL, "supplier_price" numeric(10,2) NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'USD', "inventory_snapshot" integer NOT NULL DEFAULT '0', "attributes" jsonb NOT NULL, "product_id" uuid, CONSTRAINT "PK_1829ae6d946b4ce6f50196d5f7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6ca01ee312b0d0eb7686f81935" ON "supplier_product_variants" ("attributes") `);
        await queryRunner.query(`CREATE INDEX "IDX_96a240a4066dbf8da9e7b60446" ON "supplier_product_variants" ("inventory_snapshot") `);
        await queryRunner.query(`CREATE INDEX "IDX_44e267e07aaee4aa043956cfc9" ON "supplier_product_variants" ("supplier_price") `);
        await queryRunner.query(`CREATE INDEX "IDX_261154c45a00ae699fb384977e" ON "supplier_product_variants" ("product_id") `);
        await queryRunner.query(`CREATE TYPE "public"."supplier_products_status_enum" AS ENUM('draft', 'pending_review', 'rejected', 'active', 'hidden', 'out_of_stock', 'discontinued', 'suspended', 'banned', 'archived')`);
        await queryRunner.query(`CREATE TABLE "supplier_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "supplier_id" uuid, "name" character varying NOT NULL, "description" text NOT NULL, "category_id" uuid, "status" "public"."supplier_products_status_enum" NOT NULL DEFAULT 'draft', "specifications" jsonb NOT NULL, "tags" text array DEFAULT '{}', "rating_avg" numeric(5,2), "rating_count" integer, "is_featured" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_651e91706e362ef7393457c347e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_supplier_product_supplier_id" ON "supplier_products" ("supplier_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_290e4786984d88ec811ace43a2" ON "supplier_products" ("is_featured") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb7cbe338f4db045dad76981dd" ON "supplier_products" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_4286173e1486a5c528f89dc798" ON "supplier_products" ("supplier_id") `);
        await queryRunner.query(`ALTER TABLE "supplier_product_images" ADD CONSTRAINT "FK_d32e74552bfb7bf4b00a0060496" FOREIGN KEY ("product_id") REFERENCES "supplier_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supplier_product_variants" ADD CONSTRAINT "FK_261154c45a00ae699fb384977ea" FOREIGN KEY ("product_id") REFERENCES "supplier_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier_product_variants" DROP CONSTRAINT "FK_261154c45a00ae699fb384977ea"`);
        await queryRunner.query(`ALTER TABLE "supplier_product_images" DROP CONSTRAINT "FK_d32e74552bfb7bf4b00a0060496"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4286173e1486a5c528f89dc798"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb7cbe338f4db045dad76981dd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_290e4786984d88ec811ace43a2"`);
        await queryRunner.query(`DROP INDEX "public"."idx_supplier_product_supplier_id"`);
        await queryRunner.query(`DROP TABLE "supplier_products"`);
        await queryRunner.query(`DROP TYPE "public"."supplier_products_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_261154c45a00ae699fb384977e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_44e267e07aaee4aa043956cfc9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_96a240a4066dbf8da9e7b60446"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ca01ee312b0d0eb7686f81935"`);
        await queryRunner.query(`DROP TABLE "supplier_product_variants"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d32e74552bfb7bf4b00a006049"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2119b84cbcc3d9647a445121c6"`);
        await queryRunner.query(`DROP TABLE "supplier_product_images"`);
    }

}
