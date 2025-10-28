import { useState } from "react";
import "../styles/LoginForm.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Correo inválido");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Aquí luego conectarás el endpoint de login
    console.log("Datos listos para enviar:", { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
            alt="Logo"
            className="login-logo"
          />
          <h1>English Learning Portal</h1>
          <p>Accede a tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="ejemplo@correo.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Contraseña</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="show-password-btn"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">
            Iniciar sesión
          </button>
        </form>

        <div className="login-footer">
          <a href="#">¿Olvidaste tu contraseña?</a>
          <p>
            ¿No tienes una cuenta? <a href="#">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
}

