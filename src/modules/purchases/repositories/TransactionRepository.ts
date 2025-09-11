import { CreateTransactionRequest, CreateTransactionResponse } from "../types";
import db from "../../../../database/models";

const { Transaction } = db as any;

class TransactionRepository {
  async createTransaction({
    data,
    transaction,
  }: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    return Transaction.create(data, { transaction });
  }
}

export default new TransactionRepository();
