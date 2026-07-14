import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RESULT_CATEGORIES, RESULT_SOURCES } from "../types/result";
import { BackLink } from "../components/BackLink";
import "./FilterPanelPage.css";

const statusOptions = [
  { value: "ready", label: "Results ready" },
  { value: "processing", label: "Being processed" },
];

interface RadioOption {
  value: string;
  label: string;
}

function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="nhsuk-form-group">
      <fieldset className="nhsuk-fieldset">
        <legend className="nhsuk-fieldset__legend nhsuk-fieldset__legend--m">
          {legend}
        </legend>
        <div className="nhsuk-radios">
          <div className="nhsuk-radios__item">
            <input
              className="nhsuk-radios__input"
              id={`${name}-all`}
              name={name}
              type="radio"
              value=""
              checked={value === ""}
              onChange={() => onChange("")}
            />
            <label className="nhsuk-radios__label" htmlFor={`${name}-all`}>
              All
            </label>
          </div>
          {options.map((option) => {
            const id = `${name}-${option.value.replace(/\s+/g, "-").toLowerCase()}`;
            return (
              <div className="nhsuk-radios__item" key={option.value}>
                <input
                  className="nhsuk-radios__input"
                  id={id}
                  name={name}
                  type="radio"
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => onChange(option.value)}
                />
                <label className="nhsuk-radios__label" htmlFor={id}>
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

export function FilterPanelPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [source, setSource] = useState(searchParams.get("source") ?? "");

  function applyFilters(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (category) params.set("category", category);
    if (source) params.set("source", source);
    navigate({ pathname: "/", search: params.toString() });
  }

  function clearFilters() {
    setStatus("");
    setCategory("");
    setSource("");
    navigate("/");
  }

  return (
    <div className="nhsuk-width-container-fluid detail-page filter-panel">
      <BackLink to="/">Back to test results</BackLink>
      <h1 className="nhsuk-heading-l">Filter results</h1>

      <form onSubmit={applyFilters}>
        <RadioGroup
          legend="Status"
          name="status"
          options={statusOptions}
          value={status}
          onChange={setStatus}
        />
        <RadioGroup
          legend="Category"
          name="category"
          options={RESULT_CATEGORIES.map((c) => ({ value: c, label: c }))}
          value={category}
          onChange={setCategory}
        />
        <RadioGroup
          legend="Source"
          name="source"
          options={RESULT_SOURCES.map((s) => ({ value: s, label: s }))}
          value={source}
          onChange={setSource}
        />

        <div className="filter-panel__actions">
          <button type="submit" className="nhsuk-button">
            Apply filters
          </button>
          <button
            type="button"
            className="nhsuk-button nhsuk-button--secondary"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      </form>
    </div>
  );
}
