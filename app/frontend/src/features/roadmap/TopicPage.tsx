import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  Lightbulb,
  LockKeyhole,
  Play,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { api } from "../../services/api";
import { Button, Card, Pill, Progress } from "../../components/ui";
import { LoadingState } from "../../components/common/LoadingState";
import type { Topic } from "../../types";

export function TopicPage() {
  const { topicId = "hash-maps" } = useParams();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    api.roadmap
      .getTopic(topicId)
      .then(setTopic)
      .catch(() => {
        // Fallback for demo
        api.roadmap.getTopic("hash-maps").then(setTopic);
      })
      .finally(() => setLoading(false));
  }, [topicId]);

  const handleToggle = async () => {
    if (!topic) return;
    try {
      setToggling(true);
      const res = await api.roadmap.toggleTopic(topic.id);
      setTopic((prev) => (prev ? { ...prev, ...res.topic } : null));
    } catch (err) {
      console.error("Failed to toggle topic", err);
    } finally {
      setToggling(false);
    }
  };

  if (loading || !topic) {
    return <LoadingState message="Loading lesson topic..." />;
  }

  const isDone = topic.completed;

  return (
    <>
      <div className="learn-top">
        <Link to={`/app/roadmap/${topic.stageId || "foundations"}`}>
          <ArrowLeft size={14} /> {topic.stageTitle || "Foundations"}
        </Link>
        <span>Data structures · Practical Lesson</span>
        <Button
          variant={isDone ? "secondary" : "primary"}
          onClick={handleToggle}
          loading={toggling}
        >
          {isDone ? (
            <>
              <Check size={16} /> Completed
            </>
          ) : (
            "Mark complete"
          )}
        </Button>
      </div>

      <div className="learn-layout">
        <article className="lesson">
          <Pill>{topic.time} lesson</Pill>
          <h1>{topic.title}</h1>
          <p className="lead">{topic.subtitle}</p>

          <div className="lesson-video">
            <div>
              <Play fill="currentColor" size={24} />
            </div>
            <span>{topic.videoDuration || "4:32"}</span>
          </div>

          <h2>Why this matters</h2>
          <p>{topic.content}</p>

          <div className="insight">
            <Lightbulb size={20} />
            <div>
              <strong>Key idea</strong>
              <p>
                Average lookup, insertion, and deletion are O(1). In the worst case—when
                many keys collide—performance can degrade to O(n).
              </p>
            </div>
          </div>

          <h2>Try it yourself</h2>
          <pre>
            <code>{topic.codeSnippet || `skills = {"python": 0.82, "sql": 0.64}\nprint(skills.get("python"))`}</code>
          </pre>

          <div className="lesson-nav">
            <Button variant="ghost">
              <ArrowLeft size={14} /> Previous
            </Button>
            <Button
              variant={isDone ? "secondary" : "primary"}
              onClick={handleToggle}
              loading={toggling}
            >
              {isDone ? "Review again" : "Complete & continue"}{" "}
              <ArrowRight size={14} />
            </Button>
          </div>
        </article>

        <aside className="lesson-sidebar">
          <Card>
            <h3>In this topic</h3>
            {[
              "Arrays and lists",
              "Stacks and queues",
              "Hash maps",
              "Trees and graphs",
              "Complexity practice",
              "Mastery check",
            ].map((item, i) => (
              <div
                className={`outline-item ${i === 2 ? "current" : ""}`}
                key={item}
              >
                <span>
                  {i < 2 ? (
                    <Check size={11} />
                  ) : i === 2 ? (
                    <Play size={10} fill="currentColor" />
                  ) : (
                    <LockKeyhole size={10} />
                  )}
                </span>
                {item}
              </div>
            ))}
          </Card>

          <Card className="skill-card">
            <BrainCircuit size={28} />
            <strong>Skill signal</strong>
            <p>Completing this strengthens your core systems programming competency.</p>
            <Progress value={isDone ? 80 : 62} />
          </Card>
        </aside>
      </div>
    </>
  );
}
