import { Request, Response } from "express";
import AuthUseCase from "../useCases/AuthUseCase";

class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const result = await AuthUseCase.login({ email, password });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ error: (error as Error).message });
    }
  }
}

export default new AuthController();
