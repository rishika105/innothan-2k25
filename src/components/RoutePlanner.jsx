import { useState } from "react";

const RoutePlanner = () => {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Insert your TomTom API key here
  const TOMTOM_API_KEY = "PD1XGUiUO91Xh4aEcW764dHRXOxwJqtw";

  // Function to geocode an address using TomTom API
  const geocodeAddress = async (address) => {
    const apiUrl = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=${TOMTOM_API_KEY}`;
    console.log("Geocoding API URL:", apiUrl); // Debugging log

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch geocode data. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Geocoding API Data:", data); // Debugging log

    if (data.results.length === 0) {
      throw new Error("No results found for the given address.");
    }

    const { lat, lon } = data.results[0].position;
    return { lat, lon };
  };

  // Function to calculate route using TomTom API
  const calculateRoute = async () => {
    if (!start || !destination) {
      setError("Please enter both starting point and destination.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Geocode start and destination addresses
      const startCoords = await geocodeAddress(start);
      const destinationCoords = await geocodeAddress(destination);

      console.log("Start Coordinates:", startCoords); // Debugging log
      console.log("Destination Coordinates:", destinationCoords); // Debugging log

      // Fetch route data from TomTom API
      const apiUrl = `https://api.tomtom.com/routing/1/calculateRoute/${startCoords.lat},${startCoords.lon}:${destinationCoords.lat},${destinationCoords.lon}/json?key=${TOMTOM_API_KEY}&traffic=true`;
      console.log("Routing API URL:", apiUrl); // Debugging log

      const response = await fetch(apiUrl);

      console.log("Routing API Response:", response); // Debugging log

      if (!response.ok) {
        throw new Error(`Failed to fetch route data. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Routing API Data:", data); // Debugging log

      // Check if the response contains the expected structure
      if (!data.routes || !data.routes[0]) {
        throw new Error("Invalid API response structure.");
      }

      // Extract relevant route information
      const routeSummary = data.routes[0].summary;

      // Check if guidance data is available
      const routeGuidance = data.routes[0].guidance?.instructions || [
        { message: "No route steps available." },
      ];

      const mockRoute = {
        start,
        destination,
        distance: `${(routeSummary.lengthInMeters / 1000).toFixed(2)} km`, // Convert meters to kilometers
        duration: `${Math.floor(routeSummary.travelTimeInSeconds / 60)} mins`, // Convert seconds to minutes
        steps: routeGuidance.map((instruction) => instruction.message), // Extract route steps
        traffic: routeSummary.trafficDelayInSeconds > 0 ? "Heavy" : "Clear", // Basic traffic condition
      };

      setRoute(mockRoute);
    } catch (error) {
      setError(`Failed to calculate route: ${error.message}`);
      console.error("Error:", error); // Debugging log
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-neutral-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-neutral-900">
          Route Planner
        </h2>

        {/* Input Fields */}
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Starting Point (e.g., Chennai)"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
            />
            <input
              type="text"
              placeholder="Destination (e.g., Bhubaneswar)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
            />
            <button
              onClick={calculateRoute}
              disabled={isLoading}
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-green-400"
            >
              {isLoading ? "Calculating..." : "Plan Route"}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          {/* Route Details */}
          {route && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-neutral-900">
                Your Route
              </h3>
              <p className="text-neutral-600">
                <span className="font-semibold">Distance:</span> {route.distance}
              </p>
              <p className="text-neutral-600">
                <span className="font-semibold">Duration:</span> {route.duration}
              </p>

              {/* Route Steps */}
              <div className="mt-4">
                <h4 className="text-lg font-bold mb-2 text-neutral-900">
                  Directions
                </h4>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                  {route.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>

              {/* Traffic Conditions */}
              <div className="mt-4">
                <h4 className="text-lg font-bold mb-2 text-neutral-900">
                  Traffic Conditions
                </h4>
                <p className="text-neutral-600">
                  <span className="font-semibold">Overall Traffic:</span>{" "}
                  {route.traffic}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoutePlanner;