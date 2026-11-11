import {
  Bookmark,
  BookOpen,
  Clock3,
  Code2,
  ExternalLink,
  FileText,
  Filter,
  Play,
  Search,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Button, Card, PageHeader, Pill } from "../../components/ui";
import { LoadingState } from "../../components/common/LoadingState";
import type { ResourceItem } from "../../types";

export function ResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [filter, setFilter] = useState("Recommended");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchResources = async (f: string, s: string) => {
    try {
      setLoading(true);
      const data = await api.resources.getResources(f, s);
      setResources(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources(filter, search);
  }, [filter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResources(filter, search);
  };

  const handleToggleSave = async (id: string) => {
    try {
      const updated = await api.resources.toggleSave(id);
      setResources((prev) =>
        prev.map((r) => (r.id === id ? { ...r, saved: updated.saved } : r))
      );
    } catch (err) {
      console.error("Failed to toggle bookmark", err);
    }
  };

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return Play;
      case "documentation":
        return FileText;
      case "interactive":
        return Code2;
      default:
        return BookOpen;
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Curated for your path"
        title="Resource explorer"
        description="High-quality learning material ranked for relevance, level, and learner outcomes."
      />

      <form className="search-filter" onSubmit={handleSearch}>
        <div>
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search videos, docs, exercises..."
          />
        </div>
        <Button variant="secondary" type="submit">
          <Filter size={16} /> Search
        </Button>
      </form>

      <div className="filter-pills">
        {["Recommended", "Videos", "Documentation", "Interactive", "Saved"].map(
          (item) => (
            <button
              type="button"
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
              key={item}
            >
              {item}
            </button>
          )
        )}
      </div>

      {loading ? (
        <LoadingState message="Fetching curated resources..." />
      ) : resources.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--slate-500)" }}>
          <p>No resources found matching "{search || filter}".</p>
          <Button variant="secondary" onClick={() => { setFilter("Recommended"); setSearch(""); }}>
            Reset filters
          </Button>
        </div>
      ) : (
        <div className="resource-grid">
          {resources.map((item) => {
            const Icon = getIcon(item.type);
            return (
              <Card className="resource-card" key={item.id}>
                <div className="resource-thumb">
                  <Icon size={40} />
                  <Pill>{item.type}</Pill>
                  <button
                    type="button"
                    onClick={() => handleToggleSave(item.id)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "12px",
                      background: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "28px",
                      height: "28px",
                      display: "grid",
                      placeItems: "center",
                      color: item.saved ? "var(--blue-600)" : "var(--slate-400)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                    aria-label={item.saved ? "Remove bookmark" : "Save bookmark"}
                  >
                    <Bookmark size={14} fill={item.saved ? "currentColor" : "none"} />
                  </button>
                </div>
                <div className="resource-body">
                  <span>{item.source}</span>
                  <h2>{item.title}</h2>
                  <p>Selected for your current level and mapped directly to your active competency.</p>
                  <div>
                    <span>
                      <Clock3 size={12} /> {item.time}
                    </span>
                    <span>
                      <Star size={12} fill="currentColor" className="star" /> {item.rating}
                    </span>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="button button-secondary wide"
                    style={{ textDecoration: "none" }}
                  >
                    Open resource <ExternalLink size={14} />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
