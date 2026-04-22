import Link from 'next/link';
import type { Category } from '@/types';

const categoryEmojis: Record<string, string> = {
  electronics: '🔌',
  clothing: '👕',
  'home-garden': '🏡',
  sports: '⚽',
  books: '📚',
  toys: '🧸',
};

const categoryGradients: Record<string, string> = {
  electronics: 'from-blue-400 to-blue-600',
  clothing: 'from-pink-400 to-pink-600',
  'home-garden': 'from-green-400 to-green-600',
  sports: 'from-orange-400 to-orange-600',
  books: 'from-purple-400 to-purple-600',
  toys: 'from-yellow-400 to-yellow-600',
};

export default function CategoryCard({ category }: { category: Category }) {
  const emoji = categoryEmojis[category.slug] || '📦';
  const gradient = categoryGradients[category.slug] || 'from-gray-400 to-gray-600';

  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <div
          className={`bg-gradient-to-br ${gradient} aspect-[4/3] flex flex-col items-center justify-center p-6`}
        >
          <span className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
            {emoji}
          </span>
          <h3 className="text-white font-bold text-lg">{category.name}</h3>
          <p className="text-white/80 text-sm mt-1">
            {category.product_count} products
          </p>
        </div>
      </div>
    </Link>
  );
}
