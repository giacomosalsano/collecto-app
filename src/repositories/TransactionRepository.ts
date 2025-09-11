import { Transaction as SequelizeTransaction } from "sequelize";
import db from "../../models";

const { Transaction } = db;

class TransactionRepository {
  async create(data: any, transaction: SequelizeTransaction) {
    return Transaction.create(data, { transaction });
  }
}

export default new TransactionRepository();
