
import Hero from "../components/Hero";
import KeyFeatures from "../components/KeyFeatures";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="overflow-y-hidden">
      
      <Hero />
      <KeyFeatures />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;