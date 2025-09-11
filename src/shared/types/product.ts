export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  total_value_in_cents: number;
  share_price_in_cents: number;
  total_shares: number;
  available_shares: number;
  sold_shares: number;
}

export interface ProductsWithShareCounts extends Product {
  available_shares: number;
  sold_shares: number;
}