import './globals.css';
import { AuthProvider } from './context/AuthContext';
import Header from './component/Header';
import Footer from './component/Footer';
import { fetchCategories, fetchProducts } from './lib/api';
import { Category, Product } from './types';

export const metadata = {
  title: 'বাজার দর — আজকের বাজারের দাম এক নজরে',
  description: 'চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজারভিত্তিক বিস্তারিত দাম।',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let categories: Category[] = [];
  let products: Product[] = [];

  try {
    const [catRes, prodRes] = await Promise.all([
      fetchCategories(),
      fetchProducts(),
    ]);
    categories = (catRes as Category[]) || [];
    products = (prodRes as Product[]) || [];
  } catch (error) {
    console.error('API Fetch Error in Layout:', error);
  }

  return (
    <html lang="bn">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col antialiased">
        <AuthProvider>
          <Header categories={categories} products={products} />
          <div className="flex-1">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}