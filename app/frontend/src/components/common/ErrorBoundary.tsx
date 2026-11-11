import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../ui";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught frontend error:", error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      if (this.fallback) return this.fallback;

      return (
        <div
          style={{
            maxWidth: "600px",
            margin: "60px auto",
            padding: "30px",
            textAlign: "center",
            background: "white",
            borderRadius: "16px",
            border: "1px solid var(--slate-200)",
            boxShadow: "var(--shadow)",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#ffebee",
              color: "#d32f2f",
              display: "grid",
              placeItems: "center",
              margin: "0 auto 16px",
            }}
          >
            <AlertTriangle size={24} />
          </div>
          <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>Something went wrong</h2>
          <p style={{ color: "var(--slate-600)", fontSize: "13px", marginBottom: "24px" }}>
            {this.state.error?.message || "An unexpected UI error occurred."}
          </p>
          <Button onClick={() => window.location.reload()} icon={<RefreshCw size={15} />}>
            Reload page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }

  private get fallback() {
    return this.props.fallback;
  }
}
