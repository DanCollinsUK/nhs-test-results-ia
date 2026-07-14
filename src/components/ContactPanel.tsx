import type { ReactNode } from "react";
import { Icon } from "./Icon";
import "./ContactPanel.css";

interface ContactPanelProps {
  heading?: string;
  children: ReactNode;
}

export function ContactPanel({
  heading = "If you'd like to talk this through",
  children,
}: ContactPanelProps) {
  return (
    <section className="contact-panel" aria-label={heading}>
      <h2 className="contact-panel__heading">
        <Icon name="phoneCall" size={20} />
        <span>{heading}</span>
      </h2>
      <div className="contact-panel__body">{children}</div>
    </section>
  );
}
