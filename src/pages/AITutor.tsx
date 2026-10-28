
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Atom,
  Bot,
  Send,
  Sparkles,
  User,
  RotateCcw,
} from "lucide-react";

const suggestions = [
  "What is a qubit?",
  "Explain quantum superposition",
  "What is quantum entanglement?",
  "How does a Hadamard gate work?",
];

function getExplanation(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("qubit") || q.includes("quantum bit")) {
    return "A qubit is the basic unit of quantum information. Unlike a classical bit, which is either 0 or 1, a qubit can be in a quantum superposition of the states |0⟩ and |1⟩. When measured in the computational basis, its result is 0 or 1.";
  }

  if (q.includes("superposition") || q.includes("hadamard") || q.includes("h gate")) {
    return "Superposition is a quantum state that combines the possibilities |0⟩ and |1⟩. For example, applying a Hadamard gate to |0⟩ creates (|0⟩ + |1⟩)/√2. Measuring this state in the computational basis gives 0 or 1 with equal probability.";
  }

  if (q.includes("entanglement") || q.includes("entangled")) {
    return "Quantum entanglement is a relationship between quantum systems in which their joint state cannot be described as independent states of each system. Measurements can show correlations that have no equivalent in classical physics. Entanglement does not allow faster-than-light communication.";
  }

  if (q.includes("measurement") || q.includes("measure")) {
    return "Quantum measurement produces an outcome according to the probabilities of the state and the measurement basis. For a qubit α|0⟩ + β|1⟩ measured in the computational basis, the probabilities are |α|² for 0 and |β|² for 1, with |α|² + |β|² = 1.";
  }

  if (q.includes("gate") || q.includes("pauli") || q.includes("cnot")) {
    return "Quantum gates are operations that transform quantum states. The X gate flips |0⟩ and |1⟩, the Z gate changes the phase of |1⟩, and the Hadamard gate creates or removes certain superpositions. A CNOT gate acts on two qubits and flips its target when its control qubit is |1⟩.";
  }

  if (q.includes("grover") || q.includes("search algorithm")) {
    return "Grover's algorithm searches an unstructured collection using amplitude amplification. It can find a marked item with roughly O(√N) oracle queries, compared with O(N) queries in the classical worst case. The advantage depends on the search setup and oracle access.";
  }

  if (q.includes("fourier") || q.includes("qft")) {
    return "The Quantum Fourier Transform (QFT) is the quantum analogue of the discrete Fourier transform. It changes the amplitudes and phases of a quantum state and is an important building block in algorithms such as Shor's factoring algorithm.";
  }

  if (q.includes("teleport")) {
    return "Quantum teleportation transfers an unknown quantum state using shared entanglement, a joint measurement and two classical bits. It does not teleport matter, and it cannot transmit information faster than light.";
  }

  if (q.includes("classical") || q.includes("difference") || q.includes("compare")) {
    return "Classical computers process bits, represented as 0 or 1. Quantum computers process qubits, which can have superposition and entanglement. Quantum computers may outperform classical methods for specific problems, but they are not automatically faster for every task.";
  }

  return "I don't have a prepared explanation for that question yet. Try asking about qubits, superposition, entanglement, quantum gates, measurement, Grover's algorithm or the Quantum Fourier Transform. These explanations currently come from a local knowledge base, not a live AI model.";
}

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

export default function AITutor() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Hi! I'm your Quantum Scope learning assistant. Ask me about qubits, superposition, quantum gates or quantum algorithms. I'll explain the concepts in beginner-friendly language.",
    },
  ]);

  function askQuestion(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: trimmed,
    };

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      text: getExplanation(trimmed),
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setQuestion("");
  }

  function resetChat() {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        text: "New chat started! What quantum concept would you like to explore?",
      },
    ]);
    setQuestion("");
  }

  return (
    <main className="module-page tutor-page">
      <header className="module-navbar">
        <button className="brand" onClick={() => navigate("/")}>
          <span className="brand-icon"><Atom size={24} /></span>
          <span>QUANTUM<span className="brand-accent">SCOPE</span></span>
        </button>

        <button className="secondary-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Go Back
        </button>
      </header>

      <section className="tutor-container">
        <div className="eyebrow">QUANTUM SCOPE / 04</div>

        <div className="tutor-heading">
          <div>
            <h1>AI Quantum Tutor</h1>
            <p>Explore quantum computing, one question at a time.</p>
          </div>
          <div className="tutor-status">
            <span />
            LOCAL LEARNING MODE
          </div>
        </div>

        <div className="tutor-workspace">
          <aside className="module-panel tutor-sidebar">
            <div className="tutor-avatar"><Sparkles size={25} /></div>
            <h2>Your learning companion</h2>
            <p>
              Ask a question or select a topic to explore its core concepts.
            </p>

            <span className="workspace-kicker">TRY ASKING</span>

            <div className="tutor-suggestions">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => askQuestion(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="tutor-disclaimer">
              <Bot size={17} />
              <span>
                Prototype mode: answers are selected from a local knowledge
                base. No live AI API is connected yet.
              </span>
            </div>
          </aside>

          <section className="module-panel tutor-chat">
            <div className="tutor-chat-header">
              <div className="tutor-chat-title">
                <span className="tutor-mini-avatar"><Atom size={19} /></span>
                <div>
                  <strong>Quantum Assistant</strong>
                  <small>Beginner-friendly explanations</small>
                </div>
              </div>

              <button
                className="tutor-reset"
                onClick={resetChat}
                aria-label="Reset conversation"
                title="Reset conversation"
              >
                <RotateCcw size={17} />
              </button>
            </div>

            <div className="tutor-messages" aria-live="polite">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`tutor-message ${
                    message.role === "user" ? "user-message" : "assistant-message"
                  }`}
                >
                  <span className="message-avatar">
                    {message.role === "user" ? (
                      <User size={17} />
                    ) : (
                      <Atom size={17} />
                    )}
                  </span>
                  <div className="message-body">
                    <small>
                      {message.role === "user" ? "YOU" : "QUANTUM SCOPE"}
                    </small>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <form
              className="tutor-input-area"
              onSubmit={(event) => {
                event.preventDefault();
                askQuestion(question);
              }}
            >
              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask a quantum computing question..."
                aria-label="Your question"
              />
              <button
                type="submit"
                disabled={!question.trim()}
                aria-label="Send question"
              >
                <Send size={18} />
              </button>
            </form>

            <p className="tutor-input-note">
              Educational prototype · Verify advanced concepts with trusted sources.
            </p>
          </section>
        </div>

        <button
          className="secondary-button tutor-home"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={16} /> Return to Home
        </button>
      </section>
    </main>
  );
}
