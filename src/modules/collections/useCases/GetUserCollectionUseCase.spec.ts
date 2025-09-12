import GetUserCollectionUseCase from "./GetUserCollectionUseCase";
import CacheService from "../../../shared/services/CacheService";
import ProductRepository from "../../products/repositories/ProductRepository";

jest.mock("../../../shared/services/CacheService", () => ({
  get: jest.fn(),
  set: jest.fn(),
  invalidate: jest.fn(),
}));

jest.mock("../../products/repositories/ProductRepository", () => ({
  getUserCollectionByUserId: jest.fn(),
}));

const mockCacheService = CacheService as jest.Mocked<typeof CacheService>;
const mockProductRepository = ProductRepository as jest.Mocked<
  typeof ProductRepository
>;

describe("GetUserCollectionUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCacheService.get.mockResolvedValue(null);
    mockCacheService.set.mockResolvedValue(undefined);
    mockProductRepository.getUserCollectionByUserId.mockResolvedValue(
      [] as any
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return collection from cache if it exists (Cache Hit)", async () => {
    const userId = 1;
    const cacheKey = `collection:${userId}`;
    const mockCachedCollection = [
      { id: 1, name: "Cached Product", owned_shares: 10 },
    ];

    mockCacheService.get.mockResolvedValue(mockCachedCollection);

    const result = await GetUserCollectionUseCase.execute({ user_id: userId });

    expect(result).toEqual(mockCachedCollection);
    expect(mockCacheService.get).toHaveBeenCalledWith(cacheKey);
    expect(
      mockProductRepository.getUserCollectionByUserId
    ).not.toHaveBeenCalled();
  });

  it("should fetch from database and save to cache if it doesn't exist (Cache Miss)", async () => {
    const userId = 1;
    const cacheKey = `collection:${userId}`;
    const mockDBCollection = [{ id: 2, name: "DB Product", owned_shares: 5 }];

    mockCacheService.get.mockResolvedValue(null);
    mockProductRepository.getUserCollectionByUserId.mockResolvedValue(
      mockDBCollection as any
    );

    const result = await GetUserCollectionUseCase.execute({ user_id: userId });

    expect(result).toEqual(mockDBCollection);
    expect(mockCacheService.get).toHaveBeenCalledWith(cacheKey);
    expect(
      mockProductRepository.getUserCollectionByUserId
    ).toHaveBeenCalledWith({ user_id: userId });
    expect(mockCacheService.set).toHaveBeenCalledWith(
      cacheKey,
      mockDBCollection,
      3600
    );
  });

  it("should return empty collection for non-existent or unauthenticated user", async () => {
    const userId = 999;
    const cacheKey = `collection:${userId}`;
    const emptyCollection: any[] = [];

    mockCacheService.get.mockResolvedValue(null);
    mockProductRepository.getUserCollectionByUserId.mockResolvedValue(
      emptyCollection as any
    );

    const result = await GetUserCollectionUseCase.execute({ user_id: userId });

    expect(result).toEqual(emptyCollection);
    expect(mockCacheService.get).toHaveBeenCalledWith(cacheKey);
    expect(
      mockProductRepository.getUserCollectionByUserId
    ).toHaveBeenCalledWith({ user_id: userId });
    expect(mockCacheService.set).toHaveBeenCalledWith(
      cacheKey,
      emptyCollection,
      3600
    );
  });
});
