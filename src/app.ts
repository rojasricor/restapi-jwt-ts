import express, { Application } from "express";
import morgan from "morgan";

const app: Application = express();

// settings
app.set("port", 3000);

// middlewares
app.use(morgan("dev"));
app.use(express.json());

import authRoutes from "./routes/auth.routes";

// routes
app.use("/api/auth", authRoutes);

export default app;
