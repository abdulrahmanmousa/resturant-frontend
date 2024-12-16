import LandingPage from "./pages/landing-page/landing-page";
import { Routes, Route, HashRouter } from "react-router-dom";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
