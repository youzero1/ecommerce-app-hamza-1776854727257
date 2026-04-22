import { notFound } from 'next/navigation';
import { sampleProducts } from '@/lib/sample-data';
import { getSupabaseClient } from '@/lib/supabase';
import type { Product } from '@/types';
import ProductDetailClient from './product-detail-client';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) {
    return { title: 'Product Not Found - ShopWave' };
  }
  return {
    title: `${product.name} - ShopWave`,
    description: product.description,
  };
}

async function getProduct(id: string): Promise<Product | null> {
  const supabase = getSupabaseClient();
  if (supabase) {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (data) {
      return data as Product;
    }
  }
  const fallback = sampleProducts.find((p) => p.id === id);
  return fallback || null;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
