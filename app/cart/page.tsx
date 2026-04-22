'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-900 mt-6">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mt-2">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 mt-6 btn-primary"
        >
          Continue Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
            >
              {/* Image */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg w-full sm:w-28 h-28 flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">📦</span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.product.id}`}
                  className="font-semibold text-gray-900 hover:text-primary-600 transition-colors"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  {item.product.category}
                </p>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  ${item.product.price.toFixed(2)}
                </p>

                {/* Quantity & Remove */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-3 font-medium text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-600 p-2 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Line Total */}
              <div className="text-right flex-shrink-0">
                <span className="font-bold text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">
                  {totalPrice >= 50 ? 'Free' : '$4.99'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">
                  ${(totalPrice * 0.08).toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">
                    $
                    {
                      (
                        totalPrice +
                        (totalPrice >= 50 ? 0 : 4.99) +
                        totalPrice * 0.08
                      ).toFixed(2)
                    }
                  </span>
                </div>
              </div>
            </div>

            {totalPrice < 50 && (
              <p className="text-sm text-gray-500 mt-3">
                Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
              </p>
            )}

            <button
              onClick={() => setShowCheckoutMessage(true)}
              className="w-full btn-primary mt-6 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </button>

            {showCheckoutMessage && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                Checkout functionality coming soon! This is a demo store.
              </div>
            )}

            <Link
              href="/products"
              className="block text-center text-primary-600 hover:text-primary-700 font-medium text-sm mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
