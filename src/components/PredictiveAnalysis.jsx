import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Header from "./Header";
import Footer from "./Footer";

const PredictiveAnalysis = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  // Mock data for the pie chart
  const pieData = [
    { name: "Low Congestion", value: 40 },
    { name: "Medium Congestion", value: 35 },
    { name: "High Congestion", value: 25 },
  ];

  // Colors for the pie chart
  const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

  // Handle prediction (mock implementation)
  const handlePredict = () => {
    if (!startLocation || !endLocation) {
      setError("Please enter both start and end locations.");
      return;
    }

    // Simulate a prediction
    setPrediction({
      level: "High",
      message: "Heavy traffic expected on this route.",
    });
    setError("");
  };

  return (
    <>
      <Header />
      <section className="bg-neutral-100 py-12">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Predictive Traffic Analysis
            </h1>
            <p className="text-neutral-600 text-lg">
              Get real-time traffic predictions and optimize your commute.
            </p>
          </div>

          {/* Input Fields */}
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Start Location (e.g., Chennai)"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="w-full p-3 border border-neutral-400 rounded-lg focus:outline-none focus:border-green-500 text-neutral-700 bg-slate-200"
              />
              <input
                type="text"
                placeholder="End Location (e.g., Bhubaneswar)"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                className="w-full p-3 border border-neutral-400  rounded-lg focus:outline-none focus:border-green-500 text-neutral-700 bg-slate-200"
              />
              <button
                onClick={handlePredict}
                className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Predict Traffic
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 mt-4 text-center">{error}</p>
            )}

            {/* Prediction Results */}
            {prediction && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Prediction Result
                </h2>
                <p className="text-neutral-700">
                  Traffic Level:{" "}
                  <span className="font-bold">{prediction.level}</span>
                </p>
                <p className="text-neutral-700 mt-2">{prediction.message}</p>

                {/* Pie Chart */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">
                    Traffic Distribution
                  </h3>
                  <PieChart width={400} height={300}>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </div>

                {/* Map (Placeholder) */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">
                    Route Map
                  </h3>
                  <div className="bg-neutral-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-neutral-600">Map will be displayed here.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PredictiveAnalysis;