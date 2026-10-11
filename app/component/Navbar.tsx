'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logoIcon from '../assets/logo-icon.png';
import { Category, Product } from '../types';
import { getBengaliDate } from '../lib/utils';

interface NavbarProps {
  categories?: Category[];
  products?: Product[];
  user?: { name: string; email?: string; avatar?: string; image?: string } | null;
}

export default function Navbar({ categories = [], products = [], user = null }: NavbarProps) {
  const pathname = usePathname();
  const currentDate = getBengaliDate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs">
      {/* Row 1: Logo & Auth */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Date */}
        <div className="flex flex-col items-start">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center p-1.5 shadow-xs shrink-0">
              <Image
                src={logoIcon}
                alt="বাজার দর লোগো"
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
        </div>

        {/* Auth / Profile Area */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2.5 text-sm font-semibold text-gray-800 hover:text-emerald-600 p-1.5 px-3 rounded-xl hover:bg-gray-50 border border-gray-100 transition"
            >
              {user.avatar || user.image ? (
                <img
                  src={user.avatar || user.image}
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
    </header>
  );
}