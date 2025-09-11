import { Request, Response } from "express";
import CollectionUseCase from "../useCases/CollectionUseCase";

class CollectionController {
  async get(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user!.id;
      const collection = await CollectionUseCase.getCollection(userId);

      return res.status(200).json(collection);
    } catch (error) {
      console.error(error);
      
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new CollectionController();
