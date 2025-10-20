import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(helmet());

// Health Check
app.get("/health", (_req, res) => res.json({ status: "OK" }));

export default app;
