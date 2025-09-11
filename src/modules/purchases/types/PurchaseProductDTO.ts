export interface PurchaseProductRequest {
  user_id: number;
  product_id: number;
  quantity: number;
}

export interface PurchaseProductResponse {
  message: string;
  purchased_quantity: number;
  total_price_in_cents: number;
}
