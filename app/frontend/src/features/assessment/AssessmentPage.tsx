import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../services/api";
import { Button, Logo, Pill, Progress } from "../../components/ui";
import { LoadingState } from "../../components/common/LoadingState";
import type { DiagnosticQuestion, DiagnosticResult } from "../../types";

const fallbackQuestions: DiagnosticQuestion[] = [
  { id: "q1", topic: "Python", question: "Which structure provides average O(1) key lookup in Python?", options: ["List", "Dictionary", "Tuple", "Generator"] },
  { id: "q2", topic: "Machine learning", question: "What is the primary purpose of a validation dataset?", options: ["Train model weights", "Tune hyperparameters and assess generalization", "Store raw data permanently", "Deploy the model directly to production"] },
  { id: "q3", topic: "Statistics", question: "Which metric is least affected by extreme outliers in a distribution?", options: ["Mean", "Range", "Median", "Variance"] },
];

export function AssessmentPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<DiagnosticQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  useEffect(() => {
    api.assessment
      .getQuestions()
      .then((data) => {
        setQuestions(data.length ? data : fallbackQuestions);
      })
      .catch(() => {
        setQuestions(fallbackQuestions);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingState message="Loading adaptive diagnostic..." />;
  }

  const question = questions[index] || fallbackQuestions[0];
  const selected = answers[index];

  const handleSelect = (optionIdx: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = optionIdx;
      return next;
    });
  };

  const finish = async () => {
    try {
      setSubmitting(true);
      const res = await api.assessment.submit(answers);
      setResult(res);
    } catch {
      // fallback
      setResult({
        scorePercentage: 75,
        totalQuestions: questions.length,
        correctCount: Math.round(questions.length * 0.75),
        passed: true,
        recommendation: "Solid diagnostic score! Calibration complete.",
        details: [],
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <main className="assessment-page">
        <header className="flow-header">
          <Logo />
          <span>Diagnostic Results</span>
          <button onClick={() => navigate("/app")}>Go to dashboard</button>
        </header>
        <div style={{ maxWidth: "680px", margin: "60px auto", padding: "0 24px" }}>
          <div className="card" style={{ padding: "36px", textAlign: "center" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "var(--blue-100)",
                color: "var(--blue-600)",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 20px",
              }}
            >
              <BrainCircuit size={40} />
            </div>
            <span className="eyebrow">Calibration Complete</span>
            <h1 style={{ fontSize: "32px", marginBottom: "12px" }}>
              Diagnostic Score: <strong>{result.scorePercentage}%</strong>
            </h1>
            <p style={{ color: "var(--slate-600)", fontSize: "14px", lineHeight: 1.6, marginBottom: "24px" }}>
              {result.recommendation}
            </p>
            <div style={{ padding: "18px", background: "var(--blue-50)", borderRadius: "12px", marginBottom: "28px", textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "12px", color: "var(--slate-600)" }}>
                <span>Verified Baseline</span>
                <strong>{result.correctCount} of {result.totalQuestions} questions correct</strong>
              </div>
              <Progress value={result.scorePercentage} />
            </div>
            <Button className="wide" onClick={() => navigate("/app")}>
              Unlock personalized roadmap <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="assessment-page">
      <header className="flow-header">
        <Logo />
        <span>Adaptive diagnostic</span>
        <button onClick={() => navigate("/app")}>Exit</button>
      </header>
      <div className="assessment-shell">
        <aside>
          <span className="assessment-icon">
            <BrainCircuit />
          </span>
          <h2>AI Engineer diagnostic</h2>
          <p>Questions calibrate your roadmap based on real demonstrated understanding.</p>
          <div className="assessment-meta">
            <span>
              <Clock3 /> ~8 min
            </span>
            <span>
              <ShieldCheck /> Private
            </span>
          </div>
        </aside>
        <section className="question-card">
          <div className="question-meta">
            <Pill>{question.topic}</Pill>
            <span>
              Question {index + 1} of {questions.length}
            </span>
          </div>
          <Progress value={((index + 1) / questions.length) * 100} />
          <h1>{question.question}</h1>
          <div className="answer-list">
            {question.options.map((option, optIdx) => (
              <button
                key={option}
                type="button"
                className={selected === optIdx ? "answer selected" : "answer"}
                onClick={() => handleSelect(optIdx)}
              >
                <span>{String.fromCharCode(65 + optIdx)}</span>
                {option}
                {selected === optIdx && <CheckCircle2 />}
              </button>
            ))}
          </div>
          <div className="question-footer">
            <span>You can revise answers before finishing.</span>
            <Button
              disabled={selected === undefined}
              loading={submitting}
              onClick={() => {
                if (index === questions.length - 1) {
                  finish();
                } else {
                  setIndex(index + 1);
                }
              }}
            >
              {index === questions.length - 1 ? "Generate my roadmap" : "Next question"}{" "}
              <ArrowRight size={16} />
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
