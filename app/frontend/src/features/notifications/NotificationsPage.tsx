import {
  BrainCircuit,
  CheckCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Button, Card, PageHeader } from "../../components/ui";
import { LoadingState } from "../../components/common/LoadingState";
import type { NotificationItem } from "../../types";

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.notifications.getNotifications();
      setNotifications(res.notifications);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      setMarking(true);
      await api.notifications.markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    } catch (err) {
      console.error(err);
    } finally {
      setMarking(false);
    }
  };

  const handleMarkOne = async (id: string) => {
    try {
      await api.notifications.markOneRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (title: string) => {
    if (title.includes("Review")) return BrainCircuit;
    if (title.includes("roadmap")) return Sparkles;
    if (title.includes("mastered")) return Trophy;
    return Users;
  };

  if (loading) {
    return <LoadingState message="Loading notifications..." />;
  }

  return (
    <>
      <PageHeader
        title="Notifications"
        description="Learning reminders, milestones, and roadmap updates."
        action={
          <Button variant="ghost" onClick={handleMarkAllRead} loading={marking}>
            <CheckCheck size={16} /> Mark all as read
          </Button>
        }
      />
      <Card className="notification-list">
        {notifications.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--slate-500)", fontSize: "13px" }}>
            You're all caught up! No notifications.
          </div>
        ) : (
          notifications.map((item) => {
            const Icon = getIcon(item.title);
            return (
              <div
                className={`notification ${item.unread ? "unread" : ""}`}
                key={item.id}
                onClick={() => item.unread && handleMarkOne(item.id)}
                style={{ cursor: item.unread ? "pointer" : "default" }}
              >
                <span className={`notice-icon ${item.tone}`}>
                  <Icon />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  <small>{item.timestamp}</small>
                </div>
                {item.unread && <i />}
              </div>
            );
          })
        )}
      </Card>
    </>
  );
}
