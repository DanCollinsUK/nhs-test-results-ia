import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ResultsListPage } from "./pages/ResultsListPage";
import { ResultDetailPage } from "./pages/ResultDetailPage";
import { FilterPanelPage } from "./pages/FilterPanelPage";
import { Placeholder } from "./pages/Placeholder";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/test-results" element={<ResultsListPage />} />
        <Route path="/results/:id" element={<ResultDetailPage />} />
        <Route path="/filter" element={<FilterPanelPage />} />
        <Route path="/messages" element={<Placeholder title="Messages" />} />
        <Route path="/profile" element={<Placeholder title="Profile" />} />
        <Route
          path="/prescriptions"
          element={<Placeholder title="Prescriptions" />}
        />
        <Route
          path="/appointments"
          element={<Placeholder title="Appointments" />}
        />
        <Route
          path="/vaccinations"
          element={<Placeholder title="Vaccinations" />}
        />
        <Route
          path="/health-conditions"
          element={<Placeholder title="Health conditions" />}
        />
        <Route path="/documents" element={<Placeholder title="Documents" />} />
        {/* Home-screen context links (campaign banner, feedback, NHS info)
            that sit outside the Test Results IA this prototype demonstrates. */}
        <Route path="*" element={<Placeholder title="Not part of this prototype" />} />
      </Route>
    </Routes>
  );
}

export default App;
