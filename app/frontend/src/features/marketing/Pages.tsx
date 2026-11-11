import {
  BarChart3,
  BrainCircuit,
  Cloud,
  Code2,
  Layers3,
  Network,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import { ButtonLink, Card, Logo } from "../../components/ui";

export function FeaturesPage() {
  return (
    <main className="marketing-page">
      <div className="marketing-hero">
        <span className="eyebrow">Designed for meaningful progress</span>
        <h1>
          Not another course catalog.<br />
          <span>A system for becoming.</span>
        </h1>
        <p>
          SkillPath connects diagnostics, learning, practice, projects, and
          analytics into one adaptive journey.
        </p>
        <ButtonLink to="/signup">Build your path</ButtonLink>
      </div>
      <div className="feature-showcase">
        {[
          { icon: BrainCircuit, title: "Adaptive by design", desc: "Your roadmap recalculates as your skills grow, with every change clearly explained." },
          { icon: Target, title: "Mastery, not completion", desc: "Progress comes from demonstrated competencies, not videos watched or boxes checked." },
          { icon: Layers3, title: "One coherent path", desc: "Lessons, documentation, practice, and projects work together instead of competing for attention." },
          { icon: BarChart3, title: "Readiness you can trust", desc: "Know exactly which skills are strong, which need work, and what evidence supports each signal." },
          { icon: Users, title: "Built for real lives", desc: "Your schedule, budget, preferred tools, and learning style shape every recommendation." },
          { icon: ShieldCheck, title: "Progress stays yours", desc: "Change your goal at any time while preserving transferable skills and completed evidence." },
        ].map(({ icon: Icon, title, desc }) => (
          <Card key={title}>
            <div className="feature-icon">
              <Icon />
            </div>
            <h2>{title}</h2>
            <p>{desc}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}

const fieldsList = [
  { name: "Artificial Intelligence", icon: BrainCircuit, text: "Build intelligent systems with ML and LLMs", learners: "42k" },
  { name: "Data Science", icon: BarChart3, text: "Turn complex data into meaningful insights", learners: "38k" },
  { name: "Cloud Computing", icon: Cloud, text: "Design and run scalable cloud infrastructure", learners: "27k" },
  { name: "DevOps", icon: Network, text: "Automate delivery and modern operations", learners: "24k" },
  { name: "Software Engineering", icon: Code2, text: "Build reliable, high-quality applications", learners: "51k" },
  { name: "Cybersecurity", icon: ShieldCheck, text: "Protect systems, networks, and data", learners: "19k" },
];

export function FieldsPage() {
  return (
    <main className="marketing-page fields-page">
      <div className="marketing-hero">
        <span className="eyebrow">Explore learning fields</span>
        <h1>
          Choose a direction.<br />
          <span>Combine your strengths.</span>
        </h1>
        <p>
          Every field is mapped to practical competencies, prerequisites, and
          real-world evidence.
        </p>
      </div>
      <div className="field-catalog">
        {fieldsList.map(({ name, icon: Icon, text, learners }, i) => (
          <Card key={name}>
            <div className={`catalog-icon c${i}`}>
              <Icon />
            </div>
            <div>
              <h2>{name}</h2>
              <p>{text}</p>
              <span>{learners} active learners</span>
            </div>
            <ButtonLink to="/signup" variant="secondary">
              Explore path
            </ButtonLink>
          </Card>
        ))}
      </div>
    </main>
  );
}

export function LegalPage({ type }: { type: string }) {
  return (
    <main className="legal-page">
      <span className="eyebrow">Last updated March 2026</span>
      <h1>{type}</h1>
      <p className="lead">
        We believe learning data should be used to help you grow, never to limit
        your opportunities.
      </p>
      {[
        "Information we collect",
        "How we use your information",
        "Your learning data",
        "Your choices and rights",
        "Contact us",
      ].map((title, i) => (
        <section key={title}>
          <h2>
            {i + 1}. {title}
          </h2>
          <p>
            SkillPath collects only the information needed to personalize your
            experience, measure progress, and maintain your account. You can review,
            export, or delete your information from account settings at any time.
          </p>
        </section>
      ))}
    </main>
  );
}

export function NotFoundPage() {
  return (
    <main className="not-found">
      <Logo />
      <span>404</span>
      <h1>This path doesn’t exist yet.</h1>
      <p>Let’s get you back to the next useful step.</p>
      <ButtonLink to="/">Return home</ButtonLink>
    </main>
  );
}
