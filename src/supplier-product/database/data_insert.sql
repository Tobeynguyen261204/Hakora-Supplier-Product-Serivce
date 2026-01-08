-- ================================================
-- SQL INSERT STATEMENTS FOR SUPPLIER PRODUCTS
-- Generated from CSV exports
-- Generated on: 2025-12-12 00:19:53
-- ================================================

-- Tables: supplier_products, product_images
-- Database: PostgreSQL
-- Compatible with: TypeORM entities
-- ================================================


-- ================================================
-- SUPPLIER PRODUCTS
-- ================================================

-- Product #1
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'b0f1be1e-e665-45de-a347-6107d3b89c8a', '750e8400-e29b-41d4-a716-446655440002', 'Warm Wool/Duffle Coat 04', 'Wool coat with soft lining, excellent heat retention, refined stitching, detachable hood. Suitable for early morning/cold night travel, structured fit flatters figure. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Warm coat with structured fit', 'TOP-COAT-004', 'Tops',
    '{"currency": "VND", "retailPrice": 336000, "listingPrice": 276000}'::jsonb, '{"quantity": 34}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.60, '{"unit": "cm", "width": 50, "height": 3, "length": 67}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 04", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:49:31.084431'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #2
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '94d3b6dc-beaf-4fed-b320-020d1551b561', '750e8400-e29b-41d4-a716-446655440002', 'Warm Brushed Fleece Hoodie 03', 'Brushed fleece hoodie with soft inner surface, warm and soft, drawstring hood, cuffed sleeves/hem retains heat. Suitable for strolling and travel. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Warm and comfortable hoodie', 'TOP-HOOD-003', 'Tops',
    '{"currency": "VND", "retailPrice": 332000, "listingPrice": 272000}'::jsonb, '{"quantity": 33}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.55, '{"unit": "cm", "width": 52, "height": 3, "length": 65}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 03", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:54:03.464614'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #3
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '9b3e3de8-3e0d-4c2e-85bc-580a885a5337', '750e8400-e29b-41d4-a716-446655440002', 'Soft Cotton Shirt 06', 'Lightweight twill-woven cotton shirt, quick moisture absorption, button-down collar maintains shape. Suitable for office and casual wear. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Breathable cotton shirt', 'TOP-SHIRT-006', 'Tops',
    '{"currency": "VND", "retailPrice": 344000, "listingPrice": 284000}'::jsonb, '{"quantity": 36}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "spring/fall", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.40, '{"unit": "cm", "width": 50, "height": 3, "length": 65}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 06", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:55:45.828736'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #4
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '53aaf7fe-a525-45ba-a291-00197093ea30', '750e8400-e29b-41d4-a716-446655440002', 'Soft Cotton Shirt 02', 'Lightweight twill-woven cotton shirt, quick moisture absorption, button-down collar maintains shape. Suitable for office and casual wear. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Breathable cotton shirt', 'TOP-SHIRT-002', 'Tops',
    '{"currency": "VND", "retailPrice": 328000, "listingPrice": 268000}'::jsonb, '{"quantity": 32}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "spring/fall", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.50, '{"unit": "cm", "width": 50, "height": 3, "length": 69}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 02", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:28:34.953771'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #5
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'a6a3b89e-f63c-47f1-a802-3245dde10acd', '750e8400-e29b-41d4-a716-446655440002', 'Warm Wool/Duffle Coat 08', 'Wool coat with soft lining, excellent heat retention, refined stitching, detachable hood. Suitable for early morning/cold night travel, structured fit flatters figure. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Warm coat with structured fit', 'TOP-COAT-008', 'Tops',
    '{"currency": "VND", "retailPrice": 352000, "listingPrice": 292000}'::jsonb, '{"quantity": 38}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.50, '{"unit": "cm", "width": 50, "height": 3, "length": 69}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 08", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:50:01.108842'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #6
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'd7047958-a83a-4f59-b3b4-d18a8c76bd91', '750e8400-e29b-41d4-a716-446655440002', 'Soft turtleneck sweater 13', 'Stretchable cotton blend turtleneck sweater. Keeps your neck and chest warm. Smooth surface with minimal pilling. Easy to pair with blazers/jackets. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Soft turtleneck sweater', 'TOP-SWEA-013', 'Tops',
    '{"currency": "VND", "retailPrice": 372000, "listingPrice": 312000}'::jsonb, '{"quantity": 43}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.45, '{"unit": "cm", "width": 52, "height": 3, "length": 67}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 13", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:53:12.600346'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #7
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '4911c3e8-8e23-4f7c-a982-aa1b30290a24', '750e8400-e29b-41d4-a716-446655440002', 'Soft Cotton Shirt 10', 'Lightweight twill-woven cotton shirt, quick moisture absorption, button-down collar maintains shape. Suitable for office and casual wear. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Breathable cotton shirt', 'TOP-SHIRT-010', 'Tops',
    '{"currency": "VND", "retailPrice": 360000, "listingPrice": 300000}'::jsonb, '{"quantity": 40}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "spring/fall", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, TRUE, FALSE, 0.60, '{"unit": "cm", "width": 50, "height": 3, "length": 67}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 10", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:26:48.676531'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #8
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '68a92755-78ed-4a49-823f-2e96cfef1238', '750e8400-e29b-41d4-a716-446655440002', 'Warm Brushed Fleece Hoodie 11', 'Brushed fleece hoodie with soft inner surface, warm and soft, drawstring hood, cuffed sleeves/hem retains heat. Suitable for strolling and travel. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Warm and comfortable hoodie', 'TOP-HOOD-011', 'Tops',
    '{"currency": "VND", "retailPrice": 364000, "listingPrice": 304000}'::jsonb, '{"quantity": 41}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.65, '{"unit": "cm", "width": 52, "height": 3, "length": 69}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 11", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:29:03.568248'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #9
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'b5740e68-0642-4440-911e-bf68c5c67345', '750e8400-e29b-41d4-a716-446655440002', 'Warm Wool/Duffle Coat 16', 'Wool coat with soft lining, excellent heat retention, refined stitching, detachable hood. Suitable for early morning/cold night travel, structured fit flatters figure. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Warm coat with structured fit', 'TOP-COAT-016', 'Tops',
    '{"currency": "VND", "retailPrice": 384000, "listingPrice": 324000}'::jsonb, '{"quantity": 46}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.60, '{"unit": "cm", "width": 50, "height": 3, "length": 67}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 16", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:49:46.037288'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #10
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'ef709680-8301-49f5-bda5-030d45f198c3', '750e8400-e29b-41d4-a716-446655440002', 'Soft Cotton Shirt 18', 'Lightweight twill-woven cotton shirt, quick moisture absorption, button-down collar maintains shape. Suitable for office and casual wear. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Breathable cotton shirt', 'TOP-SHIRT-018', 'Tops',
    '{"currency": "VND", "retailPrice": 392000, "listingPrice": 332000}'::jsonb, '{"quantity": 48}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "spring/fall", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.40, '{"unit": "cm", "width": 50, "height": 3, "length": 65}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 18", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:55:19.44893'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #11
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '1f10ce21-ba98-45f5-b911-1420491639d8', '750e8400-e29b-41d4-a716-446655440002', 'Thick Cotton Chino Pants 01', 'Medium-weight cotton chino pants, smooth surface, stable crease, convenient diagonal pockets. Pairs well with shirts/t-shirts. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Structured chino pants', 'PANT-CHINO-001', 'Pants',
    '{"currency": "VND", "retailPrice": 293000, "listingPrice": 243000}'::jsonb, '{"quantity": 26}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "medium"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.66, '{"unit": "cm", "width": 37, "height": 2, "length": 98}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 01", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:21:46.151695'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #12
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '85421517-5bf0-485f-8d8f-ca1972b88b8e', '750e8400-e29b-41d4-a716-446655440002', 'Warm Brushed Fleece Hoodie 15', 'Brushed fleece hoodie with soft inner surface, warm and soft, drawstring hood, cuffed sleeves/hem retains heat. Suitable for strolling and travel. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Warm and comfortable hoodie', 'TOP-HOOD-015', 'Tops',
    '{"currency": "VND", "retailPrice": 380000, "listingPrice": 320000}'::jsonb, '{"quantity": 45}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, TRUE, FALSE, 0.55, '{"unit": "cm", "width": 52, "height": 3, "length": 65}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 15", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:35:48.354949'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #13
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '3653eda5-d489-4ce5-b036-87d5478afb1a', '750e8400-e29b-41d4-a716-446655440002', 'Stretch Jogger Pants 06', 'Elastic-cuffed jogger pants, stretchable cotton blend fabric, lightweight and breathable. Strong drawstring, suitable for active movement and frequent travel. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Comfortable jogger pants', 'PANT-JOGG-006', 'Pants',
    '{"currency": "VND", "retailPrice": 308000, "listingPrice": 258000}'::jsonb, '{"quantity": 31}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "medium"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.66, '{"unit": "cm", "width": 35, "height": 2, "length": 95}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 06", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:25:26.39569'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #14
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '4ff6d9e2-0ecd-4f9f-ac98-cf4eef3c14e4', '750e8400-e29b-41d4-a716-446655440002', 'Stretch Jogger Pants 02', 'Elastic-cuffed jogger pants, stretchable cotton blend fabric, lightweight and breathable. Strong drawstring, suitable for active movement and frequent travel. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Comfortable jogger pants', 'PANT-JOGG-002', 'Pants',
    '{"currency": "VND", "retailPrice": 296000, "listingPrice": 246000}'::jsonb, '{"quantity": 27}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "medium"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.72, '{"unit": "cm", "width": 35, "height": 2, "length": 101}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 02", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:27:11.857385'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #15
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '7efa9e83-e566-463b-a40c-ac830e1c29f4', '750e8400-e29b-41d4-a716-446655440002', 'Thick Cotton Chino Pants 05', 'Medium-weight cotton chino pants, smooth surface, stable crease, convenient diagonal pockets. Pairs well with shirts/t-shirts. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Structured chino pants', 'PANT-CHINO-005', 'Pants',
    '{"currency": "VND", "retailPrice": 305000, "listingPrice": 255000}'::jsonb, '{"quantity": 30}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "medium"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.60, '{"unit": "cm", "width": 37, "height": 2, "length": 101}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 05", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:36:43.690018'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #16
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'b523867c-00ea-4499-a497-1ea8e81af08e', '750e8400-e29b-41d4-a716-446655440002', 'Durable Denim Jeans 04', 'Medium-weight denim jeans, slight stretch, slim-straight fit, colorfast after multiple washes. Standard length, suitable for work and casual wear. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Durable jeans with great fit', 'PANT-JEANS-004', 'Pants',
    '{"currency": "VND", "retailPrice": 302000, "listingPrice": 252000}'::jsonb, '{"quantity": 29}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "thick"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, TRUE, FALSE, 0.84, '{"unit": "cm", "width": 35, "height": 2, "length": 98}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 04", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:44:22.563731'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #17
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'f590881a-08ae-448f-8e09-536840e690a7', '750e8400-e29b-41d4-a716-446655440002', 'Durable Denim Jeans 08', 'Medium-weight denim jeans, slight stretch, slim-straight fit, colorfast after multiple washes. Standard length, suitable for work and casual wear. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Durable jeans with great fit', 'PANT-JEANS-008', 'Pants',
    '{"currency": "VND", "retailPrice": 314000, "listingPrice": 264000}'::jsonb, '{"quantity": 33}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "thick"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, TRUE, FALSE, 0.78, '{"unit": "cm", "width": 35, "height": 2, "length": 101}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 08", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:44:44.664101'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #18
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'db4d6a17-a200-450e-9b1c-8b2014759743', '750e8400-e29b-41d4-a716-446655440002', 'Breathable Shorts 03', 'Lightweight cotton/denim shorts, cool and breathable for summer, clean sharp stitching. Easy to pair with t-shirts or linen shirts. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Lightweight breathable shorts', 'PANT-SHORT-003', 'Pants',
    '{"currency": "VND", "retailPrice": 299000, "listingPrice": 249000}'::jsonb, '{"quantity": 28}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "thin"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.78, '{"unit": "cm", "width": 37, "height": 2, "length": 95}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 03", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:45:22.739881'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #19
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'df5947f9-1b5e-4eeb-8d8b-0a37cde8b168', '750e8400-e29b-41d4-a716-446655440002', 'ProRun Air Cushion Running Shoes 16', 'Running shoes with multi-layer air cushion and responsive EVA midsole. Technical mesh upper is breathable and dries quickly during long runs. Stable TPU heel, flat laces prevent slipping. Suitable for daily training and 5K/10K races. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Comfortable and breathable running shoes', 'SHOES-RUN-016', 'Shoes',
    '{"currency": "VND", "retailPrice": 880000, "listingPrice": 780000}'::jsonb, '{"quantity": 36}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "8mm", "upper": "mesh", "midsole": "EVA + air cushion", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.65, '{"unit": "cm", "width": 19, "height": 11, "length": 31}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 16", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:52:05.85665'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #20
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '481fdbe7-269a-4c10-a1bc-0e6ce8728815', '750e8400-e29b-41d4-a716-446655440002', 'Thick Cotton Chino Pants 09', 'Medium-weight cotton chino pants, smooth surface, stable crease, convenient diagonal pockets. Pairs well with shirts/t-shirts. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Structured chino pants', 'PANT-CHINO-009', 'Pants',
    '{"currency": "VND", "retailPrice": 317000, "listingPrice": 267000}'::jsonb, '{"quantity": 34}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "medium"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.84, '{"unit": "cm", "width": 37, "height": 2, "length": 95}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 09", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:26:35.336242'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #21
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '58970088-bd48-4fa9-bf4e-757c2baaac0a', '750e8400-e29b-41d4-a716-446655440002', 'Breathable Shorts 15', 'Lightweight cotton/denim shorts, cool and breathable for summer, clean sharp stitching. Easy to pair with t-shirts or linen shirts. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Lightweight breathable shorts', 'PANT-SHORT-015', 'Pants',
    '{"currency": "VND", "retailPrice": 335000, "listingPrice": 285000}'::jsonb, '{"quantity": 40}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "thin"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.60, '{"unit": "cm", "width": 37, "height": 2, "length": 95}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 15", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:27:58.510706'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #22
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'affd2d58-6107-48af-8aaf-671fec6e65a5', '750e8400-e29b-41d4-a716-446655440002', 'Durable Denim Jeans 12', 'Medium-weight denim jeans, slight stretch, slim-straight fit, colorfast after multiple washes. Standard length, suitable for work and casual wear. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Durable jeans with great fit', 'PANT-JEANS-012', 'Pants',
    '{"currency": "VND", "retailPrice": 326000, "listingPrice": 276000}'::jsonb, '{"quantity": 37}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "thick"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, TRUE, FALSE, 0.72, '{"unit": "cm", "width": 35, "height": 2, "length": 95}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 12", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:37:37.677364'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #23
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '952c6d74-922a-4604-bd57-e4dd800ec63f', '750e8400-e29b-41d4-a716-446655440002', 'Thick Cotton Chino Pants 13', 'Medium-weight cotton chino pants, smooth surface, stable crease, convenient diagonal pockets. Pairs well with shirts/t-shirts. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Structured chino pants', 'PANT-CHINO-013', 'Pants',
    '{"currency": "VND", "retailPrice": 329000, "listingPrice": 279000}'::jsonb, '{"quantity": 38}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "medium"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.78, '{"unit": "cm", "width": 37, "height": 2, "length": 98}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 13", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:40:14.59021'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #24
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'a8562229-71c1-45c2-87d6-b15dfbd3acce', '750e8400-e29b-41d4-a716-446655440002', 'Breathable Shorts 11', 'Lightweight cotton/denim shorts, cool and breathable for summer, clean sharp stitching. Easy to pair with t-shirts or linen shirts. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Lightweight breathable shorts', 'PANT-SHORT-011', 'Pants',
    '{"currency": "VND", "retailPrice": 323000, "listingPrice": 273000}'::jsonb, '{"quantity": 36}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "thin"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.66, '{"unit": "cm", "width": 37, "height": 2, "length": 101}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 11", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:45:05.121237'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #25
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '08a9b005-0081-4513-9981-fa2df96ae3c4', '750e8400-e29b-41d4-a716-446655440002', 'Durable Denim Jeans 20', 'Medium-weight denim jeans, slight stretch, slim-straight fit, colorfast after multiple washes. Standard length, suitable for work and casual wear. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Durable jeans with great fit', 'PANT-JEANS-020', 'Pants',
    '{"currency": "VND", "retailPrice": 350000, "listingPrice": 300000}'::jsonb, '{"quantity": 45}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "thick"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, TRUE, FALSE, 0.60, '{"unit": "cm", "width": 35, "height": 2, "length": 101}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 20", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:21:54.243804'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #26
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '0ad215bc-0c04-4698-ba23-bc8f27bb6ec6', '750e8400-e29b-41d4-a716-446655440002', 'Waterproof TrailGuard Hiking Boots 19', 'Mid-cut hiking boots, breathable waterproof membrane, rubber toe cap prevents stone impact. Deep tread grips well on wet terrain, gravel, weekend trekking. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Waterproof hiking boots with good grip', 'SHOES-HIKE-019', 'Shoes',
    '{"currency": "VND", "retailPrice": 895000, "listingPrice": 795000}'::jsonb, '{"quantity": 39}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "synthetic + textile", "midsole": "EVA", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.80, '{"unit": "cm", "width": 20, "height": 12, "length": 31}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 19", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:22:03.395472'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #27
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '1f918b65-3858-4db9-907f-a9b40dcbda27', '750e8400-e29b-41d4-a716-446655440002', 'Stretch Jogger Pants 18', 'Elastic-cuffed jogger pants, stretchable cotton blend fabric, lightweight and breathable. Strong drawstring, suitable for active movement and frequent travel. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Comfortable jogger pants', 'PANT-JOGG-018', 'Pants',
    '{"currency": "VND", "retailPrice": 344000, "listingPrice": 294000}'::jsonb, '{"quantity": 43}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "medium"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.78, '{"unit": "cm", "width": 35, "height": 2, "length": 95}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 18", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:22:14.937058'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #28
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '33a47a28-9dbe-452e-931f-419a3c92d86f', '750e8400-e29b-41d4-a716-446655440002', 'Durable Denim Jeans 16', 'Medium-weight denim jeans, slight stretch, slim-straight fit, colorfast after multiple washes. Standard length, suitable for work and casual wear. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Durable jeans with great fit', 'PANT-JEANS-016', 'Pants',
    '{"currency": "VND", "retailPrice": 338000, "listingPrice": 288000}'::jsonb, '{"quantity": 41}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "thick"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, TRUE, FALSE, 0.66, '{"unit": "cm", "width": 35, "height": 2, "length": 98}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 16", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:22:26.875343'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #29
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '8092d1d7-277d-4cd8-9d52-8300b8213dac', '750e8400-e29b-41d4-a716-446655440002', 'Breathable Shorts 19', 'Lightweight cotton/denim shorts, cool and breathable for summer, clean sharp stitching. Easy to pair with t-shirts or linen shirts. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Lightweight breathable shorts', 'PANT-SHORT-019', 'Pants',
    '{"currency": "VND", "retailPrice": 347000, "listingPrice": 297000}'::jsonb, '{"quantity": 44}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "thin"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.84, '{"unit": "cm", "width": 37, "height": 2, "length": 98}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 19", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:36:11.98973'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #30
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'c38b1cd6-daa0-40e7-a157-dddaf03b8c15', '750e8400-e29b-41d4-a716-446655440002', 'Thick Cotton Chino Pants 17', 'Medium-weight cotton chino pants, smooth surface, stable crease, convenient diagonal pockets. Pairs well with shirts/t-shirts. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Structured chino pants', 'PANT-CHINO-017', 'Pants',
    '{"currency": "VND", "retailPrice": 341000, "listingPrice": 291000}'::jsonb, '{"quantity": 42}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "medium"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.72, '{"unit": "cm", "width": 37, "height": 2, "length": 101}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 17", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:40:42.664266'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #31
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'ed912807-c8dd-4fc6-8bd6-3ce08e8e036e', '750e8400-e29b-41d4-a716-446655440002', 'Soft turtleneck sweater 05', 'Stretchable cotton blend turtleneck sweater. Keeps your neck and chest warm. Smooth surface with minimal pilling. Easy to pair with blazers/jackets. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Soft turtleneck sweater', 'TOP-SWEA-005', 'Tops',
    '{"currency": "VND", "retailPrice": 340000, "listingPrice": 280000}'::jsonb, '{"quantity": 35}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, TRUE, FALSE, 0.65, '{"unit": "cm", "width": 52, "height": 3, "length": 69}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 05", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:52:42.424377'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #32
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'baea05ae-2ad6-4e69-9af5-b9da06eca3f9', '750e8400-e29b-41d4-a716-446655440002', 'Soft turtleneck sweater 09', 'Stretchable cotton blend turtleneck sweater. Keeps your neck and chest warm. Smooth surface with minimal pilling. Easy to pair with blazers/jackets. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Soft turtleneck sweater', 'TOP-SWEA-009', 'Tops',
    '{"currency": "VND", "retailPrice": 356000, "listingPrice": 296000}'::jsonb, '{"quantity": 39}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.55, '{"unit": "cm", "width": 52, "height": 3, "length": 65}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 09", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:52:58.618868'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #33
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '224d1eb8-cb07-4b9f-8ab4-5f7daa4bc895', '750e8400-e29b-41d4-a716-446655440002', 'Classic Fit Cap 12', 'Curved brim cap provides good sun protection, thick twill fabric resists wrinkles, absorbs sweat. Metal snap closure at back is easy to adjust, subtle embroidered logo, suitable for light running and daily wear. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Curved brim cap with embroidered logo', 'HAT-CAP-012', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 204000, "listingPrice": 164000}'::jsonb, '{"quantity": 52}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, TRUE, FALSE, 0.12, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 12", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:20:25.477338'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #34
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '192d1df8-3dd1-40ab-929e-da11f2f97119', '750e8400-e29b-41d4-a716-446655440002', 'Classic Felt Fedora Hat 03', 'Soft felt fedora hat, medium brim maintains shape, elegant satin ribbon band. Sweatband absorbs moisture, comfortable to wear, suitable for strolling and events. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Elegant felt fedora hat', 'HAT-FEDO-003', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 186000, "listingPrice": 146000}'::jsonb, '{"quantity": 43}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.18, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 03", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:21:37.324112'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #35
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '2b003739-b4fa-4c1f-8098-fc9ac0a70383', '750e8400-e29b-41d4-a716-446655440002', 'Classic Street Sneakers 17', 'Minimalist style sneakers, PU leather upper is easy to clean, memory foam insole is comfortable, vulcanized rubber sole grips well. Easy to pair with jeans, chinos, or shorts for work or casual wear. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Minimalist sneakers, easy to match', 'SHOES-LIFE-017', 'Shoes',
    '{"currency": "VND", "retailPrice": 885000, "listingPrice": 785000}'::jsonb, '{"quantity": 37}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "PU leather", "midsole": "memory foam", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.70, '{"unit": "cm", "width": 20, "height": 12, "length": 32}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 17", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:39:35.779029'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #36
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'edbd7748-fa17-4f18-a0c8-a5cd669aa943', '750e8400-e29b-41d4-a716-446655440002', 'Warm Brushed Fleece Hoodie 19', 'Brushed fleece hoodie with soft inner surface, warm and soft, drawstring hood, cuffed sleeves/hem retains heat. Suitable for strolling and travel. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Warm and comfortable hoodie', 'TOP-HOOD-019', 'Tops',
    '{"currency": "VND", "retailPrice": 396000, "listingPrice": 336000}'::jsonb, '{"quantity": 49}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.45, '{"unit": "cm", "width": 52, "height": 3, "length": 67}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 19", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:53:50.662072'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #37
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'edc79e5d-5cc8-4bda-81c2-ef2100061e07', '750e8400-e29b-41d4-a716-446655440002', 'Stretch Jogger Pants 10', 'Elastic-cuffed jogger pants, stretchable cotton blend fabric, lightweight and breathable. Strong drawstring, suitable for active movement and frequent travel. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Comfortable jogger pants', 'PANT-JOGG-010', 'Pants',
    '{"currency": "VND", "retailPrice": 320000, "listingPrice": 270000}'::jsonb, '{"quantity": 35}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "medium"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.60, '{"unit": "cm", "width": 35, "height": 2, "length": 98}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 10", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:54:25.129484'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #38
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '30c59324-e03e-4fd6-a873-0f2fa4bf3895', '750e8400-e29b-41d4-a716-446655440002', 'Formal Oxford Leather Shoes 10', 'Oxford cap-toe formal shoes, fine grain PU leather, elegant structured form. Breathable microfiber lining, anti-slip synthetic rubber sole, suitable for office and events. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Elegant formal shoes', 'SHOES-OXF-010', 'Shoes',
    '{"currency": "VND", "retailPrice": 850000, "listingPrice": 750000}'::jsonb, '{"quantity": 30}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "fine grain PU leather", "midsole": "foam", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.60, '{"unit": "cm", "width": 19, "height": 11, "length": 31}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 10", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:22:57.357695'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #39
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '3c886c1b-b4e5-4847-8910-8321ca6eb7a5', '750e8400-e29b-41d4-a716-446655440002', 'Classic Fit Cap 08', 'Curved brim cap provides good sun protection, thick twill fabric resists wrinkles, absorbs sweat. Metal snap closure at back is easy to adjust, subtle embroidered logo, suitable for light running and daily wear. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Curved brim cap with embroidered logo', 'HAT-CAP-008', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 196000, "listingPrice": 156000}'::jsonb, '{"quantity": 48}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.12, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 08", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:24:20.049352'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #40
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '38481bc9-a938-417d-887e-8ec193612b35', '750e8400-e29b-41d4-a716-446655440002', 'Daily Bucket Hat 05', 'Soft canvas bucket hat, ventilation holes around, folds compactly for easy carrying. Medium wide brim, strong stitching maintains shape, minimalist style easy to match. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Foldable canvas bucket hat', 'HAT-BUCK-005', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 190000, "listingPrice": 150000}'::jsonb, '{"quantity": 45}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.14, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 05", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:25:06.864078'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #41
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '492ba088-1919-4552-a286-777a4aa9254b', '750e8400-e29b-41d4-a716-446655440002', 'Classic Street Sneakers 05', 'Minimalist style sneakers, PU leather upper is easy to clean, memory foam insole is comfortable, vulcanized rubber sole grips well. Easy to pair with jeans, chinos, or shorts for work or casual wear. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Minimalist sneakers, easy to match', 'SHOES-LIFE-005', 'Shoes',
    '{"currency": "VND", "retailPrice": 825000, "listingPrice": 725000}'::jsonb, '{"quantity": 25}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "PU leather", "midsole": "memory foam", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.60, '{"unit": "cm", "width": 20, "height": 12, "length": 32}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 05", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:25:59.072769'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #42
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '4a994197-94fa-4e72-84d0-d0df1691c7e8', '750e8400-e29b-41d4-a716-446655440002', 'Daily Bucket Hat 13', 'Soft canvas bucket hat, ventilation holes around, folds compactly for easy carrying. Medium wide brim, strong stitching maintains shape, minimalist style easy to match. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Foldable canvas bucket hat', 'HAT-BUCK-013', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 206000, "listingPrice": 166000}'::jsonb, '{"quantity": 53}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.14, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 13", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:26:58.640487'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #43
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '73ad67e2-bcf3-46d0-9f51-a453998707ff', '750e8400-e29b-41d4-a716-446655440002', 'Daily Bucket Hat 09', 'Soft canvas bucket hat, ventilation holes around, folds compactly for easy carrying. Medium wide brim, strong stitching maintains shape, minimalist style easy to match. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Foldable canvas bucket hat', 'HAT-BUCK-009', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 198000, "listingPrice": 158000}'::jsonb, '{"quantity": 49}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.14, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 09", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:27:42.186549'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #44
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '778e92db-9253-4645-a89e-5996c8e6b92b', '750e8400-e29b-41d4-a716-446655440002', 'ProRun Air Cushion Running Shoes 04', 'Running shoes with multi-layer air cushion and responsive EVA midsole. Technical mesh upper is breathable and dries quickly during long runs. Stable TPU heel, flat laces prevent slipping. Suitable for daily training and 5K/10K races. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Comfortable and breathable running shoes', 'SHOES-RUN-004', 'Shoes',
    '{"currency": "VND", "retailPrice": 820000, "listingPrice": 720000}'::jsonb, '{"quantity": 24}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "8mm", "upper": "mesh", "midsole": "EVA + air cushion", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.80, '{"unit": "cm", "width": 19, "height": 11, "length": 31}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 04", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:29:14.592619'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #45
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '7bc80e1a-69c0-4dd1-9937-d4d93fa8d7f2', '750e8400-e29b-41d4-a716-446655440002', 'ProRun Air Cushion Running Shoes 12', 'Running shoes with multi-layer air cushion and responsive EVA midsole. Technical mesh upper is breathable and dries quickly during long runs. Stable TPU heel, flat laces prevent slipping. Suitable for daily training and 5K/10K races. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Comfortable and breathable running shoes', 'SHOES-RUN-012', 'Shoes',
    '{"currency": "VND", "retailPrice": 860000, "listingPrice": 760000}'::jsonb, '{"quantity": 32}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "8mm", "upper": "mesh", "midsole": "EVA + air cushion", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.70, '{"unit": "cm", "width": 19, "height": 11, "length": 30}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 12", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:29:23.331863'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #46
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '824a630a-f2ba-4736-ac09-d159235a4c26', '750e8400-e29b-41d4-a716-446655440002', 'Formal Oxford Leather Shoes 06', 'Oxford cap-toe formal shoes, fine grain PU leather, elegant structured form. Breathable microfiber lining, anti-slip synthetic rubber sole, suitable for office and events. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Elegant formal shoes', 'SHOES-OXF-006', 'Shoes',
    '{"currency": "VND", "retailPrice": 830000, "listingPrice": 730000}'::jsonb, '{"quantity": 26}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "fine grain PU leather", "midsole": "foam", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.65, '{"unit": "cm", "width": 19, "height": 11, "length": 30}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 06", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:36:22.536482'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #47
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '8081d60c-db68-47bd-a4c2-02ec5fdd40a0', '750e8400-e29b-41d4-a716-446655440002', 'Classic Fit Cap 20', 'Curved brim cap provides good sun protection, thick twill fabric resists wrinkles, absorbs sweat. Metal snap closure at back is easy to adjust, subtle embroidered logo, suitable for light running and daily wear. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Curved brim cap with embroidered logo', 'HAT-CAP-020', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 220000, "listingPrice": 180000}'::jsonb, '{"quantity": 60}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.12, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 20", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:36:30.626549'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #48
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '8fa7353b-c134-4efd-8489-371cacf8ed53', '750e8400-e29b-41d4-a716-446655440002', 'Waterproof TrailGuard Hiking Boots 03', 'Mid-cut hiking boots, breathable waterproof membrane, rubber toe cap prevents stone impact. Deep tread grips well on wet terrain, gravel, weekend trekking. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Waterproof hiking boots with good grip', 'SHOES-HIKE-003', 'Shoes',
    '{"currency": "VND", "retailPrice": 815000, "listingPrice": 715000}'::jsonb, '{"quantity": 23}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "synthetic + textile", "midsole": "EVA", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.75, '{"unit": "cm", "width": 20, "height": 12, "length": 30}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 03", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:48:23.225471'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #49
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '88c509c3-3508-4932-b6c9-cddbf722951f', '750e8400-e29b-41d4-a716-446655440002', 'Classic Street Sneakers 01', 'Minimalist style sneakers, PU leather upper is easy to clean, memory foam insole is comfortable, vulcanized rubber sole grips well. Easy to pair with jeans, chinos, or shorts for work or casual wear. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Minimalist sneakers, easy to match', 'SHOES-LIFE-001', 'Shoes',
    '{"currency": "VND", "retailPrice": 805000, "listingPrice": 705000}'::jsonb, '{"quantity": 21}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "PU leather", "midsole": "memory foam", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.65, '{"unit": "cm", "width": 20, "height": 12, "length": 31}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 01", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:35:58.778692'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #50
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'ac816399-34ab-4bdf-a622-8814018762b7', '750e8400-e29b-41d4-a716-446655440002', 'Classic Felt Fedora Hat 11', 'Soft felt fedora hat, medium brim maintains shape, elegant satin ribbon band. Sweatband absorbs moisture, comfortable to wear, suitable for strolling and events. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Elegant felt fedora hat', 'HAT-FEDO-011', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 202000, "listingPrice": 162000}'::jsonb, '{"quantity": 51}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.18, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 11", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:46:28.613757'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #51
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '8c5e739d-b584-45bf-abaf-1ff4c3e31b16', '750e8400-e29b-41d4-a716-446655440002', 'Classic Felt Fedora Hat 19', 'Soft felt fedora hat, medium brim maintains shape, elegant satin ribbon band. Sweatband absorbs moisture, comfortable to wear, suitable for strolling and events. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Elegant felt fedora hat', 'HAT-FEDO-019', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 218000, "listingPrice": 178000}'::jsonb, '{"quantity": 59}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.18, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 19", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:47:00.934192'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #52
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'dd770f0e-864c-4127-89f7-41f956d001ec', '750e8400-e29b-41d4-a716-446655440002', 'Formal Oxford Leather Shoes 14', 'Oxford cap-toe formal shoes, fine grain PU leather, elegant structured form. Breathable microfiber lining, anti-slip synthetic rubber sole, suitable for office and events. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Elegant formal shoes', 'SHOES-OXF-014', 'Shoes',
    '{"currency": "VND", "retailPrice": 870000, "listingPrice": 770000}'::jsonb, '{"quantity": 34}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "fine grain PU leather", "midsole": "foam", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, TRUE, FALSE, 0.80, '{"unit": "cm", "width": 19, "height": 11, "length": 32}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 14", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:51:20.218102'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #53
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'bbdcff38-f5f2-4261-b32e-e176e72b9fb6', '750e8400-e29b-41d4-a716-446655440002', 'Formal Oxford Leather Shoes 18', 'Oxford cap-toe formal shoes, fine grain PU leather, elegant structured form. Breathable microfiber lining, anti-slip synthetic rubber sole, suitable for office and events. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Elegant formal shoes', 'SHOES-OXF-018', 'Shoes',
    '{"currency": "VND", "retailPrice": 890000, "listingPrice": 790000}'::jsonb, '{"quantity": 38}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "fine grain PU leather", "midsole": "foam", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.75, '{"unit": "cm", "width": 19, "height": 11, "length": 30}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 18", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:51:37.651441'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #54
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'e782830b-b148-45dd-af44-3ce1fafcc800', '750e8400-e29b-41d4-a716-446655440002', 'Classic Fit Cap 16', 'Curved brim cap provides good sun protection, thick twill fabric resists wrinkles, absorbs sweat. Metal snap closure at back is easy to adjust, subtle embroidered logo, suitable for light running and daily wear. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Curved brim cap with embroidered logo', 'HAT-CAP-016', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 212000, "listingPrice": 172000}'::jsonb, '{"quantity": 56}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.12, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 16", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:46:16.10377'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #55
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'f82bd48e-9548-4c26-97a7-2158528e8fbd', '750e8400-e29b-41d4-a716-446655440002', 'ProRun Air Cushion Running Shoes 20', 'Running shoes with multi-layer air cushion and responsive EVA midsole. Technical mesh upper is breathable and dries quickly during long runs. Stable TPU heel, flat laces prevent slipping. Suitable for daily training and 5K/10K races. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Comfortable and breathable running shoes', 'SHOES-RUN-020', 'Shoes',
    '{"currency": "VND", "retailPrice": 900000, "listingPrice": 800000}'::jsonb, '{"quantity": 40}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "8mm", "upper": "mesh", "midsole": "EVA + air cushion", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.60, '{"unit": "cm", "width": 19, "height": 11, "length": 32}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 20", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:51:52.228104'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #56
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'f0ca5fc8-7f3d-42c4-b010-090feef0f86e', '750e8400-e29b-41d4-a716-446655440002', 'Classic Street Sneakers 09', 'Minimalist style sneakers, PU leather upper is easy to clean, memory foam insole is comfortable, vulcanized rubber sole grips well. Easy to pair with jeans, chinos, or shorts for work or casual wear. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Minimalist sneakers, easy to match', 'SHOES-LIFE-009', 'Shoes',
    '{"currency": "VND", "retailPrice": 845000, "listingPrice": 745000}'::jsonb, '{"quantity": 29}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "PU leather", "midsole": "memory foam", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.80, '{"unit": "cm", "width": 20, "height": 12, "length": 30}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 09", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:39:58.199171'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #57
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '263f6590-4342-4e12-a2b6-204d9db23616', '750e8400-e29b-41d4-a716-446655440002', 'Classic Fit Cap 04', 'Curved brim cap provides good sun protection, thick twill fabric resists wrinkles, absorbs sweat. Metal snap closure at back is easy to adjust, subtle embroidered logo, suitable for light running and daily wear. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Curved brim cap with embroidered logo', 'HAT-CAP-004', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 188000, "listingPrice": 148000}'::jsonb, '{"quantity": 44}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.12, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 04", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:20:33.937463'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #58
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '0bc1eb94-1388-4ded-913e-bb7b2246803e', '750e8400-e29b-41d4-a716-446655440002', 'Warm Knit Beanie 02', 'Ribbed knit beanie is stretchable, covers ears for warmth, acrylic-cotton blend reduces itchiness. Minimalist design pairs well with wool coats and hoodies in cold weather. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Warm stretchable knit beanie', 'HAT-BEAN-002', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 184000, "listingPrice": 144000}'::jsonb, '{"quantity": 42}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.16, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 02", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:24:05.024348'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #59
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '4cc7ead1-e8b9-4c53-8d26-bf8a02c6ec3d', '750e8400-e29b-41d4-a716-446655440002', 'Breathable Shorts 07', 'Lightweight cotton/denim shorts, cool and breathable for summer, clean sharp stitching. Easy to pair with t-shirts or linen shirts. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Lightweight breathable shorts', 'PANT-SHORT-007', 'Pants',
    '{"currency": "VND", "retailPrice": 311000, "listingPrice": 261000}'::jsonb, '{"quantity": 32}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "thin"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.72, '{"unit": "cm", "width": 37, "height": 2, "length": 98}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 07", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:25:16.843246'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #60
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '397936de-d39c-4b06-9196-10e10172e668', '750e8400-e29b-41d4-a716-446655440002', 'Soft Cotton Shirt 14', 'Lightweight twill-woven cotton shirt, quick moisture absorption, button-down collar maintains shape. Suitable for office and casual wear. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Breathable cotton shirt', 'TOP-SHIRT-014', 'Tops',
    '{"currency": "VND", "retailPrice": 376000, "listingPrice": 316000}'::jsonb, '{"quantity": 44}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "spring/fall", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.50, '{"unit": "cm", "width": 50, "height": 3, "length": 69}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 14", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:25:39.952101'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #61
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '4fd85616-6188-4550-8f57-191df3b76390', '750e8400-e29b-41d4-a716-446655440002', 'Formal Oxford Leather Shoes 02', 'Oxford cap-toe formal shoes, fine grain PU leather, elegant structured form. Breathable microfiber lining, anti-slip synthetic rubber sole, suitable for office and events. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Elegant formal shoes', 'SHOES-OXF-002', 'Shoes',
    '{"currency": "VND", "retailPrice": 810000, "listingPrice": 710000}'::jsonb, '{"quantity": 22}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "fine grain PU leather", "midsole": "foam", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.70, '{"unit": "cm", "width": 19, "height": 11, "length": 32}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 02", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:26:10.441527'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #62
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '076a11c2-1543-469a-9795-5d0431db86f5', '750e8400-e29b-41d4-a716-446655440002', 'Waterproof TrailGuard Hiking Boots 07', 'Mid-cut hiking boots, breathable waterproof membrane, rubber toe cap prevents stone impact. Deep tread grips well on wet terrain, gravel, weekend trekking. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Waterproof hiking boots with good grip', 'SHOES-HIKE-007', 'Shoes',
    '{"currency": "VND", "retailPrice": 835000, "listingPrice": 735000}'::jsonb, '{"quantity": 27}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "synthetic + textile", "midsole": "EVA", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, TRUE, FALSE, 0.70, '{"unit": "cm", "width": 20, "height": 12, "length": 31}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 07", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:21:17.176982'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #63
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '053fe40e-bddb-4421-a620-6bdf8e89b380', '750e8400-e29b-41d4-a716-446655440002', 'Warm Wool/Duffle Coat 20', 'Wool coat with soft lining, excellent heat retention, refined stitching, detachable hood. Suitable for early morning/cold night travel, structured fit flatters figure. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Warm coat with structured fit', 'TOP-COAT-020', 'Tops',
    '{"currency": "VND", "retailPrice": 400000, "listingPrice": 340000}'::jsonb, '{"quantity": 50}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, TRUE, FALSE, 0.50, '{"unit": "cm", "width": 50, "height": 3, "length": 69}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 20", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:21:29.008614'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #64
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '3fe6c0a7-f794-4585-9d0e-28ebcb6df89a', '750e8400-e29b-41d4-a716-446655440002', 'ProRun Air Cushion Running Shoes 08', 'Running shoes with multi-layer air cushion and responsive EVA midsole. Technical mesh upper is breathable and dries quickly during long runs. Stable TPU heel, flat laces prevent slipping. Suitable for daily training and 5K/10K races. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Comfortable and breathable running shoes', 'SHOES-RUN-008', 'Shoes',
    '{"currency": "VND", "retailPrice": 840000, "listingPrice": 740000}'::jsonb, '{"quantity": 28}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "8mm", "upper": "mesh", "midsole": "EVA + air cushion", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.75, '{"unit": "cm", "width": 19, "height": 11, "length": 32}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 08", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:26:24.064361'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #65
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '6d7e3445-26a7-4fbb-8ee8-2a67db20be9a', '750e8400-e29b-41d4-a716-446655440002', 'Warm Wool/Duffle Coat 12', 'Wool coat with soft lining, excellent heat retention, refined stitching, detachable hood. Suitable for early morning/cold night travel, structured fit flatters figure. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Warm coat with structured fit', 'TOP-COAT-012', 'Tops',
    '{"currency": "VND", "retailPrice": 368000, "listingPrice": 308000}'::jsonb, '{"quantity": 42}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.40, '{"unit": "cm", "width": 50, "height": 3, "length": 65}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 12", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:27:27.515962'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #66
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '74092aa5-cee8-409a-8345-492377d60bbb', '750e8400-e29b-41d4-a716-446655440002', 'Waterproof TrailGuard Hiking Boots 15', 'Mid-cut hiking boots, breathable waterproof membrane, rubber toe cap prevents stone impact. Deep tread grips well on wet terrain, gravel, weekend trekking. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Waterproof hiking boots with good grip', 'SHOES-HIKE-015', 'Shoes',
    '{"currency": "VND", "retailPrice": 875000, "listingPrice": 775000}'::jsonb, '{"quantity": 35}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "synthetic + textile", "midsole": "EVA", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.60, '{"unit": "cm", "width": 20, "height": 12, "length": 30}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 15", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:28:13.117311'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #67
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '683a7237-ea43-4e45-a2a1-c3c75e7c7d87', '750e8400-e29b-41d4-a716-446655440002', 'Soft turtleneck sweater 01', 'Stretchable cotton blend turtleneck sweater. Keeps your neck and chest warm. Smooth surface with minimal pilling. Easy to pair with blazers/jackets. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Soft turtleneck sweater', 'TOP-SWEA-001', 'Tops',
    '{"currency": "VND", "retailPrice": 324000, "listingPrice": 264000}'::jsonb, '{"quantity": 31}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.45, '{"unit": "cm", "width": 52, "height": 3, "length": 67}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 01", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:28:24.670758'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #68
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '391b2a44-f90e-4c7a-b315-6a76d3f6a439', '750e8400-e29b-41d4-a716-446655440002', 'Warm Knit Beanie 14', 'Ribbed knit beanie is stretchable, covers ears for warmth, acrylic-cotton blend reduces itchiness. Minimalist design pairs well with wool coats and hoodies in cold weather. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Warm stretchable knit beanie', 'HAT-BEAN-014', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 208000, "listingPrice": 168000}'::jsonb, '{"quantity": 54}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.16, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 14", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:22:45.39457'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #69
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '32f5af36-067b-4ee7-a406-a4c91eea78d6', '750e8400-e29b-41d4-a716-446655440002', 'Waterproof TrailGuard Hiking Boots 11', 'Mid-cut hiking boots, breathable waterproof membrane, rubber toe cap prevents stone impact. Deep tread grips well on wet terrain, gravel, weekend trekking. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Waterproof hiking boots with good grip', 'SHOES-HIKE-011', 'Shoes',
    '{"currency": "VND", "retailPrice": 855000, "listingPrice": 755000}'::jsonb, '{"quantity": 31}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "synthetic + textile", "midsole": "EVA", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.65, '{"unit": "cm", "width": 20, "height": 12, "length": 32}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 11", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:23:06.92289'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #70
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '66ae197d-f72d-4fcc-a4b6-ff1e657a9ec9', '750e8400-e29b-41d4-a716-446655440002', 'Warm Brushed Fleece Hoodie 07', 'Brushed fleece hoodie with soft inner surface, warm and soft, drawstring hood, cuffed sleeves/hem retains heat. Suitable for strolling and travel. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Warm and comfortable hoodie', 'TOP-HOOD-007', 'Tops',
    '{"currency": "VND", "retailPrice": 348000, "listingPrice": 288000}'::jsonb, '{"quantity": 37}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.45, '{"unit": "cm", "width": 52, "height": 3, "length": 67}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 07", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:28:43.986197'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #71
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '79017597-ee5e-4d54-aa6f-c093402ea27e', '750e8400-e29b-41d4-a716-446655440002', 'Warm Knit Beanie 06', 'Ribbed knit beanie is stretchable, covers ears for warmth, acrylic-cotton blend reduces itchiness. Minimalist design pairs well with wool coats and hoodies in cold weather. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Warm stretchable knit beanie', 'HAT-BEAN-006', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 192000, "listingPrice": 152000}'::jsonb, '{"quantity": 46}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, TRUE, FALSE, 0.16, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 06", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:28:54.179501'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #72
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '8fb58ccf-d41b-4fb3-84bd-f3618c346e16', '750e8400-e29b-41d4-a716-446655440002', 'Warm Knit Beanie 18', 'Ribbed knit beanie is stretchable, covers ears for warmth, acrylic-cotton blend reduces itchiness. Minimalist design pairs well with wool coats and hoodies in cold weather. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Warm stretchable knit beanie', 'HAT-BEAN-018', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 216000, "listingPrice": 176000}'::jsonb, '{"quantity": 58}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, TRUE, FALSE, 0.16, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 18", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:38:34.591091'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #73
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '271a2a46-c5db-44c3-a7ab-37b194321df1', '750e8400-e29b-41d4-a716-446655440002', 'Stretch Jogger Pants 14', 'Elastic-cuffed jogger pants, stretchable cotton blend fabric, lightweight and breathable. Strong drawstring, suitable for active movement and frequent travel. Carefully selected fibers, tested for shrinkage and colorfastness.', 'Comfortable jogger pants', 'PANT-JOGG-014', 'Pants',
    '{"currency": "VND", "retailPrice": 332000, "listingPrice": 282000}'::jsonb, '{"quantity": 39}'::jsonb, '{"sizes": ["28", "30", "32", "34", "36"], "colors": ["blue", "black", "grey", "beige"], "materials": ["cotton", "denim", "spandex"], "specifications": {"fit": "regular", "material": "cotton/denim", "thickness": "medium"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['pants', 'durable', 'breathable']::text[], TRUE, FALSE, FALSE, 0.84, '{"unit": "cm", "width": 35, "height": 2, "length": 101}'::jsonb, '{"keywords": ["pants", "jeans", "kaki", "jogger", "shorts"], "metaTitle": "Quality Pants 14", "metaDescription": "Breathable, durable, easy to match"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:23:23.17996'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440004'
);

