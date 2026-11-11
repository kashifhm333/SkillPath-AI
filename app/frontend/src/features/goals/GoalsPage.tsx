import { Play, Plus, Target, X } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Button, Card, PageHeader, Pill, Progress } from "../../components/ui";
import { LoadingState } from "../../components/common/LoadingState";
import type { Milestone } from "../../types";

export function GoalsPage() {
  const [primaryGoal, setPrimaryGoal] = useState("Become an AI Engineer");
  const [targetDate, setTargetDate] = useState("October 2026");
  const [weeklyHours, setWeeklyHours] = useState(8);
  const [overallProgress, setOverallProgress] = useState(24);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  // New Milestone modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTargetDate, setNewTargetDate] = useState("");
  const [creating, setCreating] = useState(false);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const data = await api.goals.getGoals();
      setPrimaryGoal(data.primaryGoal);
      setTargetDate(data.targetDate);
      setWeeklyHours(data.weeklyHours);
      setOverallProgress(data.overallProgress);
      setMilestones(data.milestones);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

  const handleCreateMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTargetDate.trim()) return;

    try {
      setCreating(true);
      const created = await api.goals.createMilestone(newTitle.trim(), newTargetDate.trim());
      setMilestones((prev) => [...prev, created]);
      setIsModalOpen(false);
      setNewTitle("");
      setNewTargetDate("");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to create milestone");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading goals & milestones..." />;
  }

  return (
    <>
      <PageHeader
        eyebrow="Stay intentional"
        title="Goals & milestones"
        description="Keep your learning connected to a clear, achievable outcome."
        action={
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> New milestone
          </Button>
        }
      />

      <Card className="goal-overview">
        <div className="goal-target">
          <Target />
        </div>
        <div>
          <Pill>Primary goal</Pill>
          <h2>{primaryGoal}</h2>
          <p>
            Build production-ready AI systems and transition into a role by {targetDate}.
          </p>
          <div className="competencies">
            <span>Target: {targetDate}</span>
            <span>{weeklyHours} hours / week</span>
          </div>
        </div>
        <div className="goal-percent">
          <strong>{overallProgress}%</strong>
          <span>complete</span>
        </div>
      </Card>

      <div className="milestone-list">
        {milestones.map((item, i) => (
          <Card className="milestone" key={item.id || item.title}>
            <div className={`milestone-dot ${i === 0 ? "active" : ""}`}>
              {i === 0 ? <Play size={12} fill="currentColor" /> : i + 1}
            </div>
            <span>{item.targetDate}</span>
            <div>
              <h2>{item.title}</h2>
              <Pill tone={i === 0 ? "blue" : "slate"}>{item.status}</Pill>
            </div>
            <div className="milestone-progress">
              <Progress value={item.progress} />
              <strong>{item.progress}%</strong>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(7, 21, 45, 0.6)",
            backdropFilter: "blur(4px)",
            display: "grid",
            placeItems: "center",
            padding: "20px",
            zIndex: 100,
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="card" style={{ maxWidth: "460px", width: "100%", padding: "28px", position: "relative" }}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{ position: "absolute", top: "16px", right: "16px", background: "transparent", border: "none", cursor: "pointer" }}
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
            <h2 style={{ fontSize: "20px", marginBottom: "6px" }}>Add New Milestone</h2>
            <p style={{ color: "var(--slate-600)", fontSize: "12px", marginBottom: "20px" }}>
              Define a key checkpoint in your learning journey.
            </p>
            <form onSubmit={handleCreateMilestone} style={{ display: "grid", gap: "14px" }}>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "11px", fontWeight: 700 }}>
                Milestone Title
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Build end-to-end vector pipeline"
                  required
                />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "11px", fontWeight: 700 }}>
                Target Date
                <input
                  value={newTargetDate}
                  onChange={(e) => setNewTargetDate(e.target.value)}
                  placeholder="e.g. Jun 15"
                  required
                />
              </label>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" loading={creating}>
                  Create milestone
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
