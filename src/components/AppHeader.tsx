import { Icon } from "./Icon";
import "./AppHeader.css";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header__logo" aria-label="NHS App">
        <span className="app-header__logo-text">NHS</span>
      </div>
      <a className="app-header__help" href="#app-help">
        <Icon name="help" size={20} />
        <span>App help</span>
      </a>
    </header>
  );
}
