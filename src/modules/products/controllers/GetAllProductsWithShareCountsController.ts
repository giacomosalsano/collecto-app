import { Request, Response } from "express";
import GetAllProductsWithShareCountsUseCase from "../useCases/GetAllProductsWithShareCountsUseCase";

class GetAllProductsWithShareCountsController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const products = await GetAllProductsWithShareCountsUseCase.execute();

      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new GetAllProductsWithShareCountsController();
