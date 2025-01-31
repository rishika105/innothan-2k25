import Header from "./components/Header";
import Hero from "./components/Hero";
import KeyFeatures from "./components/KeyFeatures";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="bg-neutral-100 text-neutral-900 font-sans">
      <Header />
      <Hero />
      <KeyFeatures />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default App;