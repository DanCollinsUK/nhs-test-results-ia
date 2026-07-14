import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { TabBar } from "./TabBar";

export function Layout() {
  return (
    <>
      <AppHeader />
      <main className="app-main">
        <Outlet />
      </main>
      <TabBar />
    </>
  );
}
