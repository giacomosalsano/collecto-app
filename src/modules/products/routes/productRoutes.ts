import { Router } from "express";
import GetAllProductsWithShareCountsController from "../controllers/GetAllProductsWithShareCountsController";
import { authMiddleware } from "../../../shared/middlewares/authMiddleware";
import PurchaseProductController from "../../purchases/controllers/PurchaseProductController";

const productRoutes = Router();

productRoutes.get("/products", GetAllProductsWithShareCountsController.handle);

productRoutes.post(
  "/purchase",
  authMiddleware,
  PurchaseProductController.handle
);

export default productRoutes;
