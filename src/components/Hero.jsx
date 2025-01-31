import traffic from '../assets/traffic.avif'; // Ensure the path is correct

const Hero = () => {
  return (
    <section className="bg-neutral-100 py-20 relative">
      {/* Background Image */}
      <img
        src={traffic} // Use the imported variable
        alt="Urban Mobility"
        className="w-full h-96 object-cover" // Adjust height and object-fit
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto text-center px-6">
          {/* Heading */}
          <h1 className="text-5xl font-bold mb-4 text-black">
            Revolutionizing Urban Mobility with AI-Driven Solutions
          </h1>

          {/* Subheading */}
          <p className="text-black text-xl mb-8">
            Optimize your commute, reduce congestion, and improve air quality with real-time traffic insights.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="space-x-4">
            <a
              href="#"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              Get Started
            </a>
            <a
              href="#"
              className="bg-white text-green-600 px-8 py-3 rounded-lg border border-green-600 hover:bg-green-50 transition-colors duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;