import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import leadRoutes from "./modules/leads/lead.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Auth routes
app.use("/api/auth", authRoutes);

//Lead routes
app.use("/api/leads", leadRoutes);

app.use(errorMiddleware);

export default app;