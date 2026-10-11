export interface Category {
  id: string;
  name: string;
  slug: string;
  emoji?: string;
}

export interface MarketPrice {
  bazarName: string;
  price: number;
}

export interface Product {
  id: string | number;
  name: string;
  name_bn?: string;
  category: string;
  currentPrice: number;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
  changePercent: number;
  change_percent?: number;
  unit: string;
  unit_bn?: string;
  emoji?: string;
  bazarPrices?: { bazarName: string; price: number }[];
}