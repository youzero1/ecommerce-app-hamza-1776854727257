import { Package } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold text-white">ShopWave</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Your one-stop destination for quality products at great prices.
              We curate the best items across electronics, fashion, home, sports,
              and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  About Us
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Contact
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  FAQ
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Shipping Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Returns
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                  Track Order
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} ShopWave. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
