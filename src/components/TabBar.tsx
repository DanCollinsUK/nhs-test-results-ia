import { NavLink } from "react-router-dom";
import { Icon } from "./Icon";
import "./TabBar.css";

const tabs = [
  { to: "/", label: "Home", icon: "home", iconFilled: "homeFilled" },
  {
    to: "/messages",
    label: "Messages",
    icon: "messages",
    iconFilled: "messagesFilled",
  },
  {
    to: "/profile",
    label: "Profile",
    icon: "account",
    // nhsapp-frontend doesn't ship a filled account icon (unlike home/messages),
    // so the active state relies on the colour change instead of an icon swap.
    iconFilled: "account",
  },
] as const;

export function TabBar() {
  return (
    <nav className="tab-bar" aria-label="Primary">
      <ul className="tab-bar__list">
        {tabs.map((tab) => (
          <li key={tab.to} className="tab-bar__item">
            <NavLink
              to={tab.to}
              end={tab.to === "/"}
              className={({ isActive }) =>
                "tab-bar__link" + (isActive ? " tab-bar__link--active" : "")
              }
            >
              {({ isActive }) => (
                <>
                  <Icon name={isActive ? tab.iconFilled : tab.icon} />
                  <span>{tab.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
