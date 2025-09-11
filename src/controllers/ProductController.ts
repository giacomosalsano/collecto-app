import { Request, Response } from "express";
import ProductUseCase from "../useCases/ProductUseCase";

class ProductController {
  async list(req: Request, res: Response): Promise<Response> {
    try {
      const products = await ProductUseCase.listAll();

      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new ProductController();
