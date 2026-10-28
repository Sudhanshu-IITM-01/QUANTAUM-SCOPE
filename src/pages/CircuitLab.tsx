
import { useMemo, useState } from "react";
import { ArrowLeft, Atom, RotateCcw, Play, Plus, Trash2, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Gate = "H" | "X" | "Z";

const gateInfo: Record<Gate, { name: string; description: string }> = {
  H: { name: "Hadamard", description: "Creates superposition from |0⟩ or |1⟩." },
  X: { name: "Pauli-X", description: "Flips |0⟩ and |1⟩." },
  Z: { name: "Pauli-Z", description: "Changes the phase of |1⟩." },
};

type Complex = { re: number; im: number };

function simulate(gates: Gate[]) {
  let zero: Complex = { re: 1, im: 0 };
  let one: Complex = { re: 0, im: 0 };
  const invSqrt2 = 1 / Math.sqrt(2);

  for (const gate of gates) {
    if (gate === "H") {
      const nextZero = {
        re: (zero.re + one.re) * invSqrt2,
        im: (zero.im + one.im) * invSqrt2,
      };
      const nextOne = {
        re: (zero.re - one.re) * invSqrt2,
        im: (zero.im - one.im) * invSqrt2,
      };
      zero = nextZero;
      one = nextOne;
    } else if (gate === "X") {
      [zero, one] = [one, zero];
    } else {
      one = { re: -one.re, im: -one.im };
    }
  }

  const p0 = zero.re ** 2 + zero.im ** 2;
  const p1 = one.re ** 2 + one.im ** 2;

  return { p0, p1, zero, one };
}

function formatComplex(value: Complex) {
  if (Math.abs(value.im) < 1e-8) return value.re.toFixed(3);
  if (Math.abs(value.re) < 1e-8) return `${value.im.toFixed(3)}i`;
  return `${value.re.toFixed(3)} ${value.im >= 0 ? "+" : "-"} ${Math.abs(value.im).toFixed(3)}i`;
}

export default function CircuitLab() {
  const navigate = useNavigate();
  const [gates, setGates] = useState<Gate[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const state = useMemo(() => simulate(gates), [gates]);

  function addGate(gate: Gate) {
    setGates((current) => [...current, gate]);
    setResult(null);
    setMessage(`${gateInfo[gate].name} gate added to the circuit.`);
  }

  function resetCircuit() {
    setGates([]);
    setResult(null);
    setMessage("Circuit reset to the initial state |0⟩.");
  }

  function measure() {
    const outcome = Math.random() < state.p0 ? 0 : 1;
    setResult(outcome);
    setMessage(`Measurement result: |${outcome}⟩. Run again to sample another outcome.`);
  }

  return (
    <main className="module-page circuit-page">
      <header className="module-navbar">
        <button className="brand" onClick={() => navigate("/")}>
          <span className="brand-icon"><Atom size={24} /></span>
          <span>QUANTUM<span className="brand-accent">SCOPE</span></span>
        </button>
        <button className="secondary-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Go Back
        </button>
      </header>

      <section className="circuit-container">
        <div className="eyebrow"><Zap size={14} /> INTERACTIVE QUANTUM LAB</div>
        <h1 className="circuit-title">Build your first <span className="gradient-text">circuit.</span></h1>
        <p className="circuit-intro">
          Add quantum gates, inspect the resulting state, and measure your qubit.
          This is a local single-qubit state-vector simulation.
        </p>

        <div className="circuit-workspace">
          <div className="workspace-heading">
            <div>
              <span className="workspace-kicker">YOUR EXPERIMENT</span>
              <h2>Circuit Builder</h2>
            </div>
            <button className="reset-button" onClick={resetCircuit}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          <div className="gate-toolbar">
            {(["H", "X", "Z"] as Gate[]).map((gate) => (
              <button className={`gate-choice gate-${gate.toLowerCase()}`} key={gate} onClick={() => addGate(gate)}>
                <span className="gate-letter">{gate}</span>
                <span className="gate-name">{gateInfo[gate].name}</span>
                <Plus size={14} />
              </button>
            ))}
          </div>

          <div className="circuit-board">
            <div className="wire-label">q₀</div>
            <div className="circuit-wire">
              <div className="wire-line" />
              {gates.map((gate, index) => (
                <div className="gate-position" key={`${gate}-${index}`} style={{ left: `${Math.min(5 + index * 15, 85)}%` }}>
                  <button
                    className={`placed-gate gate-${gate.toLowerCase()}`}
                    title={`Remove ${gateInfo[gate].name} gate`}
                    onClick={() => {
                      setGates((current) => current.filter((_, i) => i !== index));
                      setResult(null);
                      setMessage(`${gateInfo[gate].name} gate removed.`);
                    }}
                  >
                    {gate}
                  </button>
                  <span className="gate-index">{index + 1}</span>
                </div>
              ))}
              <div className="wire-end">|ψ⟩</div>
            </div>
            <div className="board-caption">
              Initial state: |0⟩
              <span>{gates.length} gate{gates.length === 1 ? "" : "s"} added</span>
            </div>
          </div>

          <div className="workspace-actions">
            <button className="primary-button" onClick={measure}>
              <Play size={15} /> Measure Qubit
            </button>
            <button className="secondary-button" onClick={() => {
              if (gates.length) {
                setGates((current) => current.slice(0, -1));
                setResult(null);
                setMessage("Last gate removed.");
              }
            }} disabled={!gates.length}>
              <Trash2 size={15} /> Remove Last Gate
            </button>
          </div>
          {message && <p className="circuit-message" role="status">{message}</p>}
        </div>

        <div className="result-grid">
          <section className="result-card">
            <span className="workspace-kicker">SIMULATED QUANTUM STATE</span>
            <h2>State vector</h2>
            <div className="state-equation">
              <span>{formatComplex(state.zero)}</span> |0⟩
              <span className="equation-plus">+</span>
              <span>{formatComplex(state.one)}</span> |1⟩
            </div>
            <p className="result-note">Amplitudes are calculated from the gates in the circuit.</p>
          </section>

          <section className="result-card">
            <span className="workspace-kicker">MEASUREMENT PROBABILITIES</span>
            <h2>Possible outcomes</h2>
            <div className="probability-row">
              <div className="probability-label"><span>|0⟩</span><strong>{(state.p0 * 100).toFixed(1)}%</strong></div>
              <div className="probability-track"><div className="probability-fill fill-cyan" style={{ width: `${state.p0 * 100}%` }} /></div>
            </div>
            <div className="probability-row">
              <div className="probability-label"><span>|1⟩</span><strong>{(state.p1 * 100).toFixed(1)}%</strong></div>
              <div className="probability-track"><div className="probability-fill fill-purple" style={{ width: `${state.p1 * 100}%` }} /></div>
            </div>
            {result !== null && (
              <div className="measurement-result">
                Measured outcome: <strong>|{result}⟩</strong>
              </div>
            )}
          </section>
        </div>

        <section className="gate-guide">
          <span className="workspace-kicker">QUICK REFERENCE</span>
          <h2>Know your gates</h2>
          <div className="gate-guide-grid">
            {(["H", "X", "Z"] as Gate[]).map((gate) => (
              <article className="gate-guide-card" key={gate}>
                <span className={`gate-letter gate-${gate.toLowerCase()}`}>{gate}</span>
                <h3>{gateInfo[gate].name}</h3>
                <p>{gateInfo[gate].description}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
