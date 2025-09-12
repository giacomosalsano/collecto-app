// src/modules/products/useCases/GetAllProductsWithShareCountsUseCase.spec.ts

import GetAllProductsWithShareCountsUseCase from "./GetAllProductsWithShareCountsUseCase";
import ProductRepository from "../repositories/ProductRepository";
import { ProductsWithShareCounts } from "../../../shared/types/product";

// 1. Mockamos a dependência (o repositório)
jest.mock("../repositories/ProductRepository");

// 2. Criamos uma instância "typed" do nosso mock
const mockProductRepository = ProductRepository as jest.Mocked<
  typeof ProductRepository
>;

describe("GetAllProductsWithShareCountsUseCase", () => {
  // Limpa os mocks antes de cada teste para garantir isolamento
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar uma lista de produtos com as contagens de quotas calculadas corretamente", async () => {
    // Arrange (Preparação)

    // Simulamos o retorno "cru" do repositório. Note que available_shares é uma string.
    const mockRawProducts: ProductsWithShareCounts[] = [
      {
        id: 1,
        name: "Relógio de Luxo",
        slug: "relogio-de-luxo",
        description: "Um relógio muito bom.",
        total_value_in_cents: 5000000,
        share_price_in_cents: 50000,
        total_shares: 100,
        available_shares: "75" as any, // Simulamos o retorno como string
        sold_shares: 25,
      },
      {
        id: 2,
        name: "Bolsa de Luxo",
        slug: "bolsa-de-luxo",
        description: "Uma bolsa muito boa.",
        total_value_in_cents: 2000000,
        share_price_in_cents: 20000,
        total_shares: 100,
        available_shares: "50" as any,
        sold_shares: 50,
      },
    ];

    // Configuramos o mock para retornar os nossos dados preparados
    mockProductRepository.getAllProductsWithShareCounts.mockResolvedValue(
      mockRawProducts
    );

    // Act (Execução)
    const result = await GetAllProductsWithShareCountsUseCase.execute();

    // Assert (Verificação)

    // 1. Verificamos se o método correto do repositório foi chamado
    expect(
      mockProductRepository.getAllProductsWithShareCounts
    ).toHaveBeenCalledTimes(1);

    // 2. Verificamos se a transformação dos dados foi correta
    expect(result).toHaveLength(2); // Devemos ter 2 produtos no resultado

    // Verificações para o primeiro produto
    expect(result[0].id).toBe(1);
    expect(result[0].total_shares).toBe(100);
    expect(result[0].available_shares).toBe(75); // Deve ter sido convertido para número
    expect(result[0].sold_shares).toBe(25); // 100 - 75 = 25. O cálculo deve estar correto.

    // Verificações para o segundo produto
    expect(result[1].id).toBe(2);
    expect(result[1].total_shares).toBe(100);
    expect(result[1].available_shares).toBe(50);
    expect(result[1].sold_shares).toBe(50); // 100 - 50 = 50.
  });

  it("deve retornar um array vazio se o repositório não retornar produtos", async () => {
    // Arrange
    // Simulamos um cenário onde a base de dados está vazia
    mockProductRepository.getAllProductsWithShareCounts.mockResolvedValue([]);

    // Act
    const result = await GetAllProductsWithShareCountsUseCase.execute();

    // Assert
    expect(result).toEqual([]); // O resultado deve ser um array vazio
    expect(result).toHaveLength(0);
    expect(
      mockProductRepository.getAllProductsWithShareCounts
    ).toHaveBeenCalledTimes(1);
  });
});
