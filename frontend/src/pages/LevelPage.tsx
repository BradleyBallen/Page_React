import { useParams } from "react-router-dom";

export default function LevelPage() {
  const { levelId } = useParams();

  // Datos de ejemplo para los niveles
  const levelData = {
    beginner: {
      title: "Principiante (A1-A2)",
      description: "Comienza tu journey en el inglés con lo esencial",
      color: "#48BB78",
      gradient: "linear-gradient(135deg, #48BB78, #38A169)",
      lessons: 12,
      progress: 35,
      icon: "🌱"
    },
    intermediate: {
      title: "Intermedio (B1-B2)",
      description: "Perfecciona tus habilidades y expande tu vocabulario",
      color: "#ED8936",
      gradient: "linear-gradient(135deg, #ED8936, #DD6B20)",
      lessons: 18,
      progress: 20,
      icon: "🚀"
    },
    advanced: {
      title: "Avanzado (C1-C2)",
      description: "Domina el inglés con fluidez nativa",
      color: "#9F7AEA",
      gradient: "linear-gradient(135deg, #9F7AEA, #805AD5)",
      lessons: 24,
      progress: 5,
      icon: "🏆"
    }
  };

  const level = levelData[levelId as keyof typeof levelData] || {
    title: levelId,
    description: "Contenido educativo personalizado",
    color: "#667eea",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    lessons: 0,
    progress: 0,
    icon: "📚"
  };

  // Lecciones de ejemplo
  const lessons = [
    { id: 1, title: "Saludos y Presentaciones", duration: "15 min", completed: true, type: "vocabulary" },
    { id: 2, title: "Verbo To Be", duration: "20 min", completed: true, type: "grammar" },
    { id: 3, title: "Pronombres Personales", duration: "18 min", completed: false, type: "grammar" },
    { id: 4, title: "Números y Fechas", duration: "25 min", completed: false, type: "vocabulary" },
    { id: 5, title: "Present Simple", duration: "30 min", completed: false, type: "grammar" },
    { id: 6, title: "Conversación Básica", duration: "22 min", completed: false, type: "speaking" }
  ];

  return (
    <div className="level-page">
      {/* Header del Nivel */}
      <div className="level-header" style={{ background: level.gradient }}>
        <div className="level-header-content">
          <div className="level-icon">{level.icon}</div>
          <div className="level-info">
            <h1 className="level-title">{level.title}</h1>
            <p className="level-description">{level.description}</p>
          </div>
          <div className="level-stats">
            <div className="stat">
              <span className="stat-number">{level.lessons}</span>
              <span className="stat-label">Lecciones</span>
            </div>
            <div className="stat">
              <span className="stat-number">{level.progress}%</span>
              <span className="stat-label">Completado</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="level-progress">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${level.progress}%`,
                background: level.color
              }}
            ></div>
          </div>
          <span className="progress-text">{level.progress}% completado</span>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="level-content">
        {/* Cards de Información */}
        <div className="info-cards">
          <div className="info-card">
            <div className="card-icon">🎯</div>
            <h3>Objetivos del Nivel</h3>
            <p>Domina los conceptos fundamentales para comunicarte en situaciones cotidianas</p>
          </div>
          
          <div className="info-card">
            <div className="card-icon">⏱️</div>
            <h3>Tiempo Estimado</h3>
            <p>Completa este nivel en aproximadamente 4-6 semanas de estudio constante</p>
          </div>
          
          <div className="info-card">
            <div className="card-icon">📈</div>
            <h3>Tu Progreso</h3>
            <p>Vas por buen camino! Continúa con las lecciones para mejorar tu nivel</p>
          </div>
        </div>

        {/* Lista de Lecciones */}
        <div className="lessons-section">
          <div className="section-header">
            <h2>Lecciones del Nivel</h2>
            <p>Completa todas las lecciones para avanzar al siguiente nivel</p>
          </div>

          <div className="lessons-grid">
            {lessons.map((lesson, index) => (
              <div 
                key={lesson.id} 
                className={`lesson-card ${lesson.completed ? 'completed' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="lesson-header">
                  <div className="lesson-icon">
                    {lesson.completed ? '✅' : 
                     lesson.type === 'vocabulary' ? '📖' :
                     lesson.type === 'grammar' ? '📝' : '🎤'}
                  </div>
                  <div className="lesson-status">
                    {lesson.completed ? (
                      <span className="status-badge completed">Completado</span>
                    ) : (
                      <span className="status-badge pending">Pendiente</span>
                    )}
                  </div>
                </div>
                
                <h3 className="lesson-title">{lesson.title}</h3>
                <p className="lesson-duration">{lesson.duration}</p>
                
                <div className="lesson-actions">
                  <button className={`action-btn ${lesson.completed ? 'review' : 'start'}`}>
                    {lesson.completed ? 'Repasar' : 'Comenzar'}
                  </button>
                </div>
                
                {/* Progress indicator for completed lessons */}
                {lesson.completed && (
                  <div className="completion-indicator">
                    <div className="checkmark">✓</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tips de Estudio */}
        <div className="study-tips">
          <div className="tips-header">
            <h2>💡 Tips para Este Nivel</h2>
            <p>Consejos para maximizar tu aprendizaje</p>
          </div>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>Practica Diariamente</h4>
              <p>15 minutos al día son más efectivos que 2 horas una vez por semana</p>
            </div>
            <div className="tip-card">
              <h4>Repasa Constantemente</h4>
              <p>Vuelve a las lecciones anteriores para reforzar tu memoria</p>
            </div>
            <div className="tip-card">
              <h4>Usa el Audio</h4>
              <p>Escucha las pronunciaciones y repite en voz alta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fab" title="Comenzar próxima lección">
        <span>🎯</span>
        <span className="fab-text">Continuar</span>
      </button>
    </div>
  );
}
