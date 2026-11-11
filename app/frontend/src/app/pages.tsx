import {
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Filter,
  Gauge,
  GraduationCap,
  Layers3,
  Lightbulb,
  LockKeyhole,
  Network,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Timer,
  TrendingUp,
  Trophy,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useLearner } from "./learner";
import { Button, ButtonLink, Card, FieldChip, Logo, PageHeader, Pill, Progress } from "./ui";

const fields = [
  { name: "Artificial Intelligence", icon: BrainCircuit, text: "Build intelligent systems with ML and LLMs", learners: "42k" },
  { name: "Data Science", icon: BarChart3, text: "Turn complex data into meaningful insights", learners: "38k" },
  { name: "Cloud Computing", icon: Cloud, text: "Design and run scalable cloud infrastructure", learners: "27k" },
  { name: "DevOps", icon: Network, text: "Automate delivery and modern operations", learners: "24k" },
  { name: "Software Engineering", icon: Code2, text: "Build reliable, high-quality applications", learners: "51k" },
  { name: "Cybersecurity", icon: ShieldCheck, text: "Protect systems, networks, and data", learners: "19k" },
];

const roadmapStages = [
  {
    id: "foundations",
    number: "01",
    title: "Strong foundations",
    subtitle: "Build the baseline needed for applied AI",
    progress: 68,
    duration: "3–4 weeks",
    topics: [
      { title: "Python foundations", status: "mastered", time: "4h 20m" },
      { title: "Git essentials", status: "mastered", time: "2h 10m" },
      { title: "Data structures & algorithms", status: "active", time: "5h 40m" },
      { title: "Linear algebra essentials", status: "locked", time: "4h 15m" },
    ],
  },
  {
    id: "core",
    number: "02",
    title: "Core machine learning",
    subtitle: "Learn to train, evaluate, and improve models",
    progress: 18,
    duration: "6–8 weeks",
    topics: [
      { title: "Data preparation with Pandas", status: "active", time: "6h" },
      { title: "Supervised learning", status: "locked", time: "9h" },
      { title: "Model evaluation", status: "locked", time: "5h" },
    ],
  },
  {
    id: "specialization",
    number: "03",
    title: "AI engineering specialization",
    subtitle: "Move from models to production AI systems",
    progress: 0,
    duration: "8–10 weeks",
    topics: [
      { title: "Deep learning systems", status: "locked", time: "12h" },
      { title: "Large language models", status: "locked", time: "10h" },
      { title: "MLOps & deployment", status: "locked", time: "8h" },
    ],
  },
  {
    id: "capstone",
    number: "04",
    title: "Portfolio capstone",
    subtitle: "Demonstrate job-ready skills with evidence",
    progress: 0,
    duration: "3–4 weeks",
    topics: [{ title: "Build a production RAG assistant", status: "locked", time: "24h" }],
  },
];

