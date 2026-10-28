
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Atom, CheckCircle2, Play } from "lucide-react";

const algorithms = [
  {
    id: "grover",
    name: "Grover's Search",
    category: "SEARCH",
    difficulty: "Intermediate",
    description:
      "Search for a marked item in an unsorted collection using quantum amplitude amplification.",
    steps: [
      "Prepare the qubits in an equal superposition.",
      "Use an oracle to mark the target state.",
      "Apply the diffusion operator to amplify the target.",
      "Measure the qubits to obtain a likely solution.",
    ],
    example: "Finding a marked item among 4 possibilities.",
    complexity: "O(√N) queries",
  },
  {
    id: "deutsch",
    name: "Deutsch–Jozsa",
    category: "ORACLE ALGORITHM",
    difficulty: "Intermediate",
    description:
      "Determine whether a promised Boolean function is constant or balanced.",
    steps: [
      "Initialize the input qubit to |0⟩ and an auxiliary qubit to |1⟩.",
      "Apply Hadamard gates to create superposition.",
      "Apply the function oracle.",
      "Apply Hadamard to the input and measure it.",
    ],
    example: "Distinguishing a constant function from a balanced one.",
    complexity: "1 oracle query",
  },
  {
    id: "teleportation",
    name: "Quantum Teleportation",
    category: "QUANTUM COMMUNICATION",
    difficulty: "Intermediate",
    description:
      "Transfer an unknown qubit state using shared entanglement and classical communication.",
    steps: [
      "Prepare the unknown qubit and an entangled pair.",
      "Perform a CNOT operation and a Hadamard gate.",
      "Measure the sender's two qubits.",
      "Send the two classical bits and apply corrections at the receiver.",
    ],
    example: "Transferring a qubit state without physically sending that qubit.",
    complexity: "1 entangled pair + 2 classical bits",
  },
  {
    id: "qft",
    name: "Quantum Fourier Transform",
    category: "TRANSFORM",
    difficulty: "Advanced",
    description:
      "Transform quantum amplitudes using a quantum version of the discrete Fourier transform.",
    steps: [
      "Prepare the input quantum state.",
      "Apply Hadamard gates and controlled phase rotations.",
      "Reorder the qubits if required by the circuit.",
      "Use the transformed state in a larger quantum algorithm.",
    ],
    example: "A key building block in Shor's factoring algorithm.",
    complexity: "O(n²) gates in a standard construction",
  },
];

export default function Algorithms() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState("grover");
  const [stepIndex, setStepIndex] = useState(0);

  const selected =
    algorithms.find((algorithm) => algorithm.id === selectedId) ??
    algorithms[0];

  function chooseAlgorithm(id: string) {
    setSelectedId(id);
    setStepIndex(0);
  }

  function resetSteps() {
    setStepIndex(0);
  }

  return (
    <main className="module-page algorithms-page">
      <header className="module-navbar">
        <button className="brand" onClick={() => navigate("/")}>
          <span className="brand-icon"><Atom size={24} /></span>
          <span>QUANTUM<span className="brand-accent">SCOPE</span></span>
        </button>

        <button className="secondary-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Go Back
        </button>
      </header>

      <section className="algorithms-container">
        <div className="eyebrow">QUANTUM SCOPE / 03</div>
        <h1>Algorithm Playground</h1>
        <p className="algorithms-intro">
          Explore important quantum algorithms, understand their steps,
          and discover where they are used.
        </p>

        <div className="algorithm-layout">
          <aside className="module-panel algorithm-list">
            <span className="workspace-kicker">ALGORITHM LIBRARY</span>
            <h2>Choose an algorithm</h2>

            {algorithms.map((algorithm) => (
              <button
                key={algorithm.id}
                className={`algorithm-option ${
                  selectedId === algorithm.id ? "active" : ""
                }`}
                onClick={() => chooseAlgorithm(algorithm.id)}
              >
                <span className="algorithm-option-icon"><Atom size={19} /></span>
                <span className="algorithm-option-text">
                  <strong>{algorithm.name}</strong>
                  <small>{algorithm.category}</small>
                </span>
                <span className="algorithm-option-arrow">→</span>
              </button>
            ))}
          </aside>

          <section className="module-panel algorithm-details">
            <div className="algorithm-detail-top">
              <span className="workspace-kicker">{selected.category}</span>
              <span className="algorithm-level">{selected.difficulty}</span>
            </div>

            <h2>{selected.name}</h2>
            <p className="algorithm-description">{selected.description}</p>

            <div className="algorithm-example">
              <span>EXAMPLE APPLICATION</span>
              <p>{selected.example}</p>
            </div>

            <div className="algorithm-steps-heading">
              <div>
                <span className="workspace-kicker">LEARNING MODE</span>
                <h3>How it works</h3>
              </div>
              <span className="algorithm-step-count">
                {stepIndex + 1} / {selected.steps.length}
              </span>
            </div>

            <div className="algorithm-progress">
              <div
                style={{
                  width: `${((stepIndex + 1) / selected.steps.length) * 100}%`,
                }}
              />
            </div>

            <div className="algorithm-step-card">
              <span className="algorithm-step-number">
                STEP {String(stepIndex + 1).padStart(2, "0")}
              </span>
              <p>{selected.steps[stepIndex]}</p>
              <div className="algorithm-step-check">
                <CheckCircle2 size={17} />
                <span>Concept walkthrough</span>
              </div>
            </div>

            <div className="algorithm-navigation">
              <button
                className="secondary-button"
                disabled={stepIndex === 0}
                onClick={() => setStepIndex((current) => current - 1)}
              >
                Previous
              </button>

              {stepIndex < selected.steps.length - 1 ? (
                <button
                  className="algorithm-next-button"
                  onClick={() => setStepIndex((current) => current + 1)}
                >
                  <Play size={15} /> Next Step
                </button>
              ) : (
                <button className="algorithm-next-button" onClick={resetSteps}>
                  <Atom size={16} /> Restart Lesson
                </button>
              )}
            </div>

            <div className="algorithm-complexity">
              <span>COMPLEXITY / RESOURCE NOTE</span>
              <strong>{selected.complexity}</strong>
              <p>
                Complexity depends on the algorithm's assumptions and
                implementation. Quantum speedups do not apply to every task.
              </p>
            </div>
          </section>
        </div>

        <button
          className="secondary-button algorithms-home"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={16} /> Return to Home
        </button>
      </section>
    </main>
  );
}
