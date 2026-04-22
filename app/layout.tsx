import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { CartProvider } from '@/lib/cart-context';

export const metadata: Metadata = {
  title: 'ShopWave - Your Online Store',
  description:
    'Discover quality products at great prices. Shop electronics, clothing, home goods, sports gear, books, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
