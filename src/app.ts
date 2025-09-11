import express from "express";

import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Collecto API is running!"));

app.use("/collecto/", authRoutes);
app.use("/collecto/", productRoutes);
app.use("/collecto/", userRoutes);

export { app };
