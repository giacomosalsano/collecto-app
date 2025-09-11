import { literal, Sequelize } from "sequelize";
import db from "../../models";

const { Product } = db;
const { ProductShare } = db;
const { User } = db;

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

  async findCollectionByUserId(userId: number) {
    const collection = await Product.findAll({
      attributes: [
        "id",
        "name",
        "slug",
        [Sequelize.fn("COUNT", "ProductShares.id"), "owned_shares"],
      ],
      include: [
        {
          model: ProductShare,
          attributes: [],
          where: { user_id: userId },
        },
      ],
      group: ["Product.id"],
      raw: true,
    });
    return collection;
  }
}

export default new ProductRepository();
