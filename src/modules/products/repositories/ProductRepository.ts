import { literal, Sequelize } from "sequelize";
import db from "../../../../database/models";
import {
  GetAllProductsWithShareCountsResponse,
  GetUserCollectionByUserIdRequest,
  GetUserCollectionByUserIdResponse,
} from "../types";

const { Product, ProductShare, User } = db as any;

class ProductRepository {
  async getAllProductsWithShareCounts(): Promise<GetAllProductsWithShareCountsResponse> {
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

  async getUserCollectionByUserId({
    user_id,
  }: GetUserCollectionByUserIdRequest): Promise<GetUserCollectionByUserIdResponse> {
    const collection = await Product.findAll({
      attributes: [
        "id",
        "name",
        "slug",
        "description",
        [Sequelize.fn("COUNT", "ProductShares.id"), "owned_shares"],
      ],
      include: [
        {
          model: ProductShare,
          attributes: [],
          where: { user_id: user_id },
        },
      ],
      group: ["Product.id"],
      raw: true,
    });
    return collection;
  }
}

export default new ProductRepository();
