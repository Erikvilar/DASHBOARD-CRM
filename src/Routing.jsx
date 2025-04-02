import App from "./App.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Login,Dashboard } from "./components/index.js";
import DocumentToPrint from "./components/Views/toPrint/DocumentToPrint.jsx";


const Routing = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Login />} />
          <Route path="viewer" element={<Dashboard />} />
          <Route path="/print" element={<DocumentToPrint/>}/>
        </Route>
      </Routes>
    </HashRouter>
  );
};
export default Routing;
