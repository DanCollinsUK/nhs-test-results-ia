import type { ResultStatus } from "../types/result";

const statusCopy: Record<ResultStatus, { label: string; tint: string }> = {
  ready: { label: "Results ready", tint: "nhsapp-tag--green" },
  processing: { label: "Being processed", tint: "nhsapp-tag--grey" },
};

interface StatusTagProps {
  status: ResultStatus;
}

export function StatusTag({ status }: StatusTagProps) {
  const { label, tint } = statusCopy[status];
  return <span className={`nhsapp-tag ${tint}`}>{label}</span>;
}
