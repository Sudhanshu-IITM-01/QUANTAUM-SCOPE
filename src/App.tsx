
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import CircuitLab from "./pages/CircuitLab";
import QuantumVisualizer from "./pages/QuantumVisualizer";
import Algorithms from "./pages/Algorithms";
import AITutor from "./pages/AITutor";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/circuit-lab" element={<CircuitLab />} />
      <Route path="/visualizer" element={<QuantumVisualizer />} />
      <Route path="/algorithms" element={<Algorithms />} />
      <Route path="/ai-tutor" element={<AITutor />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
