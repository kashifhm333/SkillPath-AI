import { Check, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button, Card, PageHeader } from "../../components/ui";

export function ProfilePage() {
  return (
    <SettingsForm
      title="Profile & learning preferences"
      description="Keep your experience, goals, and learning preferences current."
      settings={false}
    />
  );
}

export function SettingsPage() {
  return (
    <SettingsForm
      title="Settings & account"
      description="Manage your account, notifications, privacy, and connected services."
      settings={true}
    />
  );
}

function SettingsForm({
  title,
  description,
  settings = false,
}: {
  title: string;
  description: string;
  settings?: boolean;
}) {
  const { user, profile, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || "Alex Morgan");
  const [goal, setGoal] = useState(profile?.goal || "Become an AI Engineer");
  const [hours, setHours] = useState(profile?.hours || 8);
  const [learningStyle, setLearningStyle] = useState(profile?.learningStyle || "Mixed");
  const [language, setLanguage] = useState(profile?.language || "English");
  const [ecosystem, setEcosystem] = useState(profile?.ecosystem || "Cloud agnostic");
  const [operatingSystem, setOperatingSystem] = useState(profile?.operatingSystem || "Linux");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState(0);

  const tabs = settings
    ? ["Account", "Notifications", "Privacy & data", "Integrations", "Billing"]
    : ["Personal details", "Learning profile", "Experience", "Preferences"];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      await updateProfile({
        name,
        goal,
        hours,
        learningStyle,
        language,
        ecosystem,
        operatingSystem,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title={title} description={description} />
      <div className="settings-layout">
        <Card className="settings-nav">
          {tabs.map((item, i) => (
            <button
              type="button"
              className={activeTab === i ? "active" : ""}
              onClick={() => setActiveTab(i)}
              key={item}
            >
              {item}
              <ChevronRight size={14} />
            </button>
          ))}
        </Card>

        <Card className="settings-form">
          <h2>{settings ? "Account details" : "Personal details"}</h2>
          <p>
            {settings
              ? "Update your sign-in and account information."
              : "Help us personalize how SkillPath communicates with you."}
          </p>

          {error && (
            <div
              style={{
                padding: "10px 14px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                color: "#b91c1c",
                fontSize: "12px",
                marginBottom: "16px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSave}>
            <div className="form-grid">
              <label>
                Full name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Target role or outcome
                <input
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  required
                />
              </label>
              <label className="full">
                Email address
                <input
                  type="email"
                  value={user?.email || "alex@example.com"}
                  disabled
                  style={{ background: "var(--slate-50)", opacity: 0.8 }}
                />
              </label>
              <label>
                Weekly learning goal
                <select
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                >
                  <option value={4}>4 hours</option>
                  <option value={6}>6 hours</option>
                  <option value={8}>8 hours</option>
                  <option value={10}>10 hours</option>
                  <option value={15}>15 hours</option>
                </select>
              </label>
              <label>
                Learning style
                <select
                  value={learningStyle}
                  onChange={(e) => setLearningStyle(e.target.value)}
                >
                  <option>Mixed</option>
                  <option>Visual</option>
                  <option>Hands-on</option>
                  <option>Reading</option>
                </select>
              </label>
              <label>
                Preferred language
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </label>
              <label>
                Cloud ecosystem
                <select
                  value={ecosystem}
                  onChange={(e) => setEcosystem(e.target.value)}
                >
                  <option>Cloud agnostic</option>
                  <option>AWS</option>
                  <option>Azure</option>
                  <option>Google Cloud</option>
                </select>
              </label>
            </div>

            <div className="settings-actions">
              {saved && (
                <span style={{ color: "var(--green-700)", display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 600 }}>
                  <Check size={14} /> Changes saved to account
                </span>
              )}
              <Button type="submit" loading={saving}>
                Save changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
