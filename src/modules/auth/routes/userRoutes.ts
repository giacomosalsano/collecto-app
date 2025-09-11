import { Router } from "express";
import { authMiddleware } from "../../../shared/middlewares/authMiddleware";
import CollectionController from "../../collections/controllers/GetUserCollectionController";

const userRoutes = Router();

userRoutes.get("/user/collection", authMiddleware, CollectionController.handle);

export default userRoutes;
