import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-24 text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
      <div className="text-6xl font-extrabold text-emerald-600">৪০৪</div>
      <h1 className="text-xl font-bold text-gray-900">পৃষ্ঠাটি পাওয়া যায়নি</h1>
      <p className="text-xs text-gray-500">
        আপনি যে লিংকটিতে ঢোকার চেষ্টা করছেন তা সঠিক নয় অথবা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link
        href="/"
        className="inline-block px-5 py-2.5 bg-emerald-600 text-white font-medium text-sm rounded-lg hover:bg-emerald-700 transition"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}