import { Transaction as SequelizeTransaction } from "sequelize";

export interface CreateTransactionRequest {
  data: {
    user_id: number;
    product_id: number;
    quantity: number;
    price_per_share_in_cents: number;
    total_price_in_cents: number;
  };
  transaction: SequelizeTransaction;
}

export type CreateTransactionResponse = {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  price_per_share_in_cents: number;
  total_price_in_cents: number;
  updatedAt: Date;
  createdAt: Date;
};
