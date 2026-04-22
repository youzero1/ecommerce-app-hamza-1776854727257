import Link from 'next/link';
import type { Category } from '@/types';

export default function CategoryCard({ category }: { category: Category }) {
  const getCategoryEmoji = (slug: string) => {
    const emojis: Record<string, string> = {
      electronics: '⚡',
      clothing: '👕',
      'home-garden': '🏠',
      sports: '🏃',
      books: '📚',
      toys: '🧸',
    };
    return emojis[slug] || '📦';
  };

  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md hover:border-primary-300 transition-all group"
    >
      <div className="text-4xl mb-3">{getCategoryEmoji(category.slug)}</div>
      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
        {category.name}
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        {category.product_count} products
      </p>
    </Link>
  );
}