-- Product #74
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '2781fe8b-9440-467b-8a22-4695ca725c05', '750e8400-e29b-41d4-a716-446655440002', 'Daily Bucket Hat 17', 'Soft canvas bucket hat, ventilation holes around, folds compactly for easy carrying. Medium wide brim, strong stitching maintains shape, minimalist style easy to match. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Foldable canvas bucket hat', 'HAT-BUCK-017', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 214000, "listingPrice": 174000}'::jsonb, '{"quantity": 57}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.14, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 17", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:23:51.533389'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #75
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '8678db34-292d-416d-bb60-6a49bd011fde', '750e8400-e29b-41d4-a716-446655440002', 'Warm Knit Beanie 10', 'Ribbed knit beanie is stretchable, covers ears for warmth, acrylic-cotton blend reduces itchiness. Minimalist design pairs well with wool coats and hoodies in cold weather. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Warm stretchable knit beanie', 'HAT-BEAN-010', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 200000, "listingPrice": 160000}'::jsonb, '{"quantity": 50}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.16, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 10", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:35:26.579717'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #76
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '7a0664c6-3b86-4bfc-a324-042d31a4d699', '750e8400-e29b-41d4-a716-446655440002', 'Classic Felt Fedora Hat 07', 'Soft felt fedora hat, medium brim maintains shape, elegant satin ribbon band. Sweatband absorbs moisture, comfortable to wear, suitable for strolling and events. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Elegant felt fedora hat', 'HAT-FEDO-007', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 194000, "listingPrice": 154000}'::jsonb, '{"quantity": 47}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.18, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 07", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:35:35.4233'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #77
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'bd0a00b6-f58a-4f23-85fc-d161c07fb789', '750e8400-e29b-41d4-a716-446655440002', 'Classic Street Sneakers 13', 'Minimalist style sneakers, PU leather upper is easy to clean, memory foam insole is comfortable, vulcanized rubber sole grips well. Easy to pair with jeans, chinos, or shorts for work or casual wear. Core specs: durable upper, strong stitching, snug ankle fit, all-day support.', 'Minimalist sneakers, easy to match', 'SHOES-LIFE-013', 'Shoes',
    '{"currency": "VND", "retailPrice": 865000, "listingPrice": 765000}'::jsonb, '{"quantity": 33}'::jsonb, '{"sizes": ["39", "40", "41", "42", "43"], "colors": ["black", "white", "grey", "blue"], "materials": ["rubber", "EVA", "PU"], "specifications": {"drop": "10mm", "upper": "PU leather", "midsole": "memory foam", "outsole": "wear-resistant rubber"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shoes', 'comfortable', '"good grip']::text[], TRUE, FALSE, FALSE, 0.75, '{"unit": "cm", "width": 20, "height": 12, "length": 31}'::jsonb, '{"keywords": ["shoes", "rubber sole", "comfortable"], "metaTitle": "Quality Shoes 13", "metaDescription": "Durable product for daily use"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:39:47.676404'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440001'
);

