import { User } from "../../../shared/types/user";
import { Transaction as SequelizeTransaction } from "sequelize";

export interface FindByIdRequest {
  id: number;
  transaction?: SequelizeTransaction;
}

export interface FindByIdResponse extends User {}
