import { Link } from "react-router-dom";
import type { TestResult } from "../types/result";
import { StatusTag } from "./StatusTag";
import { Icon } from "./Icon";
import { formatResultDate } from "../utils/date";
import "./ResultCard.css";

interface ResultCardProps {
  result: TestResult;
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <li className="nhsapp-card">
      <div className="nhsapp-card__container">
        <div className="nhsapp-card__content">
          <div className="nhsapp-card__above">
            <p className="result-card__date">{formatResultDate(result.date)}</p>
          </div>
          <Link
            to={`/results/${result.id}`}
            className="nhsapp-card__link nhsuk-link--no-visited-state"
          >
            {result.testName}
          </Link>
          <div className="nhsapp-card__below">
            <StatusTag status={result.status} />
          </div>
        </div>
        <Icon name="chevronRight" className="nhsapp-icon nhsapp-icon--chevron-right" />
      </div>
    </li>
  );
}
