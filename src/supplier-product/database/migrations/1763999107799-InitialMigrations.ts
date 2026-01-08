import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrations1763999107799 implements MigrationInterface {
    name = 'InitialMigrations1763999107799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_images" ("id" uuid NOT NULL, "productId" uuid NOT NULL, "url" character varying NOT NULL, "altText" character varying, "sortOrder" integer NOT NULL DEFAULT '0', "isPrimary" boolean NOT NULL DEFAULT false, "width" integer, "height" integer, "fileSize" integer, "mimeType" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1974264ea7265989af8392f63a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ee25a1e373461023f7ef5faf14" ON "product_images" ("sortOrder") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e608cfeddd2708513ff81b73d" ON "product_images" ("isPrimary") `);
        await queryRunner.query(`CREATE INDEX "IDX_b367708bf720c8dd62fc683316" ON "product_images" ("productId") `);
        await queryRunner.query(`CREATE TABLE "product_reviews" ("id" uuid NOT NULL, "productId" uuid NOT NULL, "customerId" uuid NOT NULL, "rating" integer NOT NULL, "title" character varying, "comment" text, "isVerified" boolean NOT NULL DEFAULT false, "isPublished" boolean NOT NULL DEFAULT true, "helpfulCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "CHK_product_reviews_rating" CHECK (rating >= 1 AND rating <= 5), CONSTRAINT "PK_67c1501aea1b0633ec441b00bd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bc3a62f45b3759c250d50391e2" ON "product_reviews" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_cfcd09fe26a29a89f34eecb510" ON "product_reviews" ("isPublished") `);
        await queryRunner.query(`CREATE INDEX "IDX_bcb90e1e8ca46a3a4093ef1e1e" ON "product_reviews" ("isVerified") `);
        await queryRunner.query(`CREATE INDEX "IDX_f64628557b6cdaeadc50309b95" ON "product_reviews" ("rating") `);
        await queryRunner.query(`CREATE INDEX "IDX_398f12cc82fe04b49c266939ca" ON "product_reviews" ("customerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_32edd80d91dff1bc19e79c8f16" ON "product_reviews" ("productId") `);
        await queryRunner.query(`CREATE TABLE "supplier_products" ("id" uuid NOT NULL, "supplierId" uuid NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "shortDescription" text, "sku" character varying NOT NULL, "categoryName" character varying NOT NULL, "price" jsonb NOT NULL, "inventory" jsonb NOT NULL, "specifications" jsonb NOT NULL, "type" character varying NOT NULL, "status" character varying NOT NULL, "approvalStatus" character varying NOT NULL, "tags" text array NOT NULL DEFAULT '{}', "isActive" boolean NOT NULL DEFAULT true, "isFeatured" boolean NOT NULL DEFAULT false, "isSuspend" boolean NOT NULL DEFAULT false, "weight" numeric(10,2), "dimensions" jsonb, "seoData" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "approvedAt" TIMESTAMP, "approvedBy" uuid, "rejectionReason" text, CONSTRAINT "UQ_00cdd063e82fa980e95e756bc2d" UNIQUE ("sku"), CONSTRAINT "PK_651e91706e362ef7393457c347e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4de3dd28f64cdec536b4da3660" ON "supplier_products" ("updatedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_7fb0bc5b4063f149a6ac7422bb" ON "supplier_products" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_148fa967219f273ecd6a6d0f98" ON "supplier_products" ("isFeatured") `);
        await queryRunner.query(`CREATE INDEX "IDX_74537e5632787dc16495f97a6f" ON "supplier_products" ("isActive") `);
        await queryRunner.query(`CREATE INDEX "IDX_d1fd847c6d5c6e32a5c76cc56b" ON "supplier_products" ("approvalStatus") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb7cbe338f4db045dad76981dd" ON "supplier_products" ("status") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_00cdd063e82fa980e95e756bc2" ON "supplier_products" ("sku") `);
        await queryRunner.query(`CREATE INDEX "IDX_1a3ae86a8f5e4d73e016c84b7b" ON "supplier_products" ("supplierId") `);
        await queryRunner.query(`ALTER TABLE "product_images" ADD CONSTRAINT "FK_b367708bf720c8dd62fc6833161" FOREIGN KEY ("productId") REFERENCES "supplier_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_reviews" ADD CONSTRAINT "FK_32edd80d91dff1bc19e79c8f16d" FOREIGN KEY ("productId") REFERENCES "supplier_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_reviews" DROP CONSTRAINT "FK_32edd80d91dff1bc19e79c8f16d"`);
        await queryRunner.query(`ALTER TABLE "product_images" DROP CONSTRAINT "FK_b367708bf720c8dd62fc6833161"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1a3ae86a8f5e4d73e016c84b7b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_00cdd063e82fa980e95e756bc2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb7cbe338f4db045dad76981dd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d1fd847c6d5c6e32a5c76cc56b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_74537e5632787dc16495f97a6f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_148fa967219f273ecd6a6d0f98"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7fb0bc5b4063f149a6ac7422bb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4de3dd28f64cdec536b4da3660"`);
        await queryRunner.query(`DROP TABLE "supplier_products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_32edd80d91dff1bc19e79c8f16"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_398f12cc82fe04b49c266939ca"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f64628557b6cdaeadc50309b95"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bcb90e1e8ca46a3a4093ef1e1e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cfcd09fe26a29a89f34eecb510"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc3a62f45b3759c250d50391e2"`);
        await queryRunner.query(`DROP TABLE "product_reviews"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b367708bf720c8dd62fc683316"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e608cfeddd2708513ff81b73d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ee25a1e373461023f7ef5faf14"`);
        await queryRunner.query(`DROP TABLE "product_images"`);
    }

}
