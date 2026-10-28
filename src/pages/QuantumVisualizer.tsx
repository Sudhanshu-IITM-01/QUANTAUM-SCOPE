
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Atom, RotateCcw } from "lucide-react";

export default function QuantumVisualizer() {
  const navigate = useNavigate();
  const [theta, setTheta] = useState(0);
  const [phi, setPhi] = useState(0);

  const radians = (degrees: number) => (degrees * Math.PI) / 180;

  const p0 = Math.cos(radians(theta) / 2) ** 2;
  const p1 = Math.sin(radians(theta) / 2) ** 2;

  const x = 150 + 85 * Math.sin(radians(theta)) * Math.cos(radians(phi));
  const y = 150 - 85 * Math.cos(radians(theta));
  const z = 150 - 42 * Math.sin(radians(theta)) * Math.sin(radians(phi));

  function setPreset(preset: string) {
    if (preset === "zero") {
      setTheta(0);
      setPhi(0);
    } else if (preset === "one") {
      setTheta(180);
      setPhi(0);
    } else if (preset === "plus") {
      setTheta(90);
      setPhi(0);
    } else {
      setTheta(90);
      setPhi(180);
    }
  }

  function reset() {
    setTheta(0);
    setPhi(0);
  }

  let stateName = "|0⟩";
  if (theta === 180) stateName = "|1⟩";
  else if (theta === 90 && phi === 0) stateName = "|+⟩";
  else if (theta === 90 && phi === 180) stateName = "|−⟩";
  else if (theta !== 0) stateName = "Superposition";

  return (
    <main className="module-page visualizer-page">
      <header className="module-navbar">
        <button className="brand" onClick={() => navigate("/")}>
          <span className="brand-icon"><Atom size={24} /></span>
          <span>QUANTUM<span className="brand-accent">SCOPE</span></span>
        </button>

        <button className="secondary-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Go Back
        </button>
      </header>

      <section className="visualizer-container">
        <div className="eyebrow">QUANTUM SCOPE / 02</div>
        <h1>Quantum Visualizer</h1>
        <p className="visualizer-intro">
          Explore how a single qubit changes between quantum states.
          Adjust its angles and observe the measurement probabilities.
        </p>

        <div className="visualizer-layout">
          <section className="module-panel bloch-panel">
            <div className="visualizer-panel-heading">
              <div>
                <span className="workspace-kicker">LIVE VISUALIZATION</span>
                <h2>Qubit State</h2>
              </div>
              <span className="module-status">INTERACTIVE</span>
            </div>

            <svg
              className="bloch-sphere"
              viewBox="0 0 300 300"
              role="img"
              aria-label={`Illustration of the qubit state ${stateName}`}
            >
              <circle cx="150" cy="150" r="100" className="sphere-outline" />
              <ellipse cx="150" cy="150" rx="100" ry="34" className="sphere-grid" />
              <ellipse cx="150" cy="150" rx="38" ry="100" className="sphere-grid" />
              <line x1="150" y1="42" x2="150" y2="258" className="sphere-axis" />
              <line x1="38" y1="150" x2="262" y2="150" className="sphere-axis" />
              <line x1="150" y1="150" x2={x} y2={y} className="sphere-vector" />
              <circle cx={x} cy={y} r="7" className="sphere-point" />
              <text x="150" y="29" textAnchor="middle" className="sphere-label">|0⟩</text>
              <text x="150" y="281" textAnchor="middle" className="sphere-label">|1⟩</text>
              <text x="263" y="142" textAnchor="middle" className="sphere-label">X</text>
              <text x="174" y="47" className="sphere-small-label">Z</text>
              <circle cx="150" cy="150" r="3" className="sphere-center" />
              <line x1="150" y1="150" x2={150 + (x - 150) * 0.45 + (z - 150) * 0.2} y2={150 + (y - 150) * 0.45} className="sphere-vector-shadow" />
            </svg>

            <div className="state-readout">
              <span>Current state</span>
              <strong>{stateName}</strong>
            </div>
            <p className="visualizer-note">
              This is a simplified Bloch-sphere-style illustration for learning.
            </p>
          </section>

          <section className="module-panel state-controls">
            <span className="workspace-kicker">STATE CONTROLS</span>
            <h2>Choose a state</h2>
            <div className="preset-grid">
              <button onClick={() => setPreset("zero")}>|0⟩ <small>Zero</small></button>
              <button onClick={() => setPreset("one")}>|1⟩ <small>One</small></button>
              <button onClick={() => setPreset("plus")}>|+⟩ <small>Plus</small></button>
              <button onClick={() => setPreset("minus")}>|−⟩ <small>Minus</small></button>
            </div>

            <label className="angle-control">
              <span>Theta (θ) <strong>{theta}°</strong></span>
              <input
                type="range"
                min="0"
                max="180"
                step="1"
                value={theta}
                onChange={(event) => setTheta(Number(event.target.value))}
              />
              <small>Controls the balance between |0⟩ and |1⟩.</small>
            </label>

            <label className="angle-control">
              <span>Phi (φ) <strong>{phi}°</strong></span>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={phi}
                onChange={(event) => setPhi(Number(event.target.value))}
              />
              <small>Changes the relative quantum phase.</small>
            </label>

            <button className="secondary-button visualizer-reset" onClick={reset}>
              <RotateCcw size={16} /> Reset to |0⟩
            </button>
          </section>
        </div>

        <section className="module-panel probability-panel">
          <span className="workspace-kicker">MEASUREMENT ANALYSIS</span>
          <h2>What might we measure?</h2>
          <p className="visualizer-note">
            These are theoretical probabilities for measuring the qubit in the computational basis.
          </p>

          <div className="probability-row">
            <div className="probability-label"><strong>|0⟩</strong><span>{(p0 * 100).toFixed(1)}%</span></div>
            <div className="probability-track">
              <div className="probability-fill fill-cyan" style={{ width: `${p0 * 100}%` }} />
            </div>
          </div>

          <div className="probability-row">
            <div className="probability-label"><strong>|1⟩</strong><span>{(p1 * 100).toFixed(1)}%</span></div>
            <div className="probability-track">
              <div className="probability-fill fill-purple" style={{ width: `${p1 * 100}%` }} />
            </div>
          </div>
        </section>

        <button className="secondary-button visualizer-home" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Return to Home
        </button>
      </section>
    </main>
  );
}
