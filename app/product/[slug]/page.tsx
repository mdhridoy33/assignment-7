import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { fetchProductById } from '../../lib/api';
import { toBengaliNumerals, getChangeBadge } from '../../lib/utils';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface BazarPriceItem {
  bazarName: string;
  price: number;
}

async function ProductContent({ params }: PageProps) {
  const { slug } = await params;
  const product = await fetchProductById(slug);

  if (!product) return notFound();

  const badge = getChangeBadge(product.changePercent);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-5xl bg-gray-50 p-3 rounded-xl">{product.emoji}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-xs text-gray-500 mt-0.5">{product.unit}</p>
            <div className="flex gap-2 mt-2">
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs rounded-full font-medium">
                {product.category}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${badge.className}`}>
                {badge.text}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
          <p className="text-xs text-gray-400">সর্বনিম্ন দাম</p>
          <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
            {toBengaliNumerals(product.minPrice || product.currentPrice)} টাকা
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
          <p className="text-xs text-gray-400">সর্বোচ্চ দাম</p>
          <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
            {toBengaliNumerals(product.maxPrice || product.currentPrice)} টাকা
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
          <p className="text-xs text-gray-400">গড় দাম</p>
          <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
            {toBengaliNumerals(product.avgPrice || product.currentPrice)} টাকা
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h2>
        <div className="divide-y divide-gray-100 text-sm">
          {(
            product.bazarPrices || [
              { bazarName: 'কারওয়ান বাজার', price: product.currentPrice },
              { bazarName: 'নিউ মার্কেট', price: product.currentPrice + 2 },
              { bazarName: 'মিরপুর ১০ বাজার', price: product.currentPrice - 1 },
            ]
          ).map((bazar: BazarPriceItem, idx: number) => (
            <div key={idx} className="py-3 flex justify-between items-center">
              <span className="text-gray-700 font-medium">{bazar.bazarName}</span>
              <span className="font-bold text-gray-900">{toBengaliNumerals(bazar.price)} টাকা</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-pulse">
          <div className="bg-white p-6 rounded-2xl h-32" />
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl h-20" />
            <div className="bg-white p-4 rounded-xl h-20" />
            <div className="bg-white p-4 rounded-xl h-20" />
          </div>
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}