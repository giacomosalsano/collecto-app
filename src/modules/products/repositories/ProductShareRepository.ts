import db from "../../../../database/models";
import {
  FindAvailableSharesRequest,
  FindAvailableSharesResponse,
  MarkAsSoldRequest,
} from "../types";

const { ProductShare } = db as any;

class ProductShareRepository {
  async findAvailableShares({
    product_id,
    quantity,
    transaction,
  }: FindAvailableSharesRequest): Promise<FindAvailableSharesResponse> {
    return ProductShare.findAll({
      where: {
        product_id: product_id,
        is_available: true,
      },
      limit: quantity,
      lock: transaction.LOCK.UPDATE, //  previne race conditions (duas pessoas comprando a mesma quota).
      transaction,
    });
  }

  async markAsSold({ share_ids, user_id, transaction }: MarkAsSoldRequest) {
    return ProductShare.update(
      { is_available: false, user_id: user_id },
      { where: { id: share_ids }, transaction }
    );
  }
}

export default new ProductShareRepository();
