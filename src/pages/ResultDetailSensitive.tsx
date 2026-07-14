import { useState } from "react";
import type { TestResult } from "../types/result";
import { BackLink } from "../components/BackLink";
import { StatusTag } from "../components/StatusTag";
import { CareCard } from "../components/CareCard";
import { ContactPanel } from "../components/ContactPanel";
import { formatResultDate } from "../utils/date";
import "./ResultDetail.css";

interface ResultDetailSensitiveProps {
  result: TestResult;
}

export function ResultDetailSensitive({ result }: ResultDetailSensitiveProps) {
  const [revealed, setRevealed] = useState(false);
  const isProcessing = result.status === "processing";
  const isGated =
    result.sensitivity === "clinicianFirst" && !isProcessing && !revealed;

  return (
    <div className="nhsuk-width-container-fluid detail-page detail-page--sensitive">
      <BackLink to="/">Back to test results</BackLink>

      <h1 className="nhsuk-heading-l">{result.testName}</h1>
      <p className="detail-page__date">{formatResultDate(result.date)}</p>
      <StatusTag status={result.status} />

      {isProcessing && (
        <p className="detail-page__body">
          We're still processing this test. We'll let you know here and by
          notification as soon as it's ready.
        </p>
      )}

      {!isProcessing && isGated && (
        <div className="detail-page__gate">
          <h2 className="nhsuk-heading-m">
            Talk to a clinician about this result
          </h2>
          <p className="detail-page__body">
            This type of result is easier to understand with support from a
            clinician, so we'd like you to contact them before you see it.
            They can talk you through what it means and what happens next.
          </p>
          <ContactPanel heading="Contact a clinician">
            <p>Sexual health clinic: 0300 123 4567 (Monday to Friday, 9am to 5pm)</p>
            <p>Or call NHS 111 if you need advice outside these hours.</p>
          </ContactPanel>
          <button
            type="button"
            className="nhsuk-button"
            onClick={() => setRevealed(true)}
          >
            I understand, show my result
          </button>
        </div>
      )}

      {!isProcessing && !isGated && (
        <>
          {result.sensitivity !== "standard" && (
            <p className="detail-page__body">
              Take your time reading this result. Support is available if you
              need it — see below.
            </p>
          )}
          <p className="detail-page__body detail-page__body--summary">
            {result.resultSummary}
          </p>
          <h2 className="nhsuk-heading-m">What this means</h2>
          <p className="detail-page__body">{result.whatItMeans}</p>
          <h2 className="nhsuk-heading-m">What to do next</h2>
          <p className="detail-page__body">{result.whatToDoNext}</p>
        </>
      )}

      {!isGated && (
        <ContactPanel>
          <p>
            If anything here is unclear, or you'd just like to talk it
            through, contact the service that requested this test.
          </p>
          <p>Or call NHS 111 if you need advice now.</p>
        </ContactPanel>
      )}

      <h2 className="nhsuk-heading-m">About this test</h2>
      <CareCard requestedBy={result.requestedBy} category={result.category} />
    </div>
  );
}
