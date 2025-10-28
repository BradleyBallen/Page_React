import Sidebar from "../components/Sidebar";
import ChatGemini from "../components/ChatGemini";

export default function Dashboard() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Bienvenido al Panel de Aprendizaje</h2>
        <p>Selecciona tu nivel de inglés o haz preguntas al asistente Gemini.</p>
        <ChatGemini />
      </div>
    </div>
  );
}
