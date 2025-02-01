import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Header from "./Header";
import Footer from "./Footer";
import map from "../assets/map.gif";

// Sample data for the charts
const trafficData = [
  { day: "Mon", traffic: 4000 },
  { day: "Tue", traffic: 3000 },
  { day: "Wed", traffic: 2000 },
  { day: "Thu", traffic: 2780 },
  { day: "Fri", traffic: 1890 },
  { day: "Sat", traffic: 2390 },
  { day: "Sun", traffic: 3490 },
];

// Pie Chart data
const pieData = [
  { name: "Low Congestion", value: 40 }, // 40% low congestion
  { name: "Medium Congestion", value: 35 }, // 35% medium congestion
  { name: "High Congestion", value: 25 }, // 25% high congestion
];

// Colors for the pie chart
const COLORS = ["#10B981", "#F59E0B", "#EF4444"];

function CentralizedDashboard() {
  return (
    <div className="bg-neutral-100 min-h-screen flex flex-col w-[100vw]">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 p-6 mb-24">
        <h1 className="text-2xl font-bold text-neutral-900 mb-6 ml-3">
          Centralized Traffic Dashboard
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Real-Time Traffic Map */}
          <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Real-Time Traffic Map
            </h2>
            <div className="h-96 w-[100%]">
              <img
                src={map}
                alt="Traffic Map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
              Key Metrics
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-neutral-700">
                  Traffic Density: <span className="font-bold">High</span>
                </p>
              </div>
              <div>
                <p className="text-neutral-700">
                  Average Speed: <span className="font-bold">20 km/h</span>
                </p>
              </div>
              <div>
                <p className="text-neutral-700">
                  Predicted Congestion:{" "}
                  <span className="font-bold">Medium</span>
                </p>
              </div>
              <div>
                <p className="text-neutral-700">
                  Fuel Consumption: <span className="font-bold">50 L/hr</span>
                </p>
              </div>
              <div>
                <p className="text-neutral-700">
                  Emissions: <span className="font-bold">120 g/km</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-6 mx-auto justify-center items-center ml-9"> 
            {/* Pie Chart */}
            <div className="mt-9">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Traffic Distribution
              </h3>
              <PieChart width={300} height={400}>
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

            {/* Historical Data Trends */}
            <div className="col-span-3 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Historical Traffic Trends
              </h2>
              <div className="h-64">
                <LineChart width={800} height={300} data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="traffic" stroke="#2563EB" />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default CentralizedDashboard;
