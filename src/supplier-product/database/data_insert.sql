-- ================================================
-- SQL INSERT STATEMENTS FOR SUPPLIER PRODUCTS
-- Updated for new simplified schema
-- Generated on: 2026-03-14
-- ================================================

-- Tables: supplier_products, supplier_product_variants, supplier_product_images
-- Database: PostgreSQL
-- Compatible with: New TypeORM entities
-- ================================================

-- Clean up existing data
TRUNCATE TABLE supplier_product_variants CASCADE;
TRUNCATE TABLE supplier_product_images CASCADE;
TRUNCATE TABLE supplier_products CASCADE;

-- ================================================
-- SUPPLIER PRODUCTS
-- ================================================

-- Product #1: Warm Wool/Duffle Coat 04
INSERT INTO supplier_products (
    id, supplier_id, name, description, category_id, status, specifications, 
    tags, rating_avg, rating_count, is_featured, created_at, updated_at
) VALUES (
    'b0f1be1e-e665-45de-a347-6107d3b89c8a', 
    '750e8400-e29b-41d4-a716-446655440002', 
    'Warm Wool/Duffle Coat 04', 
    'Wool coat with soft lining, excellent heat retention, refined stitching, detachable hood. Suitable for early morning/cold night travel, structured fit flatters figure. High-quality material, tested for stretch and colorfastness after multiple washes.', 
    '550e8400-e29b-41d4-a716-446655440001', 
    'active', 
    '{"fit": "regular", "season": "winter", "material": "cotton/poly/wool", "colors": ["black", "grey", "white", "beige", "navy blue"], "sizes": ["S", "M", "L", "XL"]}'::jsonb,
    ARRAY['coat', 'winter', 'warm', 'wool']::text[], 
    0, 0, FALSE, 
    '2025-10-13 15:41:12.282244'::timestamp, 
    '2025-12-11 18:49:31.084431'::timestamp
);

-- Variants for Product #1
INSERT INTO supplier_product_variants (id, product_id, sku, supplier_price, currency, inventory_snapshot, attributes) VALUES
('a1b2c3d4-1111-4111-a111-111111111111', 'b0f1be1e-e665-45de-a347-6107d3b89c8a', 'TOP-COAT-004-S-BLACK', 276000, 'VND', 10, '{"size": "S", "color": "black"}'::jsonb),
('a1b2c3d4-1111-4111-a111-111111111112', 'b0f1be1e-e665-45de-a347-6107d3b89c8a', 'TOP-COAT-004-M-BLACK', 276000, 'VND', 8, '{"size": "M", "color": "black"}'::jsonb),
('a1b2c3d4-1111-4111-a111-111111111113', 'b0f1be1e-e665-45de-a347-6107d3b89c8a', 'TOP-COAT-004-L-GREY', 276000, 'VND', 12, '{"size": "L", "color": "grey"}'::jsonb),
('a1b2c3d4-1111-4111-a111-111111111114', 'b0f1be1e-e665-45de-a347-6107d3b89c8a', 'TOP-COAT-004-XL-NAVY', 276000, 'VND', 4, '{"size": "XL", "color": "navy blue"}'::jsonb);

