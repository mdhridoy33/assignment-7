import Image from 'next/image';
import bazarHeroImg from '../assets/bazar-hero.png';
import { getBengaliDate } from '../lib/utils';

export default function Hero() {
  const currentDate = getBengaliDate();

  return (
    <section className="bg-emerald-50/60 rounded-3xl p-6 sm:p-10 my-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-100/50">
      <div className="space-y-4 text-center md:text-left">
        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
          {currentDate}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-lg leading-relaxed">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন এবং সর্বোচ্চ দামের পরিবর্তন এক জায়গায়।
        </p>
        <div>
          <a
            href="#all-products"
            className="inline-block px-5 py-2.5 bg-emerald-600 text-white font-medium text-sm rounded-xl shadow-sm hover:bg-emerald-700 transition"
          >
            সব পণ্য দেখুন
          </a>
        </div>
      </div>

      <div className="w-48 sm:w-64 shrink-0 flex items-center justify-center">
        <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center overflow-hidden">
          <Image
            src={bazarHeroImg}
            alt="বাজার হিরো ছবি"
            width={220}
            height={220}
            className="object-contain w-full h-full"
            priority
          />
        </div>
      </div>
    </section>
  );
}