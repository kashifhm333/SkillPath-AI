import {
  BarChart3,
  Bell,
  BookOpen,
  ChevronDown,
  Compass,
  Flag,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  Settings,
  Sparkles,
  Target,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { Logo, Pill } from "../ui";

const navigation = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/app/roadmap", label: "My roadmap", icon: Map },
  { to: "/app/learn", label: "Learn", icon: BookOpen },
  { to: "/app/resources", label: "Resources", icon: Compass },
  { to: "/app/practice", label: "Practice", icon: Target },
  { to: "/app/projects", label: "Projects", icon: FolderKanban },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/goals", label: "Goals", icon: Flag },
];

export function AppLayout() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    api.notifications
      .getNotifications()
      .then((res) => {
        setUnreadCount(res.unreadCount);
      })
      .catch(() => {
        // keep default fallback count
      });
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  const displayName = user?.name || "Alex Morgan";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const currentGoal = profile?.goal || "AI Engineer";

  return (
    <div className="app-shell">
      <aside className={open ? "sidebar open" : "sidebar"}>
        <div className="sidebar-top">
          <Logo light />
          <button
            className="sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X />
          </button>
        </div>
        <div className="path-switcher">
          <div className="mini-path-icon">
            <Sparkles size={17} />
          </div>
          <div>
            <span>Current path</span>
            <strong>{currentGoal}</strong>
          </div>
          <ChevronDown size={16} />
        </div>
        <nav className="sidebar-nav" aria-label="Learning navigation">
          <span className="nav-label">Workspace</span>
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}>
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
          <span className="nav-label nav-label-space">Account</span>
          <NavLink to="/app/notifications" onClick={() => setOpen(false)}>
            <Bell size={19} />
            <span>Notifications</span>
            {unreadCount > 0 && <b>{unreadCount}</b>}
          </NavLink>
          <NavLink to="/app/profile" onClick={() => setOpen(false)}>
            <UserRound size={19} />
            <span>Profile</span>
          </NavLink>
          <NavLink to="/app/settings" onClick={() => setOpen(false)}>
            <Settings size={19} />
            <span>Settings</span>
          </NavLink>
        </nav>
        <div className="sidebar-footer" style={{ position: "relative" }}>
          <div
            className="avatar-btn"
            style={{ display: "flex", alignItems: "center", gap: "9px", width: "100%", cursor: "pointer" }}
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="avatar">{initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <strong style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {displayName}
              </strong>
              <span>Pro learner</span>
            </div>
            <ChevronDown size={16} />
          </div>

          {userMenuOpen && (
            <div
              style={{
                position: "absolute",
                bottom: "60px",
                left: "10px",
                right: "10px",
                background: "#0b1d3a",
                border: "1px solid #1e3a64",
                borderRadius: "10px",
                padding: "8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                zIndex: 50,
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  background: "transparent",
                  border: "none",
                  color: "#ff8b8b",
                  fontSize: "12px",
                  fontWeight: 600,
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                <LogOut size={15} /> Sign out
              </button>
            </div>
          )}
        </div>
      </aside>
      <div className="app-main">
        <header className="app-topbar">
          <button
            className="app-menu"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu />
          </button>
          <div className="mobile-logo">
            <Logo />
          </div>
          <div className="topbar-status">
            <span className="live-dot" /> Roadmap adapted today{" "}
            <Pill tone="green">On track</Pill>
          </div>
          <Link
            to="/app/notifications"
            className="icon-button"
            aria-label={`Notifications, ${unreadCount} unread`}
          >
            <Bell size={19} />
            {unreadCount > 0 && <span>{unreadCount}</span>}
          </Link>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