-- Images for Product #1
INSERT INTO supplier_product_images (id, product_id, url, alt_text, sort_order, is_primary, width, height, created_at, updated_at) VALUES
('f1e2d3c4-1111-4111-b111-111111111111', 'b0f1be1e-e665-45de-a347-6107d3b89c8a', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/455359/item/vngoods_09_455359.jpg', 'Warm Wool Coat - Front View', 0, TRUE, 800, 1000, NOW(), NOW()),
('f1e2d3c4-1111-4111-b111-111111111112', 'b0f1be1e-e665-45de-a347-6107d3b89c8a', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455359/sub/goods_455359_sub14.jpg', 'Warm Wool Coat - Side View', 1, FALSE, 800, 1000, NOW(), NOW());


-- Product #2: Warm Brushed Fleece Hoodie 03
INSERT INTO supplier_products (
    id, supplier_id, name, description, category_id, status, specifications, 
    tags, rating_avg, rating_count, is_featured, created_at, updated_at
) VALUES (
    '94d3b6dc-beaf-4fed-b320-020d1551b561', 
    '750e8400-e29b-41d4-a716-446655440002', 
    'Warm Brushed Fleece Hoodie 03', 
    'Brushed fleece hoodie with soft inner surface, warm and soft, drawstring hood, cuffed sleeves/hem retains heat. Suitable for strolling and travel. High-quality material, tested for stretch and colorfastness after multiple washes.', 
    '550e8400-e29b-41d4-a716-446655440001', 
    'active', 
    '{"fit": "regular", "season": "winter", "material": "fleece", "colors": ["black", "grey", "white", "beige", "navy blue"], "sizes": ["S", "M", "L", "XL"]}'::jsonb,
    ARRAY['hoodie', 'winter', 'warm', 'fleece']::text[], 
    0, 0, FALSE, 
    '2025-10-13 15:41:12.282244'::timestamp, 
    '2025-12-11 18:54:03.464614'::timestamp
);

-- Variants for Product #2
INSERT INTO supplier_product_variants (id, product_id, sku, supplier_price, currency, inventory_snapshot, attributes) VALUES
('a1b2c3d4-2222-4222-a222-222222222221', '94d3b6dc-beaf-4fed-b320-020d1551b561', 'TOP-HOOD-003-S-BLACK', 272000, 'VND', 9, '{"size": "S", "color": "black"}'::jsonb),
('a1b2c3d4-2222-4222-a222-222222222222', '94d3b6dc-beaf-4fed-b320-020d1551b561', 'TOP-HOOD-003-M-GREY', 272000, 'VND', 10, '{"size": "M", "color": "grey"}'::jsonb),
('a1b2c3d4-2222-4222-a222-222222222223', '94d3b6dc-beaf-4fed-b320-020d1551b561', 'TOP-HOOD-003-L-WHITE', 272000, 'VND', 8, '{"size": "L", "color": "white"}'::jsonb),
('a1b2c3d4-2222-4222-a222-222222222224', '94d3b6dc-beaf-4fed-b320-020d1551b561', 'TOP-HOOD-003-XL-NAVY', 272000, 'VND', 6, '{"size": "XL", "color": "navy blue"}'::jsonb);

-- Images for Product #2
INSERT INTO supplier_product_images (id, product_id, url, alt_text, sort_order, is_primary, width, height, created_at, updated_at) VALUES
('f1e2d3c4-2222-4222-b222-222222222221', '94d3b6dc-beaf-4fed-b320-020d1551b561', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/455360/item/vngoods_09_455360.jpg', 'Brushed Fleece Hoodie - Front View', 0, TRUE, 800, 1000, NOW(), NOW()),
('f1e2d3c4-2222-4222-b222-222222222222', '94d3b6dc-beaf-4fed-b320-020d1551b561', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455360/sub/goods_455360_sub14.jpg', 'Brushed Fleece Hoodie - Side View', 1, FALSE, 800, 1000, NOW(), NOW());


-- Product #3: Soft Cotton Shirt 06
INSERT INTO supplier_products (
    id, supplier_id, name, description, category_id, status, specifications, 
    tags, rating_avg, rating_count, is_featured, created_at, updated_at
) VALUES (
    '9b3e3de8-3e0d-4c2e-85bc-580a885a5337', 
    '750e8400-e29b-41d4-a716-446655440002', 
    'Soft Cotton Shirt 06', 
    'Lightweight twill-woven cotton shirt, quick moisture absorption, button-down collar maintains shape. Suitable for office and casual wear. High-quality material, tested for stretch and colorfastness after multiple washes.', 
    '550e8400-e29b-41d4-a716-446655440003', 
    'active', 
    '{"fit": "regular", "season": "spring/fall", "material": "cotton", "colors": ["black", "grey", "white", "beige", "navy blue"], "sizes": ["S", "M", "L", "XL"]}'::jsonb,
    ARRAY['shirt', 'cotton', 'breathable', 'casual']::text[], 
    0, 0, FALSE, 
    '2025-10-13 15:41:12.282244'::timestamp, 
    '2025-12-11 18:55:45.828736'::timestamp
);

-- Variants for Product #3
INSERT INTO supplier_product_variants (id, product_id, sku, supplier_price, currency, inventory_snapshot, attributes) VALUES
('a1b2c3d4-3333-4333-a333-333333333331', '9b3e3de8-3e0d-4c2e-85bc-580a885a5337', 'TOP-SHIRT-006-S-WHITE', 284000, 'VND', 10, '{"size": "S", "color": "white"}'::jsonb),
('a1b2c3d4-3333-4333-a333-333333333332', '9b3e3de8-3e0d-4c2e-85bc-580a885a5337', 'TOP-SHIRT-006-M-WHITE', 284000, 'VND', 12, '{"size": "M", "color": "white"}'::jsonb),
('a1b2c3d4-3333-4333-a333-333333333333', '9b3e3de8-3e0d-4c2e-85bc-580a885a5337', 'TOP-SHIRT-006-L-BEIGE', 284000, 'VND', 8, '{"size": "L", "color": "beige"}'::jsonb),
('a1b2c3d4-3333-4333-a333-333333333334', '9b3e3de8-3e0d-4c2e-85bc-580a885a5337', 'TOP-SHIRT-006-XL-NAVY', 284000, 'VND', 6, '{"size": "XL", "color": "navy blue"}'::jsonb);

-- Images for Product #3
INSERT INTO supplier_product_images (id, product_id, url, alt_text, sort_order, is_primary, width, height, created_at, updated_at) VALUES
('f1e2d3c4-3333-4333-b333-333333333331', '9b3e3de8-3e0d-4c2e-85bc-580a885a5337', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/455361/item/vngoods_01_455361.jpg', 'Cotton Shirt - Front View', 0, TRUE, 800, 1000, NOW(), NOW()),
('f1e2d3c4-3333-4333-b333-333333333332', '9b3e3de8-3e0d-4c2e-85bc-580a885a5337', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455361/sub/goods_455361_sub14.jpg', 'Cotton Shirt - Side View', 1, FALSE, 800, 1000, NOW(), NOW());


-- Product #4: Soft Cotton Shirt 02
INSERT INTO supplier_products (
    id, supplier_id, name, description, category_id, status, specifications, 
    tags, rating_avg, rating_count, is_featured, created_at, updated_at
) VALUES (
    '53aaf7fe-a525-45ba-a291-00197093ea30', 
    '750e8400-e29b-41d4-a716-446655440002', 
    'Soft Cotton Shirt 02', 
    'Lightweight twill-woven cotton shirt, quick moisture absorption, button-down collar maintains shape. Suitable for office and casual wear. High-quality material, tested for stretch and colorfastness after multiple washes.', 
    '550e8400-e29b-41d4-a716-446655440003', 
    'active', 
    '{"fit": "regular", "season": "spring/fall", "material": "cotton", "colors": ["black", "grey", "white", "beige", "navy blue"], "sizes": ["S", "M", "L", "XL"]}'::jsonb,
    ARRAY['shirt', 'cotton', 'breathable', 'office']::text[], 
    0, 0, FALSE, 
    '2025-10-13 15:41:12.282244'::timestamp, 
    '2025-12-11 18:28:34.953771'::timestamp
);

-- Variants for Product #4
INSERT INTO supplier_product_variants (id, product_id, sku, supplier_price, currency, inventory_snapshot, attributes) VALUES
('a1b2c3d4-4444-4444-a444-444444444441', '53aaf7fe-a525-45ba-a291-00197093ea30', 'TOP-SHIRT-002-S-BLACK', 268000, 'VND', 8, '{"size": "S", "color": "black"}'::jsonb),
('a1b2c3d4-4444-4444-a444-444444444442', '53aaf7fe-a525-45ba-a291-00197093ea30', 'TOP-SHIRT-002-M-GREY', 268000, 'VND', 10, '{"size": "M", "color": "grey"}'::jsonb),
('a1b2c3d4-4444-4444-a444-444444444443', '53aaf7fe-a525-45ba-a291-00197093ea30', 'TOP-SHIRT-002-L-WHITE', 268000, 'VND', 9, '{"size": "L", "color": "white"}'::jsonb),
('a1b2c3d4-4444-4444-a444-444444444444', '53aaf7fe-a525-45ba-a291-00197093ea30', 'TOP-SHIRT-002-XL-BEIGE', 268000, 'VND', 5, '{"size": "XL", "color": "beige"}'::jsonb);

-- Images for Product #4
INSERT INTO supplier_product_images (id, product_id, url, alt_text, sort_order, is_primary, width, height, created_at, updated_at) VALUES
('f1e2d3c4-4444-4444-b444-444444444441', '53aaf7fe-a525-45ba-a291-00197093ea30', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/455362/item/vngoods_69_455362.jpg', 'Cotton Shirt 02 - Front View', 0, TRUE, 800, 1000, NOW(), NOW()),
('f1e2d3c4-4444-4444-b444-444444444442', '53aaf7fe-a525-45ba-a291-00197093ea30', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455362/sub/goods_455362_sub14.jpg', 'Cotton Shirt 02 - Side View', 1, FALSE, 800, 1000, NOW(), NOW());


-- Product #5: Warm Wool/Duffle Coat 08
INSERT INTO supplier_products (
    id, supplier_id, name, description, category_id, status, specifications, 
    tags, rating_avg, rating_count, is_featured, created_at, updated_at
) VALUES (
    'a6a3b89e-f63c-47f1-a802-3245dde10acd', 
    '750e8400-e29b-41d4-a716-446655440002', 
    'Warm Wool/Duffle Coat 08', 
    'Wool coat with soft lining, excellent heat retention, refined stitching, detachable hood. Suitable for early morning/cold night travel, structured fit flatters figure. High-quality material, tested for stretch and colorfastness after multiple washes.', 
    '550e8400-e29b-41d4-a716-446655440003', 
    'active', 
    '{"fit": "regular", "season": "winter", "material": "cotton/poly/wool", "colors": ["black", "grey", "white", "beige", "navy blue"], "sizes": ["S", "M", "L", "XL"]}'::jsonb,
    ARRAY['coat', 'winter', 'warm', 'wool']::text[], 
    0, 0, TRUE, 
    '2025-10-13 15:41:12.282244'::timestamp, 
    '2025-12-11 18:50:01.108842'::timestamp
);

-- Variants for Product #5
INSERT INTO supplier_product_variants (id, product_id, sku, supplier_price, currency, inventory_snapshot, attributes) VALUES
('a1b2c3d4-5555-4555-a555-555555555551', 'a6a3b89e-f63c-47f1-a802-3245dde10acd', 'TOP-COAT-008-S-BLACK', 292000, 'VND', 11, '{"size": "S", "color": "black"}'::jsonb),
('a1b2c3d4-5555-4555-a555-555555555552', 'a6a3b89e-f63c-47f1-a802-3245dde10acd', 'TOP-COAT-008-M-GREY', 292000, 'VND', 10, '{"size": "M", "color": "grey"}'::jsonb),
('a1b2c3d4-5555-4555-a555-555555555553', 'a6a3b89e-f63c-47f1-a802-3245dde10acd', 'TOP-COAT-008-L-BEIGE', 292000, 'VND', 12, '{"size": "L", "color": "beige"}'::jsonb),
('a1b2c3d4-5555-4555-a555-555555555554', 'a6a3b89e-f63c-47f1-a802-3245dde10acd', 'TOP-COAT-008-XL-NAVY', 292000, 'VND', 5, '{"size": "XL", "color": "navy blue"}'::jsonb);

-- Images for Product #5
INSERT INTO supplier_product_images (id, product_id, url, alt_text, sort_order, is_primary, width, height, created_at, updated_at) VALUES
('f1e2d3c4-5555-4555-b555-555555555551', 'a6a3b89e-f63c-47f1-a802-3245dde10acd', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/455363/item/vngoods_09_455363.jpg', 'Wool Coat 08 - Front View', 0, TRUE, 800, 1000, NOW(), NOW()),
('f1e2d3c4-5555-4555-b555-555555555552', 'a6a3b89e-f63c-47f1-a802-3245dde10acd', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455363/sub/goods_455363_sub14.jpg', 'Wool Coat 08 - Side View', 1, FALSE, 800, 1000, NOW(), NOW());


-- Product #6: Soft turtleneck sweater 13
INSERT INTO supplier_products (
    id, supplier_id, name, description, category_id, status, specifications, 
    tags, rating_avg, rating_count, is_featured, created_at, updated_at
) VALUES (
    'd7047958-a83a-4f59-b3b4-d18a8c76bd91', 
    '750e8400-e29b-41d4-a716-446655440002', 
    'Soft turtleneck sweater 13', 
    'Stretchable cotton blend turtleneck sweater. Keeps your neck and chest warm. Smooth surface with minimal pilling. Easy to pair with blazers/jackets. High-quality material, tested for stretch and colorfastness after multiple washes.', 
    '550e8400-e29b-41d4-a716-446655440003', 
    'active', 
    '{"fit": "regular", "season": "winter", "material": "cotton blend", "colors": ["black", "grey", "white", "beige", "navy blue"], "sizes": ["S", "M", "L", "XL"]}'::jsonb,
    ARRAY['sweater', 'winter', 'warm', 'turtleneck']::text[], 
    0, 0, TRUE, 
    '2025-10-13 15:41:12.282244'::timestamp, 
    '2025-12-11 18:53:12.600346'::timestamp
);

-- Variants for Product #6
INSERT INTO supplier_product_variants (id, product_id, sku, supplier_price, currency, inventory_snapshot, attributes) VALUES
('a1b2c3d4-6666-4666-a666-666666666661', 'd7047958-a83a-4f59-b3b4-d18a8c76bd91', 'TOP-SWEA-013-S-BLACK', 312000, 'VND', 12, '{"size": "S", "color": "black"}'::jsonb),
('a1b2c3d4-6666-4666-a666-666666666662', 'd7047958-a83a-4f59-b3b4-d18a8c76bd91', 'TOP-SWEA-013-M-GREY', 312000, 'VND', 14, '{"size": "M", "color": "grey"}'::jsonb),
('a1b2c3d4-6666-4666-a666-666666666663', 'd7047958-a83a-4f59-b3b4-d18a8c76bd91', 'TOP-SWEA-013-L-WHITE', 312000, 'VND', 10, '{"size": "L", "color": "white"}'::jsonb),
('a1b2c3d4-6666-4666-a666-666666666664', 'd7047958-a83a-4f59-b3b4-d18a8c76bd91', 'TOP-SWEA-013-XL-NAVY', 312000, 'VND', 7, '{"size": "XL", "color": "navy blue"}'::jsonb);

-- Images for Product #6
INSERT INTO supplier_product_images (id, product_id, url, alt_text, sort_order, is_primary, width, height, created_at, updated_at) VALUES
('f1e2d3c4-6666-4666-b666-666666666661', 'd7047958-a83a-4f59-b3b4-d18a8c76bd91', 'https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/455364/item/vngoods_09_455364.jpg', 'Turtleneck Sweater - Front View', 0, TRUE, 800, 1000, NOW(), NOW()),
('f1e2d3c4-6666-4666-b666-666666666662', 'd7047958-a83a-4f59-b3b4-d18a8c76bd91', 'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455364/sub/goods_455364_sub14.jpg', 'Turtleneck Sweater - Side View', 1, FALSE, 800, 1000, NOW(), NOW());

-- ================================================
-- SUMMARY
-- ================================================
-- Total Products: 6
-- Total Variants: 24 (4 per product)
-- Total Images: 12 (2 per product)
-- ================================================
