import GetAllProductsWithShareCountsUseCase from "./GetAllProductsWithShareCountsUseCase";
import ProductRepository from "../repositories/ProductRepository";
import { ProductsWithShareCounts } from "../../../shared/types/product";

jest.mock("../repositories/ProductRepository");

const mockProductRepository = ProductRepository as jest.Mocked<
  typeof ProductRepository
>;

describe("GetAllProductsWithShareCountsUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a list of products with share counts calculated correctly", async () => {

    const mockRawProducts: ProductsWithShareCounts[] = [
      {
        id: 1,
        name: "Luxury Watch",
        slug: "luxury-watch",
        description: "A very good watch.",
        total_value_in_cents: 5000000,
        share_price_in_cents: 50000,
        total_shares: 100,
        available_shares: "75" as any,
        sold_shares: 25,
      },
      {
        id: 2,
        name: "Luxury Bag",
        slug: "luxury-bag",
        description: "A very good bag.",
        total_value_in_cents: 2000000,
        share_price_in_cents: 20000,
        total_shares: 100,
        available_shares: "50" as any,
        sold_shares: 50,
      },
    ];

    mockProductRepository.getAllProductsWithShareCounts.mockResolvedValue(
      mockRawProducts
    );

    const result = await GetAllProductsWithShareCountsUseCase.execute();


    expect(
      mockProductRepository.getAllProductsWithShareCounts
    ).toHaveBeenCalledTimes(1);

    expect(result).toHaveLength(2);

    expect(result[0].id).toBe(1);
    expect(result[0].total_shares).toBe(100);
    expect(result[0].available_shares).toBe(75);
    expect(result[0].sold_shares).toBe(25);

    expect(result[1].id).toBe(2);
    expect(result[1].total_shares).toBe(100);
    expect(result[1].available_shares).toBe(50);
    expect(result[1].sold_shares).toBe(50);
  });

  it("should return an empty array if the repository returns no products", async () => {
    mockProductRepository.getAllProductsWithShareCounts.mockResolvedValue([]);

    const result = await GetAllProductsWithShareCountsUseCase.execute();

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
    expect(
      mockProductRepository.getAllProductsWithShareCounts
    ).toHaveBeenCalledTimes(1);
  });
});
