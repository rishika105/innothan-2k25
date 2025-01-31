import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrafficMap from "./components/TrafficMap";
import RouteOptimizationMap from "./components/RouteOptimizationMap";
import CentralizedDashboard from "./components/Dashboard";

const App = () => {
  return (
    <div className="bg-neutral-100 text-neutral-900 font-sans w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/traffic" element={<TrafficMap />} />
        <Route path="/route-optimization" element={<RouteOptimizationMap />} />
        <Route path="/dashboard" element={<CentralizedDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
