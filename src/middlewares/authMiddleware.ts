import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface TokenPayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token not provided." });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const { id } = decoded as TokenPayload;

    req.user = { id };

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