-- Product #78
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '46e5c701-7b8b-4f4d-bbea-f52aa85c8999', '750e8400-e29b-41d4-a716-446655440002', 'Daily Bucket Hat 01', 'Soft canvas bucket hat, ventilation holes around, folds compactly for easy carrying. Medium wide brim, strong stitching maintains shape, minimalist style easy to match. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Foldable canvas bucket hat', 'HAT-BUCK-001', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 182000, "listingPrice": 142000}'::jsonb, '{"quantity": 41}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.14, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 01", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:24:46.262661'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #79
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '7f712f99-6e88-4ed6-987e-59d471583e13', '750e8400-e29b-41d4-a716-446655440002', 'Soft turtleneck sweater 17', 'Stretchable cotton blend turtleneck sweater. Keeps your neck and chest warm. Smooth surface with minimal pilling. Easy to pair with blazers/jackets. High-quality material, tested for stretch and colorfastness after multiple washes.', 'Soft turtleneck sweater', 'TOP-SWEA-017', 'Tops',
    '{"currency": "VND", "retailPrice": 388000, "listingPrice": 328000}'::jsonb, '{"quantity": 47}'::jsonb, '{"sizes": ["S", "M", "L", "XL"], "colors": ["black", "grey", "white", "beige", "navy blue"], "materials": ["cotton", "polyester", "wool"], "specifications": {"fit": "regular", "season": "winter", "material": "cotton/poly"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['shirt', '"keeps you warm', 'breathable']::text[], TRUE, FALSE, FALSE, 0.65, '{"unit": "cm", "width": 52, "height": 3, "length": 69}'::jsonb, '{"keywords": ["shirt", "jacket", "wool", "hoodie"], "metaTitle": "Quality shirts 17", "metaDescription": "Breathable, keeps you warm, easy to mix and match."}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:37:08.635981'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440003'
);

