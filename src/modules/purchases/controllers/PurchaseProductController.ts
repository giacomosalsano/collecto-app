import { Request, Response } from "express";
import PurchaseProductUseCase from "../useCases/PurchaseProductUseCase";

class PurchaseProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { product_id, quantity } = req.body;
      const userId = req.user!.id;

      if (!product_id || !quantity) {
        return res
          .status(400)
          .json({ error: "product_id and quantity are required." });
      }

      const result = await PurchaseProductUseCase.execute({
        user_id: userId,
        product_id: Number(product_id),
        quantity: Number(quantity),
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
}

export default new PurchaseProductController();
