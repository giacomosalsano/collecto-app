import { Transaction as SequelizeTransaction } from "sequelize";

export interface FindAvailableSharesRequest {
  product_id: number;
  quantity: number;
  transaction: SequelizeTransaction;
}

export type FindAvailableSharesResponse = {
  id: number;
  product_id: number;
  price_in_cents: number;
  is_available: boolean;
  user_id: number | null;
  created_at: Date;
  updated_at: Date;
}[];
