import { Router } from "express";
import ProductController from "../controllers/ProductController";
import { authMiddleware } from "../middlewares/authMiddleware";
import PurchaseController from "../controllers/PurchaseController";

const productRoutes = Router();

productRoutes.get("/products", ProductController.list);

productRoutes.post("/purchase", authMiddleware, PurchaseController.create);

export default productRoutes;
