import sequelize from "../../../shared/database";
import UserRepository from "../../auth/repositories/UserRepository";
import ProductShareRepository from "../../products/repositories/ProductShareRepository";
import TransactionRepository from "../repositories/TransactionRepository";
import CacheService from "../../../shared/services/CacheService";
import { PurchaseProductRequest, PurchaseProductResponse } from "../types";

class PurchaseProductUseCase {
  async execute({
    user_id,
    product_id,
    quantity,
  }: PurchaseProductRequest): Promise<PurchaseProductResponse> {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }

    try {
      const result = await sequelize.transaction(async (t) => {
        const user = await UserRepository.findById({
          id: user_id,
          transaction: t,
        });

        if (!user) throw new Error("User not found.");

        const sharesToPurchase =
          await ProductShareRepository.findAvailableShares({
            product_id,
            quantity,
            transaction: t,
          });

        const availableCount = sharesToPurchase.length;

        if (availableCount === 0) {
          throw new Error("No shares available for this product.");
        }

        const pricePerShare = sharesToPurchase[0].price_in_cents;
        const totalPriceInCents = availableCount * pricePerShare;

        if (user.balance_in_cents < totalPriceInCents) {
          throw new Error("Insufficient balance.");
        }

        user.balance_in_cents -= totalPriceInCents;

        await UserRepository.save({ user, transaction: t });

        const shareIds = sharesToPurchase.map((share: any) => share.id);

        await ProductShareRepository.markAsSold({
          share_ids: shareIds,
          user_id,
          transaction: t,
        });

        await TransactionRepository.createTransaction({
          data: {
            user_id,
            product_id,
            quantity: availableCount,
            price_per_share_in_cents: pricePerShare,
            total_price_in_cents: totalPriceInCents,
          },
          transaction: t,
        });

        await CacheService.invalidate(`collection:${user_id}`);

        // console.log() for debugging. IT SHOULD BE REMOVED IN PRODUCTION.
        console.log(`CACHE INVALIDATED for key: collection:${user_id}`);

        return {
          message: `Successfully purchased ${availableCount} shares.`,
          purchased_quantity: availableCount,
          total_price_in_cents: totalPriceInCents,
        };
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new PurchaseProductUseCase();
