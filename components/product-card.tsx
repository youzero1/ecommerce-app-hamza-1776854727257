'use client';

import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/lib/cart-context';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Electronics: 'bg-blue-100 text-blue-700',
      Clothing: 'bg-pink-100 text-pink-700',
      'Home & Garden': 'bg-green-100 text-green-700',
      Sports: 'bg-orange-100 text-orange-700',
      Books: 'bg-purple-100 text-purple-700',
      Toys: 'bg-yellow-100 text-yellow-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square bg-gray-100 relative overflow-hidden flex items-center justify-center">
          <span className="text-6xl">{getCategoryEmoji(product.category)}</span>
          {product.stock < 10 && product.stock > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Low Stock
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(
              product.category
            )}`}
          >
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600">
              {product.rating} ({product.reviews_count})
            </span>
          </div>
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="inline-flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
