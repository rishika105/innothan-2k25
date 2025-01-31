import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import RoutePlanner from "./components/RoutePlanner"; // Import the RoutePlanner component
import HomePage from "./pages/HomePage"; // Import the HomePage component

const App = () => {
  return (
    
      <div className="bg-neutral-100 text-neutral-900 font-sans">
        {/* Header */}
        <Header />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home Page */}
          <Route path="/RoutePlanner" element={<RoutePlanner />} /> {/* Route Planner Page */}
        </Routes>
      </div>
    
  );
};

export default App;