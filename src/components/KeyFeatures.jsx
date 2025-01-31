import solutionAd from "../assets/solution-ad.png";
import solutionFleet from "../assets/solution-fleet-management.webp";
import solutionPredictive from "../assets/solution-public-sector.jpeg";
const KeyFeatures = () => {
  const features = [
    {
      icon: <img src={solutionAd} alt="product" className="w-45 h-60 mx-auto" />,
      title: "Real-Time Traffic Visualization",
      description: "View live traffic conditions and congestion hotspots on an interactive map.",
    },
    {
      icon: <img src={solutionFleet} alt="product" className="w-45 h-60 mx-auto" />,
      title: "Route Optimization",
      description: "Find the fastest or shortest route based on real-time traffic data.",
    },
    {
      icon:<img src={solutionPredictive} alt="product" className="w-45 h-60 mx-auto" />,
      title: "Predictive Alerts",
      description: "Receive alerts for predicted traffic congestion and plan your commute accordingly.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="icon mx-auto">{feature.icon}</div>
              <h3 className="text-xl font-bold mt-4">{feature.title}</h3>
              <p className="text-neutral-500 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;