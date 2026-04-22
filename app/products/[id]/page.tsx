import { notFound } from 'next/navigation';
import { sampleProducts } from '@/lib/sample-data';
import { getSupabaseClient } from '@/lib/supabase';
import type { Product } from '@/types';
import AddToCartButton from '@/components/add-to-cart-button';
import { Star } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  let product: Product | null = null;

  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();
      if (data) {
        product = data as Product;
      }
    }
  } catch (e) {
    // Supabase not configured
  }

  if (!product) {
    product = sampleProducts.find((p) => p.id === params.id) || null;
  }

  if (!product) {
    notFound();
  }

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      Electronics: '⚡',
      Clothing: '👕',
      'Home & Garden': '🏠',
      Sports: '🏃',
      Books: '📚',
      Toys: '🧸',
    };
    return emojis[category] || '📦';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-primary-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center">
          <span className="text-9xl">{getCategoryEmoji(product.category)}</span>
        </div>

        <div>
          <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-3">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product!.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.rating} ({product.reviews_count} reviews)
            </span>
          </div>

          <p className="text-4xl font-bold text-gray-900 mt-6">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">✓ In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-600 font-medium">✗ Out of Stock</span>
            )}
          </div>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
