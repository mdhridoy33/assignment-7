'use client';

import Image from 'next/image';
import Link from 'next/link';
import logoIcon from '../assets/logo-icon.png';
import { Category, Product } from '../types';
import { getBengaliDate, toBengaliNumerals } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const FALLBACK_CATEGORIES = [
  { id: '1', name: 'চাল', slug: 'chal', emoji: '🍚' },
  { id: '2', name: 'ডাল', slug: 'dal', emoji: '🫘' },
  { id: '3', name: 'তেল', slug: 'oil', emoji: '🛢️' },
  { id: '4', name: 'সবজি', slug: 'sobji', emoji: '🥬' },
  { id: '5', name: 'মাছ', slug: 'mach', emoji: '🐟' },
  { id: '6', name: 'মাংস', slug: 'mangso', emoji: '🍗' },
  { id: '7', name: 'ডিম-দুধ', slug: 'dim-dudh', emoji: '🥛' },
  { id: '8', name: 'মসলা', slug: 'mosla', emoji: '🌶️' },
];

const categoryEmojiMap: Record<string, string> = {
  chal: '🍚',
  dal: '🫘',
  oil: '🛢️',
  tel: '🛢️',
  sobji: '🥬',
  mach: '🐟',
  mangso: '🍗',
  'dim-dudh': '🥛',
  mosla: '🌶️',
};

interface HeaderProps {
  categories?: Category[];
  products?: Product[];
}

export default function Header({ categories = [], products = [] }: HeaderProps) {
  const { user } = useAuth();
  const currentDate = getBengaliDate();

  const displayCategories =
    categories.length > 0 ? categories : (FALLBACK_CATEGORIES as Category[]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs w-full">
      {/* ১. মূল নেভবার */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between bg-white">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center p-1.5 shadow-xs shrink-0">
            <Image
              src={logoIcon}
              alt="Bazar Dor Logo"
              width={32}
              height={32}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div>
            <span className="text-xl font-extrabold text-gray-900 block leading-tight">
              বাজার দর
            </span>
            <p className="text-[10px] text-gray-500 font-medium">
              {currentDate}
            </p>
          </div>
        </Link>

        {/* ডানদিকের Auth / Profile Area */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 hover:text-emerald-600 p-1.5 px-3 rounded-xl hover:bg-gray-50 border border-gray-100 transition"
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-emerald-500/30"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs border border-emerald-200">
                  {user.name ? user.name[0].toUpperCase() : 'R'}
                </div>
              )}
              <span className="hidden sm:inline">{user.name}</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-xs"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ২. ক্যাটাগরি পিলস বার */}
      <div className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-2 overflow-x-auto flex items-center justify-center gap-6 text-xs text-gray-700 whitespace-nowrap scrollbar-none">
          {displayCategories.map((cat) => {
            const emoji =
              cat.emoji ||
              categoryEmojiMap[cat.slug?.toLowerCase()] ||
              categoryEmojiMap[cat.id?.toLowerCase()] ||
              '🛒';

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-1.5 hover:text-emerald-600 transition font-medium"
              >
                <span>{emoji}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ৩. ইনফিনিট হরিজন্টাল প্রাইজ টিকার বার */}
      {products.length > 0 && (
        <div className="border-t border-gray-100 bg-gray-50/80 py-2 overflow-hidden w-full relative">
          <div className="flex flex-row items-center whitespace-nowrap animate-marquee hover:pause gap-8">
            {[...products, ...products].map((p, index) => {
              const isUp = p.changePercent > 0;
              const isDown = p.changePercent < 0;
              return (
                <div
                  key={`${p.id}-${index}`}
                  className="flex flex-row items-center gap-2 shrink-0 px-3 bg-white border border-gray-100 rounded-lg py-1 text-[11px] shadow-2xs"
                >
                  <span>{p.emoji || '🛒'}</span>
                  <span className="font-semibold text-gray-800">{p.name}</span>
                  <span className="text-gray-500">
                    দাম {toBengaliNumerals(p.currentPrice)} টাকা/
                    {p.unit ? p.unit.replace('প্রতি ', '') : 'কেজি'}
                  </span>
                  <span
                    className={`font-bold flex items-center gap-0.5 ${
                      isUp
                        ? 'text-red-500'
                        : isDown
                        ? 'text-emerald-600'
                        : 'text-gray-400'
                    }`}
                  >
                    {isUp ? '▲' : isDown ? '▼' : '—'}{' '}
                    {toBengaliNumerals(Math.abs(p.changePercent))}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}