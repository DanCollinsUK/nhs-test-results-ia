import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ResultsListPage } from "./pages/ResultsListPage";
import { ResultDetailPage } from "./pages/ResultDetailPage";
import { FilterPanelPage } from "./pages/FilterPanelPage";
import { Placeholder } from "./pages/Placeholder";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ResultsListPage />} />
        <Route path="/results/:id" element={<ResultDetailPage />} />
        <Route path="/filter" element={<FilterPanelPage />} />
        <Route path="/messages" element={<Placeholder title="Messages" />} />
        <Route path="/profile" element={<Placeholder title="Profile" />} />
      </Route>
    </Routes>
  );
}

export default App;
