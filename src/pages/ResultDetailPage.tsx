import { useParams } from "react-router-dom";
import { results } from "../data/results";
import { ResultDetailSensitive } from "./ResultDetailSensitive";
import { ResultDetailStandard } from "./ResultDetailStandard";
import { BackLink } from "../components/BackLink";
import "./ResultDetail.css";

export function ResultDetailPage() {
  const { id } = useParams<{ id: string }>();
  const result = results.find((r) => r.id === id);

  if (!result) {
    return (
      <div className="nhsuk-width-container-fluid detail-page">
        <BackLink to="/">Back to test results</BackLink>
        <p className="detail-page__body">We could not find that result.</p>
      </div>
    );
  }

  if (result.sensitivity === "standard") {
    return <ResultDetailStandard result={result} />;
  }

  return <ResultDetailSensitive result={result} />;
}
