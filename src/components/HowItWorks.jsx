import productAdas from "../assets/product-adas.png"; // Ensure this path is correct
import productNavsdk from "../assets/product-navsdk.avif"; // Ensure this path is correct
import productTraffic from "../assets/product-traffic.jpeg"; // Ensure this path is correct

const HowItWorks = () => {
const steps = [
    {
        icon: <img src={productAdas} alt="product" className="w-45 h-60 mx-auto" />,
        title: "Enter Your Route",
        description: "Input your start and end points to get started.",
    },
    {
        icon: <img src={productNavsdk} alt="productnav" className="w-45 h-60 mx-auto" />,
        title: "Get Real-Time Insights",
        description: "View live traffic data and optimized routes on the map.",
    },
    {
        icon: <img src={productTraffic} alt="traffic" className="w-45 h-60 mx-auto" />,
        title: "Plan Your Commute",
        description: "Use predictive alerts to avoid traffic and save time.",
    },
];

  return (
    <section className="bg-neutral-200 py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="icon mx-auto">{step.icon}</div>
              <h3 className="text-xl font-bold mt-4">{step.title}</h3>
              <p className="text-neutral-500 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;