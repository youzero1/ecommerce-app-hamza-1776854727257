import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <span className="text-8xl">😕</span>
      <h1 className="text-3xl font-bold text-gray-900 mt-6">Page Not Found</h1>
      <p className="text-gray-500 mt-3 max-w-md mx-auto">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might
        have been moved or doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 btn-primary"
      >
        Go Home
      </Link>
    </div>
  );
}
