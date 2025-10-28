import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular llamada a API
    try {
      // Aquí se conectará con el endpoint /api/login
      console.log("Iniciando sesión con:", email);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header con gradiente */}
        <div className="login-header">
          <div className="logo">🎯</div>
          <h1 className="login-title">Bienvenido de Vuelta</h1>
          <p className="login-subtitle">Ingresa a tu cuenta para continuar</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label className="input-label">Email</label>
            <div className="input-container">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="input-field"
                placeholder="tu@email.com"
              />
              <div className="input-icon">✉️</div>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Contraseña</label>
            <div className="input-container">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="input-field"
                placeholder="••••••••"
              />
              <div className="input-icon">🔒</div>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Recordar sesión
            </label>
            <a href="/forgot-password" className="forgot-link">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="button-spinner"></div>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p className="footer-text">
            ¿No tienes cuenta? 
            <a href="/register" className="register-link"> Crear cuenta</a>
          </p>
        </div>

        {/* Efectos de fondo */}
        <div className="background-effects">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
        </div>
      </div>
    </div>
  );
}


