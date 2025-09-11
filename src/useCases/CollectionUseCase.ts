import CacheService from '../services/CacheService';
import ProductRepository from '../repositories/ProductRepository';

class CollectionUseCase {
  async getCollection(userId: number) {
    const cacheKey = `collection:${userId}`;

    const cachedCollection = await CacheService.get(cacheKey);

    if (cachedCollection) {
      // console.log() for debugging. IT SHOULD BE REMOVED IN PRODUCTION.
      console.log(`CACHE HIT for key: ${cacheKey}`);
      return cachedCollection;
    }
    
    // console.log() for debugging. IT SHOULD BE REMOVED IN PRODUCTION.
    console.log(`CACHE MISS for key: ${cacheKey}`);
    const collectionFromDB = await ProductRepository.findCollectionByUserId(userId);

    await CacheService.set(cacheKey, collectionFromDB, 3600);

    return collectionFromDB;
  }
}

export default new CollectionUseCase();