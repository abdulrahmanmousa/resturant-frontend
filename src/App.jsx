import Login from "./pages/Login/Login";
import LandingPage from "./pages/landing-page/landing-page";
import { Routes, Route, HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
