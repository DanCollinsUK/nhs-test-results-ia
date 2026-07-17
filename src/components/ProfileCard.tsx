import { Link } from "react-router-dom";
import { Icon } from "./Icon";

interface ProfileCardProps {
  name: string;
  nhsNumber: string;
}

export function ProfileCard({ name, nhsNumber }: ProfileCardProps) {
  return (
    <div className="nhsapp-card nhsapp-card--pale-blue">
      <div className="nhsapp-card__container">
        <div className="nhsapp-card__content">
          <div className="nhsapp-card__above profile-card__above">
            <Icon name="account" size={20} />
            <span>Profile</span>
          </div>
          <Link
            to="/profile"
            className="nhsapp-card__link nhsuk-link--no-visited-state"
          >
            {name}
          </Link>
          <div className="nhsapp-card__below">
            <p className="nhsapp-card__description">NHS number: {nhsNumber}</p>
          </div>
        </div>
        <Icon name="chevronRight" className="nhsapp-icon nhsapp-icon--chevron-right" />
      </div>
    </div>
  );
}
