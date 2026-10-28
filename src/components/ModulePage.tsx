
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Atom } from "lucide-react";

type ModulePageProps = {
  title: string;
  subtitle: string;
  description: string;
  number: string;
};

export default function ModulePage({
  title,
  subtitle,
  description,
  number,
}: ModulePageProps) {
  const navigate = useNavigate();

  return (
    <main className="module-page">
      <header className="module-navbar">
        <button className="brand" onClick={() => navigate("/")}>
          <span className="brand-icon"><Atom size={24} /></span>
          <span>QUANTUM<span className="brand-accent">SCOPE</span></span>
        </button>

        <button className="secondary-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Go Back
        </button>
      </header>

      <section className="module-content">
        <div className="eyebrow">QUANTUM SCOPE / {number}</div>
        <h1>{title}</h1>
        <p className="module-subtitle">{subtitle}</p>

        <div className="module-panel">
          <Atom size={42} />
          <h2>{title}</h2>
          <p>{description}</p>
          <span className="module-status">MODULE INITIALIZED</span>
        </div>

        <button className="secondary-button" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Return to Home
        </button>
      </section>
    </main>
  );
}
