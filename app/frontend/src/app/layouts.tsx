import {
  BarChart3,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  Compass,
  Flag,
  FolderKanban,
  LayoutDashboard,
  Map,
  Menu,
  Settings,
  Sparkles,
  Target,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { useLearner } from "./learner";
import { ButtonLink, Logo, Pill } from "./ui";

export function PublicLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="public-shell">
      <header className="public-nav">
        <Logo />
        <nav className={open ? "public-links open" : "public-links"} aria-label="Main navigation">
          <NavLink to="/features">How it works</NavLink>
          <NavLink to="/fields">Explore fields</NavLink>
          <NavLink to="/app/roadmap">Roadmaps</NavLink>
        </nav>
        <div className="nav-actions">
          <Link to="/signin" className="sign-in-link">Sign in</Link>
          <ButtonLink to="/signup">Start learning</ButtonLink>
        </div>
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <Outlet />
      <footer className="footer">
        <Logo light />
        <p>Adaptive learning paths built around your goals, skills, and time.</p>
        <div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><span>© 2026 SkillPath AI</span></div>
      </footer>
    </div>
  );
}

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
  const { learner } = useLearner();
  const [open, setOpen] = useState(false);
  return (
    <div className="app-shell">
      <aside className={open ? "sidebar open" : "sidebar"}>
        <div className="sidebar-top">
          <Logo light />
          <button className="sidebar-close" onClick={() => setOpen(false)} aria-label="Close navigation"><X /></button>
        </div>
        <div className="path-switcher">
          <div className="mini-path-icon"><Sparkles size={17} /></div>
          <div><span>Current path</span><strong>AI Engineer</strong></div>
          <ChevronDown size={16} />
        </div>
        <nav className="sidebar-nav" aria-label="Learning navigation">
          <span className="nav-label">Workspace</span>
          {navigation.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}>
              <Icon size={19} /><span>{label}</span>
            </NavLink>
          ))}
          <span className="nav-label nav-label-space">Account</span>
          <NavLink to="/app/notifications"><Bell size={19} /><span>Notifications</span><b>3</b></NavLink>
          <NavLink to="/app/profile"><UserRound size={19} /><span>Profile</span></NavLink>
          <NavLink to="/app/settings"><Settings size={19} /><span>Settings</span></NavLink>
        </nav>
        <div className="sidebar-footer">
          <div className="avatar">{learner.name.slice(0, 2).toUpperCase()}</div>
          <div><strong>{learner.name} Morgan</strong><span>Pro learner</span></div>
          <ChevronDown size={16} />
        </div>
      </aside>
      <div className="app-main">
        <header className="app-topbar">
          <button className="app-menu" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu /></button>
          <div className="mobile-logo"><Logo /></div>
          <div className="topbar-status"><span className="live-dot" /> Roadmap adapted today <Pill tone="green">On track</Pill></div>
          <Link to="/app/notifications" className="icon-button" aria-label="Notifications"><Bell size={19} /><span>3</span></Link>
        </header>
        <main className="content"><Outlet /></main>
      </div>
    </div>
  );
}
