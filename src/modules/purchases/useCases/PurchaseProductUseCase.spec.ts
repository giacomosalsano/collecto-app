import sequelize from "../../../shared/database";
import CacheService from "../../../shared/services/CacheService";
import UserRepository from "../../auth/repositories/UserRepository";
import ProductShareRepository from "../../products/repositories/ProductShareRepository";
import TransactionRepository from "../repositories/TransactionRepository";
import PurchaseProductUseCase from "./PurchaseProductUseCase";
import { PurchaseProductRequest } from "../types";

jest.mock("../../../shared/database", () => ({
  transaction: jest.fn(),
}));

jest.mock("../../auth/repositories/UserRepository", () => ({
  findById: jest.fn(),
  save: jest.fn(),
}));

jest.mock("../../products/repositories/ProductShareRepository", () => ({
  findAvailableShares: jest.fn(),
  markAsSold: jest.fn(),
}));

jest.mock("../repositories/TransactionRepository", () => ({
  createTransaction: jest.fn(),
}));

jest.mock("../../../shared/services/CacheService", () => ({
  get: jest.fn(),
  set: jest.fn(),
  invalidate: jest.fn(),
}));

const mockSequelize = sequelize as jest.Mocked<typeof sequelize>;
const mockUserRepository = UserRepository as jest.Mocked<typeof UserRepository>;
const mockProductShareRepository = ProductShareRepository as jest.Mocked<
  typeof ProductShareRepository
>;
const mockTransactionRepository = TransactionRepository as jest.Mocked<
  typeof TransactionRepository
>;
const mockCacheService = CacheService as jest.Mocked<typeof CacheService>;

describe("PurchaseProductUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCacheService.get.mockResolvedValue(null);
    mockCacheService.set.mockResolvedValue(undefined);
    mockCacheService.invalidate.mockResolvedValue(undefined);
    mockUserRepository.save.mockResolvedValue(undefined as any);
    mockProductShareRepository.markAsSold.mockResolvedValue(undefined);
    mockTransactionRepository.createTransaction.mockResolvedValue(
      undefined as any
    );
  });

  const mockTransactionCallback = jest.fn((callback) =>
    callback("mockTransaction")
  );
  mockSequelize.transaction.mockImplementation(mockTransactionCallback as any);

  it("should complete a purchase successfully when all conditions are met", async () => {
    const request: PurchaseProductRequest = {
      user_id: 1,
      product_id: 1,
      quantity: 2,
    };

    const mockUser = {
      id: 1,
      balance_in_cents: 100000,
      save: jest.fn().mockResolvedValue(true),
    };

    const mockShares = [
      { id: 10, price_in_cents: 25000 },
      { id: 11, price_in_cents: 25000 },
    ];

    mockUserRepository.findById.mockResolvedValue(mockUser as any);
    mockProductShareRepository.findAvailableShares.mockResolvedValue(
      mockShares as any
    );

    const result = await PurchaseProductUseCase.execute(request);

    expect(sequelize.transaction).toHaveBeenCalled();
    expect(mockUserRepository.findById).toHaveBeenCalledWith({
      id: request.user_id,
      transaction: "mockTransaction",
    });
    expect(mockProductShareRepository.findAvailableShares).toHaveBeenCalledWith(
      {
        product_id: request.product_id,
        quantity: request.quantity,
        transaction: "mockTransaction",
      }
    );

    expect(mockUser.balance_in_cents).toBe(50000);
    expect(mockUserRepository.save).toHaveBeenCalledWith({
      user: mockUser,
      transaction: "mockTransaction",
    });

    expect(mockProductShareRepository.markAsSold).toHaveBeenCalledWith({
      share_ids: [10, 11],
      user_id: request.user_id,
      transaction: "mockTransaction",
    });
    expect(mockTransactionRepository.createTransaction).toHaveBeenCalled();
    expect(mockCacheService.invalidate).toHaveBeenCalledWith(
      `collection:${request.user_id}`
    );

    expect(result.message).toBe("Successfully purchased 2 shares.");
    expect(result.purchased_quantity).toBe(2);
  });

  it("should throw an error if the user has insufficient balance", async () => {
    const request: PurchaseProductRequest = {
      user_id: 1,
      product_id: 1,
      quantity: 5,
    };
    const mockUser = {
      id: 1,
      balance_in_cents: 100000,
    };
    const mockShares = Array(5).fill({ price_in_cents: 25000 });

    mockUserRepository.findById.mockResolvedValue(mockUser as any);
    mockProductShareRepository.findAvailableShares.mockResolvedValue(
      mockShares as any
    );

    await expect(PurchaseProductUseCase.execute(request)).rejects.toThrow(
      "Insufficient balance."
    );

    expect(mockUserRepository.save).not.toHaveBeenCalled();
    expect(mockProductShareRepository.markAsSold).not.toHaveBeenCalled();
    expect(mockTransactionRepository.createTransaction).not.toHaveBeenCalled();
  });

  it("should throw an error if there are no shares available", async () => {
    const request: PurchaseProductRequest = {
      user_id: 1,
      product_id: 1,
      quantity: 2,
    };

    mockUserRepository.findById.mockResolvedValue({
      id: 1,
      balance_in_cents: 100000,
    } as any);

    mockProductShareRepository.findAvailableShares.mockResolvedValue([]);

    await expect(PurchaseProductUseCase.execute(request)).rejects.toThrow(
      "No shares available for this product."
    );

    expect(mockUserRepository.save).not.toHaveBeenCalled();
  });

  it("should throw an error if the user is not found", async () => {
    const request: PurchaseProductRequest = {
      user_id: 999,
      product_id: 1,
      quantity: 1,
    };

    mockUserRepository.findById.mockResolvedValue(null as any);

    await expect(PurchaseProductUseCase.execute(request)).rejects.toThrow(
      "User not found."
    );

    expect(
      mockProductShareRepository.findAvailableShares
    ).not.toHaveBeenCalled();
  });
});
