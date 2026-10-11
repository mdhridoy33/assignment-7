import Link from 'next/link';
import { Product } from '../types';
import { toBengaliNumerals, getChangeBadge } from '../lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  if (!product) return null;

  const badge = getChangeBadge(product.changePercent);

  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-2xl shrink-0">
          {product.emoji || '🛒'}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-base">{product.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{product.unit}</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-gray-400 block">আজকের দাম</span>
          <span className="font-bold text-gray-900 text-sm">
            {toBengaliNumerals(product.currentPrice)} টাকা
          </span>
        </div>
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${badge.className}`}>
          {badge.text}
        </span>
      </div>
    </Link>
  );
}