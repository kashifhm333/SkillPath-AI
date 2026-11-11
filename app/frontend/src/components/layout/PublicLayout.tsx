import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { ButtonLink, Logo } from "../ui";

export function PublicLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="public-shell">
      <header className="public-nav">
        <Logo />
        <nav className={open ? "public-links open" : "public-links"} aria-label="Main navigation">
          <NavLink to="/features" onClick={() => setOpen(false)}>How it works</NavLink>
          <NavLink to="/fields" onClick={() => setOpen(false)}>Explore fields</NavLink>
          <NavLink to="/app/roadmap" onClick={() => setOpen(false)}>Roadmaps</NavLink>
        </nav>
        <div className="nav-actions">
          <Link to="/signin" className="sign-in-link">Sign in</Link>
          <ButtonLink to="/signup">Start learning</ButtonLink>
        </div>
        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <Outlet />
      <footer className="footer">
        <Logo light />
        <p>Adaptive learning paths built around your goals, skills, and time.</p>
        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <span>© 2026 SkillPath AI</span>
        </div>
      </footer>
    </div>
  );
}
