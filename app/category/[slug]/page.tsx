'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchCategoryBySlug, fetchProductsByCategory } from '../../lib/api';
import { Category, Product } from '../../types';
import ProductCard from '../../component/ProductCard';

function CategoryContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    async function loadData() {
      try {
        const [catData, prodData] = await Promise.all([
          fetchCategoryBySlug(slug),
          fetchProductsByCategory(slug),
        ]);
        setCategory(catData);
        setProducts(prodData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse space-y-6">
        <div className="h-24 bg-white rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="h-40 bg-white rounded-xl" />
          <div className="h-40 bg-white rounded-xl" />
          <div className="h-40 bg-white rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <span className="text-4xl bg-gray-50 p-3 rounded-xl">
          {category?.emoji || '🏷️'}
        </span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {category?.name || slug}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            এই ক্যাটাগরির সমস্ত পণ্যের আজকের বাজার দর
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
          <div className="h-24 bg-white rounded-2xl" />
        </div>
      }
    >
      <CategoryContent />
    </Suspense>
  );
}