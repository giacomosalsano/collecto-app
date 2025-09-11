import { Transaction as SequelizeTransaction } from "sequelize";
import db from "../../../../database/models";

const { User } = db as any;

export interface SaveRequest {
  user: typeof User;
  transaction: SequelizeTransaction;
}

export interface SaveResponse {
  user: typeof User;
}
