import express from "express";
import cors from "cors";
import session from "express-session"; // 🔹 Necesario para Passport
import passport from "./config/passport";
import userRoutes from "./modules/users/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import dotenv from "dotenv";

dotenv.config(); // 🔹 Cargar variables del .env antes de todo

const app = express();

// 🧩 Configurar CORS (para permitir peticiones desde tu frontend)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true, // 🔹 permite el envío de cookies o cabeceras de sesión
  })
);

app.use(express.json());

// 🧩 Configurar sesión (Passport la necesita para manejar OAuth)
app.use(
  session({
    secret: process.env.JWT_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // ⚠️ true solo si usas HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    },
  })
);

// 🔹 Inicializar Passport y sesiones
app.use(passport.initialize());
app.use(passport.session());

// 🔹 Rutas
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// 🔹 Ruta de prueba opcional
app.get("/", (req, res) => {
  res.send("✅ Servidor funcionando y Passport activo");
});

export default app;
