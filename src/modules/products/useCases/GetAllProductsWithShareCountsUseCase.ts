import ProductRepository from "../repositories/ProductRepository";
import { GetAllProductsWithShareCountsResponse } from "../types";
import { ProductsWithShareCounts } from "../../../shared/types/product";

class GetAllProductsWithShareCountsUseCase {
  async execute(): Promise<GetAllProductsWithShareCountsResponse> {
    const products = await ProductRepository.getAllProductsWithShareCounts();

    const productsDTO = products.map((product: ProductsWithShareCounts) => {
      const totalShares = parseInt(product.total_shares.toString(), 10);
      const availableShares = parseInt(product.available_shares.toString(), 10);

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        total_value_in_cents: product.total_value_in_cents,
        share_price_in_cents: product.share_price_in_cents,
        total_shares: totalShares,
        available_shares: availableShares,
        sold_shares: totalShares - availableShares,
      };
    });

    return productsDTO;
  }
}

export default new GetAllProductsWithShareCountsUseCase();
