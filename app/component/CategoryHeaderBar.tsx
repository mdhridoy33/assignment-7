'use client';

import Link from 'next/link';
import { Category, Product } from '../types';
import { toBengaliNumerals } from '../lib/utils';

interface CategoryHeaderBarProps {
  categories: Category[];
  products: Product[];
}

export default function CategoryHeaderBar({ categories, products }: CategoryHeaderBarProps) {
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm sticky top-15.25 z-40">
     
      <div className="max-w-6xl mx-auto px-4 py-2 overflow-x-auto flex items-center justify-center gap-6 text-xs text-gray-700 whitespace-nowrap scrollbar-none">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="flex items-center gap-1.5 hover:text-emerald-600 transition font-medium"
          >
            <span>{cat.emoji}</span>
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>

      <div className="border-t border-gray-100 bg-gray-50/50 py-1.5 px-4 overflow-hidden text-[11px]">
        <div className="max-w-6xl mx-auto flex items-center gap-8 overflow-x-auto whitespace-nowrap scrollbar-none text-gray-600">
          {products.slice(0, 8).map((p) => {
            const isUp = p.changePercent > 0;
            const isDown = p.changePercent < 0;
            return (
              <div key={p.id} className="flex items-center gap-1.5 shrink-0">
                <span>{p.emoji}</span>
                <span className="font-semibold text-gray-800">{p.name}</span>
                <span>দাম {toBengaliNumerals(p.currentPrice)} টাকা/{p.unit.replace('প্রতি ', '')}</span>
                <span
                  className={`font-bold flex items-center gap-0.5 ${
                    isUp ? 'text-red-500' : isDown ? 'text-emerald-600' : 'text-gray-400'
                  }`}
                >
                  {isUp ? '▲' : isDown ? '▼' : '—'} {toBengaliNumerals(Math.abs(p.changePercent))}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}