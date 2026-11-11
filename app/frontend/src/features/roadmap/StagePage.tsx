import {
  ArrowLeft,
  BookOpen,
  Check,
  Clock3,
  Target,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../../services/api";
import { ButtonLink, Card, PageHeader, Pill, Progress } from "../../components/ui";
import { LoadingState } from "../../components/common/LoadingState";
import type { Stage } from "../../types";

export function StagePage() {
  const { stageId } = useParams();
  const [stage, setStage] = useState<Stage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!stageId) return;
    api.roadmap
      .getStage(stageId)
      .then(setStage)
      .catch(() => {
        // Fallback to first stage if not found
        api.roadmap.getStage("foundations").then(setStage);
      })
      .finally(() => setLoading(false));
  }, [stageId]);

  if (loading || !stage) {
    return <LoadingState message="Loading stage details..." />;
  }

  return (
    <>
      <Link to="/app/roadmap" className="back-link">
        <ArrowLeft size={14} /> Back to roadmap
      </Link>
      <PageHeader
        eyebrow={`Stage ${stage.number}`}
        title={stage.title}
        description={stage.subtitle}
        action={<Pill>{stage.duration}</Pill>}
      />
      <Card className="objective-card">
        <div className="objective-icon">
          <Target />
        </div>
        <div>
          <h2>Stage objective</h2>
          <p>
            Build a durable technical base and demonstrate each competency through
            practice—not passive completion.
          </p>
        </div>
        <Progress value={stage.progress} label="Stage progress" />
      </Card>
      <div className="stage-detail-grid">
        <div>
          {stage.topics.map((topic, i) => (
            <Card className="detail-topic" key={topic.id || topic.title}>
              <span className={`topic-status ${topic.status}`}>
                {topic.status === "mastered" ? <Check size={14} /> : <span>{i + 1}</span>}
              </span>
              <div>
                <Pill tone={topic.status === "mastered" ? "green" : "slate"}>
                  {topic.status}
                </Pill>
                <h2>{topic.title}</h2>
                <p>{topic.subtitle || "Focused learning and interactive exercises."}</p>
                <span className="lesson-meta">
                  <span>
                    <Clock3 size={13} /> {topic.time}
                  </span>
                  <span>
                    <BookOpen size={13} /> 6 activities
                  </span>
                </span>
              </div>
              {topic.status !== "locked" && (
                <ButtonLink to={`/app/learn/${topic.slug || topic.id}`}>
                  Open topic
                </ButtonLink>
              )}
            </Card>
          ))}
        </div>
        <Card className="completion-card">
          <Trophy />
          <h2>Completion criteria</h2>
          <ul>
            <li>
              <Check /> Score 80%+ on knowledge checks
            </li>
            <li>
              <Check /> Complete guided practice
            </li>
            <li>
              <Check /> Submit stage milestone
            </li>
          </ul>
          <hr />
          <span>Unlocks next</span>
          <strong>Core machine learning</strong>
        </Card>
      </div>
    </>
  );
}
