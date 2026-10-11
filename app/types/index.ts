export interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  productCount?: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  changePercent: number;
  unit: string;
  emoji: string;
  bazarPrices?: Array<{
    bazarName: string;
    price: number;
  }>;
}