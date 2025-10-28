import { useParams } from "react-router-dom";

export default function LevelPage() {
  const { levelId } = useParams();

  return (
    <div className="container">
      <h1>Contenido del Nivel: {levelId}</h1>
      <p>Aquí se mostrará el contenido educativo de este nivel.</p>
    </div>
  );
}
