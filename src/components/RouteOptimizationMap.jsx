import React, { useState, useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const RouteOptimizationMap = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [route, setRoute] = useState(null);
  const [map, setMap] = useState(null);  // Track map instance

  const handleMapClick = (e) => {
    if (!start) {
      setStart(e.lngLat);
    } else if (!end) {
      setEnd(e.lngLat);
    }
  };

  const fetchRoute = () => {
    if (start && end) {
      const startPoint = `${start.lng},${start.lat}`;
      const endPoint = `${end.lng},${end.lat}`;

      // Fetch route from TomTom API
      const apiKey = "PD1XGUiUO91Xh4aEcW764dHRXOxwJqtw";
      const url = `https://api.tomtom.com/routing/1/calculateRoute/${startPoint}:${endPoint}/json?key=${apiKey}`;
      
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const routePoints = data.routes[0].legs[0].points.map(point => [
            point.longitude,
            point.latitude,
          ]);
          setRoute(routePoints); // Store route coordinates
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    const mapInstance = tt.map({
      key: "PD1XGUiUO91Xh4aEcW764dHRXOxwJqtw",
      container: "map",
      center: [-122.4194, 37.7749], // Default: San Francisco
      zoom: 12,
    });
    setMap(mapInstance);  // Save map instance to state

    // Add click listener to set start and end points
    mapInstance.on("click", handleMapClick);

    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (route && map) {
      // Remove old route layer if exists
      map.eachLayer((layer) => {
        if (layer.id === "route-layer") {
          map.removeLayer(layer);
          map.removeSource(layer.id);
        }
      });

      // Create a GeoJSON layer for the route
      const geojsonRoute = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };

      // Add the new route layer
      map.addLayer({
        id: "route-layer",
        type: "line",
        source: {
          type: "geojson",
          data: geojsonRoute,
        },
        paint: {
          "line-color": "#FF0000", // Red color
          "line-width": 5,
        },
      });
    }
  }, [route, map]);  // Only run this effect when route or map changes

  return (
    <div>
      <div>
        <h3>Route Optimization Map</h3>
        <p>Click on the map to set start and end points</p>
        {start && <p>Start: {start.lat.toFixed(4)}, {start.lng.toFixed(4)}</p>}
        {end && <p>End: {end.lat.toFixed(4)}, {end.lng.toFixed(4)}</p>}
        <button onClick={fetchRoute}>Get Optimized Route</button>
      </div>
      <div id="map" style={{ width: "100%", height: "600px" }}></div>
    </div>
  );
};

export default RouteOptimizationMap;
