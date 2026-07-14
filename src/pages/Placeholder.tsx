interface PlaceholderProps {
  title: string;
}

export function Placeholder({ title }: PlaceholderProps) {
  return (
    <div className="nhsuk-width-container-fluid detail-page">
      <h1 className="nhsuk-heading-l">{title}</h1>
      <p>This area is not part of the Test results prototype.</p>
    </div>
  );
}
