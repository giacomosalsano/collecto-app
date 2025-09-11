import express from "express";

import authRoutes from "./modules/auth/routes/authRoutes";
import productRoutes from "./modules/products/routes/productRoutes";
import userRoutes from "./modules/auth/routes/userRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Collecto API is running!"));

app.use("/collecto/", authRoutes);
app.use("/collecto/", productRoutes);
app.use("/collecto/", userRoutes);

export { app };
