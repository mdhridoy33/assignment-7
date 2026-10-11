import { fetchProducts } from './lib/api';
import ProductCard from './component/ProductCard';

export default async function HomePage() {
  const products = await fetchProducts().catch(() => []);

  const risers = products.filter((p) => p.changePercent > 0);

 
  const fallers = products.filter((p) => p.changePercent < 0);

  const todayDateStr = 'মঙ্গলবার, ৬ অক্টোবর, ২০২৬';

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      
      <section className="bg-emerald-50/60 rounded-3xl p-8 border border-emerald-100/50 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-xl">
          <span className="inline-block px-3 py-1 bg-emerald-100/80 text-emerald-800 text-xs font-semibold rounded-full">
            {todayDateStr}
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন এবং সর্বোচ্চ দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#all-products"
            className="inline-block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition shadow-sm"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="w-48 h-48 bg-emerald-100/40 rounded-full flex items-center justify-center shrink-0">
          <span className="text-7xl">🧺</span>
        </div>
      </section>

      {risers.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-red-500">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {fallers.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-emerald-600">▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section id="all-products">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span>🛒</span> সব পণ্য
          </h2>
          <p className="text-xs text-gray-500">মোট {products.length}টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}