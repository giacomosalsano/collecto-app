import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.send("Collecto API is running!"));

export { app };