-- Product #80
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    'e584f4b1-b906-4747-9143-e6daf6a3d0f6', '750e8400-e29b-41d4-a716-446655440002', 'Classic Felt Fedora Hat 15', 'Soft felt fedora hat, medium brim maintains shape, elegant satin ribbon band. Sweatband absorbs moisture, comfortable to wear, suitable for strolling and events. Durable material, meticulous stitching, design emphasizes functionality and aesthetics.', 'Elegant felt fedora hat', 'HAT-FEDO-015', 'Hats & Caps',
    '{"currency": "VND", "retailPrice": 210000, "listingPrice": 170000}'::jsonb, '{"quantity": 55}'::jsonb, '{"sizes": ["free size", "M", "L"], "colors": ["black", "beige", "sage green", "grey"], "materials": ["cotton", "acrylic", "wool felt"], "specifications": {"care": "gentle hand wash", "fabric": "cotton/wool", "feature": "breathable/warm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['hat', '"sun protection', 'warm']::text[], TRUE, FALSE, FALSE, 0.18, '{"unit": "cm", "width": 22, "height": 12, "length": 22}'::jsonb, '{"keywords": ["hat", "mũ", "thời trang"], "metaTitle": "Quality Hats 15", "metaDescription": "Durable, lightweight, breathable"}'::jsonb,
    '2025-10-13 15:41:12.282244'::timestamp, '2025-12-11 18:46:43.49934'::timestamp, '2025-10-13 15:41:12.282244'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440002'
);

