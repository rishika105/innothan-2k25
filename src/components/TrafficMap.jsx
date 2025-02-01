import { useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import Header from "./Header";

const TrafficMap = () => {
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

    return () => map.remove();
  }, []);

  return (
    <>
      <Header/>
      <div className="mx-auto w-[100vw] h-[100vh]">
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </div>
    </>
  );
};

export default TrafficMap;
