import { useState } from "react";

export default function ChatGemini() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = () => {
    // Aquí se integrará la API de Gemini
    setResponse("Respuesta de ejemplo de Gemini...");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Asistente IA</h3>
      <textarea
        rows={3}
        placeholder="Escribe tu pregunta..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "100%", borderRadius: "6px", padding: "10px" }}
      />
      <button onClick={handleAsk}>Preguntar</button>
      {response && <p style={{ marginTop: "10px" }}>{response}</p>}
    </div>
  );
}