-- Product #81
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440101', '750e8400-e29b-41d4-a716-446655440008', 'No-Face Spirited Away Figure 25cm', 'No-Face (Kaonashi) figure from Spirited Away movie, removable mask feature, premium resin material. Highly detailed collectible for Studio Ghibli enthusiasts.', 'No-Face figure 25cm tall, removable mask', 'GHIBLI-NO-FACE-25CM', 'Toys & Figures',
    '{"currency": "VND", "retailPrice": 820000.00, "listingPrice": 720000.00}'::jsonb, '{"quantity": 12}'::jsonb, '{"sizes": ["One Size"], "colors": ["Black", "Gold"], "materials": ["Resin", "Plastic"], "specifications": {"Brand": "Studio Ghibli", "Height": "25cm", "Feature": "Removable mask", "Material": "Resin"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['no-face', 'spirited-away', 'studio-ghibli', 'collectible', 'anime']::text[], TRUE, TRUE, FALSE, 0.60, '{"unit": "cm", "width": 18, "height": 25, "length": 18}'::jsonb, '{"keywords": ["no-face", "spirited away", "figure"], "metaTitle": "No-Face Spirited Away Figure 25cm", "metaDescription": "No-Face figure with removable mask, premium resin material"}'::jsonb,
    '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440005'
);

-- Product #82
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440102', '750e8400-e29b-41d4-a716-446655440008', 'No-Face Snow Globe on Spirit Train', 'Glass snow globe with No-Face sitting on spirit train with gold flakes falling, 15cm diameter. Limited edition collectible from Spirited Away.', 'No-Face snow globe on spirit train with gold flakes', 'GHIBLI-NO-FACE-GLOBE', 'Home Decor',
    '{"currency": "VND", "retailPrice": 880000.00, "listingPrice": 780000.00}'::jsonb, '{"quantity": 8}'::jsonb, '{"sizes": ["One Size"], "colors": ["Clear", "Black", "Gold"], "materials": ["Glass", "Resin", "Gold flakes"], "specifications": {"Brand": "Studio Ghibli", "Edition": "Limited", "Feature": "Gold flakes effect", "Diameter": "15cm", "Material": "Glass, Resin"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['snow-globe', 'no-face', 'spirit-train', 'gold-flakes', 'limited-edition']::text[], TRUE, TRUE, FALSE, 0.60, '{"unit": "cm", "width": 15, "height": 18, "length": 15}'::jsonb, '{"keywords": ["snow globe", "no-face", "spirit train", "limited"], "metaTitle": "No-Face Snow Globe on Spirit Train - Limited Edition", "metaDescription": "Glass snow globe with No-Face on spirit train with gold flakes, limited edition"}'::jsonb,
    '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440007'
);

-- Product #83
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440103', '750e8400-e29b-41d4-a716-446655440008', 'No-Face Gold Plated Limited Edition', 'No-Face plated with 24k gold, ultra limited edition with only 100 pieces worldwide. Premium collectible for serious Studio Ghibli collectors.', 'No-Face plated with 24k gold, only 100 pieces worldwide', 'GHIBLI-NO-FACE-GOLD', 'Toys & Figures',
    '{"currency": "VND", "retailPrice": 6000000.00, "listingPrice": 5000000.00}'::jsonb, '{"quantity": 3}'::jsonb, '{"sizes": ["One Size"], "colors": ["Gold"], "materials": ["Resin", "24K Gold"], "specifications": {"Brand": "Studio Ghibli", "Height": "30cm", "Edition": "Ultra Limited - Only 100 pieces worldwide", "Plating": "24K Gold", "Material": "Resin, 24K Gold"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['no-face', 'gold-plated', 'limited', 'premium', 'studio-ghibli']::text[], TRUE, TRUE, FALSE, 1.20, '{"unit": "cm", "width": 20, "height": 30, "length": 20}'::jsonb, '{"keywords": ["no-face", "gold", "limited", "premium"], "metaTitle": "No-Face Gold Plated Limited Edition - Ultra Rare", "metaDescription": "No-Face plated with 24k gold, only 100 pieces worldwide"}'::jsonb,
    '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440005'
);

-- Product #84
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440104', '750e8400-e29b-41d4-a716-446655440008', 'No-Face on Spirit Train Set', 'No-Face figure sitting on the spirit train with golden ticket, set includes LED light. Limited edition collectible from Spirited Away.', 'No-Face on spirit train with LED light', 'GHIBLI-NO-FACE-TRAIN', 'Toys & Figures',
    '{"currency": "VND", "retailPrice": 1050000.00, "listingPrice": 950000.00}'::jsonb, '{"quantity": 8}'::jsonb, '{"sizes": ["One Size"], "colors": ["Black", "Gold", "Yellow"], "materials": ["Resin", "LED"], "specifications": {"Brand": "Studio Ghibli", "Feature": "LED light included", "Material": "Resin", "Set Includes": "No-Face figure, train, golden ticket"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['no-face', 'spirit-train', 'led-light', 'studio-ghibli', 'limited']::text[], TRUE, TRUE, FALSE, 0.70, '{"unit": "cm", "width": 10, "height": 15, "length": 25}'::jsonb, '{"keywords": ["no-face", "spirit train", "led", "limited"], "metaTitle": "No-Face on Spirit Train Set with LED", "metaDescription": "No-Face on spirit train with LED light, limited edition"}'::jsonb,
    '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440005'
);

-- Product #85
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440105', '750e8400-e29b-41d4-a716-446655440008', 'Soot Sprites Snow Globe with Candy', 'Glass snow globe with Soot Sprites eating candy, glitter effect. Cute decorative item perfect for Studio Ghibli fans.', 'Soot Sprites snow globe eating candy with glitter', 'GHIBLI-SOOT-GLOBE', 'Home Decor',
    '{"currency": "VND", "retailPrice": 550000.00, "listingPrice": 450000.00}'::jsonb, '{"quantity": 15}'::jsonb, '{"sizes": ["One Size"], "colors": ["Clear", "Black", "White", "Colorful"], "materials": ["Glass", "PVC", "Glitter"], "specifications": {"Brand": "Studio Ghibli", "Feature": "Glitter effect", "Diameter": "10cm", "Material": "Glass, PVC"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['snow-globe', 'soot-sprites', 'candy', 'cute', 'studio-ghibli']::text[], TRUE, FALSE, FALSE, 0.40, '{"unit": "cm", "width": 10, "height": 12, "length": 10}'::jsonb, '{"keywords": ["snow globe", "soot sprites", "candy"], "metaTitle": "Soot Sprites Snow Globe with Candy - Studio Ghibli", "metaDescription": "Glass snow globe with Soot Sprites eating candy, glitter effect"}'::jsonb,
    '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440007'
);

-- Product #86
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440106', '750e8400-e29b-41d4-a716-446655440008', 'Soot Sprites LED Night Light Set', 'LED night light set shaped like Soot Sprites, color changing feature, remote control. Perfect decorative lighting for Studio Ghibli themed rooms.', 'Soot Sprites LED night light set, color changing, remote control', 'GHIBLI-SOOT-LED-LIGHT', 'Home Decor',
    '{"currency": "VND", "retailPrice": 1000000.00, "listingPrice": 850000.00}'::jsonb, '{"quantity": 15}'::jsonb, '{"sizes": ["One Size"], "colors": ["Black", "White", "Multi-color"], "materials": ["Plastic", "LED"], "specifications": {"Type": "Night light set", "Brand": "Studio Ghibli", "Feature": "Color changing, Remote control", "Material": "Plastic, LED"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['soot-sprites', 'led-light', 'night-light', 'studio-ghibli', 'home-decor']::text[], TRUE, FALSE, FALSE, 0.60, '{"unit": "cm", "width": 20, "height": 25, "length": 20}'::jsonb, '{"keywords": ["soot sprites", "led", "night light"], "metaTitle": "Soot Sprites LED Night Light Set - Studio Ghibli", "metaDescription": "LED night light set shaped like Soot Sprites, color changing feature"}'::jsonb,
    '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440007'
);

-- Product #87
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440107', '750e8400-e29b-41d4-a716-446655440008', 'Soot Sprites Set 10 Pieces', 'Collection of 10 Soot Sprites (Susuwatari) from Spirited Away, can stick on walls, various sizes. Cute decorative items for Studio Ghibli fans.', 'Set of 10 Soot Sprites, wall adhesive', 'GHIBLI-SOOT-SPRITES-10', 'Toys & Figures',
    '{"currency": "VND", "retailPrice": 350000.00, "listingPrice": 280000.00}'::jsonb, '{"quantity": 30}'::jsonb, '{"sizes": ["One Size"], "colors": ["Black", "White"], "materials": ["Vinyl"], "specifications": {"Brand": "Studio Ghibli", "Feature": "Wall adhesive", "Material": "Vinyl", "Set Size": "10 pieces"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['soot-sprites', 'spirited-away', 'cute', 'studio-ghibli', 'wall-sticker']::text[], TRUE, FALSE, FALSE, 0.20, '{"unit": "cm", "width": 5, "height": 5, "length": 5}'::jsonb, '{"keywords": ["soot sprites", "wall sticker", "cute"], "metaTitle": "Soot Sprites Set 10 Pieces - Studio Ghibli", "metaDescription": "Collection of 10 Soot Sprites that can stick on walls"}'::jsonb,
    '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440005'
);

-- Product #88
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440108', '750e8400-e29b-41d4-a716-446655440008', 'Soot Sprite Holding Golden Star Keychain', 'Soot Sprite holding golden star, made from soft plastic, can be hung as keychain. Cute accessory for Studio Ghibli fans.', 'Soot Sprite keychain holding golden star', 'GHIBLI-SOOT-STAR-KEY', 'Accessories',
    '{"currency": "VND", "retailPrice": 150000.00, "listingPrice": 120000.00}'::jsonb, '{"quantity": 50}'::jsonb, '{"sizes": ["One Size"], "colors": ["Black", "Gold"], "materials": ["Plastic"], "specifications": {"Type": "Keychain", "Brand": "Studio Ghibli", "Feature": "Golden star", "Material": "Soft plastic"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['soot-sprites', 'keychain', 'star', 'cute', 'studio-ghibli']::text[], TRUE, FALSE, FALSE, 0.05, '{"unit": "cm", "width": 4, "height": 4, "length": 4}'::jsonb, '{"keywords": ["soot sprite", "keychain", "star"], "metaTitle": "Soot Sprite Holding Golden Star Keychain", "metaDescription": "Soot Sprite keychain holding golden star, soft plastic material"}'::jsonb,
    '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440006'
);

-- Product #89
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440109', '750e8400-e29b-41d4-a716-446655440008', 'Studio Ghibli Totoro Figure 30cm Tall', 'Official Studio Ghibli Totoro figure, made from safe PVC material, 30cm tall, meticulously detailed design. Perfect for collectors and Studio Ghibli fans.', 'Totoro figure 30cm tall, safe PVC material', 'GHIBLI-TOTORO-30CM', 'Toys & Figures',
    '{"currency": "VND", "retailPrice": 950000.00, "listingPrice": 850000.00}'::jsonb, '{"quantity": 15}'::jsonb, '{"sizes": ["One Size"], "colors": ["Grey", "White", "Blue"], "materials": ["PVC", "Plastic"], "specifications": {"Brand": "Studio Ghibli", "Height": "30cm", "Origin": "Japan", "Material": "PVC"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['totoro', 'studio-ghibli', 'figure', 'collectible', 'japan']::text[], TRUE, TRUE, FALSE, 0.80, '{"unit": "cm", "width": 20, "height": 30, "length": 20}'::jsonb, '{"keywords": ["totoro", "studio ghibli", "figure", "collectible"], "metaTitle": "Studio Ghibli Totoro Figure 30cm Tall - Official", "metaDescription": "Official Studio Ghibli Totoro figure, safe PVC material, 30cm tall"}'::jsonb,
    '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440005'
);

-- Product #90
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440111', '750e8400-e29b-41d4-a716-446655440008', 'Totoro Snow Globe with Camphor Tree', 'Glass snow globe with Totoro standing under camphor tree, snow effect when shaken, 12cm diameter. Beautiful decorative item for Studio Ghibli collection.', 'Totoro snow globe with camphor tree, 12cm diameter', 'GHIBLI-TOTORO-GLOBE', 'Home Decor',
    '{"currency": "VND", "retailPrice": 750000.00, "listingPrice": 650000.00}'::jsonb, '{"quantity": 10}'::jsonb, '{"sizes": ["One Size"], "colors": ["Clear", "Grey", "Green"], "materials": ["Glass", "PVC", "Water"], "specifications": {"Brand": "Studio Ghibli", "Feature": "Snow effect when shaken", "Diameter": "12cm", "Material": "Glass, PVC"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['snow-globe', 'totoro', 'camphor-tree', 'studio-ghibli', 'collectible']::text[], TRUE, TRUE, FALSE, 0.50, '{"unit": "cm", "width": 12, "height": 15, "length": 12}'::jsonb, '{"keywords": ["snow globe", "totoro", "camphor tree"], "metaTitle": "Totoro Snow Globe with Camphor Tree - Studio Ghibli", "metaDescription": "Glass snow globe with Totoro and camphor tree, snow effect when shaken"}'::jsonb,
    '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440007'
);

