// src/App.jsx
import "./App.css";
import StackedDeck from "./component/StackedDeck";

function App() {
  return (
    <div className="w-full h-fit bg-slate-100 flex flex-col items-center">
      <div className="h-8" />
      <StackedDeck />
    </div>
  );
}

export default App;
