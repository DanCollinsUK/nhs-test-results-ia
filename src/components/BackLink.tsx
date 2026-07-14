import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import "./BackLink.css";

interface BackLinkProps {
  to: string;
  children: ReactNode;
}

export function BackLink({ to, children }: BackLinkProps) {
  return (
    <Link to={to} className="back-link">
      <Icon name="chevronLeft" size={20} />
      <span>{children}</span>
    </Link>
  );
}
