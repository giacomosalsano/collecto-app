import { Request, Response } from "express";
import PurchaseUseCase from "../useCases/PurchaseUseCase";

class PurchaseController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user!.id;

      if (!productId || !quantity) {
        return res
          .status(400)
          .json({ error: "productId and quantity are required." });
      }

      const result = await PurchaseUseCase.execute({
        userId,
        productId: Number(productId),
        quantity: Number(quantity),
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new PurchaseController();
