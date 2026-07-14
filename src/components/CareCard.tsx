interface CareCardProps {
  requestedBy: string;
  category: string;
}

export function CareCard({ requestedBy, category }: CareCardProps) {
  return (
    <dl className="nhsuk-summary-list">
      <div className="nhsuk-summary-list__row">
        <dt className="nhsuk-summary-list__key">Test type</dt>
        <dd className="nhsuk-summary-list__value">{category}</dd>
      </div>
      <div className="nhsuk-summary-list__row">
        <dt className="nhsuk-summary-list__key">Requested by</dt>
        <dd className="nhsuk-summary-list__value">{requestedBy}</dd>
      </div>
    </dl>
  );
}
