import express from "express";
import cors from "cors";
import passport from "./config/passport"; 
import userRoutes from "./modules/users/user.routes";
import authRoutes from "./modules/auth/auth.routes"; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize()); 

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); 

export default app;
