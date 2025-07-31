import { useParams, useNavigate } from "react-router-dom";
import { ClassGrid } from "src/components/class-grid";
import { SpellDiagram } from "src/components/spell-diagram";

import type { ClassId } from "src/models/character-class";

import styles from "./app.module.css";

export function App() {
  const { className } = useParams(); // <- viene de la ruta dinámica
  const navigate = useNavigate();

  const selectedClass = className as ClassId | undefined;
  const background = selectedClass ? "classGrid" : "spellDiagram";

  const onKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === "Escape" || event.key === "Backspace") && selectedClass) {
      event.preventDefault();
      navigate("/"); // ← volver a la pantalla principal
    }
  };

  return (
    <main className={styles.main} onKeyDown={onKeyDown}>
      <SpellDiagram
        highlightedClass={undefined} // puedes adaptar si decides usar highlight
        selectedClass={selectedClass}
        background={background === "spellDiagram"}
      />

      <ClassGrid
        selectedClass={selectedClass}
        background={background === "classGrid"}
        highlight={() => {}} // opcionalmente puedes omitir o adaptar
        onClick={(cls) => navigate(`/${cls}`)} // ← navegación dinámica
      />
    </main>
  );
}