import ProductCard from '@/components/product-card';
import { sampleProducts } from '@/lib/sample-data';
import { getSupabaseClient } from '@/lib/supabase';
import type { Product } from '@/types';

export const metadata = {
  title: 'All Products - ShopWave',
  description: 'Browse our complete catalog of quality products.',
};

export default async function ProductsPage() {
  let products: Product[] = sampleProducts;

  const supabase = getSupabaseClient();
  if (supabase) {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (data && data.length > 0) {
      products = data as Product[];
    }
  }

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-500 mt-2">
          Showing {products.length} products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <h2 className="font-semibold text-gray-900 mb-4">Categories</h2>
            <ul className="space-y-2">
              <li>
                <span className="text-primary-600 font-medium cursor-pointer">
                  All Products
                </span>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <span className="text-gray-600 hover:text-primary-600 cursor-pointer transition-colors">
                    {cat}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <h2 className="font-semibold text-gray-900 mb-4">Price Range</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="price" className="text-primary-600" defaultChecked />
                  All Prices
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="price" className="text-primary-600" />
                  Under $50
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="price" className="text-primary-600" />
                  $50 - $100
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="price" className="text-primary-600" />
                  $100 - $200
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="price" className="text-primary-600" />
                  Over $200
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