-- Product #91
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440112', '750e8400-e29b-41d4-a716-446655440008', 'Totoro Mini Set 3 Pieces', 'Collection of 3 mini Totoro figures (Large Totoro, Medium Totoro, Small Totoro), 8-15cm tall. Perfect gift set for Studio Ghibli fans.', 'Set of 3 mini Totoro figures, 8-15cm tall', 'GHIBLI-TOTORO-MINI-SET', 'Toys & Figures',
    '{"currency": "VND", "retailPrice": 420000.00, "listingPrice": 350000.00}'::jsonb, '{"quantity": 25}'::jsonb, '{"sizes": ["One Size"], "colors": ["Grey", "White"], "materials": ["PVC"], "specifications": {"Brand": "Studio Ghibli", "Material": "PVC", "Set Size": "3 pieces", "Height Range": "8-15cm"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['totoro', 'mini-figure', 'set', 'studio-ghibli', 'japanese']::text[], TRUE, FALSE, FALSE, 0.30, '{"unit": "cm", "width": 15, "height": 15, "length": 15}'::jsonb, '{"keywords": ["totoro", "mini", "set", "studio ghibli"], "metaTitle": "Totoro Mini Set 3 Pieces - Studio Ghibli", "metaDescription": "Collection of 3 mini Totoro figures, 8-15cm tall"}'::jsonb,
    '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440005'
);

-- Product #92
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440113', '750e8400-e29b-41d4-a716-446655440008', 'Premium Totoro Gift Set Limited Edition', 'Premium gift set includes: Totoro figure 20cm, snow globe, and 3 Soot Sprites. Limited quantity available. Perfect gift for Studio Ghibli collectors.', 'Premium gift set: Totoro 20cm + snow globe + 3 Soot Sprites', 'GHIBLI-TOTORO-PREMIUM', 'Gift Sets',
    '{"currency": "VND", "retailPrice": 2200000.00, "listingPrice": 1850000.00}'::jsonb, '{"quantity": 5}'::jsonb, '{"sizes": ["One Size"], "colors": ["Grey", "White", "Blue", "Clear"], "materials": ["PVC", "Glass", "Plastic"], "specifications": {"Brand": "Studio Ghibli", "Edition": "Limited", "Material": "PVC, Glass", "Set Includes": "Totoro 20cm figure, Snow globe, 3 Soot Sprites"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['totoro', 'premium', 'gift-set', 'limited', 'studio-ghibli', 'collector']::text[], TRUE, TRUE, FALSE, 1.50, '{"unit": "cm", "width": 30, "height": 35, "length": 30}'::jsonb, '{"keywords": ["totoro", "premium", "gift set", "limited"], "metaTitle": "Premium Totoro Gift Set Limited Edition - Studio Ghibli", "metaDescription": "Premium Totoro gift set with snow globe and Soot Sprites, limited quantity"}'::jsonb,
    '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440008'
);

-- Product #93
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440114', '750e8400-e29b-41d4-a716-446655440008', 'Totoro Limited Edition Raincoat Version', 'Totoro limited edition wearing raincoat, premium PVC material, limited quantity available. Rare collectible for Studio Ghibli enthusiasts.', 'Totoro limited edition wearing raincoat', 'GHIBLI-TOTORO-RAIN-LTD', 'Toys & Figures',
    '{"currency": "VND", "retailPrice": 1500000.00, "listingPrice": 1200000.00}'::jsonb, '{"quantity": 0}'::jsonb, '{"sizes": ["One Size"], "colors": ["Grey", "Yellow"], "materials": ["PVC"], "specifications": {"Brand": "Studio Ghibli", "Height": "25cm", "Edition": "Limited - Raincoat Version", "Material": "PVC"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['totoro', 'limited', 'raincoat', 'studio-ghibli', 'collector']::text[], TRUE, FALSE, FALSE, 0.70, '{"unit": "cm", "width": 18, "height": 25, "length": 18}'::jsonb, '{"keywords": ["totoro", "limited", "raincoat"], "metaTitle": "Totoro Limited Edition Raincoat Version", "metaDescription": "Totoro limited edition wearing raincoat, limited quantity"}'::jsonb,
    '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440005'
);

-- Product #94
INSERT INTO supplier_products (
    id, "supplierId", name, description, "shortDescription", sku, "categoryName", 
    price, inventory, specifications, type, status, "approvalStatus", 
    tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
    "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason", "categoryId"
) VALUES (
    '550e8400-e29b-41d4-a716-446655440115', '750e8400-e29b-41d4-a716-446655440008', 'Snow Globe Totoro Sleeping on Grass', 'Glass snow globe with Totoro sleeping on grass mat, music box and LED light included. Beautiful decorative item with interactive features.', 'Totoro snow globe sleeping on grass with music and LED', 'GHIBLI-TOTORO-SLEEP-GLOBE', 'Home Decor',
    '{"currency": "VND", "retailPrice": 1200000.00, "listingPrice": 950000.00}'::jsonb, '{"quantity": 8}'::jsonb, '{"sizes": ["One Size"], "colors": ["Clear", "Grey", "Green"], "materials": ["Glass", "PVC", "LED", "Music mechanism"], "specifications": {"Brand": "Studio Ghibli", "Feature": "Music box + LED light", "Diameter": "14cm", "Material": "Glass, PVC, LED"}}'::jsonb, 'PRODUCT_TYPE_PHYSICAL', 'PUBLISHED', 'APPROVED',
    ARRAY['snow-globe', 'totoro', 'sleeping', 'music-box', 'led', 'studio-ghibli']::text[], TRUE, FALSE, FALSE, 0.70, '{"unit": "cm", "width": 14, "height": 18, "length": 14}'::jsonb, '{"keywords": ["snow globe", "totoro", "music box", "led"], "metaTitle": "Snow Globe Totoro Sleeping on Grass - Music Box + LED", "metaDescription": "Glass snow globe with Totoro sleeping on grass with music and LED light"}'::jsonb,
    '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, '2025-12-11 19:34:13.417104'::timestamp, 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, '550e8400-e29b-41d4-a716-446655440007'
);



-- ================================================
-- PRODUCT IMAGES
-- ================================================

