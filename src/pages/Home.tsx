
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Atom,
  ArrowRight,
  BrainCircuit,
  CircuitBoard,
  Compass,
  GraduationCap,
  Menu,
  Orbit,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: CircuitBoard,
    title: "Quantum Circuit Lab",
    description:
      "Build circuits, place quantum gates, and discover how qubits transform.",
    tag: "INTERACTIVE LAB",
    path: "/circuit-lab",
  },
  {
    number: "02",
    icon: Orbit,
    title: "Quantum Visualizer",
    description:
      "Explore superposition, measurement, and entanglement through visuals.",
    tag: "VISUAL LEARNING",
    path: "/visualizer",
  },
  {
    number: "03",
    icon: BrainCircuit,
    title: "AI Quantum Tutor",
    description:
      "Understand complex quantum concepts with guided, beginner-friendly explanations.",
    tag: "AI LEARNING",
    path: "/ai-tutor",
  },
  {
    number: "04",
    icon: Zap,
    title: "Algorithm Playground",
    description:
      "Discover Grover's search, Deutsch–Jozsa, and other quantum algorithms.",
    tag: "EXPERIMENT",
    path: "/algorithms",
  },
];

const learningSteps = [
  {
    level: "LEVEL 01",
    title: "Quantum Foundations",
    detail: "Qubits · States · Measurement",
  },
  {
    level: "LEVEL 02",
    title: "Quantum Gates",
    detail: "Pauli · Hadamard · CNOT",
  },
  {
    level: "LEVEL 03",
    title: "Quantum Algorithms",
    detail: "Search · Interference · Entanglement",
  },
];

function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  const goToLearning = () => {
    setMenuOpen(false);
    navigate("/learn");
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="navbar">
        <button
          className="brand"
          onClick={() => navigate("/")}
          aria-label="Quantum Scope home"
        >
          <span className="brand-icon">
            <Atom size={25} />
          </span>
          <span>
            QUANTUM<span className="brand-accent">SCOPE</span>
          </span>
        </button>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          <button onClick={() => scrollTo("features")}>Explore</button>
          <button onClick={goToLearning}>Learning Paths</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <button className="nav-cta" onClick={goToLearning}>
            Start Learning <ArrowRight size={15} />
          </button>
        </nav>
      </header>

      <main>
        <section className="hero section-container" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={14} />
              <span>THE FUTURE IS QUANTUM</span>
            </div>

            <h1>
              Think beyond
              <br />
              the <span className="gradient-text">classical.</span>
            </h1>

            <p className="hero-description">
              Step into the quantum world. Learn the fundamentals, experiment
              with circuits, and turn complex concepts into intuitive
              discoveries.
            </p>

            <div className="hero-actions">
              <button className="primary-button" onClick={goToLearning}>
                Explore the Quantum World <ArrowRight size={17} />
              </button>
              <button
                className="secondary-button"
                onClick={() => scrollTo("features")}
              >
                Discover Features
              </button>
            </div>

            <div className="hero-proof">
              <div className="proof-icon">
                <GraduationCap size={19} />
              </div>
              <div>
                <strong>Built for curious minds</strong>
                <span>From your first qubit to quantum algorithms</span>
              </div>
            </div>
          </div>

          <div
            className="quantum-art"
            aria-label="Abstract quantum-inspired visual"
          >
            <div className="art-grid" />
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="orbit orbit-c" />
            <div className="orbit orbit-d" />
            <div className="core-glow" />
            <div className="quantum-core">
              <Atom size={66} strokeWidth={1.15} />
            </div>
            <span className="particle particle-a" />
            <span className="particle particle-b" />
            <span className="particle particle-c" />
            <span className="particle particle-d" />

            <div className="art-label label-top">
              <span className="status-dot" />
              QUANTUM STATE <strong>ACTIVE</strong>
            </div>

            <div className="art-label label-bottom">
              <span>ψ</span>
              <div>
                WAVEFUNCTION
                <small>Explore the unknown</small>
              </div>
            </div>

            <div className="floating-chip chip-left">
              <Atom size={15} /> QUBITS
            </div>
            <div className="floating-chip chip-right">
              <Zap size={15} /> SUPERPOSITION
            </div>
          </div>
        </section>

        <section className="ticker">
          <div className="ticker-track">
            {[
              "SUPERPOSITION",
              "ENTANGLEMENT",
              "QUANTUM GATES",
              "INTERFERENCE",
              "MEASUREMENT",
              "SUPERPOSITION",
              "ENTANGLEMENT",
              "QUANTUM GATES",
            ].map((item, index) => (
              <span key={`${item}-${index}`}>
                {item}
                <i>✳</i>
              </span>
            ))}
          </div>
        </section>

        <section
          className="features-section section-container"
          id="features"
        >
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <Compass size={14} /> YOUR QUANTUM TOOLKIT
              </div>
              <h2>
                Curiosity meets <span className="gradient-text">computation.</span>
              </h2>
            </div>
            <p>
              Go beyond theory. Explore, experiment, and build your intuition
              one quantum concept at a time.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article className="feature-card" key={feature.number}>
                  <div className="card-topline">
                    <span>{feature.number} / 04</span>
                    <Icon size={22} />
                  </div>

                  <div className="feature-icon">
                    <Icon size={25} />
                  </div>

                  <div className="feature-tag">{feature.tag}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>

                  <button
                    className="text-link"
                    onClick={() => navigate(feature.path)}
                  >
                    Explore module <ArrowRight size={15} />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="learning-section" id="learning">
          <div className="section-container learning-layout">
            <div>
              <div className="eyebrow">
                <GraduationCap size={14} /> YOUR LEARNING JOURNEY
              </div>
              <h2>One qubit at a time.</h2>
              <p className="learning-description">
                No quantum physics background required. Follow a clear path
                from the fundamentals to your first quantum algorithms.
              </p>
              <button className="primary-button" onClick={goToLearning}>
                Begin your journey <ArrowRight size={17} />
              </button>
            </div>

            <div className="learning-list">
              {learningSteps.map((step, index) => (
                <article className="learning-step" key={step.level}>
                  <div className="step-number">0{index + 1}</div>
                  <div className="step-copy">
                    <span>{step.level}</span>
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                  </div>
                  <ArrowRight className="step-arrow" size={19} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section section-container" id="about">
          <div className="about-symbol">
            <Atom size={34} />
          </div>
          <div>
            <div className="eyebrow">A NEW WAY TO LEARN</div>
            <h2>
              Quantum computing,{" "}
              <span className="gradient-text">made approachable.</span>
            </h2>
            <p>
              Quantum Scope is designed to make quantum computing easier to
              explore through interactive learning, clear explanations, and
              hands-on experimentation.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <button className="brand footer-brand" onClick={() => navigate("/")}>
          <span className="brand-icon">
            <Atom size={21} />
          </span>
          <span>
            QUANTUM<span className="brand-accent">SCOPE</span>
          </span>
        </button>

        <span>Explore the quantum world, one discovery at a time.</span>

        <span className="footer-status">
          <span className="status-dot" /> BUILDING THE FUTURE
        </span>
      </footer>
    </div>
  );
}

export default Home;
