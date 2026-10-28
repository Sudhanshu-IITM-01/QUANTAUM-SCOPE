
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Atom,
  BookOpen,
  Brain,
  CircleHelp,
  Code2,
  FlaskConical,
  Target,
  Trophy,
  TrendingUp,
} from "lucide-react";

type QuizResult = {
  score: number;
  total: number;
  attemptedAt?: string;
};

export default function Dashboard() {
  const navigate = useNavigate();

  // Quiz ka saved result browser storage se read karo
  let quizResult: QuizResult | null = null;

  try {
    const saved = localStorage.getItem("quantumScopeQuizResult");
    if (saved) {
      quizResult = JSON.parse(saved) as QuizResult;
    }
  } catch {
    quizResult = null;
  }

  const percentage =
    quizResult && quizResult.total > 0
      ? Math.round((quizResult.score / quizResult.total) * 100)
      : 0;

  const modules = [
    {
      title: "Quantum Circuit Lab",
      description: "Build circuits and experiment with quantum gates.",
      icon: Code2,
      path: "/circuit-lab",
      color: "cyan",
    },
    {
      title: "Quantum Visualizer",
      description: "Explore quantum states and probabilities.",
      icon: Atom,
      path: "/visualizer",
      color: "purple",
    },
    {
      title: "Algorithm Playground",
      description: "Learn important quantum algorithms step by step.",
      icon: FlaskConical,
      path: "/algorithms",
      color: "blue",
    },
    {
      title: "AI Quantum Tutor",
      description: "Explore quantum concepts with the learning assistant.",
      icon: Brain,
      path: "/ai-tutor",
      color: "pink",
    },
    {
      title: "Quantum Quiz",
      description: "Test your understanding of quantum computing.",
      icon: CircleHelp,
      path: "/quiz",
      color: "orange",
    },
    {
      title: "Learning Library",
      description: "Explore quantum computing learning materials.",
      icon: BookOpen,
      path: "/learn",
      color: "green",
    },
  ];

  return (
    <main className="dashboard-page">
      <header className="dashboard-navbar">
        <button
          className="brand"
          onClick={() => navigate("/")}
          aria-label="Quantum Scope home"
        >
          <span className="brand-icon">
            <Atom size={24} />
          </span>
          <span>
            QUANTUM<span className="brand-accent">SCOPE</span>
          </span>
        </button>

        <button
          className="secondary-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
      </header>

      <section className="dashboard-content">
        <div className="dashboard-eyebrow">
          <span className="dashboard-live-dot" />
          YOUR LEARNING SPACE
        </div>

        <h1 className="dashboard-title">
          Learning <span>Dashboard</span>
        </h1>

        <p className="dashboard-description">
          Track your quiz performance and continue your journey
          into quantum computing.
        </p>

        <div className="dashboard-stats">
          <article className="dashboard-stat-card">
            <div className="dashboard-stat-icon cyan">
              <Trophy size={22} />
            </div>
            <p>Latest Quiz Score</p>
            <h2>
              {quizResult
                ? `${quizResult.score}/${quizResult.total}`
                : "--"}
            </h2>
            <span>
              {quizResult ? "Most recent attempt" : "Take a quiz to begin"}
            </span>
          </article>

          <article className="dashboard-stat-card">
            <div className="dashboard-stat-icon purple">
              <Target size={22} />
            </div>
            <p>Latest Accuracy</p>
            <h2>{quizResult ? `${percentage}%` : "--"}</h2>
            <span>
              {quizResult ? "Based on your latest quiz" : "No quiz data yet"}
            </span>
          </article>

          <article className="dashboard-stat-card">
            <div className="dashboard-stat-icon blue">
              <TrendingUp size={22} />
            </div>
            <p>Learning Modules</p>
            <h2>{modules.length}</h2>
            <span>Available to explore</span>
          </article>
        </div>

        <section className="dashboard-quiz-panel">
          <div>
            <div className="dashboard-panel-kicker">YOUR PERFORMANCE</div>
            <h2>
              {quizResult ? "Keep improving!" : "Your journey starts here"}
            </h2>
            <p>
              {quizResult
                ? `Your latest quiz accuracy is ${percentage}%. Practise more to strengthen your understanding.`
                : "Complete the Quantum Quiz to see your latest score and accuracy here."}
            </p>
          </div>

          <button
            className="dashboard-primary-button"
            onClick={() => navigate("/quiz")}
          >
            {quizResult ? "Try Quiz Again" : "Start First Quiz"}
          </button>
        </section>

        <div className="dashboard-section-heading">
          <div>
            <div className="dashboard-panel-kicker">EXPLORE QUANTUM SCOPE</div>
            <h2>Your Learning Modules</h2>
          </div>
          <span>{modules.length} modules</span>
        </div>

        <div className="dashboard-module-grid">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <button
                className="dashboard-module-card"
                key={module.path}
                onClick={() => navigate(module.path)}
              >
                <div className={`dashboard-module-icon ${module.color}`}>
                  <Icon size={23} />
                </div>

                <h3>{module.title}</h3>
                <p>{module.description}</p>

                <span className="dashboard-module-link">
                  Open module <span aria-hidden="true">→</span>
                </span>
              </button>
            );
          })}
        </div>

        <p className="dashboard-footnote">
          Quiz history and detailed progress tracking will be expanded in
          the next development step.
        </p>
      </section>
    </main>
  );
}
