import { useState } from "react";

const RoutePlanner = () => {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [route, setRoute] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const TOMTOM_API_KEY = "PD1XGUiUO91Xh4aEcW764dHRXOxwJqtw";

  // Geocode an address using TomTom API
  const geocodeAddress = async (address) => {
    const apiUrl = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=${TOMTOM_API_KEY}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch geocode data. Status: ${response.status}`);
    }
    const data = await response.json();
    if (data.results.length === 0) {
      throw new Error("No results found for the given address.");
    }
    const { lat, lon } = data.results[0].position;
    return { lat, lon };
  };

  // Calculate route with waypoint optimization
  const calculateRoute = async () => {
    if (!start || !destination) {
      setError("Please enter both starting point and destination.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Geocode start, destination, and waypoints
      const startCoords = await geocodeAddress(start);
      const destinationCoords = await geocodeAddress(destination);
      const waypointCoords = await Promise.all(
        waypoints.map((waypoint) => geocodeAddress(waypoint))
      );

      // Prepare waypoints for the Waypoint Optimization API
      const waypointsForOptimization = [
        {
          point: {
            latitude: startCoords.lat,
            longitude: startCoords.lon,
          },
        },
        ...waypointCoords.map((coords) => ({
          point: {
            latitude: coords.lat,
            longitude: coords.lon,
          },
        })),
        {
          point: {
            latitude: destinationCoords.lat,
            longitude: destinationCoords.lon,
          },
        },
      ];

      // Call the Waypoint Optimization API
      const optimizationUrl = `https://api.tomtom.com/routing/waypointoptimization/1?key=${TOMTOM_API_KEY}`;
      const optimizationResponse = await fetch(optimizationUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          waypoints: waypointsForOptimization,
          options: {
            travelMode: "car",
            traffic: "live",
            departAt: "now",
          },
        }),
      });

      if (!optimizationResponse.ok) {
        throw new Error(`Failed to fetch optimized route data. Status: ${optimizationResponse.status}`);
      }

      const optimizationData = await optimizationResponse.json();
      console.log("Optimization API Data:", optimizationData);

      // Reorder waypoints based on optimizedOrder
      const optimizedOrder = optimizationData.optimizedOrder;
      const optimizedWaypoints = optimizedOrder.map((index) => waypointsForOptimization[index]);

      // Fetch detailed route information using the Routing API
      const routeUrl = `https://api.tomtom.com/routing/1/calculateRoute/${optimizedWaypoints
        .map((waypoint) => `${waypoint.point.latitude},${waypoint.point.longitude}`)
        .join(":")}/json?key=${TOMTOM_API_KEY}&traffic=true`;
      const routeResponse = await fetch(routeUrl);

      if (!routeResponse.ok) {
        throw new Error(`Failed to fetch route details. Status: ${routeResponse.status}`);
      }

      const routeData = await routeResponse.json();
      console.log("Routing API Data:", routeData);

      // Extract relevant route information
      const routeSummary = routeData.routes[0].summary;
      const routeSteps = routeData.routes[0].guidance?.instructions || [];

      const optimizedRoute = {
        start,
        destination,
        waypoints: waypoints,
        distance: `${(routeSummary.lengthInMeters / 1000).toFixed(2)} km`,
        duration: `${Math.floor(routeSummary.travelTimeInSeconds / 60)} mins`,
        steps: routeSteps.map((instruction) => instruction.message),
        traffic: routeSummary.trafficDelayInSeconds > 0 ? "Heavy" : "Clear",
      };

      setRoute(optimizedRoute);
    } catch (error) {
      setError(`Failed to calculate route: ${error.message}`);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a waypoint
  const addWaypoint = () => {
    setWaypoints([...waypoints, ""]);
  };

  // Update a waypoint
  const updateWaypoint = (index, value) => {
    const updatedWaypoints = [...waypoints];
    updatedWaypoints[index] = value;
    setWaypoints(updatedWaypoints);
  };

  return (
    <section className="bg-neutral-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-neutral-900">
          Route Planner with Waypoint Optimization
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
            {waypoints.map((waypoint, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Waypoint ${index + 1} (e.g., Visakhapatnam)`}
                value={waypoint}
                onChange={(e) => updateWaypoint(index, e.target.value)}
                className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500"
              />
            ))}
            <button
              onClick={addWaypoint}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Add Waypoint
            </button>
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
                Your Optimized Route
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