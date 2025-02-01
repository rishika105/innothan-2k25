import { useState } from "react";
import axios from "axios";

const PredictiveAlerts = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    if (!startLocation || !endLocation) {
      setError("Please enter both start and end locations.");
      return;
    }

    try {
      // Call the mock API
      const response = await axios.post("https://679d624487618946e654fc38.mockapi.io/api/v1/:endpoint", {
        start: startLocation,
        end: endLocation,
      });
      setPrediction(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch prediction. Please try again.");
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Predictive Alerts</h1>

      {/* Input Fields */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Start Location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="End Location"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <button
          onClick={handlePredict}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Predict Traffic
        </button>
      </div>

      {/* Display Prediction */}
      {prediction && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Prediction Result</h2>
          <p className="mt-2">
            Traffic Level: <span className="font-bold">{prediction.prediction}</span>
          </p>
          <p className="mt-2">{prediction.message}</p>
        </div>
      )}

      {/* Display Error */}
      {error && (
        <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default PredictiveAlerts;