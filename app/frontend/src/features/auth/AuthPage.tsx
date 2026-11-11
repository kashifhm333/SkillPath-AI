import { ArrowRight, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Button, Card } from "../../components/ui";

export function AuthPage({ mode }: { mode: "signin" | "signup" }) {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const isSignUp = mode === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isSignUp && (!name.trim() || name.trim().length < 2)) {
      setError("Please enter your full name (minimum 2 characters).");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);
      if (isSignUp) {
        let savedFields: string[] = ["Artificial Intelligence"];
        try {
          const raw = localStorage.getItem("skillpath_selected_fields");
          if (raw) savedFields = JSON.parse(raw);
        } catch {
          // ignore
        }
        await register(name.trim(), email.trim(), password, "Become an AI Engineer", savedFields);
        navigate("/onboarding");
      } else {
        await login(email.trim(), password);
        navigate("/app");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed. Please check your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <Card className="auth-card">
        <div className="auth-icon">
          <Sparkles />
        </div>
        <span className="eyebrow">{isSignUp ? "Start your journey" : "Welcome back"}</span>
        <h1>{isSignUp ? "Create your learning path" : "Continue your progress"}</h1>
        <p>
          {isSignUp
            ? "One account. A roadmap that grows with you."
            : "Sign in to pick up exactly where you left off."}
        </p>

        <button
          type="button"
          className="social-button"
          onClick={() => {
            setEmail("alex@example.com");
            setPassword("Password123!");
          }}
        >
          <strong>Demo</strong> Fill with test credentials
        </button>

        <div className="or">
          <span />or use email<span />
        </div>

        {error && (
          <div
            style={{
              padding: "10px 14px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              color: "#b91c1c",
              fontSize: "12px",
              fontWeight: 500,
              marginBottom: "16px",
              textAlign: "left",
            }}
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <label>
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                required
                autoComplete="name"
              />
            </label>
          )}
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              autoComplete={isSignUp ? "new-password" : "current-password"}
            />
          </label>
          <Button
            type="submit"
            className="wide"
            loading={loading}
            icon={<ArrowRight size={16} />}
          >
            {isSignUp ? "Create account" : "Sign in"}
          </Button>
        </form>

        <p className="auth-switch">
          {isSignUp ? "Already have an account?" : "New to SkillPath?"}{" "}
          <Link to={isSignUp ? "/signin" : "/signup"}>
            {isSignUp ? "Sign in" : "Create account"}
          </Link>
        </p>
      </Card>
    </main>
  );
}
