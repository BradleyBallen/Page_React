import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        background: "#2f3640",
        color: "white",
        padding: "20px",
      }}
    >
      <h3>Menú</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/levels/basic" style={{ color: "white" }}>Nivel Básico</Link></li>
        <li><Link to="/levels/intermediate" style={{ color: "white" }}>Nivel Intermedio</Link></li>
        <li><Link to="/levels/advanced" style={{ color: "white" }}>Nivel Avanzado</Link></li>
      </ul>
    </aside>
  );
}
