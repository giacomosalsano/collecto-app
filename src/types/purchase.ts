export interface PurchaseRequest {
  userId: number;
  productId: number;
  quantity: number;
}

export interface PurchaseResponse {
  message: string;
  purchased_quantity: number;
  total_price_in_cents: number;
}