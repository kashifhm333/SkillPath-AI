import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`logo ${light ? "logo-light" : ""}`} aria-label="SkillPath AI home">
      <span className="logo-mark"><span /></span>
      <span>SkillPath <strong>AI</strong></span>
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "dark";
  icon?: ReactNode;
  loading?: boolean;
};

export function Button({
  variant = "primary",
  icon,
  loading = false,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`button button-${variant} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
      {!loading && icon}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...props
}: LinkProps & { variant?: "primary" | "secondary" | "ghost" | "dark" }) {
  return (
    <Link className={`button button-${variant} ${className}`} {...props}>
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function Pill({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "amber" | "slate";
}) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}

export function Progress({ value, label }: { value: number; label?: string }) {
  const safeValue = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div className="progress-wrap">
      {label && (
        <div className="progress-label">
          <span>{label}</span>
          <strong>{safeValue}%</strong>
        </div>
      )}
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || "Progress"}
      >
        <span style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}

export function FieldChip({
  label,
  selected,
  onClick,
  icon,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
}) {
  return (
    <button
      className={`field-chip ${selected ? "selected" : ""}`}
      onClick={onClick}
      type="button"
      aria-pressed={selected}
    >
      <span className="field-icon">{icon}</span>
      <span>{label}</span>
      <span className="chip-check">{selected && <Check size={13} strokeWidth={3} />}</span>
    </button>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </header>
  );
}

export function Toast({
  message,
  type = "info",
  onClose,
}: {
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
}) {
  return (
    <div className={`toast toast-${type}`} role="alert">
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} aria-label="Close message">
          ✕
        </button>
      )}
    </div>
  );
}