-- Image #1
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '34a1dff2-9106-4a7a-a583-a11b9ef12d56', '824a630a-f2ba-4736-ac09-d159235a4c26', 'https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/1e88f02fc31544b783de5fd956468f15~tplv-o3syd03w52-origin-jpeg.jpeg?from=476444299', 'Formal Oxford Leather Shoes 06 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #2
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '09bf5220-285d-41ab-acea-9bf25c910886', '3fe6c0a7-f794-4585-9d0e-28ebcb6df89a', 'https://product.hstatic.net/1000312752/product/090ddd0624a686f9392a47db9c8f65f313442eb628836c0c79d56fb38624078f777ed3_c92dd96627d84f598ab41b3d70e67fe2.jpg', 'ProRun Air Cushion Running Shoes 08 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #3
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '6bddb023-f838-4092-839a-ee0e3c773da2', '778e92db-9253-4645-a89e-5996c8e6b92b', 'https://product.hstatic.net/200000456065/product/a__1__a45d8fd792a04171a571a435f86da39d.jpg', 'ProRun Air Cushion Running Shoes 04 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #4
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '79921e29-07b6-4bcc-a6d9-caa349df44ef', '7bc80e1a-69c0-4dd1-9937-d4d93fa8d7f2', 'https://zocker.vn/pic/Product/giay-chay-bo-zocker-ultra-light-den_1090_HasThumb.webp', 'ProRun Air Cushion Running Shoes 12 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #5
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '181db22f-c216-4080-a7f9-148cc9fe3808', '076a11c2-1543-469a-9795-5d0431db86f5', 'https://cdn.shopify.com/s/files/1/0659/9639/0655/products/d2623b6685f4aadcdeb778003a59287f38758158.jpg?v=1687268049', 'Waterproof TrailGuard Hiking Boots 07 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #6
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '53275e91-3443-4748-9ae3-4f52c5cd5335', '32f5af36-067b-4ee7-a406-a4c91eea78d6', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Ydh08OvbehBTxTfcK4cFK5PKVHQ0LgMdcg&s', 'Waterproof TrailGuard Hiking Boots 11 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #7
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '89b95a00-898f-4876-80a3-0ee1d83e87b2', '0ad215bc-0c04-4698-ba23-bc8f27bb6ec6', 'https://rockroosterfootwear.com/cdn/shop/products/KS553645_1200x1200.jpg?v=1618004099', 'Waterproof TrailGuard Hiking Boots 19 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #8
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '4f2014d9-6b63-48d7-8bf9-7fae11766cad', 'bd0a00b6-f58a-4f23-85fc-d161c07fb789', 'https://images-na.ssl-images-amazon.com/images/I/81tdr3vyxvL.jpg', 'Classic Street Sneakerss 13 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #9
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '6e79f506-aab7-4640-bf09-d3adb2834afc', '2b003739-b4fa-4c1f-8098-fc9ac0a70383', 'https://images.ctfassets.net/hnk2vsx53n6l/6RdKv5jZBwqJUbuLDANzDU/d631778f60aa0a58a4b778803ac1fc01/2fdd73bc508908c4016a5a914b65e9e9e5422d7f.png?fm=webp', 'Classic Street Sneakerss 17 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #10
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '857d0530-e931-497f-8cb8-158209f1943e', 'f0ca5fc8-7f3d-42c4-b010-090feef0f86e', 'https://images.ctfassets.net/hnk2vsx53n6l/1LxPxPEQ0zrfOJP3AVfBCW/5773c369eafa30d3d8a7248cc19a04dc/4903270d3a97d99ad7afaa7bb7730894078cef7f.png?fm=webp', 'Classic Street Sneakerss 09 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #11
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'c99dfbcf-2821-4320-a841-8d3e146be694', '492ba088-1919-4552-a286-777a4aa9254b', 'https://img.drz.lazcdn.com/static/np/p/faf1ca3b6c7e47558fa19d195e4f0f5e.jpg_720x720q80.jpg', 'Classic Street Sneakerss 05 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #12
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '0a5988c0-1a86-4b26-92df-ca9676cc46ef', '192d1df8-3dd1-40ab-929e-da11f2f97119', 'https://down-vn.img.susercontent.com/file/vn-11134208-7ra0g-m6r1zctw6qmw65', 'Classic Felt Fedora Hat 03 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #13
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '2fd5c6c9-184f-426b-a6e5-1760a6a37322', '7a0664c6-3b86-4bfc-a324-042d31a4d699', 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mc574wlw90tu84', 'Classic Felt Fedora Hat 07 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #14
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '48b71a74-a8e0-4e70-bdf7-b74653100b10', 'e584f4b1-b906-4747-9143-e6daf6a3d0f6', 'https://m.media-amazon.com/images/I/51CL1wRc43L._AC_SL1000_.jpg', 'Classic Felt Fedora Hat 15 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #15
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '987dc9ac-7d9b-40e9-978d-476d8a50c67a', '8c5e739d-b584-45bf-abaf-1ff4c3e31b16', 'https://product.hstatic.net/1000111569/product/ed48608d9273372d6e6222_7dd7ef5bd76d45bf815cb83b4c366e76_1024x1024.jpg', 'Classic Felt Fedora Hat 19 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #16
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'c2198374-2d55-4d26-98b6-b269e2a74bb6', 'ac816399-34ab-4bdf-a622-8814018762b7', 'https://m.media-amazon.com/images/I/81VG0Ur7ZuL._UF1000,1000_QL80_.jpg', 'Classic Felt Fedora Hat 11 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #17
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '0e149566-e459-4308-9ab5-fbbd7f7e6af8', '73ad67e2-bcf3-46d0-9f51-a453998707ff', 'https://dailypaperclothing.com/cdn/shop/files/BucketHatBlack_Front_ae38691d-f115-4864-b5b2-b5aac21a2e06.jpg?v=1712138528', 'Daily Bucket Hat 09 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #18
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '6f78f6e1-bdfd-47e9-ac80-491154d728bb', '2781fe8b-9440-467b-8a22-4695ca725c05', 'https://t0k10.com/cdn/shop/files/Daily-Paper-Azurki-Bucket-Hat-Taupe-Grey-2_1024x1024.jpg?v=1692280132', 'Daily Bucket Hat 17 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #19
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'b7dada4c-4af6-4815-be2d-2ba20372a544', '38481bc9-a938-417d-887e-8ec193612b35', 'https://www.thedailyhabitt.com/cdn/shop/files/Badge.png?v=1734677989', 'Daily Bucket Hat 05 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #20
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'e95ff0e4-f941-470b-9c5e-c345101b651b', '4a994197-94fa-4e72-84d0-d0df1691c7e8', 'https://images.squarespace-cdn.com/content/v1/5e82b21ae4246553bad804ca/1709719843501-C9GLXYE2KD7Q6ESS9VHB/organic-bucket-hat-stone-front-65e84111c3bae.jpg?format=1000w', 'Daily Bucket Hat 13 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #21
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '19d53d59-e571-47e4-b489-31f6bb541de0', '0bc1eb94-1388-4ded-913e-bb7b2246803e', 'https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/09/mu-len-puma-ribbed-fisherman-beanie-023451-02-mau-den-xam-650185c1d19fa-13092023164953.jpg', 'Warm Knit Beanie 02 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #22
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'a1ff120c-b36c-45b1-9085-f3b48976ba7e', '8fb58ccf-d41b-4fb3-84bd-f3618c346e16', 'https://image.made-in-china.com/202f0j00WTweNBqCSMog/Autumn-Winter-Thickened-Warm-Cute-Baby-Knitted-Hat-Cartoon-Children-Knitted-Beanie-Hat-for-Outdoor-Activities.webp', 'Warm Knit Beanie 18 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #23
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '33304e3e-d899-4cd9-bbec-3b51865c3eec', 'e782830b-b148-45dd-af44-3ce1fafcc800', 'https://n7media.coolmate.me/uploads/November2022/mu-classic-cap-theu-logo-coolmate-xanh-navy-2_3.jpg', 'Classic Fit Cap 16 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #24
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '776ecfe7-0881-4ab5-af4c-0c02f41e1b08', '3c886c1b-b4e5-4847-8910-8321ca6eb7a5', 'https://bizweb.dktcdn.net/100/446/974/products/mu-luoi-trai-mlb-logo-la-mau-xanh-la-3acpvv55n-07gns-1.jpg?v=1743216852230', 'Classic Fit Cap 08 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #25
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'd85e04b8-08bd-4e3c-941f-a0e51410ac85', '683a7237-ea43-4e45-a2a1-c3c75e7c7d87', 'https://yeepvn.sgp1.digitaloceanspaces.com/2023/04/sg-11134201-22120-yuksmjt16ukvbd.jpg', 'Soft Turtleneck Sweater 01 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #26
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '5291385f-ef78-4763-b9ca-6569695dfb17', '8678db34-292d-416d-bb60-6a49bd011fde', 'https://cathycuby.com/wp-content/uploads/2024/11/MU-LEN-BEANIE-CHINH-HANG-2.jpg', 'Warm Knit Beanie 10 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #27
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '949f8d42-7995-43b2-a739-640709849229', '263f6590-4342-4e12-a2b6-204d9db23616', 'https://bizweb.dktcdn.net/100/323/626/products/fl273-d-laurent-bk-02-b083cefa-be81-4a84-b99d-4edaf74b57b0.jpg?v=1623744246430', 'Classic Fit Cap 04 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #28
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '0065ce35-bf39-443d-841c-e4000ac6ce86', 'dd770f0e-864c-4127-89f7-41f956d001ec', 'https://product.hstatic.net/1000037727/product/hat__lot_giay_thoang_khi__phong_cach_classic_cong_so_basic_362_den__3__7de213b90f2a4a06af111d70a86c90f0_1024x1024.png', 'Formal Oxford Leather Shoes 14 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #29
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '5f2a4279-8021-4ada-974e-71f7cc0cf8b3', 'b0f1be1e-e665-45de-a347-6107d3b89c8a', 'https://i5.walmartimages.com/seo/ZCFZJW-Mens-Trench-Coat-Wool-Blend-Top-Pea-Coat-Winter-Lapel-Mid-Length-Double-Breasted-Classic-Stylish-Business-Overcoat-Brown-M_94b9e22b-e7ae-46ab-a873-c048f42b83c8.dc8d1eda7c5266abf25305e4839abf7b.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF', 'Warm Wool/Duffle Coat 04 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #30
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '694354ed-48ca-4eaf-9e9b-67b1b9d87df7', 'b5740e68-0642-4440-911e-bf68c5c67345', 'https://i5.walmartimages.com/asr/4217f079-a774-4bb3-a3d0-981dd78cb48c.24f48ca210d282e8e75337c02a17a1c6.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF', 'Warm Wool/Duffle Coat 16 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #31
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '8241ace5-540b-4059-b31f-abcc1a9eac26', 'a6a3b89e-f63c-47f1-a802-3245dde10acd', 'https://m.media-amazon.com/images/I/71O4Nj53dnL._AC_UY1000_.jpg', 'Warm Wool/Duffle Coat 08 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #32
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '17b2d6af-9df7-4e45-b335-e547f6f70fe1', 'baea05ae-2ad6-4e69-9af5-b9da06eca3f9', 'https://pos.nvncdn.com/fa2431-2286/ps/20241205_uV1q9wy7cS.jpeg?v=1733382961', 'Soft Turtleneck Sweater 09 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #33
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '4bd46b26-7566-4f05-993d-0f1eb1f90756', '7f712f99-6e88-4ed6-987e-59d471583e13', 'https://4men.com.vn/images/thumbs/2021/12/-16425-slide-products-61aae0cd62eba.JPG', 'Soft Turtleneck Sweater 17 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #34
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '4dd56791-6f9c-4aa0-a8e0-96e99d51cf1a', 'ed912807-c8dd-4fc6-8bd6-3ce08e8e036e', 'https://image.made-in-china.com/202f0j00ObUckFnyyoqE/Fashion-Winter-Knitwear-Turtleneck-Knitted-Long-Sleeve-Men-s-Rib-Pullover-Knitting-Sweater-for-Men.webp', 'Soft Turtleneck Sweater 05 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #35
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'ac304d7a-0c53-43a7-ac19-060698fd1b3f', 'd7047958-a83a-4f59-b3b4-d18a8c76bd91', 'https://5sfashion.vn/storage/upload/images/ckeditor/4hwLSXLtI5cTed40tNzc70nIh1SeIYPhsAOYVfJH.jpg', 'Soft Turtleneck Sweater 13 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #36
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '2575ce0c-ebf0-411f-bf38-d20bd5c67695', '66ae197d-f72d-4fcc-a4b6-ff1e657a9ec9', 'https://s3.ap-southeast-1.amazonaws.com/thegmen.vn/2024/2/1708402040987b85vcn.jpg', 'Warm Brushed Fleece Hoodie 07 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #37
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '45473341-6c76-4994-aeb7-42a4e639a4ea', 'edbd7748-fa17-4f18-a0c8-a5cd669aa943', 'https://mssstore.vn/storage/san-pham/khac/w1910147navy-3-2400x2400.jpg', 'Warm Brushed Fleece Hoodie 19 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #38
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '5c721863-2ad0-418f-a9ce-acbcdcc28018', '68a92755-78ed-4a49-823f-2e96cfef1238', 'https://dosi-in.com/file/detailed/375/dosiin-somehow-ao-hoodie-nam-fresh-color-gen-chat-ni-chan-cua-cao-caphdsomehow-375143375143.jpg?w=670&h=670&fit=fill&fm=webp', 'Warm Brushed Fleece Hoodie 11 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #39
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '0dfc4624-7802-45ce-9696-ad5cf7174991', '1f918b65-3858-4db9-907f-a9b40dcbda27', 'https://product.hstatic.net/1000369857/product/kaki_dai_jogger_1200x1200_0000_layer_26_b22be9b19a4f4121827c866c78b45394.jpg', 'Stretch Jogger Pants 18 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #40
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '7e00c69e-4fa1-40e9-b892-81301a3f1cae', '4ff6d9e2-0ecd-4f9f-ac98-cf4eef3c14e4', 'https://bizweb.dktcdn.net/100/396/594/products/sanyo-1.jpg?v=1710927878507', 'Stretch Jogger Pants 02 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #41
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'c3e6fada-7906-4be9-9015-5376875d264e', '271a2a46-c5db-44c3-a7ab-37b194321df1', 'https://pos.nvncdn.com/fa2431-2286/ps/20240920_qaxEjCZYjg.jpeg?v=1726801619', 'Stretch Jogger Pants 14 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #42
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'e4c52380-bde2-4081-a9ed-2f52a8fcf897', 'edc79e5d-5cc8-4bda-81c2-ef2100061e07', 'https://img.lazcdn.com/g/p/bc618bf1e54171b9566353f6532208eb.jpg_720x720q80.jpg', 'Stretch Jogger Pants 10 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #43
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'e55d1eca-0b26-4a2e-bbed-f7e53e3098b1', '3653eda5-d489-4ce5-b036-87d5478afb1a', 'https://onoff.vn/blog/wp-content/uploads/2018/12/jogger-jeans.jpg', 'Stretch Jogger Pants 06 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #44
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '467065fc-2b07-4b9d-be99-6057c41a6ae5', 'b523867c-00ea-4499-a497-1ea8e81af08e', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUyW3oSsnEJqJ--TelYXseRZpadQbiKTgrzg&s', 'Durable Denim Jeans 04 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #45
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '9675d959-180c-40ea-9aca-91b7c9f0f5df', '08a9b005-0081-4513-9981-fa2df96ae3c4', 'https://product.hstatic.net/1000378223/product/xanh_dam_truoc_0a67e6341be44622890b5a3d6ab1c364.jpg', 'Durable Denim Jeans 20 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #46
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '973c7101-fd3f-478f-aae9-fdb7a648a184', '33a47a28-9dbe-452e-931f-419a3c92d86f', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4E2fffRmc-4aXAYtAbI-w0kp4FeuNPtYpyA&s', 'Durable Denim Jeans 16 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #47
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'a5e70504-2a37-48c3-9281-98d253a5aede', 'f590881a-08ae-448f-8e09-536840e690a7', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9yHpz4bBV0xiZVJ5TjMdNC9z_J8wm2kPqkA&s', 'Durable Denim Jeans 08 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #48
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '7899a899-3519-4d12-80d6-2c788b063a0e', '58970088-bd48-4fa9-bf4e-757c2baaac0a', 'https://bizweb.dktcdn.net/100/415/697/products/img-7298-1.jpg?v=1723015511000', 'Breathable Shorts 15 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #49
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '30b2960e-f756-4d93-a857-e2fb7fbff5a1', 'a8562229-71c1-45c2-87d6-b15dfbd3acce', 'https://bizweb.dktcdn.net/thumb/1024x1024/100/369/522/products/img-2812.png?v=1626090583363', 'Breathable Shorts 11 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #50
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '8d6af3ae-45fa-4ff2-9ec8-31aecb9e034b', 'db4d6a17-a200-450e-9b1c-8b2014759743', 'https://pos.nvncdn.com/f4d87e-8901/ps/20250424_hxsWrOiFo1.jpeg?v=1745467430', 'Breathable Shorts 03 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #51
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '5d1eca4e-bc6b-45b2-81c9-915dc7a0427f', '7efa9e83-e566-463b-a40c-ac830e1c29f4', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3QSaztYbYX1cIuGBaTgJVXv4xbq6FSFquEw&s', 'Thick Cotton Chino Pants 05 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #52
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'be73ff88-1025-4bf5-9fc7-9248ad06f635', '952c6d74-922a-4604-bd57-e4dd800ec63f', 'https://4men.com.vn/thumbs/2020/11/quan-kaki-tron-can-ban-qk004-mau-ca-phe-18632-p.png', 'Thick Cotton Chino Pants 13 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #53
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'c7ac34a7-de05-4e29-8893-64c85b93e647', '1f10ce21-ba98-45f5-b911-1420491639d8', 'https://s3.ap-southeast-1.amazonaws.com/thegmen.vn/2025/10/1759677381759rxo2sq.jpg', 'Thick Cotton Chino Pants 01 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #54
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'e1430d40-73c3-4951-aa1a-b66a23078a44', '481fdbe7-269a-4c10-a1bc-0e6ce8728815', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtkyahMWj8jr02XRSRq4GO4dnwnNMb6IWLsA&s', 'Thick Cotton Chino Pants 09 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #55
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'd8fe74af-de59-4970-b1f0-d53dbeb46f24', '8092d1d7-277d-4cd8-9d52-8300b8213dac', 'https://vn-test-11.slatic.net/p/4166c4e421cbb46cb77148eaaa4f9cdc.jpg', 'Breathable Shorts 19 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #56
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '01857782-4a92-4fc9-a257-391229b54e97', '8081d60c-db68-47bd-a4c2-02ec5fdd40a0', 'https://bizweb.dktcdn.net/100/446/974/products/mu-luoi-trai-mlb-logo-la-mau-xanh-la-3acpvv55n-07gns-1.jpg?v=1743216852230', 'Classic Fit Cap 20 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #57
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '7b2acadc-7924-419d-bfc5-39f8142c5136', '30c59324-e03e-4fd6-a873-0f2fa4bf3895', 'https://sigourney.vn/wp-content/uploads/2022/06/giay-oxford-hoa-tiet-duc-lo-Sigourney-SCC03.jpg', 'Formal Oxford Leather Shoes 10 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #58
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '8419d010-012f-4253-9f67-6b090012ee2f', '4fd85616-6188-4550-8f57-191df3b76390', 'https://timan.vn/upload/products/102024/giay-tay-nam-gt90-sang-trong.jpg', 'Formal Oxford Leather Shoes 02 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #59
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '99b27f85-fee4-408d-8d3c-9475844f6a4c', 'bbdcff38-f5f2-4261-b32e-e176e72b9fb6', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmk-rAvFk0dXYPaRJH-GVUKx7iGKQztvvIGA&s', 'Formal Oxford Leather Shoes 18 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #60
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '7dc72f58-39cc-422a-8fbd-41402b122566', 'f82bd48e-9548-4c26-97a7-2158528e8fbd', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToOonO3nXZWOH-xMyAz0dcdzQc4AgomcuJzg&s', 'ProRun Air Cushion Running Shoes 20 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #61
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'e79e482d-ca3a-4b09-8228-fd00a89737f9', 'df5947f9-1b5e-4eeb-8d8b-0a37cde8b168', 'https://bizweb.dktcdn.net/thumb/1024x1024/100/340/361/products/1011b693-003-sl-lt-glb-result.jpg?v=1718330319570', 'ProRun Air Cushion Running Shoes 16 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #62
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'acdc87b6-5545-465a-ae8b-5b63ba412cb2', '74092aa5-cee8-409a-8345-492377d60bbb', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO3UeDipMprYAE4OtwN8FTdRFmXSdKuESaooM4Bg34h9WfV9ouIyWKg3ogGoxf4VzTjiw&usqp=CAU', 'Waterproof TrailGuard Hiking Boots 15 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #63
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'bebcc292-6bc4-4e41-b6ce-eb9f715a5756', '8fa7353b-c134-4efd-8489-371cacf8ed53', 'https://img.redbull.com/images/q_auto,f_auto/redbullcom/2019/10/17/dd61c00e-56f7-4834-a7f3-931531b65c68/scarpa-zodiac-boot', 'Waterproof TrailGuard Hiking Boots 03 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #64
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'e2b238cc-1e70-43f9-bee0-caed2796eb63', '88c509c3-3508-4932-b6c9-cddbf722951f', 'https://cdn11.bigcommerce.com/s-qiagj8k2bk/images/stencil/500x659/products/148/69160/M3705_Life_Walker_Strap_SWL_3V_zoom__97272_68280__87662.1759334374.jpg?c=1', 'Classic Street Sneakerss 01 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #65
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'ec4eb1cc-a3e2-4b0a-baec-c4690dca4d41', '46e5c701-7b8b-4f4d-bbea-f52aa85c8999', 'https://sneakerdaily.vn/wp-content/uploads/2024/05/Mu-adidas-Adicolor-Classic-Stonewashed-Bucket-Hat-Black-IT7618-3.jpg', 'Daily Bucket Hat 01 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #66
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'd74230ed-0873-44ff-b296-f999a9647917', '79017597-ee5e-4d54-aa6f-c093402ea27e', 'https://product.hstatic.net/1000008082/product/662__1__5e9e6f76a7eb4c0d94f853150810fc2b_master.jpeg', 'Warm Knit Beanie 06 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #67
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'fd62d297-b8b1-4937-ab37-9f272e0c7ee5', '391b2a44-f90e-4c7a-b315-6a76d3f6a439', 'https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2024/11/mu-len-mlb-jelly-mead-beanie-new-york-yankees-3abnbm246-50sas-mau-vang-cat-6729e0a4a30bc-05112024160852.jpg', 'Warm Knit Beanie 14 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #68
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '155375a7-c748-4ed2-869e-e910343ba77f', '9b3e3de8-3e0d-4c2e-85bc-580a885a5337', 'https://bizweb.dktcdn.net/thumb/1024x1024/100/408/038/products/vn-11134207-7r98o-lnxqzbz3ef3h59.jpg?v=1746268974987', 'Soft Cotton Shirt 06 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #69
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '2b714ff6-b198-4203-8718-a2f072b720da', 'ef709680-8301-49f5-bda5-030d45f198c3', 'https://bizweb.dktcdn.net/100/408/038/products/d779d562f9c39a4fe80c8e3e40e615deac759fb3.jpg?v=1746268974987', 'Soft Cotton Shirt 18 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #70
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '3730a1d6-fdfe-4c5e-b624-e39a3d7433fc', '53aaf7fe-a525-45ba-a291-00197093ea30', 'https://bizweb.dktcdn.net/100/408/038/products/cc7aa160ccfb6b531bbefee3f3c551c1210bb046.jpg?v=1746268974987', 'Soft Cotton Shirt 02 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #71
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '617c6b30-73d5-41d3-b76e-f7a8770fdd41', '4911c3e8-8e23-4f7c-a982-aa1b30290a24', 'https://cdn.hstatic.net/products/200000886795/00x4_a59fcf4761ce4f3ba2dbb98c144f7606_d00277f452d04a0080de913ea2a332ee_c73f85be70d043808ab91be032eea7cf.jpg', 'Soft Cotton Shirt 10 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #72
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'd7d75afc-0c77-4a1f-bf3c-f7e88673da0d', '397936de-d39c-4b06-9196-10e10172e668', 'https://polomanor.vn/cdn/shop/files/Polomanor_Somi_ExtraC_XanhNhat.jpg?v=1756867701', 'Soft Cotton Shirt 14 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #73
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '8a6cc46f-8ab3-46c2-b4ab-c99e19f30a81', '6d7e3445-26a7-4fbb-8ee8-2a67db20be9a', 'https://www.dhresource.com/webp/m/0x0/f2/albu/g8/M00/33/97/rBVaVF2x7OiAQ_7KAARJ1FcdofM786.jpg', 'Warm Wool/Duffle Coat 12 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #74
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'd1ffb96f-a717-4d11-87ec-b3e90344d94c', '053fe40e-bddb-4421-a620-6bdf8e89b380', 'https://img4.dhresource.com/webp/m/0x0/f3/albu/jc/g/13/02e22ed6-24df-4aad-801d-e362aabc3f8d.jpg', 'Warm Wool/Duffle Coat 20 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #75
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '913a59c7-26f9-4f3b-b1ed-b3e8a933a4ad', '85421517-5bf0-485f-8d8f-ca1972b88b8e', 'https://product.hstatic.net/200000370449/product/hoodie_fire_den_truoc_fae7ec22d59448e98aa6001e734986be_master.png', 'Warm Brushed Fleece Hoodie 15 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #76
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'b5946b59-c065-4b23-9fa6-b3f55299f676', '94d3b6dc-beaf-4fed-b320-020d1551b561', 'https://linhvnxk.com/wp-content/uploads/2023/03/bo-hoodie-uni-10.jpg', 'Warm Brushed Fleece Hoodie 03 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #77
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'ff5e1af3-517a-472e-8616-d2458a6b1248', '224d1eb8-cb07-4b9f-8ab4-5f7daa4bc895', 'https://bizweb.dktcdn.net/100/031/560/products/broshop-non-luoi-trai-uag-chinh-hang-2024-1.jpg?v=1701681541413', 'Classic Fit Cap 12 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #78
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'd68d1b2c-c0fa-4530-b5b7-fc802f984b1e', 'affd2d58-6107-48af-8aaf-671fec6e65a5', 'https://cdn0199.cdn4s.com/media/264233050_1076654613166040_8421224920705284421_n.jpg', 'Durable Denim Jeans 12 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #79
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'e358c10d-8b46-44c1-ba0e-d2cd1db8b74f', 'c38b1cd6-daa0-40e7-a157-dddaf03b8c15', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrM4_Guxz9YToWe8r8qjdnTxMxnyJj0gbpdQ&s', 'Thick Cotton Chino Pants 17 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #80
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'e26b204c-97f3-4c9a-aa7d-0ff5d03b04b3', '4cc7ead1-e8b9-4c53-8d26-bf8a02c6ec3d', 'https://4menshop.com/images/thumbs/2021/02/quan-short-kaki-tron-qs009-15966-slide-products-6018ca1994e38.png', 'Breathable Shorts 07 - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-10-13 15:41:12.282244'::timestamp, '2025-10-13 15:41:12.282244'::timestamp
);

