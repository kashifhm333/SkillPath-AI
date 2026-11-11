import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  LockKeyhole,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Button, ButtonLink, Card, PageHeader, Pill, Progress } from "../../components/ui";
import { LoadingState } from "../../components/common/LoadingState";
import type { AnalyticsData } from "../../types";

export function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.analytics
      .getAnalytics()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return <LoadingState message="Aggregating learning telemetry..." />;
  }

  return (
    <>
      <PageHeader
        eyebrow="Your learning data"
        title="Progress analytics"
        description="Understand your momentum, mastery, and readiness over time."
        action={
          <Button variant="secondary">
            Last 30 days <ChevronRight size={15} />
          </Button>
        }
      />

      <section className="stat-grid analytics-stats">
        {[
          { label: "Focused learning", value: data.focusedLearning, detail: "+18% vs last month", icon: Clock3 },
          { label: "Activities completed", value: String(data.activitiesCompleted), detail: "88% on time", icon: CheckCircle2 },
          { label: "Average assessment", value: data.averageAssessment, detail: "+7 points", icon: Target },
          { label: "Current streak", value: `${data.currentStreakDays} days`, detail: "Top 8% of learners", icon: Zap },
        ].map(({ label, value, detail, icon: Icon }) => (
          <Card className="stat-card" key={label}>
            <div className="stat-icon">
              <Icon />
            </div>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{detail}</small>
          </Card>
        ))}
      </section>

      <div className="analytics-grid">
        <Card className="chart-card">
          <div className="section-card-title">
            <div>
              <h2>Learning activity</h2>
              <p>Minutes focused by week</p>
            </div>
            <Pill tone="green">+18%</Pill>
          </div>
          <div className="bar-chart">
            {data.weeklyActivity.map((height, i) => (
              <div key={i}>
                <span style={{ height: `${height}%` }} />
                <small>{i % 2 === 0 ? `W${i + 1}` : ""}</small>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="section-card-title">
            <div>
              <h2>Competency map</h2>
              <p>Mastery by skill area</p>
            </div>
          </div>
          {data.competencies.map((item) => (
            <div className="competency-row" key={item.name}>
              <Progress label={item.name} value={item.value} />
            </div>
          ))}
        </Card>
      </div>

      <Card className="readiness-card">
        <div className="readiness-score">
          <strong>{data.roleReadinessPercent}</strong>
          <span>% role ready</span>
        </div>
        <div>
          <Pill>{data.targetRole}</Pill>
          <h2>Your readiness is building steadily</h2>
          <p>
            You have strong programming foundations. Focus next on mathematics and
            model evaluation to unlock the fastest readiness gains.
          </p>
          <div className="readiness-actions">
            <span>
              <CheckCircle2 size={13} /> {data.masteredCount} mastered
            </span>
            <span>
              <TrendingUp size={13} /> {data.developingCount} developing
            </span>
            <span>
              <LockKeyhole size={13} /> {data.notStartedCount} not started
            </span>
          </div>
        </div>
        <ButtonLink to="/app/roadmap">View skill gaps</ButtonLink>
      </Card>
    </>
  );
}
