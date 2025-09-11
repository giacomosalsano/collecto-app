import { Router } from "express";
import ProductController from "../controllers/ProductController";

const productRoutes = Router();

productRoutes.get("/products", ProductController.list);

export default productRoutes;
