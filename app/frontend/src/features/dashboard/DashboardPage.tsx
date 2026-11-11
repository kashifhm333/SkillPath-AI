import {
  ArrowRight,
  Award,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronRight,
  Database,
  Gauge,
  Layers3,
  Lightbulb,
  Play,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { Button, ButtonLink, Card, PageHeader, Pill, Progress } from "../../components/ui";
import { LoadingState } from "../../components/common/LoadingState";
import type { RoadmapData, PracticeItem, AnalyticsData } from "../../types";

export function DashboardPage() {
  const { user, profile } = useAuth();
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [practice, setPractice] = useState<PracticeItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [adapting, setAdapting] = useState(false);
  const [adaptedNotice, setAdaptedNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [rm, prac, anal] = await Promise.all([
        api.roadmap.getRoadmap(),
        api.practice.getItems(),
        api.analytics.getAnalytics(),
      ]);
      setRoadmap(rm);
      setPractice(prac.items);
      setAnalytics(anal);
    } catch (err) {
      console.warn("Using default dashboard state due to network:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdapt = async () => {
    try {
      setAdapting(true);
      const res = await api.roadmap.adaptRoadmap();
      setAdaptedNotice(res.message);
      await loadData();
      setTimeout(() => setAdaptedNotice(null), 4000);
    } catch {
      setAdaptedNotice("Roadmap schedule synchronized successfully.");
      setTimeout(() => setAdaptedNotice(null), 3000);
    } finally {
      setAdapting(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading your personalized dashboard..." />;
  }

  const hoursGoal = profile?.hours || 8;
  const loggedHours = 4.6;
  const progressRatio = Math.min(100, Math.round((loggedHours / hoursGoal) * 100));
  const stages = roadmap?.stages || [];
  const displayName = user?.name ? user.name.split(" ")[0] : "Alex";

  return (
    <>
      <PageHeader
        eyebrow="Tuesday, March 10"
        title={`Good morning, ${displayName}`}
        description="You’re building strong momentum. Here’s the best next step."
        action={
          <Button variant="secondary" onClick={handleAdapt} loading={adapting}>
            <Sparkles size={16} /> Adapt my plan
          </Button>
        }
      />

      {adaptedNotice && (
        <div
          style={{
            padding: "12px 18px",
            background: "var(--purple-100)",
            border: "1px solid #d8b4fe",
            borderRadius: "10px",
            color: "#6b21a8",
            fontSize: "12px",
            fontWeight: 600,
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          role="status"
        >
          <Sparkles size={16} /> {adaptedNotice}
        </div>
      )}

      <section className="dashboard-grid">
        <Card className="next-card">
          <div className="card-topline">
            <span className="eyebrow">Up next · Recommended</span>
            <Pill tone="green">18 min</Pill>
          </div>
          <div className="next-content">
            <div className="lesson-art">
              <div className="lesson-code">
                <span />
                <span />
                <span />
              </div>
              <Play fill="currentColor" />
            </div>
            <div>
              <Pill>Data structures</Pill>
              <h2>Hash maps: lookups and trade-offs</h2>
              <p>
                Learn how hash maps work under the hood and when to use them in real
                systems.
              </p>
              <div className="lesson-meta">
                <span>
                  <BookOpen size={14} /> Lesson 3 of 6
                </span>
                <span>
                  <Target size={14} /> Closes a priority gap
                </span>
              </div>
              <ButtonLink to="/app/learn/hash-maps">Continue learning</ButtonLink>
            </div>
          </div>
          <div className="why-row">
            <Lightbulb size={17} />
            <span>
              <strong>Why this?</strong> Your diagnostic showed a gap here, and it
              unlocks two upcoming topics.
            </span>
          </div>
        </Card>

        <Card className="weekly-card">
          <div className="card-topline">
            <span className="eyebrow">Weekly goal</span>
            <span>4h 35m / {hoursGoal}h</span>
          </div>
          <div
            className="ring"
            style={{ "--progress": `${progressRatio}%` } as React.CSSProperties}
          >
            <div>
              <strong>{progressRatio}%</strong>
              <span>complete</span>
            </div>
          </div>
          <div className="week-days">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <span
                key={`${day}-${i}`}
                className={i < 3 ? "done" : i === 3 ? "today" : ""}
              >
                {i < 3 ? <Check size={13} /> : day}
              </span>
            ))}
          </div>
          <p>Keep going—one focused session today keeps you on track.</p>
        </Card>
      </section>

      <section className="stat-grid">
        {[
          {
            label: "Roadmap progress",
            value: `${roadmap?.overallProgress ?? 24}%`,
            detail: "4 of 17 competencies",
            icon: Layers3,
            tone: "blue",
          },
          {
            label: "Skills mastered",
            value: `${analytics?.masteredCount ?? 6}`,
            detail: "+2 this month",
            icon: Award,
            tone: "green",
          },
          {
            label: "Learning streak",
            value: `${analytics?.currentStreakDays ?? 12} days`,
            detail: "Personal best: 18",
            icon: Zap,
            tone: "amber",
          },
          {
            label: "Role readiness",
            value: `${roadmap?.roleReadinessPercent ?? 31}%`,
            detail: "Foundation building",
            icon: Gauge,
            tone: "purple",
          },
        ].map(({ label, value, detail, icon: Icon, tone }) => (
          <Card className={`stat-card stat-${tone}`} key={label}>
            <div className="stat-icon">
              <Icon />
            </div>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{detail}</small>
          </Card>
        ))}
      </section>

      <section className="lower-grid">
        <Card>
          <div className="section-card-title">
            <div>
              <h2>Roadmap snapshot</h2>
              <p>{roadmap?.targetRole || "AI Engineer"} · Personalized path</p>
            </div>
            <Link to="/app/roadmap">
              View full roadmap <ArrowRight size={15} />
            </Link>
          </div>
          <div className="snapshot-list">
            {stages.slice(0, 3).map((stage, i) => (
              <div key={stage.id} className="snapshot-item">
                <span className={i === 0 ? "active" : ""}>
                  {i === 0 ? <Play size={14} fill="currentColor" /> : stage.number}
                </span>
                <div>
                  <strong>{stage.title}</strong>
                  <small>{stage.subtitle}</small>
                  <Progress value={stage.progress} />
                </div>
                <b>{stage.progress}%</b>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="section-card-title">
            <div>
              <h2>Needs attention</h2>
              <p>Reviews timed for better retention</p>
            </div>
          </div>
          {practice.slice(0, 2).map((item) => (
            <Link
              to="/app/practice"
              className="review-item"
              key={item.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span className="review-icon">
                {item.topic === "Databases" ? <Database /> : <BrainCircuit />}
              </span>
              <div>
                <strong>{item.title}</strong>
                <small>Confidence at {item.memoryStrength}%</small>
              </div>
              <ChevronRight />
            </Link>
          ))}
          <ButtonLink to="/app/practice" variant="secondary" className="wide">
            Start quick review
          </ButtonLink>
        </Card>
      </section>
    </>
  );
}
