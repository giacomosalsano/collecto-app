import { Request, Response } from "express";
import GetUserCollectionUseCase from "../useCases/GetUserCollectionUseCase";

class GetUserCollectionController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user!.id;
      const collection = await GetUserCollectionUseCase.execute({
        user_id: userId,
      });

      return res.status(200).json(collection);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new GetUserCollectionController();
