'use client';

import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/lib/cart-context';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const categoryColors: Record<string, string> = {
    Electronics: 'bg-blue-100 text-blue-800',
    Clothing: 'bg-pink-100 text-pink-800',
    'Home & Garden': 'bg-green-100 text-green-800',
    Sports: 'bg-orange-100 text-orange-800',
    Books: 'bg-purple-100 text-purple-800',
    Toys: 'bg-yellow-100 text-yellow-800',
  };

  const colorClass = categoryColors[product.category] || 'bg-gray-100 text-gray-800';

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group border border-gray-100">
      {/* Image Placeholder */}
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">📦</span>
          </div>
          <div className="absolute top-3 left-3">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${colorClass}`}
            >
              {product.category}
            </span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">
            {product.rating}
          </span>
          <span className="text-sm text-gray-400">
            ({product.reviews_count})
          </span>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
