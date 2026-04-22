import Link from 'next/link';
import { ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';

export default function HeroSection() {
  return (
    <section>
      {/* Main Hero */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Products You&apos;ll Love
            </h1>
            <p className="mt-4 text-lg md:text-xl text-primary-100">
              Shop the latest trends in electronics, fashion, home goods, and
              more. Quality products at prices that make you smile.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary-50 p-3 rounded-lg">
                <Truck className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Free Shipping</p>
                <p className="text-sm text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary-50 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Secure Payment</p>
                <p className="text-sm text-gray-500">100% protected checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary-50 p-3 rounded-lg">
                <RotateCcw className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Easy Returns</p>
                <p className="text-sm text-gray-500">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
