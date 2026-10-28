import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Atom,
  CheckCircle2,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { quizQuestions } from "../data/quizQuestions";

export default function Quiz() {
  const navigate = useNavigate();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[questionIndex];
  const isLastQuestion = questionIndex === quizQuestions.length - 1;
  const answeredCount = Object.keys(answers).length;

  const score = quizQuestions.reduce(
    (total, item) =>
      total + (answers[item.id] === item.correctAnswer ? 1 : 0),
    0
  );

  function selectAnswer(optionIndex: number) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(optionIndex);

    setAnswers((current) => ({
      ...current,
      [question.id]: optionIndex,
    }));
  }

  function nextQuestion() {
    if (isLastQuestion) {
      try {
        localStorage.setItem(
          "quantumScopeQuizResult",
          JSON.stringify({
            score,
            total: quizQuestions.length,
            attemptedAt: new Date().toISOString(),
          })
        );
      } catch (error) {
        console.error("Unable to save quiz result:", error);
      }

      setFinished(true);
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelectedAnswer(null);
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers({});
    setFinished(false);
  }

  return (
    <main className="module-page quiz-page">
      <header className="module-navbar">
        <button className="brand" onClick={() => navigate("/")}>
          <span className="brand-icon">
            <Atom size={24} />
          </span>
          <span>
            QUANTUM<span className="brand-accent">SCOPE</span>
          </span>
        </button>

        <button className="secondary-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Go Back
        </button>
      </header>

      <section className="quiz-container">
        <div className="eyebrow">QUANTUM SCOPE / QUIZ ARENA</div>

        <h1>Test Your Quantum Knowledge</h1>

        <p className="quiz-intro">
          Challenge yourself with 10 questions covering essential quantum concepts.
        </p>

        {!finished ? (
          <section className="module-panel quiz-card">
            <div className="quiz-topline">
              <span className="workspace-kicker">{question.topic}</span>
              <span className="quiz-counter">
                Question {questionIndex + 1} of {quizQuestions.length}
              </span>
            </div>

            <div className="quiz-progress">
              <div
                style={{
                  width: `${
                    ((questionIndex + 1) / quizQuestions.length) * 100
                  }%`,
                }}
              />
            </div>

            <h2 className="quiz-question">{question.question}</h2>

            <div className="quiz-options">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = question.correctAnswer === index;
                const showResult = selectedAnswer !== null;

                let className = "quiz-option";

                if (showResult && isCorrect) {
                  className += " correct";
                } else if (showResult && isSelected) {
                  className += " incorrect";
                }

                return (
                  <button
                    key={`${question.id}-${index}`}
                    className={className}
                    onClick={() => selectAnswer(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <span className="quiz-option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span>{option}</span>

                    {showResult && isCorrect && (
                      <CheckCircle2 size={19} />
                    )}

                    {showResult && isSelected && !isCorrect && (
                      <XCircle size={19} />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <div
                className={`quiz-feedback ${
                  selectedAnswer === question.correctAnswer
                    ? "feedback-correct"
                    : "feedback-incorrect"
                }`}
              >
                <strong>
                  {selectedAnswer === question.correctAnswer
                    ? "Correct answer!"
                    : "Not quite — learn from it!"}
                </strong>

                <p>{question.explanation}</p>
              </div>
            )}

            <div className="quiz-footer">
              <span>
                Answered: {answeredCount}/{quizQuestions.length}
              </span>

              <button
                className="algorithm-next-button"
                disabled={selectedAnswer === null}
                onClick={nextQuestion}
              >
                {isLastQuestion ? "See Results" : "Next Question"}
                <ArrowLeft className="quiz-next-icon" size={16} />
              </button>
            </div>
          </section>
        ) : (
          <section className="module-panel quiz-result">
            <div className="quiz-trophy">
              <Trophy size={42} />
            </div>

            <span className="workspace-kicker">QUIZ COMPLETED</span>

            <h2>
              {score >= 8
                ? "Outstanding work!"
                : score >= 5
                  ? "Good effort!"
                  : "Keep exploring!"}
            </h2>

            <div className="quiz-score">
              <strong>{score}</strong>
              <span>/ {quizQuestions.length}</span>
            </div>

            <p>
              You answered {score} out of {quizQuestions.length} questions
              correctly. Review the explanations and try again to improve
              your score.
            </p>

            <div className="quiz-result-actions">
              <button
                className="algorithm-next-button"
                onClick={restartQuiz}
              >
                <RotateCcw size={16} /> Try Again
              </button>

              <button
                className="secondary-button"
                onClick={() => navigate("/dashboard")}
              >
                View Dashboard
              </button>

              <button
                className="secondary-button"
                onClick={() => navigate("/")}
              >
                Return Home
              </button>
            </div>
          </section>
        )}

        <button
          className="secondary-button quiz-home-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={16} /> Return to Home
        </button>
      </section>
    </main>
  );
}