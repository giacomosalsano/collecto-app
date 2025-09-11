import { literal } from "sequelize";
import db from "../../models";

const { Product } = db;
const { ProductShare } = db;

class ProductRepository {
  async findAllWithShareCounts() {
    const products = await Product.findAll({
      attributes: {
        include: [
          [
            literal(`(
              SELECT COUNT(*)
              FROM ProductShares AS ps
              WHERE
                ps.product_id = Product.id
                AND
                ps.is_available = true
            )`),
            "available_shares",
          ],
        ],
      },
      raw: true,
    });

    return products;
  }
}

export default new ProductRepository();
