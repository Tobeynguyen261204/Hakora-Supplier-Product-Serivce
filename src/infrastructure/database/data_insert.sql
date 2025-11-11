-- Bulk generated seed: 20 shoes, 20 hats, 20 tops (áo), 20 pants (quần)
-- Notes:
-- - Long, realistic descriptions are synthesized with concrete materials, features, and usage scenarios.
-- - Image URLs use Picsum with deterministic seeds based on SKU to guarantee availability and consistency.
-- - Update URLs later to your own CDN if needed (mapping by SKU).

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================
-- 20 SHOES
-- ==========================
WITH s AS (
  SELECT
    uuid_generate_v4()                         AS id,
    '44444444-4444-4444-4444-444444444444'::uuid AS "supplierId",
    (CASE (i % 4)
      WHEN 0 THEN 'Giày chạy bộ đệm khí ProRun ' || to_char(i, 'FM00')
      WHEN 1 THEN 'Sneaker Street Classic ' || to_char(i, 'FM00')
      WHEN 2 THEN 'Giày tây da Oxford Formal ' || to_char(i, 'FM00')
      ELSE        'Giày leo núi chống nước TrailGuard ' || to_char(i, 'FM00')
    END) AS name,
    (CASE (i % 4)
      WHEN 0 THEN 'Giày chạy bộ với đệm khí đa lớp và midsole EVA phản hồi lực tốt. Thân lưới kỹ thuật thoáng khí, khô nhanh khi chạy đường dài. Gót TPU ổn định, dây dẹt chống tuột. Phù hợp luyện tập hằng ngày và các giải 5K/10K.'
      WHEN 1 THEN 'Sneaker phong cách tối giản, upper da PU dễ vệ sinh, lót memory foam êm ái, đế cao su lưu hóa bám đường. Dễ phối với quần jean, chinos, hay short để đi làm, đi chơi.'
      WHEN 2 THEN 'Giày tây Oxford dáng cap-toe, da PU hạt mịn, form đứng lịch lãm. Lót microfiber thoáng khí, đế cao su tổng hợp chống trượt, phù hợp môi trường công sở và sự kiện.'
      ELSE        'Giày leo núi cổ mid, màng chống nước breathable, mũi bọc cao su chống đá văng. Gai đế sâu bám tốt trên địa hình đất ẩm, sỏi, trekking cuối tuần.'
    END) || ' Thông số cốt lõi: upper bền, đường may chắc, cổ giày ôm chân vừa vặn, hỗ trợ cả ngày dài.' AS description,
    (CASE (i % 4)
      WHEN 0 THEN 'Giày chạy bộ êm và thoáng'
      WHEN 1 THEN 'Sneaker tối giản, dễ phối đồ'
      WHEN 2 THEN 'Giày tây lịch lãm'
      ELSE        'Giày leo núi chống nước, bám tốt'
    END) AS "shortDescription",
    (CASE (i % 4)
      WHEN 0 THEN 'SHOES-RUN-' || to_char(i, 'FM000')
      WHEN 1 THEN 'SHOES-LIFE-' || to_char(i, 'FM000')
      WHEN 2 THEN 'SHOES-OXF-' || to_char(i, 'FM000')
      ELSE        'SHOES-HIKE-' || to_char(i, 'FM000')
    END) AS sku,
    (CASE (i % 4)
      WHEN 0 THEN 'Giày chạy bộ'
      WHEN 1 THEN 'Giày sneaker'
      WHEN 2 THEN 'Giày tây'
      ELSE        'Giày leo núi'
    END) AS "categoryName",
    jsonb_build_object('listingPrice', 700000 + (i * 5000), 'retailPrice', 800000 + (i * 5000), 'currency', 'VND') AS price,
    jsonb_build_object('quantity', 20 + (i % 50)) AS inventory,
    jsonb_build_object(
      'specifications', jsonb_build_object(
        'upper', (CASE (i % 4) WHEN 0 THEN 'mesh' WHEN 1 THEN 'da PU' WHEN 2 THEN 'da PU hạt mịn' ELSE 'synthetic + textile' END),
        'midsole', (CASE (i % 4) WHEN 0 THEN 'EVA + đệm khí' WHEN 1 THEN 'memory foam' WHEN 2 THEN 'foam' ELSE 'EVA' END),
        'outsole', 'cao su chống mài mòn',
        'drop', (CASE (i % 4) WHEN 0 THEN '8mm' ELSE '10mm' END)
      ),
      'materials', to_jsonb(ARRAY['cao su','EVA','PU']),
      'colors', to_jsonb(ARRAY['đen','trắng','xám','xanh']),
      'sizes', to_jsonb(ARRAY['39','40','41','42','43'])
    ) AS specifications,
    'PHYSICAL' AS type,
    'PUBLISHED' AS status,
    'APPROVED' AS "approvalStatus",
    ARRAY['giày','thoải mái','bám tốt']::text[] AS tags,
    TRUE AS "isActive",
    (i % 7 = 0) AS "isFeatured",
    FALSE AS "isSuspend",
    (0.6 + (i % 5) * 0.05)::decimal(10,2) AS weight,
    jsonb_build_object('length', 30 + (i % 3) * 1, 'width', 19 + (i % 2) * 1, 'height', 11 + (i % 2) * 1, 'unit', 'cm') AS dimensions,
    jsonb_build_object('metaTitle', 'Giày chất lượng ' || to_char(i, 'FM00'), 'metaDescription', 'Sản phẩm bền bỉ cho nhu cầu sử dụng hằng ngày', 'keywords', to_jsonb(ARRAY['giày','đế cao su','êm'])) AS "seoData",
    now() AS "createdAt",
    now() AS "updatedAt",
    now() AS "approvedAt",
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid AS "approvedBy",
    NULL::text AS "rejectionReason"
  FROM generate_series(1, 20) g(i)
)
INSERT INTO supplier_products (
  id, "supplierId", name, description, "shortDescription", sku, "categoryName",
  price, inventory, specifications, type, status, "approvalStatus",
  tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
  "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason"
)
SELECT * FROM s;

