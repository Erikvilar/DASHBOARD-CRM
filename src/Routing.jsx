import App from "./App.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import { LoginDashboard,Dashboard } from "./components/index.js";

const Routing = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<LoginDashboard />} />
          <Route path="viewer" element={<Dashboard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
export default Routing;
