import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./BackLink.css";

interface BackLinkProps {
  to: string;
  children: ReactNode;
}

export function BackLink({ to, children }: BackLinkProps) {
  return (
    <Link to={to} className="nhsuk-back-link back-link">
      {children}
    </Link>
  );
}
