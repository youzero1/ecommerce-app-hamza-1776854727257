-- Create the products table
CREATE TABLE IF NOT EXISTS products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  image_url text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  stock integer NOT NULL DEFAULT 0,
  rating numeric(2,1) NOT NULL DEFAULT 0,
  reviews_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow anonymous (public) reads
CREATE POLICY "products_anon_select" ON products
  FOR SELECT
  TO anon
  USING (true);

-- Seed some sample data
INSERT INTO products (name, description, price, image_url, category, stock, rating, reviews_count) VALUES
  ('Wireless Noise-Cancelling Headphones', 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality.', 299.99, '', 'Electronics', 45, 4.8, 234),
  ('Organic Cotton T-Shirt', 'Soft, breathable organic cotton t-shirt available in multiple colors. Ethically sourced and sustainably produced.', 34.99, '', 'Clothing', 200, 4.5, 89),
  ('Smart Home Security Camera', '1080p HD wireless security camera with night vision, two-way audio, and motion detection.', 79.99, '', 'Electronics', 120, 4.3, 156),
  ('Ceramic Plant Pot Set', 'Set of 3 modern ceramic plant pots with drainage holes and bamboo saucers.', 42.99, '', 'Home & Garden', 75, 4.7, 67),
  ('Running Shoes - UltraBoost', 'Lightweight and responsive running shoes with energy-returning cushioning.', 159.99, '', 'Sports', 60, 4.6, 312),
  ('Bestselling Novel Collection', 'Curated collection of 5 bestselling novels from award-winning authors.', 49.99, '', 'Books', 150, 4.9, 203),
  ('Mechanical Keyboard RGB', 'Full-size mechanical keyboard with cherry MX switches, per-key RGB lighting, and programmable macros.', 129.99, '', 'Electronics', 85, 4.4, 178),
  ('Yoga Mat Premium', 'Extra-thick 6mm yoga mat with non-slip surface and alignment lines.', 54.99, '', 'Sports', 95, 4.7, 145),
  ('Denim Jacket Classic', 'Timeless denim jacket with a modern fit. Features button closure and chest pockets.', 89.99, '', 'Clothing', 110, 4.5, 92),
  ('Wooden Building Blocks Set', '100-piece wooden building blocks set for kids aged 3+. Non-toxic paint, smooth edges.', 29.99, '', 'Toys', 180, 4.8, 211),
  ('Stainless Steel Water Bottle', 'Double-walled vacuum insulated water bottle. Keeps drinks cold 24h or hot 12h.', 24.99, '', 'Sports', 250, 4.6, 387),
  ('LED Desk Lamp', 'Adjustable LED desk lamp with 5 brightness levels, 3 color temperatures, and USB charging port.', 39.99, '', 'Home & Garden', 130, 4.4, 98)
ON CONFLICT DO NOTHING;
