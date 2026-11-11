import { Loader2 } from "lucide-react";

export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        gap: "14px",
        color: "var(--slate-500)",
      }}
      role="status"
    >
      <Loader2 size={32} className="animate-spin" style={{ color: "var(--blue-600)" }} />
      <span style={{ fontSize: "13px", fontWeight: 600 }}>{message}</span>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div
      className="card"
      style={{
        padding: "24px",
        height: "160px",
        background: "linear-gradient(90deg, #f0f3f8 25%, #e6ecf4 50%, #f0f3f8 75%)",
        backgroundSize: "200% 100%",
        animation: "pulse 1.5s infinite",
      }}
    />
  );
}
