import { Link } from "react-router-dom";
import { Icon, type IconName } from "./Icon";

interface HubTileProps {
  to: string;
  label: string;
  icon: IconName;
}

export function HubTile({ to, label, icon }: HubTileProps) {
  return (
    <li className="nhsapp-card hub-tile">
      <div className="nhsapp-card__container">
        <div className="nhsapp-card__content">
          <div className="nhsapp-card__above hub-tile__icon">
            <Icon name={icon} size={20} />
          </div>
          <Link
            to={to}
            className="nhsapp-card__link nhsuk-link--no-visited-state hub-tile__link"
          >
            {label}
          </Link>
        </div>
        <Icon
          name="chevronRight"
          className="nhsapp-icon nhsapp-icon--chevron-right"
          size={20}
        />
      </div>
    </li>
  );
}
