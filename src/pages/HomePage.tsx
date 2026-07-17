import { Link } from "react-router-dom";
import { ProfileCard } from "../components/ProfileCard";
import { HubTile } from "../components/HubTile";
import { Icon, type IconName } from "../components/Icon";
import { patient } from "../data/patient";
import "./HomePage.css";

const hubTiles: { to: string; label: string; icon: IconName }[] = [
  { to: "/prescriptions", label: "Prescriptions", icon: "prescriptions" },
  { to: "/appointments", label: "Appointments", icon: "calendar" },
  { to: "/test-results", label: "Test results", icon: "testTube" },
  { to: "/vaccinations", label: "Vaccinations", icon: "syringe" },
  { to: "/health-conditions", label: "Health conditions", icon: "heart" },
  { to: "/documents", label: "Documents", icon: "document" },
];

const infoLinks = [
  { to: "/111-online", label: "Check your symptoms using 111 online" },
  { to: "/health-a-to-z", label: "Health A to Z" },
  { to: "/find-services", label: "Find services near you" },
];

export function HomePage() {
  return (
    <div className="nhsuk-width-container-fluid home-page">
      <ProfileCard name={patient.name} nhsNumber={patient.nhsNumber} />

      <ul className="nhsapp-cards home-page__hub-grid">
        {hubTiles.map((tile) => (
          <HubTile key={tile.to} {...tile} />
        ))}
      </ul>

      <h2 className="nhsuk-heading-s">NHS information and support</h2>
      <ul className="home-page__info-list">
        {infoLinks.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="nhsuk-link--no-visited-state">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="nhsapp-card nhsapp-card--dark-blue home-page__campaign">
        <div className="nhsapp-card__container">
          <div className="nhsapp-card__content">
            <Link
              to="/organ-donation"
              className="nhsapp-card__link nhsuk-link--no-visited-state"
            >
              Organ donors save lives
            </Link>
            <div className="nhsapp-card__below">
              <p className="nhsapp-card__description">
                Take two minutes to confirm your organ donation decision
              </p>
            </div>
          </div>
          <Icon
            name="chevronRight"
            className="nhsapp-icon nhsapp-icon--chevron-right"
          />
        </div>
      </div>

      <div className="nhsapp-card nhsapp-card--pale-green home-page__feedback">
        <div className="nhsapp-card__container">
          <div className="nhsapp-card__content">
            <Link
              to="/feedback"
              className="nhsapp-card__link nhsuk-link--no-visited-state"
            >
              Tell us what you think about the NHS App
            </Link>
            <div className="nhsapp-card__below">
              <p className="nhsapp-card__description">Give feedback</p>
            </div>
          </div>
          <Icon name="messages" className="home-page__feedback-icon" />
        </div>
      </div>

      <div className="home-page__help">
        <a href="#app-help" className="home-page__help-link">
          <Icon name="help" size={20} />
          <span>App help</span>
        </a>
      </div>
    </div>
  );
}
