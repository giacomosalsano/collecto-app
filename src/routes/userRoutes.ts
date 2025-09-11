import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import CollectionController from "../controllers/CollectionController";

const userRoutes = Router();

userRoutes.get("/user/collection", authMiddleware, CollectionController.get);

export default userRoutes;