INSERT INTO product_images (id, "productId", url, "altText", "sortOrder", "isPrimary", width, height, "createdAt", "updatedAt")
SELECT uuid_generate_v4(), sp.id,
       'https://picsum.photos/seed/' || lower(replace(sp.sku, ' ', '-')) || '/800/800',
       sp.name || ' - Ảnh chính', 0, TRUE, 800, 800, now(), now()
FROM supplier_products sp
WHERE sp."categoryName" IN ('Giày chạy bộ','Giày sneaker','Giày tây','Giày leo núi')
  AND sp."createdAt"::date = current_date;

-- ==========================
-- 20 HATS
-- ==========================
WITH h AS (
  SELECT
    uuid_generate_v4() AS id,
    '44444444-4444-4444-4444-444444444444'::uuid AS "supplierId",
    (CASE (i % 4)
      WHEN 0 THEN 'Nón lưỡi trai Classic Fit ' || to_char(i, 'FM00')
      WHEN 1 THEN 'Mũ bucket Daily Bucket ' || to_char(i, 'FM00')
      WHEN 2 THEN 'Nón len beanie ấm áp ' || to_char(i, 'FM00')
      ELSE        'Mũ fedora dạ Classic ' || to_char(i, 'FM00')
    END) AS name,
    (CASE (i % 4)
      WHEN 0 THEN 'Nón lưỡi trai vành cong che nắng tốt, vải twill dày dặn ít nhăn, thấm hút mồ hôi. Khóa gài kim loại sau nón dễ tùy chỉnh, logo thêu nổi tinh tế, phù hợp chạy bộ nhẹ và mang hằng ngày.'
      WHEN 1 THEN 'Mũ bucket canvas mềm, có lỗ thoáng khí xung quanh, gập gọn dễ mang theo. Vành rộng vừa, đường may chắc chắn giữ phom ổn định, phong cách tối giản dễ phối đồ.'
      WHEN 2 THEN 'Nón len beanie dệt gân co giãn, phủ tai giữ ấm, sợi acrylic pha cotton hạn chế ngứa. Kiểu dáng tối giản phù hợp áo khoác dạ, hoodie trong mùa lạnh.'
      ELSE        'Mũ fedora chất liệu dạ mềm, vành trung bình giữ phom, dải ruy băng satin tinh tế. Viền mồ hôi thấm hút, đội thoải mái, phù hợp dạo phố và sự kiện.'
    END) || ' Chất liệu bền, đường may tỉ mỉ, thiết kế nhấn mạnh công năng và thẩm mỹ.' AS description,
    (CASE (i % 4)
      WHEN 0 THEN 'Nón lưỡi trai vành cong, logo thêu'
      WHEN 1 THEN 'Mũ bucket canvas, gập gọn'
      WHEN 2 THEN 'Nón len beanie ấm, co giãn'
      ELSE        'Mũ fedora dạ, lịch lãm'
    END) AS "shortDescription",
    (CASE (i % 4)
      WHEN 0 THEN 'HAT-CAP-' || to_char(i, 'FM000')
      WHEN 1 THEN 'HAT-BUCK-' || to_char(i, 'FM000')
      WHEN 2 THEN 'HAT-BEAN-' || to_char(i, 'FM000')
      ELSE        'HAT-FEDO-' || to_char(i, 'FM000')
    END) AS sku,
    (CASE (i % 4)
      WHEN 0 THEN 'Nón lưỡi trai'
      WHEN 1 THEN 'Mũ bucket'
      WHEN 2 THEN 'Nón len'
      ELSE        'Mũ fedora'
    END) AS "categoryName",
    jsonb_build_object('listingPrice', 140000 + (i * 2000), 'retailPrice', 180000 + (i * 2000), 'currency', 'VND') AS price,
    jsonb_build_object('quantity', 40 + (i % 60)) AS inventory,
    jsonb_build_object(
      'specifications', jsonb_build_object('fabric', 'cotton/dạ', 'feature', 'thoáng khí/giữ ấm', 'care', 'giặt tay nhẹ'),
      'materials', to_jsonb(ARRAY['cotton','acrylic','wool felt']),
      'colors', to_jsonb(ARRAY['đen','be','xanh rêu','xám']),
      'sizes', to_jsonb(ARRAY['free size','M','L'])
    ) AS specifications,
    'PHYSICAL' AS type,
    'PUBLISHED' AS status,
    'APPROVED' AS "approvalStatus",
    ARRAY['nón','che nắng','giữ ấm']::text[] AS tags,
    TRUE AS "isActive",
    (i % 6 = 0) AS "isFeatured",
    FALSE AS "isSuspend",
    (0.12 + (i % 4) * 0.02)::decimal(10,2) AS weight,
    jsonb_build_object('length', 22, 'width', 22, 'height', 12, 'unit', 'cm') AS dimensions,
    jsonb_build_object('metaTitle', 'Mũ/Nón chất lượng ' || to_char(i, 'FM00'), 'metaDescription', 'Bền, nhẹ, thoáng khí', 'keywords', to_jsonb(ARRAY['nón','mũ','thời trang'])) AS "seoData",
    now(), now(), now(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, NULL
  FROM generate_series(1, 20) g(i)
)
INSERT INTO supplier_products (
  id, "supplierId", name, description, "shortDescription", sku, "categoryName",
  price, inventory, specifications, type, status, "approvalStatus",
  tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
  "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason"
)
SELECT * FROM h;

INSERT INTO product_images (id, "productId", url, "altText", "sortOrder", "isPrimary", width, height, "createdAt", "updatedAt")
SELECT uuid_generate_v4(), sp.id,
       'https://picsum.photos/seed/' || lower(replace(sp.sku, ' ', '-')) || '/800/800',
       sp.name || ' - Ảnh chính', 0, TRUE, 800, 800, now(), now()
FROM supplier_products sp
WHERE sp."categoryName" IN ('Nón lưỡi trai','Mũ bucket','Nón len','Mũ fedora')
  AND sp."createdAt"::date = current_date;

-- ==========================
-- 20 TOPS (ÁO)
-- ==========================
WITH t AS (
  SELECT
    uuid_generate_v4() AS id,
    '44444444-4444-4444-4444-444444444444'::uuid AS "supplierId",
    (CASE (i % 4)
      WHEN 0 THEN 'Áo khoác dạ/duffle ấm ' || to_char(i, 'FM00')
      WHEN 1 THEN 'Áo len cổ lọ mềm ' || to_char(i, 'FM00')
      WHEN 2 THEN 'Áo sơ mi cotton mịn ' || to_char(i, 'FM00')
      ELSE        'Áo hoodie nỉ chải ấm ' || to_char(i, 'FM00')
    END) AS name,
    (CASE (i % 4)
      WHEN 0 THEN 'Áo khoác dạ lót mềm, giữ nhiệt tốt, đường may tinh gọn, mũ chùm tháo rời. Phù hợp di chuyển sáng sớm/đêm lạnh, form đứng tôn dáng.'
      WHEN 1 THEN 'Áo len cổ lọ sợi cotton blend co giãn, giữ ấm vùng cổ và ngực, bề mặt mịn ít xù. Dễ phối blazer/áo khoác.'
      WHEN 2 THEN 'Áo sơ mi cotton dệt twill nhẹ, hút ẩm nhanh, cổ button-down giữ form. Phù hợp công sở và đi chơi.'
      ELSE        'Áo hoodie nỉ chải bề mặt trong, ấm và mềm, mũ dây rút, bo tay/bo gấu giữ nhiệt. Phù hợp dạo phố, du lịch.'
    END) || ' Chất liệu đạt chuẩn, kiểm tra co giãn và bền màu qua nhiều lần giặt.' AS description,
    (CASE (i % 4)
      WHEN 0 THEN 'Áo khoác ấm, form đứng'
      WHEN 1 THEN 'Áo len cổ lọ mềm'
      WHEN 2 THEN 'Áo sơ mi cotton thoáng'
      ELSE        'Áo hoodie ấm, thoải mái'
    END) AS "shortDescription",
    (CASE (i % 4)
      WHEN 0 THEN 'TOP-COAT-' || to_char(i, 'FM000')
      WHEN 1 THEN 'TOP-SWEA-' || to_char(i, 'FM000')
      WHEN 2 THEN 'TOP-SHIRT-' || to_char(i, 'FM000')
      ELSE        'TOP-HOOD-' || to_char(i, 'FM000')
    END) AS sku,
    (CASE (i % 4)
      WHEN 0 THEN 'Áo khoác'
      WHEN 1 THEN 'Áo len'
      WHEN 2 THEN 'Áo sơ mi'
      ELSE        'Áo hoodie'
    END) AS "categoryName",
    jsonb_build_object('listingPrice', 260000 + (i * 4000), 'retailPrice', 320000 + (i * 4000), 'currency', 'VND') AS price,
    jsonb_build_object('quantity', 30 + (i % 40)) AS inventory,
    jsonb_build_object(
      'specifications', jsonb_build_object('material', 'cotton/poly', 'season', (CASE (i % 4) WHEN 0 THEN 'đông' WHEN 1 THEN 'đông' WHEN 2 THEN 'xuân/thu' ELSE 'đông' END), 'fit', 'regular'),
      'materials', to_jsonb(ARRAY['cotton','polyester','wool']),
      'colors', to_jsonb(ARRAY['đen','xám','trắng','be','xanh navy']),
      'sizes', to_jsonb(ARRAY['S','M','L','XL'])
    ) AS specifications,
    'PHYSICAL','PUBLISHED','APPROVED', ARRAY['áo','giữ ấm','thoáng'], TRUE, (i % 5 = 0), FALSE,
    (0.4 + (i % 6) * 0.05)::decimal(10,2),
    jsonb_build_object('length', 65 + (i % 3) * 2, 'width', 50 + (i % 2) * 2, 'height', 3, 'unit', 'cm'),
    jsonb_build_object('metaTitle', 'Áo chất lượng ' || to_char(i, 'FM00'), 'metaDescription', 'Thoáng khí, giữ ấm, dễ phối', 'keywords', to_jsonb(ARRAY['áo','khoác','len','hoodie'])),
    now(), now(), now(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, NULL
  FROM generate_series(1, 20) g(i)
)
INSERT INTO supplier_products (
  id, "supplierId", name, description, "shortDescription", sku, "categoryName",
  price, inventory, specifications, type, status, "approvalStatus",
  tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
  "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason"
)
SELECT * FROM t;

INSERT INTO product_images (id, "productId", url, "altText", "sortOrder", "isPrimary", width, height, "createdAt", "updatedAt")
SELECT uuid_generate_v4(), sp.id,
       'https://picsum.photos/seed/' || lower(replace(sp.sku, ' ', '-')) || '/800/800',
       sp.name || ' - Ảnh chính', 0, TRUE, 800, 800, now(), now()
FROM supplier_products sp
WHERE sp."categoryName" IN ('Áo khoác','Áo len','Áo sơ mi','Áo hoodie')
  AND sp."createdAt"::date = current_date;

-- ==========================
-- 20 PANTS (QUẦN)
-- ==========================
WITH p AS (
  SELECT
    uuid_generate_v4() AS id,
    '44444444-4444-4444-4444-444444444444'::uuid AS "supplierId",
    (CASE (i % 4)
      WHEN 0 THEN 'Quần jean denim bền ' || to_char(i, 'FM00')
      WHEN 1 THEN 'Quần kaki cotton dày ' || to_char(i, 'FM00')
      WHEN 2 THEN 'Quần jogger co giãn ' || to_char(i, 'FM00')
      ELSE        'Quần short thoáng mát ' || to_char(i, 'FM00')
    END) AS name,
    (CASE (i % 4)
      WHEN 0 THEN 'Quần jean denim dày vừa, co giãn nhẹ, form slim-straight, bền màu sau nhiều lần giặt. Độ dài tiêu chuẩn, phù hợp đi làm, đi chơi.'
      WHEN 1 THEN 'Quần kaki cotton dày vừa, bề mặt mịn, nếp ly ổn định, túi chéo tiện dụng. Phối áo sơ mi/áo thun đều đẹp.'
      WHEN 2 THEN 'Quần jogger thun bo gấu, vải cotton blend co giãn, nhẹ và thoáng. Dây rút chắc, phù hợp vận động và di chuyển nhiều.'
      ELSE        'Quần short cotton/denim nhẹ, thoáng mát mùa hè, đường may gọn sắc. Dễ phối áo thun hoặc sơ mi linen.'
    END) || ' Sợi vải được chọn lọc, kiểm thử co rút và bền màu.' AS description,
    (CASE (i % 4)
      WHEN 0 THEN 'Quần jean bền, form đẹp'
      WHEN 1 THEN 'Quần kaki đứng form'
      WHEN 2 THEN 'Quần jogger thoải mái'
      ELSE        'Quần short nhẹ thoáng'
    END) AS "shortDescription",
    (CASE (i % 4)
      WHEN 0 THEN 'PANT-JEANS-' || to_char(i, 'FM000')
      WHEN 1 THEN 'PANT-CHINO-' || to_char(i, 'FM000')
      WHEN 2 THEN 'PANT-JOGG-' || to_char(i, 'FM000')
      ELSE        'PANT-SHORT-' || to_char(i, 'FM000')
    END) AS sku,
    (CASE (i % 4)
      WHEN 0 THEN 'Quần jean'
      WHEN 1 THEN 'Quần kaki'
      WHEN 2 THEN 'Quần jogger'
      ELSE        'Quần short'
    END) AS "categoryName",
    jsonb_build_object('listingPrice', 240000 + (i * 3000), 'retailPrice', 290000 + (i * 3000), 'currency', 'VND') AS price,
    jsonb_build_object('quantity', 25 + (i % 45)) AS inventory,
    jsonb_build_object(
      'specifications', jsonb_build_object('material', 'cotton/denim', 'thickness', (CASE (i % 4) WHEN 0 THEN 'dày' WHEN 1 THEN 'vừa' WHEN 2 THEN 'vừa' ELSE 'mỏng' END), 'fit', 'regular'),
      'materials', to_jsonb(ARRAY['cotton','denim','spandex']),
      'colors', to_jsonb(ARRAY['xanh','đen','xám','be']),
      'sizes', to_jsonb(ARRAY['28','30','32','34','36'])
    ) AS specifications,
    'PHYSICAL','PUBLISHED','APPROVED', ARRAY['quần','bền','thoáng'], TRUE, (i % 4 = 0), FALSE,
    (0.6 + (i % 5) * 0.06)::decimal(10,2),
    jsonb_build_object('length', 95 + (i % 3) * 3, 'width', 35 + (i % 2) * 2, 'height', 2, 'unit', 'cm'),
    jsonb_build_object('metaTitle', 'Quần chất lượng ' || to_char(i, 'FM00'), 'metaDescription', 'Thoáng, bền, dễ phối', 'keywords', to_jsonb(ARRAY['quần','jeans','kaki','jogger','shorts'])),
    now(), now(), now(), 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, NULL
  FROM generate_series(1, 20) g(i)
)
INSERT INTO supplier_products (
  id, "supplierId", name, description, "shortDescription", sku, "categoryName",
  price, inventory, specifications, type, status, "approvalStatus",
  tags, "isActive", "isFeatured", "isSuspend", weight, dimensions, "seoData",
  "createdAt", "updatedAt", "approvedAt", "approvedBy", "rejectionReason"
)
SELECT * FROM p;

INSERT INTO product_images (id, "productId", url, "altText", "sortOrder", "isPrimary", width, height, "createdAt", "updatedAt")
SELECT uuid_generate_v4(), sp.id,
       'https://picsum.photos/seed/' || lower(replace(sp.sku, ' ', '-')) || '/800/800',
       sp.name || ' - Ảnh chính', 0, TRUE, 800, 800, now(), now()
FROM supplier_products sp
WHERE sp."categoryName" IN ('Quần jean','Quần kaki','Quần jogger','Quần short')
  AND sp."createdAt"::date = current_date;

-- ==========================
-- Auto reviews for newly inserted items today
-- ==========================
INSERT INTO product_reviews (id, "productId", "customerId", rating, title, comment, "isVerified", "isPublished", "helpfulCount", "createdAt", "updatedAt")
SELECT uuid_generate_v4(), sp.id, uuid_generate_v4(),
       CASE WHEN sp."categoryName" LIKE 'Áo%' THEN 5 ELSE 4 END,
       'Chất lượng tốt, đúng mô tả',
       'Sản phẩm hoàn thiện tốt, mặc/đi êm và bền. Kích cỡ chuẩn, màu sắc gần với ảnh. Giao hàng nhanh, đóng gói cẩn thận.',
       TRUE, TRUE, (random()*8)::int, now(), now()
FROM supplier_products sp
WHERE sp."createdAt"::date = current_date;


