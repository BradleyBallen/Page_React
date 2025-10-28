import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatGemini() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "¡Hola! Soy tu asistente de inglés. ¿En qué puedo ayudarte hoy? Puedo explicar gramática, ayudarte con vocabulario o practicar conversación contigo.",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAsk = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simular llamada a la API de Gemini
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getMockResponse(input),
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const getMockResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("hola") || lowerQuestion.includes("hi")) {
      return "¡Hola! 😊 Es un placer ayudarte con tu inglés. ¿Tienes alguna pregunta específica sobre gramática, vocabulario o pronunciación?";
    }
    
    if (lowerQuestion.includes("present simple")) {
      return "El **Present Simple** se usa para:\n\n• Rutinas y hábitos: *I work every day*\n• Hechos generales: *The sun rises in the east*\n• Horarios: *The train leaves at 8 PM*\n\nEstructura: Sujeto + verbo en forma base (+s en 3ra persona)\nEjemplo: *She studies English every day* 📚";
    }
    
    if (lowerQuestion.includes("vocabulario") || lowerQuestion.includes("vocabulary")) {
      return "¡Excelente! Te recomiendo estos temas de vocabulario:\n\n• **Daily Routine**: wake up, get dressed, have breakfast\n• **Food & Drinks**: delicious, tasty, beverage\n• **Travel**: destination, luggage, boarding pass\n\n¿Te interesa algún tema en particular? 🎯";
    }
    
    if (lowerQuestion.includes("pronunciación") || lowerQuestion.includes("pronunciation")) {
      return "Para mejorar tu pronunciación:\n\n🎵 **Escucha y repite**: Practica con videos y repite en voz alta\n🗣️ **Grabate**: Compara tu pronunciación con nativos\n📚 **Fonética**: Aprende los símbolos fonéticos\n\n¿Quieres que te ayude con alguna palabra específica?";
    }
    
    return "¡Interesante pregunta! 🤔 Como asistente de inglés, puedo ayudarte con:\n\n• Explicaciones de gramática\n• Ejercicios de vocabulario\n• Práctica de conversación\n• Corrección de textos\n\n¿Podrías ser más específico sobre lo que necesitas aprender?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "¡Hola! Soy tu asistente de inglés. ¿En qué puedo ayudarte hoy?",
        sender: 'assistant',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="chat-gemini">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="assistant-info">
          <div className="assistant-avatar">
            <span>🤖</span>
            <div className="online-dot"></div>
          </div>
          <div className="assistant-details">
            <h3>Asistente Gemini</h3>
            <p>Especialista en inglés</p>
          </div>
        </div>
        <button className="clear-chat-btn" onClick={clearChat} title="Limpiar chat">
          <span>🗑️</span>
        </button>
      </div>

      {/* Messages Container */}
      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <div className="message-bubble">
              <div className="message-text">
                {message.text.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              <div className="message-time">
                {formatTime(message.timestamp)}
              </div>
            </div>
            {message.sender === 'assistant' && (
              <div className="message-avatar">
                <span>🤖</span>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="message assistant-message">
            <div className="message-bubble">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="message-avatar">
              <span>🤖</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu pregunta sobre inglés..."
            rows={1}
            className="chat-input"
            disabled={isLoading}
          />
          <button
            onClick={handleAsk}
            disabled={!input.trim() || isLoading}
            className="send-button"
          >
            {isLoading ? (
              <div className="button-spinner"></div>
            ) : (
              <span>➤</span>
            )}
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="quick-questions">
          <span>Preguntas rápidas:</span>
          <button 
            onClick={() => setInput("Explícame el Present Simple")}
            disabled={isLoading}
            className="quick-question"
          >
            Present Simple
          </button>
          <button 
            onClick={() => setInput("Necesito vocabulario de comida")}
            disabled={isLoading}
            className="quick-question"
          >
            Vocabulario
          </button>
          <button 
            onClick={() => setInput("¿Cómo mejorar mi pronunciación?")}
            disabled={isLoading}
            className="quick-question"
          >
            Pronunciación
          </button>
        </div>
      </div>
    </div>
  );
}