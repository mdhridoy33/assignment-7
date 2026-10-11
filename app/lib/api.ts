import { Category, Product } from '@/types';

const BASE_URL = 'https://api.abcz.workers.dev/api/bazardor';
const REVALIDATE_INTERVAL = 60;

// ==========================================
// Precise Data Normalizers for API Schema
// ==========================================

export function normalizeCategory(item: any, fallbackSlug = ''): Category {
  if (!item) {
    return {
      id: fallbackSlug,
      name: fallbackSlug,
      slug: fallbackSlug,
      emoji: '🏷️',
      productCount: 0,
    };
  }

  const source = item.data || item;

  return {
    id: String(source.id || source.slug || source.category || fallbackSlug),
    name: source.categoryNameBn || source.nameBn || source.name || fallbackSlug || 'ক্যাটাগরি',
    slug: String(source.slug || source.category || source.id || fallbackSlug),
    emoji: source.categoryIcon || source.emoji || source.image || '🏷️',
    productCount: Number(source.productCount ?? source.count ?? 0),
  };
}

export function normalizeProduct(item: any, fallbackCategory = 'general'): Product {
  if (!item) {
    return {
      id: '0',
      name: 'পণ্য',
      category: fallbackCategory,
      currentPrice: 0,
      minPrice: 0,
      maxPrice: 0,
      avgPrice: 0,
      changePercent: 0,
      unit: 'কেজি',
      emoji: '🛒',
      bazarPrices: [],
    };
  }

  const source = item.data || item;

  const currentPrice = Number(source.today ?? source.currentPrice ?? source.price ?? 0);
  
  let minPrice = currentPrice;
  let maxPrice = currentPrice;
  let avgPrice = currentPrice;

  if (Array.isArray(source.markets) && source.markets.length > 0) {
    const mins = source.markets.map((m: any) => m.min).filter(Boolean);
    const maxs = source.markets.map((m: any) => m.max).filter(Boolean);
    if (mins.length > 0) minPrice = Math.min(...mins);
    if (maxs.length > 0) maxPrice = Math.max(...maxs);
    avgPrice = Math.round((minPrice + maxPrice) / 2);
  }

  let changePercent = 0;
  if (typeof source.change === 'object' && source.change !== null) {
    const pct = Number(source.change.pct ?? 0);
    changePercent = source.change.dir === 'down' ? -Math.abs(pct) : Math.abs(pct);
  } else {
    changePercent = Number(source.changePercent ?? source.change ?? 0);
  }

  const rawUnit = source.unit || 'kg';
  const formattedUnit = rawUnit.toLowerCase().includes('kg')
    ? 'প্রতি কেজি'
    : rawUnit.toLowerCase().includes('litre') || rawUnit.toLowerCase().includes('liter')
    ? 'প্রতি লিটার'
    : rawUnit.toLowerCase().includes('dozen')
    ? 'প্রতি ডজন'
    : rawUnit.toLowerCase().includes('piece')
    ? 'প্রতি পিস'
    : `প্রতি ${rawUnit}`;

  const bazarPrices = Array.isArray(source.markets)
    ? source.markets.map((m: any) => ({
        bazarName: `${m.market} (${m.division})`,
        price: Math.round((m.min + m.max) / 2),
      }))
    : [
        { bazarName: 'কারওয়ান বাজার', price: currentPrice },
        { bazarName: 'গ্রীন মার্কেট', price: currentPrice },
      ];

  return {
    id: String(source.id || source.slug || ''),
    name: source.nameBn || source.name || source.title || 'পণ্য',
    category: String(source.category || fallbackCategory),
    currentPrice,
    minPrice,
    maxPrice,
    avgPrice,
    changePercent,
    unit: formattedUnit,
    emoji: source.image || source.categoryIcon || '🍚',
    bazarPrices,
  };
}

// ==========================================
// API Fetchers
// ==========================================

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE_URL}/categories`, { next: { revalidate: REVALIDATE_INTERVAL } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item) => normalizeCategory(item));
      }
    }
  } catch (error) {
    console.warn('API /categories failed:', error);
  }
  return [];
}

// 🟢 EXPORT THIS FUNCTION EXPLICITLY:
export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${BASE_URL}/categories/${slug}`, {
      next: { revalidate: REVALIDATE_INTERVAL },
    });
    if (res.ok) {
      const item = await res.json();
      if (item) return normalizeCategory(item, slug);
    }
  } catch {
    // Fallback lookup
  }

  const categories = await fetchCategories();
  return (
    categories.find((c) => c.slug === slug || c.id === slug) || {
      id: slug,
      name: slug,
      slug: slug,
      emoji: '🏷️',
      productCount: 0,
    }
  );
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products`, { next: { revalidate: REVALIDATE_INTERVAL } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item) => normalizeProduct(item));
      }
    }
  } catch (error) {
    console.warn('API /products failed:', error);
  }
  return [];
}

export async function fetchProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products?category=${categorySlug}`, {
      next: { revalidate: REVALIDATE_INTERVAL },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item) => normalizeProduct(item, categorySlug));
      }
    }
  } catch {
    // Local filter fallback
  }

  const all = await fetchProducts();
  return all.filter((p) => p.category?.toLowerCase() === categorySlug.toLowerCase());
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, { next: { revalidate: REVALIDATE_INTERVAL } });
    if (res.ok) {
      const item = await res.json();
      if (item) return normalizeProduct(item);
    }
  } catch {
    // Local lookup fallback
  }

  const all = await fetchProducts();
  return all.find((p) => String(p.id) === String(id) || (p as any).slug === id) || null;
}