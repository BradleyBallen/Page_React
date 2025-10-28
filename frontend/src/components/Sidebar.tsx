import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: "📊",
      badge: null
    },
    {
      path: "/levels/beginner",
      label: "Nivel Básico",
      icon: "🌱",
      badge: "A1-A2"
    },
    {
      path: "/levels/intermediate",
      label: "Nivel Intermedio",
      icon: "🚀",
      badge: "B1-B2"
    },
    {
      path: "/levels/advanced",
      label: "Nivel Avanzado",
      icon: "🏆",
      badge: "C1-C2"
    },
    {
      path: "/practice",
      label: "Práctica",
      icon: "🎯",
      badge: "New"
    },
    {
      path: "/progress",
      label: "Mi Progreso",
      icon: "📈",
      badge: null
    },
    {
      path: "/profile",
      label: "Mi Perfil",
      icon: "👤",
      badge: null
    }
  ];

  const isActiveLink = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <aside className="sidebar">
      {/* Logo y Brand */}
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <div className="logo-text">
            <span className="logo-title">EnglishPro</span>
            <span className="logo-subtitle">Learning</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="section-title">Navegación</h3>
          <ul className="nav-menu">
            {menuItems.map((item, index) => (
              <li key={item.path} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${isActiveLink(item.path) ? 'active' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && (
                    <span className={`nav-badge ${item.badge === 'New' ? 'new' : 'level'}`}>
                      {item.badge}
                    </span>
                  )}
                  {/* Active indicator */}
                  <div className="active-indicator"></div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Progress Section */}
        <div className="progress-section">
          <h3 className="section-title">Tu Progreso</h3>
          <div className="progress-card">
            <div className="progress-stats">
              <div className="stat">
                <span className="stat-value">65%</span>
                <span className="stat-label">Completado</span>
              </div>
              <div className="stat">
                <span className="stat-value">12/18</span>
                <span className="stat-label">Lecciones</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3 className="section-title">Acciones Rápidas</h3>
          <div className="action-buttons">
            <button className="action-btn">
              <span className="action-icon">🎵</span>
              Audio
            </button>
            <button className="action-btn">
              <span className="action-icon">📝</span>
              Ejercicios
            </button>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            <span>👤</span>
          </div>
          <div className="user-info">
            <span className="user-name">Estudiante</span>
            <span className="user-level">Nivel A2</span>
          </div>
          <div className="user-status online"></div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="sidebar-effects">
        <div className="effect-circle circle-1"></div>
        <div className="effect-circle circle-2"></div>
      </div>
    </aside>
  );
}
