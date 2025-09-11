import sequelize from "../database";
import UserRepository from "../repositories/UserRepository";
import ProductShareRepository from "../repositories/ProductShareRepository";
import TransactionRepository from "../repositories/TransactionRepository";
import { PurchaseRequest } from "../types/purchase";
import CacheService from "../services/CacheService";

class PurchaseUseCase {
  async execute({ userId, productId, quantity }: PurchaseRequest) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }

    try {
      const result = await sequelize.transaction(async (t) => {
        const user = await UserRepository.findById(userId, t);

        if (!user) throw new Error("User not found.");

        const sharesToPurchase =
          await ProductShareRepository.findAvailableShares(
            productId,
            quantity,
            t
          );

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

        await UserRepository.save(user, t);

        const shareIds = sharesToPurchase.map((share) => share.id);

        await ProductShareRepository.markAsSold(shareIds, userId, t);

        await TransactionRepository.create(
          {
            user_id: userId,
            product_id: productId,
            quantity: availableCount,
            price_per_share_in_cents: pricePerShare,
            total_price_in_cents: totalPriceInCents,
          },
          t
        );

        await CacheService.invalidate(`collection:${userId}`);
        
        // console.log() for debugging. IT SHOULD BE REMOVED IN PRODUCTION.
        console.log(`CACHE INVALIDATED for key: collection:${userId}`);

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

export default new PurchaseUseCase();
