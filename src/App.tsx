import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ItemsList from "./components/items-list.tsx";

function App() {
  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center w-full">
      <DndProvider backend={HTML5Backend}>
        <ItemsList />
      </DndProvider>
    </div>
  );
}

export default App;
