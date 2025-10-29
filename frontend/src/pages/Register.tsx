import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "",
    confirmPassword: "",
    age: "",
    level: "beginner",
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!form.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    if (!form.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "El formato del email no es válido";
    }

    if (!form.age.trim()) {
      newErrors.age = "La edad es requerida";
    } else if (isNaN(Number(form.age))) {
      newErrors.age = "La edad debe ser un número";
    } else if (Number(form.age) < 13) {
      newErrors.age = "Debes tener al menos 13 años para registrarte";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!form.agreeTerms) {
      newErrors.agreeTerms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Registro exitoso:", form);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en registro:", error);
      setErrors({ submit: "Error al crear la cuenta. Intenta nuevamente." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="logo">🚀</div>
          <h1 className="register-title">Comienza tu Journey</h1>
          <p className="register-subtitle">Crea tu cuenta y domina el inglés</p>
        </div>

        <div className="progress-steps">
          <div className="step active">
            <div className="step-number">1</div>
            <span>Información</span>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <span>Nivel</span>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <span>Completar</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {errors.submit && (
            <div className="error-message general-error">
              {errors.submit}
            </div>
          )}

          <div className="form-grid">
            {/* Nombre */}
            <div className="input-group">
              <label className="input-label">Nombre Completo</label>
              <div className="input-container">
                <input 
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={`input-field ${errors.name ? 'input-error' : ''}`}
                  placeholder="Tu nombre completo"
                  disabled={isLoading}
                />
                <div className="input-icon">👤</div>
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Edad */}
            <div className="input-group">
              <label className="input-label">Edad</label>
              <div className="input-container">
                <input 
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  required
                  className={`input-field ${errors.age ? 'input-error' : ''}`}
                  placeholder="Tu edad"
                  disabled={isLoading}
                  min="0"
                />
                <div className="input-icon">🎂</div>
              </div>
              {errors.age && <span className="error-message">{errors.age}</span>}
            </div>

            {/* Email */}
            <div className="input-group">
              <label className="input-label">Email</label>
              <div className="input-container">
                <input 
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                  placeholder="tu@email.com"
                  disabled={isLoading}
                />
                <div className="input-icon">✉️</div>
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Contraseña */}
            <div className="input-group">
              <label className="input-label">Contraseña</label>
              <div className="input-container">
                <input 
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className={`input-field ${errors.password ? 'input-error' : ''}`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <div className="input-icon">🔒</div>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Confirmar Contraseña */}
            <div className="input-group">
              <label className="input-label">Confirmar Contraseña</label>
              <div className="input-container">
                <input 
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <div className="input-icon">🔒</div>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>

          {/* Nivel */}
          <div className="level-selection">
            <label className="section-label">¿Cuál es tu nivel de inglés?</label>
            <div className="level-options">
              <label className={`level-option ${form.level === 'beginner' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="level"
                  value="beginner"
                  checked={form.level === 'beginner'}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <div className="option-content">
                  <span className="option-icon">🌱</span>
                  <div className="option-text">
                    <strong>Principiante</strong>
                    <span>A1 - A2</span>
                  </div>
                </div>
              </label>

              <label className={`level-option ${form.level === 'intermediate' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="level"
                  value="intermediate"
                  checked={form.level === 'intermediate'}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <div className="option-content">
                  <span className="option-icon">🚀</span>
                  <div className="option-text">
                    <strong>Intermedio</strong>
                    <span>B1 - B2</span>
                  </div>
                </div>
              </label>

              <label className={`level-option ${form.level === 'advanced' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="level"
                  value="advanced"
                  checked={form.level === 'advanced'}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <div className="option-content">
                  <span className="option-icon">🏆</span>
                  <div className="option-text">
                    <strong>Avanzado</strong>
                    <span>C1 - C2</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Términos */}
          <div className="terms-section">
            <label className={`checkbox-container ${errors.agreeTerms ? 'error' : ''}`}>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
                disabled={isLoading}
              />
              <span className="checkmark"></span>
              <span className="terms-text">
                Acepto los <a href="/terms" className="terms-link">Términos de Servicio</a> y la <a href="/privacy" className="terms-link">Política de Privacidad</a>
              </span>
            </label>
            {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
          </div>

          {/* Botón */}
          <button 
            type="submit" 
            className={`register-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="button-spinner"></div>
                Creando tu cuenta...
              </>
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </form>

        <div className="register-footer">
          <p className="footer-text">
            ¿Ya tienes cuenta? 
            <a href="/login" className="login-link"> Inicia sesión aquí</a>
          </p>
        </div>

        <div className="benefits-section">
          <h4>✨ Al registrarte obtienes:</h4>
          <div className="benefits-list">
            <div className="benefit">
              <span>🎯</span>
              <span>Contenido personalizado según tu nivel</span>
            </div>
            <div className="benefit">
              <span>📊</span>
              <span>Seguimiento de tu progreso</span>
            </div>
            <div className="benefit">
              <span>🤖</span>
              <span>Asistente IA para dudas</span>
            </div>
            <div className="benefit">
              <span>📱</span>
              <span>Acceso desde cualquier dispositivo</span>
            </div>
          </div>
        </div>

        <div className="background-effects">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
        </div>
      </div>
    </div>
  );
}
