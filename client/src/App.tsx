import Nav from "./components/Navbar/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./page/Landingpage";
import Articles from "./page/Article";
import ProtectedRoute from "./page/ProtectedRoute";
import ArticlePlan from "./page/ArticlePlan";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ProtectedRoute />}>
          <Route path="/articles" element={<Articles />} />
        </Route>
        <Route path="/articlePlan" element={<ProtectedRoute />}>
          <Route path="/articlePlan" element={<ArticlePlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
