import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock3,
  GraduationCap,
  Target,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Button, Logo } from "../../components/ui";

export function OnboardingPage() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [level, setLevel] = useState(profile?.level || "Some experience");
  const [hours, setHours] = useState(profile?.hours || 8);
  const [goal, setGoal] = useState(profile?.goal || "Become an AI Engineer");
  const [learningStyle, setLearningStyle] = useState(profile?.learningStyle || "Mixed");
  const [language, setLanguage] = useState(profile?.language || "English");
  const [ecosystem, setEcosystem] = useState(profile?.ecosystem || "Cloud agnostic");
  const [operatingSystem, setOperatingSystem] = useState(profile?.operatingSystem || "Linux");
  const [loading, setLoading] = useState(false);

  const max = 4;

  const advance = async () => {
    if (step < max) {
      setStep(step + 1);
    } else {
      try {
        setLoading(true);
        await updateProfile({
          level,
          hours,
          goal,
          learningStyle,
          language,
          ecosystem,
          operatingSystem,
          onboardingComplete: true,
        });
        navigate("/assessment");
      } catch {
        navigate("/assessment");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="flow-page">
      <header className="flow-header">
        <Logo />
        <span>Step {step} of {max}</span>
        <button onClick={() => navigate("/app")}>Save & exit</button>
      </header>
      <div className="flow-progress">
        <span style={{ width: `${(step / max) * 100}%` }} />
      </div>
      <section className="flow-content">
        {step === 1 && (
          <>
            <span className="flow-step-icon">
              <GraduationCap />
            </span>
            <h1>Where are you starting from?</h1>
            <p>This helps us match the depth and pace of your roadmap.</p>
            <div className="choice-list">
              {[
                "I'm completely new",
                "I've explored the basics",
                "Some experience",
                "I work in a related field",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={level === item ? "choice selected" : "choice"}
                  onClick={() => setLevel(item)}
                >
                  <span>
                    <strong>{item}</strong>
                    <small>
                      {item === "Some experience"
                        ? "I have built a few things or taken courses"
                        : "We'll calibrate your diagnostic around this"}
                    </small>
                  </span>
                  {level === item ? <CheckCircle2 /> : <Circle />}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <span className="flow-step-icon">
              <Target />
            </span>
            <h1>What outcome are you working toward?</h1>
            <p>A clear destination helps us choose the right competencies.</p>
            <label className="large-label">
              Target role or outcome
              <input value={goal} onChange={(e) => setGoal(e.target.value)} />
            </label>
            <div className="option-grid">
              {[
                "Become an AI Engineer",
                "Career transition",
                "Grow in current role",
                "Build AI production systems",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  className="mini-choice"
                  onClick={() => setGoal(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <span className="flow-step-icon">
              <Clock3 />
            </span>
            <h1>How much time can you invest?</h1>
            <p>We'll create a sustainable weekly plan around your life.</p>
            <div className="hours-value">
              <strong>{hours}</strong>
              <span>hours / week</span>
            </div>
            <input
              className="range"
              type="range"
              min="2"
              max="20"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            />
            <div className="pace-note">
              <Zap />
              <span>
                <strong>{hours < 6 ? "Steady" : hours < 12 ? "Focused" : "Accelerated"} pace</strong>
                Estimated completion: {hours < 6 ? "9–11 months" : hours < 12 ? "6–8 months" : "4–5 months"}
              </span>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <span className="flow-step-icon">
              <Wrench />
            </span>
            <h1>Make the path feel like yours</h1>
            <p>Choose preferences now—you can change these anytime.</p>
            <div className="form-grid">
              <label>
                Learning style
                <select value={learningStyle} onChange={(e) => setLearningStyle(e.target.value)}>
                  <option>Mixed</option>
                  <option>Visual</option>
                  <option>Hands-on</option>
                  <option>Reading</option>
                </select>
              </label>
              <label>
                Language
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </label>
              <label>
                Preferred ecosystem
                <select value={ecosystem} onChange={(e) => setEcosystem(e.target.value)}>
                  <option>Cloud agnostic</option>
                  <option>AWS</option>
                  <option>Azure</option>
                  <option>Google Cloud</option>
                </select>
              </label>
              <label>
                Operating system
                <select value={operatingSystem} onChange={(e) => setOperatingSystem(e.target.value)}>
                  <option>Linux</option>
                  <option>macOS</option>
                  <option>Windows</option>
                </select>
              </label>
            </div>
          </>
        )}

        <div className="flow-actions">
          {step > 1 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={16} /> Back
            </Button>
          )}
          <Button onClick={advance} loading={loading}>
            {step === max ? "Start diagnostic" : "Continue"} <ArrowRight size={16} />
          </Button>
        </div>
      </section>
    </main>
  );
}
