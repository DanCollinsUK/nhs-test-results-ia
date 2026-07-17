import type { TestResult } from "../types/result";
import { BackLink } from "../components/BackLink";
import { StatusTag } from "../components/StatusTag";
import { CareCard } from "../components/CareCard";
import { ContactPanel } from "../components/ContactPanel";
import { formatResultDate } from "../utils/date";
import "./ResultDetail.css";

interface ResultDetailStandardProps {
  result: TestResult;
}

export function ResultDetailStandard({ result }: ResultDetailStandardProps) {
  const isProcessing = result.status === "processing";

  return (
    <div className="nhsuk-width-container-fluid detail-page">
      <BackLink to="/test-results">Back to test results</BackLink>

      <h1 className="nhsuk-heading-l">{result.testName}</h1>
      <p className="detail-page__date">{formatResultDate(result.date)}</p>
      <StatusTag status={result.status} />

      {isProcessing ? (
        <p className="detail-page__body">
          We're still processing this test. We'll let you know here and by
          notification as soon as it's ready.
        </p>
      ) : (
        <>
          <p className="detail-page__body detail-page__body--summary">
            {result.resultSummary}
          </p>
          <h2 className="nhsuk-heading-m">What this means</h2>
          <p className="detail-page__body">{result.whatItMeans}</p>
          <h2 className="nhsuk-heading-m">What to do next</h2>
          <p className="detail-page__body">{result.whatToDoNext}</p>
        </>
      )}

      <ContactPanel>
        <p>
          If anything here is unclear, contact the service that requested
          this test.
        </p>
        <p>Or call NHS 111 if you need advice now.</p>
      </ContactPanel>

      <h2 className="nhsuk-heading-m">About this test</h2>
      <CareCard requestedBy={result.requestedBy} category={result.category} />
    </div>
  );
}
