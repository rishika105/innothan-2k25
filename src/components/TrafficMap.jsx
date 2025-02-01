import { useEffect, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import Header from "./Header";
import { motion } from "framer-motion";
import CarIcon from "../assets/car.svg"; // Import the car SVG

const TrafficMap = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [isAlternateRoute, setIsAlternateRoute] = useState(false);

  useEffect(() => {
    const map = tt.map({
      key: "PD1XGUiUO91Xh4aEcW764dHRXOxwJqtw", // Replace with your TomTom API Key
      container: "map",
      center: [-122.4194, 37.7749], // Default: San Francisco
      zoom: 12,
    });

    // Wait for the map to load completely
    map.on("load", () => {
      // Add traffic tiles as a source
      map.addSource("traffic-tiles", {
        type: "raster",
        tiles: [
          `https://api.tomtom.com/map/1/tile/basic/main/0/0/0.png?view=Unified&key=PD1XGUiUO91Xh4aEcW764dHRXOxwJqtw`,
        ],
        tileSize: 256,
      });

      // Add traffic layer using the above source
      map.addLayer({
        id: "traffic-layer",
        type: "raster",
        source: "traffic-tiles",
      });
    });

    // Simulate a traffic jam after 5 seconds
    const trafficJamTimeout = setTimeout(() => {
      setShowNotification(true);
    }, 5000);

    return () => {
      map.remove();
      clearTimeout(trafficJamTimeout);
    };
  }, []);

  // Handle alternate route acceptance
  const handleAcceptAlternateRoute = () => {
    setShowNotification(false);
    setIsAlternateRoute(true);
  };

  return (
    <>
      <Header />
      <div className="mx-auto w-[100vw] h-[100vh] relative">
        {/* Map Container */}
        <div id="map" style={{ width: "100%", height: "100%" }}></div>

        {/* Car Animation */}
        <motion.div
          className="absolute bottom-20 left-0 z-10"
          animate={{
            x: isAlternateRoute ? "0vw" : showNotification ? "50vw" : "100vw", // Horizontal movement
            y: isAlternateRoute ? "0vh" : 0, // Vertical movement for U-turn
          }}
          transition={{
            x: { duration: 10, ease: "linear" }, // Horizontal movement
            y: { duration: 5, ease: "linear" }, // Vertical movement
          }}
        >
          <img src={CarIcon} alt="Car" className="w-12 h-12" /> {/* Use the car SVG */}
        </motion.div>

        {/* Notification */}
        {showNotification && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg text-center z-20">
            <p>🚨 Traffic Jam Ahead! Take the alternate route.</p>
            <button
              onClick={handleAcceptAlternateRoute}
              className="mt-2 bg-white text-red-500 px-4 py-1 rounded"
            >
              View Alternate Route
            </button>
          </div>
        )}

        {/* Alternate Route Indicator */}
        {isAlternateRoute && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 text-green-500 font-bold bg-white p-2 rounded-lg shadow-lg z-20">
            Alternate Route Activated!
          </div>
        )}
      </div>
    </>
  );
};

export default TrafficMap;