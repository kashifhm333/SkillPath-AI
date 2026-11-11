import { Check, Clock3, LockKeyhole, Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Button, ButtonLink, Card, PageHeader, Pill, Progress } from "../../components/ui";
import { LoadingState } from "../../components/common/LoadingState";
import type { RoadmapData } from "../../types";

export function RoadmapPage() {
  const [data, setData] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [whyOpen, setWhyOpen] = useState(false);

  useEffect(() => {
    api.roadmap
      .getRoadmap()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return <LoadingState message="Loading your adaptive roadmap..." />;
  }

  return (
    <>
      <PageHeader
        eyebrow="Your personalized path"
        title={data.title}
        description={`Adapted to your diagnostic, ${data.weeklyHours} hours per week, and ${data.targetRole} role goal.`}
        action={
          <>
            <Button variant="secondary" onClick={() => setWhyOpen(!whyOpen)}>
              <Sparkles size={16} /> Why this path?
            </Button>
            <ButtonLink to="/app/settings">Edit goal</ButtonLink>
          </>
        }
      />

      {whyOpen && (
        <Card
          style={{
            padding: "20px",
            marginBottom: "20px",
            background: "var(--blue-50)",
            border: "1px solid #bfdbfe",
          }}
        >
          <h3 style={{ fontSize: "15px", marginBottom: "6px", color: "var(--blue-700)" }}>
            Adaptive Path Calibration
          </h3>
          <p style={{ fontSize: "12px", color: "var(--slate-700)", lineHeight: 1.6, margin: 0 }}>
            This sequence maps prerequisites based on your diagnostic answers.
            Foundational data structures and Python idioms are scheduled first to accelerate
            your upcoming machine learning model evaluations.
          </p>
        </Card>
      )}

      <Card className="roadmap-overview">
        <div>
          <span>Overall progress</span>
          <strong>{data.overallProgress}%</strong>
          <Progress value={data.overallProgress} />
        </div>
        <div>
          <span>Estimated completion</span>
          <strong>{data.estimatedCompletion}</strong>
          <small>On track</small>
        </div>
        <div>
          <span>Role readiness</span>
          <strong>{data.roleReadinessPercent}%</strong>
          <small>Foundation building</small>
        </div>
        <div>
          <span>Weekly pace</span>
          <strong>{data.weeklyHours} hours</strong>
          <small>Focused</small>
        </div>
      </Card>

      <div className="roadmap-list">
        {data.stages.map((stage, i) => {
          const completedCount = stage.topics.filter((t) => t.completed).length;
          return (
            <Card
              className={`stage-card ${stage.status === "in_progress" ? "active" : ""}`}
              key={stage.id}
            >
              <div className="stage-number">{stage.number}</div>
              <div className="stage-body">
                <div className="stage-heading">
                  <div>
                    <Pill tone={stage.status === "in_progress" ? "blue" : "slate"}>
                      {stage.status === "in_progress"
                        ? "In progress"
                        : stage.status === "up_next"
                        ? "Up next"
                        : "Locked"}
                    </Pill>
                    <h2>{stage.title}</h2>
                    <p>{stage.subtitle}</p>
                  </div>
                  <span>
                    <Clock3 size={14} /> {stage.duration}
                  </span>
                </div>
                <Progress
                  value={stage.progress}
                  label={`${completedCount} of ${stage.topics.length} topics complete`}
                />
                <div className="topic-list">
                  {stage.topics.map((topic) => (
                    <div className="topic-row" key={topic.id || topic.title}>
                      <span className={`topic-status ${topic.status}`}>
                        {topic.status === "mastered" ? (
                          <Check size={12} />
                        ) : topic.status === "active" ? (
                          <Play size={12} fill="currentColor" />
                        ) : (
                          <LockKeyhole size={12} />
                        )}
                      </span>
                      <div>
                        <strong>{topic.title}</strong>
                        <small>
                          {topic.status === "mastered"
                            ? "Mastered"
                            : topic.status === "active"
                            ? "Ready to learn"
                            : "Complete prerequisites first"}
                        </small>
                      </div>
                      <span>{topic.time}</span>
                    </div>
                  ))}
                </div>
                <ButtonLink
                  to={`/app/roadmap/${stage.id}`}
                  variant={i === 0 ? "primary" : "secondary"}
                >
                  Explore stage
                </ButtonLink>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
