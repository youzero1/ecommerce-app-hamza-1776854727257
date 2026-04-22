import ProductCard from '@/components/product-card';
import { sampleProducts, sampleCategories } from '@/lib/sample-data';
import { getSupabaseClient } from '@/lib/supabase';
import type { Product } from '@/types';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = sampleCategories.find((c) => c.slug === params.slug);
  if (!category) {
    return { title: 'Category Not Found - ShopWave' };
  }
  return {
    title: `${category.name} - ShopWave`,
    description: `Browse ${category.name} products at ShopWave.`,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = sampleCategories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  let products: Product[] = sampleProducts.filter(
    (p) => p.category === category.name
  );

  const supabase = getSupabaseClient();
  if (supabase) {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('category', category.name)
      .order('created_at', { ascending: false });
    if (data && data.length > 0) {
      products = data as Product[];
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          href="/categories"
          className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Categories
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        <p className="text-gray-500 mt-2">
          {products.length} product{products.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-6xl">🔍</span>
          <h2 className="text-xl font-semibold text-gray-900 mt-4">
            No products found
          </h2>
          <p className="text-gray-500 mt-2">
            Check back soon for new arrivals in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
