import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se conectará con el endpoint /api/login
    console.log("Iniciando sesión con:", email);
    navigate("/dashboard");
  };

  return (
    <div className="container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} required />
        <label>Contraseña</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
        <p>
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
      </form>
    </div>
  );
}


