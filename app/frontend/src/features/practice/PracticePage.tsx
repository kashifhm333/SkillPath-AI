import { ArrowRight, BrainCircuit, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Button, Card, PageHeader, Pill, Progress } from "../../components/ui";
import { LoadingState } from "../../components/common/LoadingState";
import type { PracticeItem } from "../../types";

export function PracticePage() {
  const [items, setItems] = useState<PracticeItem[]>([]);
  const [dueCount, setDueCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeSession, setActiveSession] = useState(false);
  const [reviewingId, setReviewingId] = useState<string | null>(null);

  const loadItems = async () => {
    try {
      setLoading(true);
      const res = await api.practice.getItems();
      setItems(res.items);
      setDueCount(res.dueCount);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleStartSmartSession = async () => {
    try {
      setActiveSession(true);
      await api.practice.startSession();
      await loadItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePracticeNow = async (id: string) => {
    try {
      setReviewingId(id);
      const updated = await api.practice.reviewItem(id);
      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
      setDueCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Review failed", err);
    } finally {
      setReviewingId(null);
    }
  };

  if (loading) {
    return <LoadingState message="Loading memory retention models..." />;
  }

  return (
    <>
      <PageHeader
        eyebrow="Mastery center"
        title="Practice & review"
        description="Targeted spaced-repetition sessions calibrated to your memory decay curves."
        action={
          <Button onClick={handleStartSmartSession}>
            Start smart session <ArrowRight size={16} />
          </Button>
        }
      />

      <Card className="practice-hero">
        <div>
          <Pill tone={dueCount > 0 ? "amber" : "green"}>
            {dueCount > 0 ? "Due today" : "Caught up"}
          </Pill>
          <h2>Your 12-minute review is ready</h2>
          <p>
            Targeted active recall across Python data structures, SQL joins, and Git
            rebasing—optimized for retention.
          </p>
          <Button onClick={handleStartSmartSession}>
            {activeSession ? "Session in progress" : "Begin review"}
          </Button>
        </div>
        <div className="practice-ring">
          <BrainCircuit />
          <strong>{dueCount}</strong>
          <span>items</span>
        </div>
      </Card>

      <div className="three-grid">
        {items.map((item) => {
          const tone =
            item.status === "Mastered"
              ? "green"
              : item.status === "Needs review"
              ? "amber"
              : "blue";

          const isReviewing = reviewingId === item.id;

          return (
            <Card className="practice-card" key={item.id}>
              <Pill tone={tone}>{item.status}</Pill>
              <h2>{item.title}</h2>
              <span>Memory strength</span>
              <Progress value={item.memoryStrength} />
              <strong>{item.memoryStrength}%</strong>
              <Button
                variant="secondary"
                className="wide"
                onClick={() => handlePracticeNow(item.id)}
                loading={isReviewing}
              >
                {item.memoryStrength >= 90 ? (
                  <>
                    <Check size={14} /> Mastered · Review
                  </>
                ) : (
                  "Practice now"
                )}
              </Button>
            </Card>
          );
        })}
      </div>
    </>
  );
}
