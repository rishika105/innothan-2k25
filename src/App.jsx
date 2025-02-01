import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TrafficMap from "./components/TrafficMap";
import CentralizedDashboard from "./components/Dashboard";
import RoutePlanner from "./components/RoutePlanner";
import PredictiveAnalysis from "./components/PredictiveAnalysis";

const App = () => {
  return (
    <div className="bg-neutral-100 text-neutral-900 font-sans w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/traffic" element={<TrafficMap />} />
        <Route path="/dashboard" element={<CentralizedDashboard />} />
        <Route path="/predictiveAnalysis" element={<PredictiveAnalysis />} />
        <Route path="/RoutePlanner" element={<RoutePlanner />} />
      </Routes>
    </div>
  );
};

export default App;