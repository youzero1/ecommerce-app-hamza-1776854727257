'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  ChevronLeft,
  Truck,
  Shield,
  RotateCcw,
  Check,
} from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/lib/cart-context';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-square flex items-center justify-center">
          <span className="text-9xl">📦</span>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-2">
            <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mt-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-medium text-gray-700">{product.rating}</span>
            <span className="text-gray-400">
              ({product.reviews_count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <span className="text-4xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mt-6 leading-relaxed">
            {product.description}
          </p>

          {/* Stock */}
          <div className="mt-4">
            {product.stock > 0 ? (
              <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                <Check className="h-4 w-4" />
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-100 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 font-medium text-gray-900 min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="p-3 hover:bg-gray-100 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 py-3 px-8 rounded-lg font-semibold transition-colors ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              } disabled:bg-gray-300 disabled:cursor-not-allowed`}
            >
              {addedToCart ? (
                <>
                  <Check className="h-5 w-5" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 border-t border-gray-200 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck className="h-5 w-5 text-primary-600" />
              Free Shipping
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-5 w-5 text-primary-600" />
              Secure Payment
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <RotateCcw className="h-5 w-5 text-primary-600" />
              30-Day Returns
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
