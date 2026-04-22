import ProductCard from '@/components/product-card';
import { sampleProducts } from '@/lib/sample-data';
import { getSupabaseClient } from '@/lib/supabase';
import type { Product } from '@/types';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  let products: Product[] = sampleProducts;

  try {
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
  } catch (e) {
    // Supabase not configured, use sample data
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="text-gray-500 mt-1">Browse our full collection</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
