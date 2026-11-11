import {
  ArrowRight,
  Award,
  Bot,
  Check,
  Clock3,
  Cloud,
  Code2,
  Gauge,
  LockKeyhole,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Button, Card, PageHeader, Pill } from "../../components/ui";
import { LoadingState } from "../../components/common/LoadingState";
import type { Project } from "../../types";

export function ProjectsPage() {
  const [featured, setFeatured] = useState<Project | null>(null);
  const [library, setLibrary] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [submitUrl, setSubmitUrl] = useState("");
  const [submitNotes, setSubmitNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await api.projects.getProjects();
      setFeatured(res.featured);
      setLibrary(res.library);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenModal = (proj: Project) => {
    setModalProject(proj);
    setSubmitUrl("");
    setSubmitNotes("");
    setSuccessMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalProject) return;

    try {
      setSubmitting(true);
      await api.projects.submit(modalProject.id, submitUrl, submitNotes);
      setSuccessMsg("Project submitted successfully! Automated rubric checks queued.");
      await loadProjects();
      setTimeout(() => {
        setModalProject(null);
        setSuccessMsg(null);
      }, 2500);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading portfolio projects..." />;
  }

  const getLibraryIcon = (i: number) => {
    if (i === 0) return <Cloud />;
    if (i === 1) return <TrendingUp />;
    return <Bot />;
  };

  return (
    <>
      <PageHeader
        eyebrow="Evidence over completion"
        title="Projects & portfolio"
        description="Apply skills in realistic scenarios and build proof of what you can do."
        action={
          <Button variant="secondary" onClick={() => featured && handleOpenModal(featured)}>
            View public portfolio
          </Button>
        }
      />

      {featured && (
        <Card className="featured-project">
          <div className="project-art">
            <Code2 size={48} />
            <span>{featured.category.toUpperCase()}</span>
          </div>
          <div>
            <Pill tone={featured.status === "submitted" ? "green" : "blue"}>
              {featured.status === "submitted" ? "Submitted" : "Recommended next"}
            </Pill>
            <h2>{featured.title}</h2>
            <p>{featured.subtitle}</p>
            <div className="competencies">
              {featured.competencies.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            <div className="project-meta">
              <span>
                <Clock3 size={14} /> {featured.estimatedHours}
              </span>
              <span>
                <Gauge size={14} /> {featured.difficulty}
              </span>
              <span>
                <Award size={14} /> Portfolio ready
              </span>
            </div>
            <Button onClick={() => handleOpenModal(featured)}>
              View project brief <ArrowRight size={16} />
            </Button>
          </div>
        </Card>
      )}

      <h2 className="section-title">Project library</h2>
      <div className="three-grid">
        {library.map((proj, i) => (
          <Card className="project-card" key={proj.id}>
            <div className="project-card-icon">{getLibraryIcon(i)}</div>
            <Pill tone={proj.isCapstone ? "slate" : proj.status === "submitted" ? "green" : "blue"}>
              {proj.status === "submitted"
                ? "Submitted"
                : proj.isCapstone
                ? "Capstone · Locked"
                : "Available"}
            </Pill>
            <h2>{proj.title}</h2>
            <p>{proj.subtitle}</p>
            <Button
              variant="secondary"
              className="wide"
              onClick={() => handleOpenModal(proj)}
            >
              {proj.isCapstone ? (
                <>
                  <LockKeyhole size={14} /> View prerequisites
                </>
              ) : (
                "Explore project"
              )}
            </Button>
          </Card>
        ))}
      </div>

      {modalProject && (
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
          <div
            className="card"
            style={{
              maxWidth: "560px",
              width: "100%",
              padding: "28px",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <button
              onClick={() => setModalProject(null)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
            <Pill>{modalProject.difficulty}</Pill>
            <h2 style={{ fontSize: "22px", margin: "10px 0 6px" }}>{modalProject.title}</h2>
            <p style={{ color: "var(--slate-600)", fontSize: "13px", lineHeight: 1.6 }}>
              {modalProject.subtitle}
            </p>

            <h3 style={{ fontSize: "14px", marginTop: "18px", marginBottom: "8px" }}>
              Rubric Criteria:
            </h3>
            <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "12px", color: "var(--slate-700)" }}>
              {modalProject.rubricCriteria?.map((r) => (
                <li key={r} style={{ marginBottom: "6px" }}>
                  {r}
                </li>
              ))}
            </ul>

            <hr style={{ border: 0, borderTop: "1px solid var(--slate-100)", margin: "20px 0" }} />

            {successMsg ? (
              <div
                style={{
                  padding: "16px",
                  background: "var(--green-100)",
                  color: "var(--green-700)",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Check size={18} /> {successMsg}
              </div>
            ) : modalProject.isCapstone ? (
              <p style={{ fontSize: "12px", color: "var(--slate-500)" }}>
                Complete stages 1 through 3 to unlock this portfolio capstone submission.
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "11px", fontWeight: 700 }}>
                  Submission Repository URL
                  <input
                    type="url"
                    placeholder="https://github.com/your-username/repo"
                    value={submitUrl}
                    onChange={(e) => setSubmitUrl(e.target.value)}
                    required
                  />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "11px", fontWeight: 700 }}>
                  Notes & Key Decisions
                  <input
                    placeholder="Briefly describe testing and architectural trade-offs..."
                    value={submitNotes}
                    onChange={(e) => setSubmitNotes(e.target.value)}
                  />
                </label>
                <Button type="submit" loading={submitting}>
                  Submit for evaluation <ArrowRight size={15} />
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
