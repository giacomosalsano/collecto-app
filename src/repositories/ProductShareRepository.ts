import { Transaction as SequelizeTransaction } from "sequelize";
import db from "../../models";

const { ProductShare } = db;

class ProductShareRepository {
  async findAvailableShares(
    productId: number,
    quantity: number,
    transaction: SequelizeTransaction
  ) {
    return ProductShare.findAll({
      where: {
        product_id: productId,
        is_available: true,
      },
      limit: quantity,
      lock: transaction.LOCK.UPDATE, //  previne race conditions (duas pessoas comprando a mesma quota).
      transaction,
    });
  }

  async markAsSold(
    shareIds: number[],
    userId: number,
    transaction: SequelizeTransaction
  ) {
    return ProductShare.update(
      { is_available: false, user_id: userId },
      { where: { id: shareIds }, transaction }
    );
  }
}

export default new ProductShareRepository();
