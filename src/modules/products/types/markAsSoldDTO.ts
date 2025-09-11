import { Transaction as SequelizeTransaction } from "sequelize";

export interface MarkAsSoldRequest {
  share_ids: number[];
  user_id: number;
  transaction: SequelizeTransaction;
}
