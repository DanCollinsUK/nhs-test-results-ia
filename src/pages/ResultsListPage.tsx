import { Link, useSearchParams } from "react-router-dom";
import { results } from "../data/results";
import { ResultCard } from "../components/ResultCard";
import { Icon } from "../components/Icon";
import "./ResultsListPage.css";

export function ResultsListPage() {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const source = searchParams.get("source");

  const filtered = results
    .filter((result) => !status || result.status === status)
    .filter((result) => !category || result.category === category)
    .filter((result) => !source || result.source === source)
    .sort((a, b) => b.date.localeCompare(a.date));

  const hasActiveFilters = Boolean(status || category || source);

  return (
    <div className="nhsuk-width-container-fluid results-page">
      <div className="results-page__header">
        <h1 className="nhsuk-heading-l">Test results</h1>
        <Link
          to={{ pathname: "/filter", search: searchParams.toString() }}
          className="results-page__filter-link"
        >
          <Icon name="filter" size={20} />
          <span>Filter{hasActiveFilters ? " (active)" : ""}</span>
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="results-page__empty">
          <p className="nhsuk-body">
            {hasActiveFilters
              ? "No results match your filters."
              : "You have no test results yet."}
          </p>
          {hasActiveFilters && (
            <Link to="/" className="nhsapp-card__link">
              Clear filters
            </Link>
          )}
        </div>
      ) : (
        <ul className="nhsapp-cards">
          {filtered.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </ul>
      )}
    </div>
  );
}