export function LandingPage() {
  const { learner, updateLearner } = useLearner();
  const [selected, setSelected] = useState(learner.fields);
  const [custom, setCustom] = useState("");
  const toggle = (field: string) =>
    setSelected((current) => current.includes(field) ? current.filter((item) => item !== field) : [...current, field]);
  const continueLearning = () => {
    const next = custom.trim() ? [...selected, custom.trim()] : selected;
    updateLearner({ fields: next.length ? next : learner.fields });
  };

  return (
    <>
      <main className="landing">
        <section className="hero">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-copy">
            <div className="hero-kicker"><Sparkles size={15} /> Learning that adapts to you</div>
            <h1>Your ambition.<br /><span>Your personal path.</span></h1>
            <p>Build real skills with an AI-powered roadmap shaped around your goals, experience, and schedule—not a one-size-fits-all course.</p>
            <div className="proof-row">
              <div className="avatar-stack"><span>JL</span><span>MK</span><span>SR</span><span>+</span></div>
              <div><div className="stars">★★★★★</div><span>Loved by 12,000+ learners</span></div>
            </div>
          </div>
          <Card className="goal-card">
            <div className="goal-card-head">
              <span className="ai-badge"><Bot size={19} /></span>
              <div><strong>Build your learning path</strong><span>Choose one or combine a few</span></div>
            </div>
            <h2>What do you want to learn or become?</h2>
            <div className="field-grid">
              {fields.map(({ name, icon: Icon }) => (
                <FieldChip key={name} label={name} selected={selected.includes(name)} onClick={() => toggle(name)} icon={<Icon size={20} />} />
              ))}
            </div>
            <div className="or"><span />or tell us your goal<span /></div>
            <div className="custom-goal">
              <Search size={18} />
              <input value={custom} onChange={(event) => setCustom(event.target.value)} placeholder="e.g. Become a solutions architect" aria-label="Custom learning goal" />
            </div>
            <ButtonLink to="/signup" className="wide" onClick={continueLearning}>
              Create my personalized roadmap
            </ButtonLink>
            <p className="fine-print"><ShieldCheck size={14} /> Free to start. No credit card required.</p>
          </Card>
        </section>

        <section className="trusted">
          <span>Skills aligned with tools used at</span>
          <div><strong>Google</strong><strong>Microsoft</strong><strong>amazon</strong><strong>GitHub</strong><strong>NVIDIA</strong></div>
        </section>

        <section className="how-section">
          <div className="section-heading">
            <span className="eyebrow">How SkillPath works</span>
            <h2>A smarter way to reach your goal</h2>
            <p>We continuously adapt the journey to what you know, what you need, and how you learn best.</p>
          </div>
          <div className="steps-grid">
            {[
              { icon: Target, n: "01", title: "Define your direction", text: "Tell us where you want to go and the time you can invest." },
              { icon: Gauge, n: "02", title: "Discover your starting point", text: "A focused diagnostic finds your strengths and critical gaps." },
              { icon: Layers3, n: "03", title: "Follow your adaptive path", text: "Get the right lesson, practice, or project at exactly the right time." },
              { icon: Trophy, n: "04", title: "Prove what you can do", text: "Build portfolio evidence and see when you are truly role-ready." },
            ].map(({ icon: Icon, n, title, text }) => (
              <div className="step" key={n}><span className="step-number">{n}</span><div className="step-icon"><Icon /></div><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
        </section>
        <section className="cta-band">
          <div><span className="eyebrow">Your next chapter starts here</span><h2>Stop wondering what to learn next.</h2><p>Build a path that moves at your pace and proves your progress.</p></div>
          <ButtonLink to="/signup" variant="dark">Build your roadmap</ButtonLink>
        </section>
      </main>
    </>
  );
}

export function AuthPage({ mode }: { mode: "signin" | "signup" }) {
  const navigate = useNavigate();
  const isSignUp = mode === "signup";
  return (
    <main className="auth-page">
      <Card className="auth-card">
        <div className="auth-icon"><Sparkles /></div>
        <span className="eyebrow">{isSignUp ? "Start your journey" : "Welcome back"}</span>
        <h1>{isSignUp ? "Create your learning path" : "Continue your progress"}</h1>
        <p>{isSignUp ? "One account. A roadmap that grows with you." : "Sign in to pick up exactly where you left off."}</p>
        <button className="social-button"><strong>G</strong> Continue with Google</button>
        <div className="or"><span />or use email<span /></div>
        {isSignUp && <label>Full name<input placeholder="Alex Morgan" /></label>}
        <label>Email address<input type="email" placeholder="you@example.com" /></label>
        <label>Password<input type="password" placeholder="At least 8 characters" /></label>
        <Button className="wide" onClick={() => navigate(isSignUp ? "/onboarding" : "/app")}>
          {isSignUp ? "Create account" : "Sign in"}<ArrowRight size={16} />
        </Button>
        <p className="auth-switch">{isSignUp ? "Already have an account?" : "New to SkillPath?"} <Link to={isSignUp ? "/signin" : "/signup"}>{isSignUp ? "Sign in" : "Create account"}</Link></p>
      </Card>
    </main>
  );
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const { learner, updateLearner } = useLearner();
  const [step, setStep] = useState(1);
  const [level, setLevel] = useState(learner.level);
  const [hours, setHours] = useState(learner.hours);
  const [goal, setGoal] = useState(learner.goal);
  const max = 4;
  const advance = () => {
    if (step < max) setStep(step + 1);
    else {
      updateLearner({ level, hours, goal, onboardingComplete: true });
      navigate("/assessment");
    }
  };
  return (
    <main className="flow-page">
      <header className="flow-header"><Logo /><span>Step {step} of {max}</span><button onClick={() => navigate("/")}>Save & exit</button></header>
      <div className="flow-progress"><span style={{ width: `${step * 25}%` }} /></div>
      <section className="flow-content">
        {step === 1 && (
          <>
            <span className="flow-step-icon"><GraduationCap /></span><h1>Where are you starting from?</h1><p>This helps us match the depth and pace of your roadmap.</p>
            <div className="choice-list">
              {["I'm completely new", "I've explored the basics", "Some experience", "I work in a related field"].map((item) => (
                <button className={level === item ? "choice selected" : "choice"} onClick={() => setLevel(item)} key={item}><span><strong>{item}</strong><small>{item === "Some experience" ? "I have built a few things or taken courses" : "We'll calibrate your diagnostic around this"}</small></span>{level === item ? <CheckCircle2 /> : <Circle />}</button>
              ))}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <span className="flow-step-icon"><Target /></span><h1>What outcome are you working toward?</h1><p>A clear destination helps us choose the right competencies.</p>
            <label className="large-label">Target role or outcome<input value={goal} onChange={(event) => setGoal(event.target.value)} /></label>
            <div className="option-grid">
              {["Career transition", "Grow in my role", "Build a product", "Earn a certification"].map((item) => <button key={item} className="mini-choice">{item}</button>)}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <span className="flow-step-icon"><Clock3 /></span><h1>How much time can you invest?</h1><p>We'll create a sustainable weekly plan around your life.</p>
            <div className="hours-value"><strong>{hours}</strong><span>hours / week</span></div>
            <input className="range" type="range" min="2" max="20" value={hours} onChange={(event) => setHours(Number(event.target.value))} />
            <div className="pace-note"><Zap /><span><strong>{hours < 6 ? "Steady" : hours < 12 ? "Focused" : "Accelerated"} pace</strong>Estimated completion: {hours < 6 ? "9–11 months" : hours < 12 ? "6–8 months" : "4–5 months"}</span></div>
          </>
        )}
        {step === 4 && (
          <>
            <span className="flow-step-icon"><Wrench /></span><h1>Make the path feel like yours</h1><p>Choose preferences now—you can change these anytime.</p>
            <div className="form-grid">
              <label>Learning style<select defaultValue="Mixed"><option>Mixed</option><option>Visual</option><option>Hands-on</option><option>Reading</option></select></label>
              <label>Language<select><option>English</option><option>Spanish</option><option>French</option></select></label>
              <label>Preferred ecosystem<select><option>Cloud agnostic</option><option>AWS</option><option>Azure</option><option>Google Cloud</option></select></label>
              <label>Operating system<select><option>macOS</option><option>Windows</option><option>Linux</option></select></label>
            </div>
          </>
        )}
        <div className="flow-actions">{step > 1 && <Button variant="ghost" onClick={() => setStep(step - 1)}><ArrowLeft size={16} /> Back</Button>}<Button onClick={advance}>{step === max ? "Start diagnostic" : "Continue"} <ArrowRight size={16} /></Button></div>
      </section>
    </main>
  );
}

const questions = [
  { topic: "Python", question: "Which structure provides average O(1) key lookup in Python?", options: ["List", "Dictionary", "Tuple", "Generator"], answer: 1 },
  { topic: "Machine learning", question: "What is the primary purpose of a validation dataset?", options: ["Train model weights", "Tune model choices", "Store raw data", "Deploy the model"], answer: 1 },
  { topic: "Statistics", question: "Which metric is least affected by extreme outliers?", options: ["Mean", "Range", "Median", "Variance"], answer: 2 },
];

export function AssessmentPage() {
  const navigate = useNavigate();
  const { updateLearner } = useLearner();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const question = questions[index];
  const selected = answers[index];
  const finish = () => {
    const score = Math.round((answers.filter((answer, i) => answer === questions[i].answer).length / questions.length) * 100);
    updateLearner({ assessmentScore: score || 67 });
    navigate("/app");
  };
  return (
    <main className="assessment-page">
      <header className="flow-header"><Logo /><span>Adaptive diagnostic</span><button onClick={() => navigate("/app")}>Exit</button></header>
      <div className="assessment-shell">
        <aside><span className="assessment-icon"><BrainCircuit /></span><h2>AI Engineer diagnostic</h2><p>Questions adapt based on your responses. Most learners finish in under 10 minutes.</p><div className="assessment-meta"><span><Clock3 /> ~8 min</span><span><ShieldCheck /> Private</span></div></aside>
        <section className="question-card">
          <div className="question-meta"><Pill>{question.topic}</Pill><span>Question {index + 1} of {questions.length}</span></div>
          <Progress value={((index + 1) / questions.length) * 100} />
          <h1>{question.question}</h1>
          <div className="answer-list">
            {question.options.map((option, optionIndex) => (
              <button key={option} className={selected === optionIndex ? "answer selected" : "answer"} onClick={() => setAnswers((current) => { const next = [...current]; next[index] = optionIndex; return next; })}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}{selected === optionIndex && <CheckCircle2 />}</button>
            ))}
          </div>
          <div className="question-footer"><span>You can revise answers before finishing.</span><Button disabled={selected === undefined} onClick={() => index === questions.length - 1 ? finish() : setIndex(index + 1)}>{index === questions.length - 1 ? "Generate my roadmap" : "Next question"} <ArrowRight size={16} /></Button></div>
        </section>
      </div>
    </main>
  );
}

export function DashboardPage() {
  const { learner } = useLearner();
  return (
    <>
      <PageHeader eyebrow="Tuesday, March 10" title={`Good morning, ${learner.name}`} description="You’re building strong momentum. Here’s the best next step." action={<Button variant="secondary"><Sparkles size={16} /> Adapt my plan</Button>} />
      <section className="dashboard-grid">
        <Card className="next-card">
          <div className="card-topline"><span className="eyebrow">Up next · Recommended</span><Pill tone="green">18 min</Pill></div>
          <div className="next-content">
            <div className="lesson-art"><div className="lesson-code"><span /><span /><span /></div><Play fill="currentColor" /></div>
            <div><Pill>Data structures</Pill><h2>Hash maps: lookups and trade-offs</h2><p>Learn how hash maps work under the hood and when to use them in real systems.</p><div className="lesson-meta"><span><BookOpen /> Lesson 3 of 6</span><span><Target /> Closes a priority gap</span></div><ButtonLink to="/app/learn/hash-maps">Continue learning</ButtonLink></div>
          </div>
          <div className="why-row"><Lightbulb size={17} /><span><strong>Why this?</strong> Your diagnostic showed a gap here, and it unlocks two upcoming topics.</span></div>
        </Card>
        <Card className="weekly-card">
          <div className="card-topline"><span className="eyebrow">Weekly goal</span><span>4h 35m / {learner.hours}h</span></div>
          <div className="ring" style={{ "--progress": `${Math.min(100, (4.6 / learner.hours) * 100)}%` } as React.CSSProperties}><div><strong>{Math.round((4.6 / learner.hours) * 100)}%</strong><span>complete</span></div></div>
          <div className="week-days">{["M", "T", "W", "T", "F", "S", "S"].map((day, i) => <span className={i < 3 ? "done" : i === 3 ? "today" : ""} key={`${day}-${i}`}>{i < 3 ? <Check size={13} /> : day}</span>)}</div>
          <p>Keep going—one focused session today keeps you on track.</p>
        </Card>
      </section>
      <section className="stat-grid">
        {[
          { label: "Roadmap progress", value: "24%", detail: "4 of 17 competencies", icon: MapIcon, tone: "blue" },
          { label: "Skills mastered", value: "6", detail: "+2 this month", icon: Award, tone: "green" },
          { label: "Learning streak", value: "12 days", detail: "Personal best: 18", icon: Zap, tone: "amber" },
          { label: "Role readiness", value: "31%", detail: "Foundation building", icon: Gauge, tone: "purple" },
        ].map(({ label, value, detail, icon: Icon, tone }) => <Card className={`stat-card stat-${tone}`} key={label}><div className="stat-icon"><Icon /></div><span>{label}</span><strong>{value}</strong><small>{detail}</small></Card>)}
      </section>
      <section className="lower-grid">
        <Card>
          <div className="section-card-title"><div><h2>Roadmap snapshot</h2><p>AI Engineer · Personalized path</p></div><Link to="/app/roadmap">View full roadmap <ArrowRight size={15} /></Link></div>
          <div className="snapshot-list">
            {roadmapStages.slice(0, 3).map((stage, i) => <div key={stage.id} className="snapshot-item"><span className={i === 0 ? "active" : ""}>{i === 0 ? <Play size={14} fill="currentColor" /> : stage.number}</span><div><strong>{stage.title}</strong><small>{stage.subtitle}</small><Progress value={stage.progress} /></div><b>{stage.progress}%</b></div>)}
          </div>
        </Card>
        <Card>
          <div className="section-card-title"><div><h2>Needs attention</h2><p>Reviews timed for better retention</p></div></div>
          <div className="review-item"><span className="review-icon"><BrainCircuit /></span><div><strong>Python list comprehensions</strong><small>Review due today · 8 min</small></div><ChevronRight /></div>
          <div className="review-item"><span className="review-icon amber"><Database /></span><div><strong>SQL joins</strong><small>Confidence dropped to 64%</small></div><ChevronRight /></div>
          <ButtonLink to="/app/practice" variant="secondary" className="wide">Start quick review</ButtonLink>
        </Card>
      </section>
    </>
  );
}

function MapIcon() { return <Layers3 />; }

export function RoadmapPage() {
  const { learner } = useLearner();
  return (
    <>
      <PageHeader eyebrow="Your personalized path" title="AI Engineer roadmap" description={`Adapted to your diagnostic, ${learner.hours} hours per week, and role goal.`} action={<><Button variant="secondary"><Sparkles size={16} /> Why this path?</Button><Button>Edit goal</Button></>} />
      <Card className="roadmap-overview">
        <div><span>Overall progress</span><strong>24%</strong><Progress value={24} /></div>
        <div><span>Estimated completion</span><strong>October 2026</strong><small>On track</small></div>
        <div><span>Role readiness</span><strong>31%</strong><small>Foundation building</small></div>
        <div><span>Weekly pace</span><strong>{learner.hours} hours</strong><small>Focused</small></div>
      </Card>
      <div className="roadmap-list">
        {roadmapStages.map((stage, i) => (
          <Card className={`stage-card ${i === 0 ? "active" : ""}`} key={stage.id}>
            <div className="stage-number">{stage.number}</div>
            <div className="stage-body">
              <div className="stage-heading"><div><Pill tone={i === 0 ? "blue" : "slate"}>{i === 0 ? "In progress" : i === 1 ? "Up next" : "Locked"}</Pill><h2>{stage.title}</h2><p>{stage.subtitle}</p></div><span><Clock3 /> {stage.duration}</span></div>
              <Progress value={stage.progress} label={`${stage.topics.filter((topic) => topic.status === "mastered").length} of ${stage.topics.length} topics complete`} />
              <div className="topic-list">
                {stage.topics.map((topic) => <div className="topic-row" key={topic.title}><span className={`topic-status ${topic.status}`}>{topic.status === "mastered" ? <Check /> : topic.status === "active" ? <Play fill="currentColor" /> : <LockKeyhole />}</span><div><strong>{topic.title}</strong><small>{topic.status === "mastered" ? "Mastered" : topic.status === "active" ? "Ready to learn" : "Complete prerequisites first"}</small></div><span>{topic.time}</span></div>)}
              </div>
              <ButtonLink to={`/app/roadmap/${stage.id}`} variant={i === 0 ? "primary" : "secondary"}>Explore stage</ButtonLink>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export function StagePage() {
  const { stageId } = useParams();
  const stage = roadmapStages.find((item) => item.id === stageId) ?? roadmapStages[0];
  return (
    <>
      <Link to="/app/roadmap" className="back-link"><ArrowLeft /> Back to roadmap</Link>
      <PageHeader eyebrow={`Stage ${stage.number}`} title={stage.title} description={stage.subtitle} action={<Pill>{stage.duration}</Pill>} />
      <Card className="objective-card"><div className="objective-icon"><Target /></div><div><h2>Stage objective</h2><p>Build a durable technical base and demonstrate each competency through practice—not passive completion.</p></div><Progress value={stage.progress} label="Stage progress" /></Card>
      <div className="stage-detail-grid">
        <div>{stage.topics.map((topic, i) => <Card className="detail-topic" key={topic.title}><span className={`topic-status ${topic.status}`}>{topic.status === "mastered" ? <Check /> : <span>{i + 1}</span>}</span><div><Pill tone={topic.status === "mastered" ? "green" : "slate"}>{topic.status}</Pill><h2>{topic.title}</h2><p>Focused learning, guided examples, and a short evidence-based knowledge check.</p><span className="lesson-meta"><span><Clock3 /> {topic.time}</span><span><BookOpen /> 6 activities</span></span></div>{topic.status !== "locked" && <ButtonLink to="/app/learn">Open topic</ButtonLink>}</Card>)}</div>
        <Card className="completion-card"><Trophy /><h2>Completion criteria</h2><ul><li><Check /> Score 80%+ on checks</li><li><Check /> Complete guided practice</li><li><Check /> Submit stage project</li></ul><hr /><span>Unlocks next</span><strong>Core machine learning</strong></Card>
      </div>
    </>
  );
}

export function TopicPage() {
  const { toggleTopic, learner } = useLearner();
  const done = learner.completedTopics.includes("Hash maps");
  return (
    <>
      <div className="learn-top"><Link to="/app/roadmap/foundations"><ArrowLeft /> Foundations</Link><span>Data structures · Lesson 3 of 6</span><Button variant={done ? "secondary" : "primary"} onClick={() => toggleTopic("Hash maps")}>{done ? <><Check /> Completed</> : "Mark complete"}</Button></div>
      <div className="learn-layout">
        <article className="lesson">
          <Pill>12 min lesson</Pill><h1>Hash maps: lookups and trade-offs</h1><p className="lead">Hash maps are one of the most useful tools in a developer’s toolkit. They trade a little memory for remarkably fast lookups.</p>
          <div className="lesson-video"><div><Play fill="currentColor" /></div><span>4:32</span></div>
          <h2>Why hash maps matter</h2><p>Imagine keeping a contact list. Scanning every name would become slower as the list grows. A hash map uses a hash function to calculate where each value should live, making retrieval fast and predictable.</p>
          <div className="insight"><Lightbulb /><div><strong>Key idea</strong><p>Average lookup, insertion, and deletion are O(1). In the worst case—when many keys collide—performance can degrade to O(n).</p></div></div>
          <h2>Try it yourself</h2>
          <pre><code>{`skills = {"python": 0.82, "sql": 0.64}\nskills["ml"] = 0.71\n\nprint(skills.get("python"))  # 0.82`}</code></pre>
          <div className="lesson-nav"><Button variant="ghost"><ArrowLeft /> Previous</Button><Button>Knowledge check <ArrowRight /></Button></div>
        </article>
        <aside className="lesson-sidebar">
          <Card><h3>In this topic</h3>{["Arrays and lists", "Stacks and queues", "Hash maps", "Trees and graphs", "Complexity practice", "Mastery check"].map((item, i) => <div className={`outline-item ${i === 2 ? "current" : ""}`} key={item}><span>{i < 2 ? <Check /> : i === 2 ? <Play fill="currentColor" /> : <LockKeyhole />}</span>{item}</div>)}</Card>
          <Card className="skill-card"><BrainCircuit /><strong>Skill signal</strong><p>Completing this strengthens your “Core programming” competency.</p><Progress value={62} /></Card>
        </aside>
      </div>
    </>
  );
}

export function ResourcesPage() {
  const resources = [
    { type: "Video", title: "Hash Tables — CS50", source: "Harvard University", time: "18 min", rating: "4.9", icon: Play },
    { type: "Documentation", title: "Python Dictionaries", source: "Python.org", time: "12 min", rating: "4.8", icon: FileText },
    { type: "Interactive", title: "Visualizing hash functions", source: "VisuAlgo", time: "15 min", rating: "4.7", icon: Code2 },
    { type: "Article", title: "Hash maps in production", source: "Engineering Notes", time: "9 min", rating: "4.6", icon: BookOpen },
  ];
  return (
    <>
      <PageHeader eyebrow="Curated for your path" title="Resource explorer" description="High-quality learning material ranked for relevance, level, and learner outcomes." />
      <div className="search-filter"><div><Search /><input placeholder="Search videos, docs, exercises..." /></div><Button variant="secondary"><Filter /> Filters</Button></div>
      <div className="filter-pills">{["Recommended", "Videos", "Documentation", "Interactive", "Saved"].map((item, i) => <button className={i === 0 ? "active" : ""} key={item}>{item}</button>)}</div>
      <div className="resource-grid">{resources.map(({ type, title, source, time, rating, icon: Icon }) => <Card className="resource-card" key={title}><div className="resource-thumb"><Icon /><Pill>{type}</Pill></div><div className="resource-body"><span>{source}</span><h2>{title}</h2><p>Selected for your current level and mapped directly to your active competency.</p><div><span><Clock3 /> {time}</span><span><Star fill="currentColor" /> {rating}</span></div><Button variant="secondary" className="wide">Open resource <ExternalLink /></Button></div></Card>)}</div>
    </>
  );
}

export function PracticePage() {
  return (
    <>
      <PageHeader eyebrow="Mastery center" title="Practice & review" description="Short, targeted sessions based on your memory strength and roadmap needs." action={<Button>Start smart session <ArrowRight /></Button>} />
      <Card className="practice-hero"><div><Pill tone="amber">Due today</Pill><h2>Your 12-minute review is ready</h2><p>Four questions across Python, SQL, and Git—scheduled at the ideal time for retention.</p><Button>Begin review</Button></div><div className="practice-ring"><BrainCircuit /><strong>4</strong><span>items</span></div></Card>
      <div className="three-grid">{[{t:"Python comprehensions",c:"64%",s:"Needs review"},{t:"SQL joins",c:"72%",s:"Strengthening"},{t:"Git branching",c:"91%",s:"Mastered"}].map((item,i)=><Card className="practice-card" key={item.t}><Pill tone={i===0?"amber":i===2?"green":"blue"}>{item.s}</Pill><h2>{item.t}</h2><span>Memory strength</span><Progress value={Number(item.c.slice(0,-1))}/><strong>{item.c}</strong><Button variant="secondary" className="wide">Practice now</Button></Card>)}</div>
    </>
  );
}

export function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Evidence over completion" title="Projects & portfolio" description="Apply skills in realistic scenarios and build proof of what you can do." action={<Button variant="secondary">View public portfolio</Button>} />
      <Card className="featured-project"><div className="project-art"><Code2 /><span>FOUNDATION PROJECT</span></div><div><Pill>Recommended next</Pill><h2>Build a data quality analyzer</h2><p>Create a command-line tool that profiles CSV datasets, detects quality issues, and generates a concise report.</p><div className="competencies"><span>Python</span><span>Data structures</span><span>Testing</span></div><div className="project-meta"><span><Clock3 /> 6–8 hours</span><span><Gauge /> Intermediate</span><span><Award /> Portfolio ready</span></div><Button>View project brief <ArrowRight /></Button></div></Card>
      <h2 className="section-title">Project library</h2>
      <div className="three-grid">{["API-powered weather app", "Customer churn model", "Production RAG assistant"].map((title, i)=><Card className="project-card" key={title}><div className="project-card-icon">{i===0?<Cloud/>:i===1?<TrendingUp/>:<Bot/>}</div><Pill tone={i===2?"slate":"blue"}>{i===2?"Capstone · Locked":"Available"}</Pill><h2>{title}</h2><p>Demonstrate multiple competencies through a practical, rubric-based submission.</p><Button variant="secondary" className="wide">{i===2?<><LockKeyhole/> View prerequisites</>:"Explore project"}</Button></Card>)}</div>
    </>
  );
}

export function AnalyticsPage() {
  return (
    <>
      <PageHeader eyebrow="Your learning data" title="Progress analytics" description="Understand your momentum, mastery, and readiness over time." action={<Button variant="secondary">Last 30 days <ChevronRight /></Button>} />
      <section className="stat-grid analytics-stats">{[{l:"Focused learning",v:"19h 24m",d:"+18% vs last month",i:Clock3},{l:"Activities completed",v:"32",d:"88% on time",i:CheckCircle2},{l:"Average assessment",v:"84%",d:"+7 points",i:Target},{l:"Current streak",v:"12 days",d:"Top 8% of learners",i:Zap}].map(({l,v,d,i:Icon})=><Card className="stat-card" key={l}><div className="stat-icon"><Icon/></div><span>{l}</span><strong>{v}</strong><small>{d}</small></Card>)}</section>
      <div className="analytics-grid">
        <Card className="chart-card"><div className="section-card-title"><div><h2>Learning activity</h2><p>Minutes focused by week</p></div><Pill tone="green">+18%</Pill></div><div className="bar-chart">{[42,60,38,76,55,88,70,92,66,84,78,96].map((height,i)=><div key={i}><span style={{height:`${height}%`}}/><small>{i%2===0?`W${i+1}`:""}</small></div>)}</div></Card>
        <Card><div className="section-card-title"><div><h2>Competency map</h2><p>Mastery by skill area</p></div></div>{[{n:"Python programming",v:86},{n:"Data & SQL",v:68},{n:"Mathematics",v:54},{n:"Machine learning",v:31},{n:"MLOps",v:12}].map(item=><div className="competency-row" key={item.n}><Progress label={item.n} value={item.v}/></div>)}</Card>
      </div>
      <Card className="readiness-card"><div className="readiness-score"><strong>31</strong><span>% role ready</span></div><div><Pill>AI Engineer</Pill><h2>Your readiness is building steadily</h2><p>You have strong programming foundations. Focus next on mathematics and model evaluation to unlock the fastest readiness gains.</p><div className="readiness-actions"><span><CheckCircle2/> 6 mastered</span><span><TrendingUp/> 4 developing</span><span><LockKeyhole/> 7 not started</span></div></div><ButtonLink to="/app/roadmap">View skill gaps</ButtonLink></Card>
    </>
  );
}

export function GoalsPage() {
  return (
    <>
      <PageHeader eyebrow="Stay intentional" title="Goals & milestones" description="Keep your learning connected to a clear, achievable outcome." action={<Button>New milestone</Button>} />
      <Card className="goal-overview"><div className="goal-target"><Target /></div><div><Pill>Primary goal</Pill><h2>Become an AI Engineer</h2><p>Build production-ready AI systems and transition into a role by October 2026.</p><div className="competencies"><span>Target: Oct 2026</span><span>8 hours / week</span></div></div><div className="goal-percent"><strong>24%</strong><span>complete</span></div></Card>
      <div className="milestone-list">{[{d:"Mar 28",t:"Complete programming foundations",p:68,s:"In progress"},{d:"May 15",t:"Build first ML model",p:18,s:"Upcoming"},{d:"Aug 01",t:"Deploy an AI service",p:0,s:"Upcoming"},{d:"Oct 20",t:"Publish capstone portfolio",p:0,s:"Goal"}].map((item,i)=><Card className="milestone" key={item.t}><div className={`milestone-dot ${i===0?"active":""}`}>{i===0?<Play fill="currentColor"/>:i+1}</div><span>{item.d}</span><div><h2>{item.t}</h2><Pill tone={i===0?"blue":"slate"}>{item.s}</Pill></div><div className="milestone-progress"><Progress value={item.p}/><strong>{item.p}%</strong></div></Card>)}</div>
    </>
  );
}

export function NotificationsPage() {
  return (
    <>
      <PageHeader title="Notifications" description="Learning reminders, milestones, and roadmap updates." action={<Button variant="ghost">Mark all as read</Button>} />
      <Card className="notification-list">{[{i:BrainCircuit,t:"Review ready",d:"Python list comprehensions is due for a quick review.",time:"10 min ago",tone:"blue"},{i:Sparkles,t:"Your roadmap was adapted",d:"We moved model evaluation earlier based on your diagnostic.",time:"2 hours ago",tone:"purple"},{i:Trophy,t:"New skill mastered",d:"You demonstrated mastery in Git essentials.",time:"Yesterday",tone:"green"},{i:Users,t:"New project feedback",d:"Your data analyzer rubric has been reviewed.",time:"Monday",tone:"amber"}].map(({i:Icon,t,d,time,tone},index)=><div className={`notification ${index<2?"unread":""}`} key={t}><span className={`notice-icon ${tone}`}><Icon/></span><div><strong>{t}</strong><p>{d}</p><small>{time}</small></div>{index<2&&<i/>}</div>)}</Card>
    </>
  );
}

export function ProfilePage() {
  return <SettingsForm title="Profile & learning preferences" description="Keep your experience, goals, and learning preferences current." />;
}
export function SettingsPage() {
  return <SettingsForm title="Settings & account" description="Manage your account, notifications, privacy, and connected services." settings />;
}
function SettingsForm({title,description,settings=false}:{title:string;description:string;settings?:boolean}) {
  const {learner,updateLearner}=useLearner();
  const [saved,setSaved]=useState(false);
  return <><PageHeader title={title} description={description}/><div className="settings-layout"><Card className="settings-nav">{(settings?["Account","Notifications","Privacy & data","Integrations","Billing"]:["Personal details","Learning profile","Experience","Preferences"]).map((item,i)=><button className={i===0?"active":""} key={item}>{item}<ChevronRight/></button>)}</Card><Card className="settings-form"><h2>{settings?"Account details":"Personal details"}</h2><p>{settings?"Update your sign-in and account information.":"Help us personalize how SkillPath communicates with you."}</p><div className="form-grid"><label>First name<input value={learner.name} onChange={e=>updateLearner({name:e.target.value})}/></label><label>Last name<input defaultValue="Morgan"/></label><label className="full">Email address<input type="email" defaultValue="alex@example.com"/></label><label>Time zone<select><option>Pacific Time (UTC-8)</option></select></label><label>Weekly learning goal<select value={learner.hours} onChange={e=>updateLearner({hours:Number(e.target.value)})}><option value="5">5 hours</option><option value="8">8 hours</option><option value="10">10 hours</option></select></label></div><div className="settings-actions">{saved&&<span><Check/> Changes saved</span>}<Button onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2500)}}>Save changes</Button></div></Card></div></>;
}

export function FeaturesPage() {
  return <main className="marketing-page"><div className="marketing-hero"><span className="eyebrow">Designed for meaningful progress</span><h1>Not another course catalog.<br/><span>A system for becoming.</span></h1><p>SkillPath connects diagnostics, learning, practice, projects, and analytics into one adaptive journey.</p><ButtonLink to="/signup">Build your path</ButtonLink></div><div className="feature-showcase">{[{i:BrainCircuit,t:"Adaptive by design",d:"Your roadmap recalculates as your skills grow, with every change clearly explained."},{i:Target,t:"Mastery, not completion",d:"Progress comes from demonstrated competencies, not videos watched or boxes checked."},{i:Layers3,t:"One coherent path",d:"Lessons, documentation, practice, and projects work together instead of competing for attention."},{i:BarChart3,t:"Readiness you can trust",d:"Know exactly which skills are strong, which need work, and what evidence supports each signal."},{i:Users,t:"Built for real lives",d:"Your schedule, budget, preferred tools, and learning style shape every recommendation."},{i:ShieldCheck,t:"Progress stays yours",d:"Change your goal at any time while preserving transferable skills and completed evidence."}].map(({i:Icon,t,d})=><Card key={t}><div className="feature-icon"><Icon/></div><h2>{t}</h2><p>{d}</p></Card>)}</div></main>;
}

export function FieldsPage() {
  return <main className="marketing-page fields-page"><div className="marketing-hero"><span className="eyebrow">Explore learning fields</span><h1>Choose a direction.<br/><span>Combine your strengths.</span></h1><p>Every field is mapped to practical competencies, prerequisites, and real-world evidence.</p></div><div className="field-catalog">{fields.map(({name,icon:Icon,text,learners},i)=><Card key={name}><div className={`catalog-icon c${i}`}><Icon/></div><div><h2>{name}</h2><p>{text}</p><span>{learners} active learners</span></div><ButtonLink to="/signup" variant="secondary">Explore path</ButtonLink></Card>)}</div></main>;
}

export function LegalPage({type}:{type:string}) {
  return <main className="legal-page"><span className="eyebrow">Last updated March 2026</span><h1>{type}</h1><p className="lead">We believe learning data should be used to help you grow, never to limit your opportunities.</p>{["Information we collect","How we use your information","Your learning data","Your choices and rights","Contact us"].map((title,i)=><section key={title}><h2>{i+1}. {title}</h2><p>SkillPath collects only the information needed to personalize your experience, measure progress, and maintain your account. You can review, export, or delete your information from account settings at any time.</p></section>)}</main>;
}

export function NotFoundPage() {
  return <main className="not-found"><Logo/><span>404</span><h1>This path doesn’t exist yet.</h1><p>Let’s get you back to the next useful step.</p><ButtonLink to="/">Return home</ButtonLink></main>;
}
