-- Insert 3 default shipping methods for supplier: 750e8400-e29b-41d4-a716-446655440002

INSERT INTO "shipping_methods" 
("id", "supplierId", "name", "description", "price", "estimatedDays", "isActive", "createdAt", "updatedAt")
VALUES
(
    uuid_generate_v4(),
    '750e8400-e29b-41d4-a716-446655440002',
    'Fast',
    'Fast delivery service',
    7000,
    '2-3 days',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    uuid_generate_v4(),
    '750e8400-e29b-41d4-a716-446655440002',
    'Super Fast',
    'Super fast delivery service',
    10000,
    '1-2 days',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    uuid_generate_v4(),
    '750e8400-e29b-41d4-a716-446655440002',
    'Heavy Product',
    'Shipping for heavy products',
    7000,
    '3-5 days',
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

