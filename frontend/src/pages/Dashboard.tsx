import Sidebar from "../components/Sidebar";
import ChatGemini from "../components/ChatGemini";

export default function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <div className="dashboard-main">
        {/* Header del Dashboard */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">Panel de Aprendizaje</h1>
            <p className="dashboard-subtitle">
              Domina el inglés con herramientas inteligentes y contenido personalizado
            </p>
          </div>
          
          {/* User Profile Quick Access */}
          <div className="user-profile-mini">
            <div className="user-avatar">
              <span>👤</span>
            </div>
            <div className="user-info">
              <span className="user-name">Estudiante</span>
              <span className="user-status">En línea</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-content">
              <h3 className="stat-value">12</h3>
              <p className="stat-label">Lecciones Completadas</p>
            </div>
            <div className="stat-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '60%' }}></div>
              </div>
              <span>60%</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3 className="stat-value">8</h3>
              <p className="stat-label">Días de Racha</p>
            </div>
            <div className="stat-trend up">
              <span>+2 esta semana</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <h3 className="stat-value">A2</h3>
              <p className="stat-label">Nivel Actual</p>
            </div>
            <div className="stat-badge">
              <span>Intermedio</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🚀</div>
            <div className="stat-content">
              <h3 className="stat-value">15</h3>
              <p className="stat-label">Objetivos Cumplidos</p>
            </div>
            <div className="stat-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
              <span>75%</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="content-grid">
          {/* Welcome Section */}
          <div className="welcome-card">
            <div className="welcome-header">
              <h2>¡Bienvenido de vuelta!</h2>
              <div className="sparkle">✨</div>
            </div>
            <p className="welcome-text">
              Continúa tu journey de aprendizaje o explora nuevas lecciones. 
              Nuestro asistente Gemini está listo para ayudarte con cualquier duda.
            </p>
            <div className="welcome-actions">
              <button className="action-btn primary">
                Continuar Lección Actual
              </button>
              <button className="action-btn secondary">
                Explorar Lecciones
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-card">
            <h3 className="section-title">Acciones Rápidas</h3>
            <div className="actions-grid">
              <button className="quick-action">
                <div className="action-icon">🎵</div>
                <span>Práctica de Listening</span>
              </button>
              <button className="quick-action">
                <div className="action-icon">📝</div>
                <span>Ejercicios de Gramática</span>
              </button>
              <button className="quick-action">
                <div className="action-icon">🎤</div>
                <span>Práctica de Speaking</span>
              </button>
              <button className="quick-action">
                <div className="action-icon">📊</div>
                <span>Ver Progreso</span>
              </button>
            </div>
          </div>
        </div>

        {/* Chat Gemini Section */}
        <div className="chat-section">
          <div className="section-header">
            <h2 className="section-title">Asistente Gemini</h2>
            <p className="section-subtitle">
              Haz preguntas sobre inglés y recibe ayuda instantánea
            </p>
          </div>
          <ChatGemini />
        </div>
      </div>
    </div>
  );
}