-- Image #81
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '5bb791bc-7618-4b2d-95fd-ece3a6d36b22', '550e8400-e29b-41d4-a716-446655440101', 'https://ogpuns.com/wp-content/uploads/totoro-puns-new-1024x1024.jpg', 'Studio Ghibli Totoro Figure 30cm Tall - Main Image', 0, TRUE,
    1024, 1024, NULL, NULL, '2025-12-11 19:58:59.147561'::timestamp, '2025-12-11 19:58:59.147561'::timestamp
);

-- Image #82
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '2b99f2fe-da68-4a19-a277-6cc96626ac01', '550e8400-e29b-41d4-a716-446655440102', 'https://pics.craiyon.com/2024-09-15/LWGZuOCURMW78MGC73DMkg.webp', 'Totoro Mini Set 3 Pieces - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-12-11 19:58:59.147561'::timestamp, '2025-12-11 19:58:59.147561'::timestamp
);

-- Image #83
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '1b1e5520-0e35-43f9-b36d-83954e01d153', '550e8400-e29b-41d4-a716-446655440103', 'https://tse2.mm.bing.net/th/id/OIP.JmmMY5b1yytO739IRVEX2wHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3', 'No-Face Spirited Away Figure 25cm - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-12-11 19:58:59.147561'::timestamp, '2025-12-11 19:58:59.147561'::timestamp
);

-- Image #84
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'b950e665-a0c1-4837-adda-4a5c6bc92d4c', '550e8400-e29b-41d4-a716-446655440104', 'https://i.pinimg.com/originals/01/b2/db/01b2dbf37e4bd766185b3dcbaf77d23e.jpg', 'No-Face on Spirit Train Set - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-12-11 19:58:59.147561'::timestamp, '2025-12-11 19:58:59.147561'::timestamp
);

-- Image #85
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '5eb69bc3-9875-4f26-bcbc-35eb2d50028e', '550e8400-e29b-41d4-a716-446655440105', 'https://tse2.mm.bing.net/th/id/OIP.6IL8v2a-qGT-pkeRy6tHowHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3', 'Soot Sprites Set 10 Pieces - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-12-11 19:58:59.147561'::timestamp, '2025-12-11 19:58:59.147561'::timestamp
);

-- Image #86
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '359589ca-ae36-44cd-a3a9-d197ce8466f9', '550e8400-e29b-41d4-a716-446655440106', 'https://tse1.mm.bing.net/th/id/OIP.vRUjGr0ck5soYccznFX3DwHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3', 'Soot Sprite Holding Golden Star Keychain - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-12-11 19:58:59.147561'::timestamp, '2025-12-11 19:58:59.147561'::timestamp
);

-- Image #87
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '8ac8ad58-d599-433f-b62a-024531734839', '550e8400-e29b-41d4-a716-446655440107', 'https://tse1.explicit.bing.net/th/id/OIP.sZKgXT_SUoyNOW4FFjUkbwHaHa?cb=12&w=800&h=800&rs=1&pid=ImgDetMain&o=7&rm=3', 'Totoro Snow Globe with Camphor Tree - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-12-11 19:58:59.147561'::timestamp, '2025-12-11 19:58:59.147561'::timestamp
);

-- Image #88
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'd5ca8de9-6460-4b9e-aebe-3a44c43062d6', '550e8400-e29b-41d4-a716-446655440108', 'https://ghiblimerchandise.com/wp-content/uploads/2022/02/spirited-away-chihiro-no-face-rainbow-glowing-snowflakes-music-box-350.jpg', 'No-Face Snow Globe on Spirit Train - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-12-11 19:58:59.147561'::timestamp, '2025-12-11 19:58:59.147561'::timestamp
);

-- Image #89
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'c190ab53-e378-4d05-a465-981b14e6c261', '550e8400-e29b-41d4-a716-446655440109', 'https://i.etsystatic.com/26279387/r/il/3c1510/3214779777/il_1588xN.3214779777_fjb6.jpg', 'Soot Sprites Snow Globe with Candy - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-12-11 19:58:59.147561'::timestamp, '2025-12-11 19:58:59.147561'::timestamp
);

-- Image #90
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '11ccb7f9-c002-4298-967c-f6c152425c9c', '550e8400-e29b-41d4-a716-446655440111', 'https://down-my.img.susercontent.com/file/3253c563aa91ce870b5df2cd4c5e3219', 'Totoro Limited Edition Raincoat Version - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-12-11 19:58:59.147561'::timestamp, '2025-12-11 19:58:59.147561'::timestamp
);

-- Image #91
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '8466d459-ee0c-4536-89a2-b98e389133e9', '550e8400-e29b-41d4-a716-446655440112', 'https://i.pinimg.com/736x/9e/ce/3f/9ece3ff5a0d5d1a7e0af98377c168458.jpg', 'No-Face Gold Plated Limited Edition - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-12-11 19:58:59.147561'::timestamp, '2025-12-11 19:58:59.147561'::timestamp
);

-- Image #92
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'e79a6dee-911e-41a4-9f89-be82723af0cf', '550e8400-e29b-41d4-a716-446655440113', 'https://i.pinimg.com/originals/1d/96/53/1d965300b599f356c70a90d86daacf1b.jpg', 'Soot Sprites LED Night Light Set - Main Image', 0, TRUE,
    800, 800, NULL, NULL, '2025-12-11 19:58:59.147561'::timestamp, '2025-12-11 19:58:59.147561'::timestamp
);

-- Image #93
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    'bc730bee-df5c-4b24-a857-721a5076c908', '550e8400-e29b-41d4-a716-446655440114', 'https://tse1.explicit.bing.net/th/id/OIP.vUgy4BGW_HP-OHJD2TzgGwHaHa?cb=12&w=1000&h=1000&rs=1&pid=ImgDetMain&o=7&rm=3', 'Snow Globe Totoro Sleeping on Grass - Main Image', 0, TRUE,
    1000, 1000, NULL, NULL, '2025-12-11 19:58:59.147561'::timestamp, '2025-12-11 19:58:59.147561'::timestamp
);

-- Image #94
INSERT INTO product_images (
    id, "productId", url, "altText", "sortOrder", "isPrimary", 
    width, height, "fileSize", "mimeType", "createdAt", "updatedAt"
) VALUES (
    '0c1a90d7-c5c2-4b5b-ad47-2cb5863b2500', '550e8400-e29b-41d4-a716-446655440115', 'https://tse1.mm.bing.net/th/id/OIP.gtYMzcYrKky6E_llA1A5AwHaHa?cb=12&w=600&h=600&rs=1&pid=ImgDetMain&o=7&rm=3', 'Totoro Family Miniature Garden Set - Main Image', 0, TRUE,
    600, 600, NULL, NULL, '2025-12-11 19:58:59.147561'::timestamp, '2025-12-11 19:58:59.147561'::timestamp
);

