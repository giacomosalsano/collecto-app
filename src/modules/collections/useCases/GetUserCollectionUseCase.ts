import CacheService from "../../../shared/services/CacheService";
import ProductRepository from "../../products/repositories/ProductRepository";
import { GetUserCollectionRequest, GetUserCollectionResponse } from "../types";

class GetUserCollectionUseCase {
  async execute({
    user_id,
  }: GetUserCollectionRequest): Promise<GetUserCollectionResponse> {
    const cacheKey = `collection:${user_id}`;

    const cachedCollection = await CacheService.get(cacheKey);

    if (cachedCollection) {
      // console.log() for debugging. IT SHOULD BE REMOVED IN PRODUCTION.
      console.log(`CACHE HIT for key: ${cacheKey}`);
      return cachedCollection;
    }

    // console.log() for debugging. IT SHOULD BE REMOVED IN PRODUCTION.
    console.log(`CACHE MISS for key: ${cacheKey}`);
    const collectionFromDB = await ProductRepository.getUserCollectionByUserId({
      user_id,
    });

    await CacheService.set(cacheKey, collectionFromDB, 3600);

    return collectionFromDB;
  }
}

export default new GetUserCollectionUseCase();
