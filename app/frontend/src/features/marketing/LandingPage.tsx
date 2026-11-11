import {
  BarChart3,
  Bot,
  BrainCircuit,
  Cloud,
  Code2,
  Gauge,
  Layers3,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ButtonLink, Card, FieldChip } from "../../components/ui";

const fields = [
  { name: "Artificial Intelligence", icon: BrainCircuit, text: "Build intelligent systems with ML and LLMs", learners: "42k" },
  { name: "Data Science", icon: BarChart3, text: "Turn complex data into meaningful insights", learners: "38k" },
  { name: "Cloud Computing", icon: Cloud, text: "Design and run scalable cloud infrastructure", learners: "27k" },
  { name: "DevOps", icon: Network, text: "Automate delivery and modern operations", learners: "24k" },
  { name: "Software Engineering", icon: Code2, text: "Build reliable, high-quality applications", learners: "51k" },
  { name: "Cybersecurity", icon: ShieldCheck, text: "Protect systems, networks, and data", learners: "19k" },
];

export function LandingPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>(["Artificial Intelligence", "Data Science"]);
  const [custom, setCustom] = useState("");

  const toggle = (field: string) => {
    setSelected((curr) =>
      curr.includes(field) ? curr.filter((item) => item !== field) : [...curr, field]
    );
  };

  const handleContinue = () => {
    const chosenFields = custom.trim() ? [...selected, custom.trim()] : selected;
    localStorage.setItem("skillpath_selected_fields", JSON.stringify(chosenFields));
    navigate("/signup");
  };

  return (
    <main className="landing">
      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-copy">
          <div className="hero-kicker">
            <Sparkles size={15} /> Learning that adapts to you
          </div>
          <h1>
            Your ambition.<br />
            <span>Your personal path.</span>
          </h1>
          <p>
            Build real skills with an AI-powered roadmap shaped around your goals,
            experience, and schedule—not a one-size-fits-all course.
          </p>
          <div className="proof-row">
            <div className="avatar-stack">
              <span>JL</span>
              <span>MK</span>
              <span>SR</span>
              <span>+</span>
            </div>
            <div>
              <div className="stars">★★★★★</div>
              <span>Loved by 12,000+ learners</span>
            </div>
          </div>
        </div>

        <Card className="goal-card">
          <div className="goal-card-head">
            <span className="ai-badge">
              <Bot size={19} />
            </span>
            <div>
              <strong>Build your learning path</strong>
              <span>Choose one or combine a few</span>
            </div>
          </div>
          <h2>What do you want to learn or become?</h2>
          <div className="field-grid">
            {fields.map(({ name, icon: Icon }) => (
              <FieldChip
                key={name}
                label={name}
                selected={selected.includes(name)}
                onClick={() => toggle(name)}
                icon={<Icon size={20} />}
              />
            ))}
          </div>
          <div className="or">
            <span />or tell us your goal<span />
          </div>
          <div className="custom-goal">
            <Search size={18} />
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="e.g. Become a solutions architect"
              aria-label="Custom learning goal"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleContinue();
              }}
            />
          </div>
          <button className="button button-primary wide" onClick={handleContinue}>
            Create my personalized roadmap
          </button>
          <p className="fine-print">
            <ShieldCheck size={14} /> Free to start. No credit card required.
          </p>
        </Card>
      </section>

      <section className="trusted">
        <span>Skills aligned with tools used at</span>
        <div>
          <strong>Google</strong>
          <strong>Microsoft</strong>
          <strong>amazon</strong>
          <strong>GitHub</strong>
          <strong>NVIDIA</strong>
        </div>
      </section>

      <section className="how-section">
        <div className="section-heading">
          <span className="eyebrow">How SkillPath works</span>
          <h2>A smarter way to reach your goal</h2>
          <p>
            We continuously adapt the journey to what you know, what you need, and
            how you learn best.
          </p>
        </div>
        <div className="steps-grid">
          {[
            { icon: Target, n: "01", title: "Define your direction", text: "Tell us where you want to go and the time you can invest." },
            { icon: Gauge, n: "02", title: "Discover your starting point", text: "A focused diagnostic finds your strengths and critical gaps." },
            { icon: Layers3, n: "03", title: "Follow your adaptive path", text: "Get the right lesson, practice, or project at exactly the right time." },
            { icon: Trophy, n: "04", title: "Prove what you can do", text: "Build portfolio evidence and see when you are truly role-ready." },
          ].map(({ icon: Icon, n, title, text }) => (
            <div className="step" key={n}>
              <span className="step-number">{n}</span>
              <div className="step-icon">
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <span className="eyebrow">Your next chapter starts here</span>
          <h2>Stop wondering what to learn next.</h2>
          <p>Build a path that moves at your pace and proves your progress.</p>
        </div>
        <ButtonLink to="/signup" variant="dark">
          Build your roadmap
        </ButtonLink>
      </section>
    </main>
  );
}
