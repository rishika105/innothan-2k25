const Testimonials = () => {
    const testimonials = [
      {
        quote: "This system has made my daily commute so much easier. I save at least 20 minutes every day!",
        name: "John Doe",
        role: "Commuter",
        image: "https://via.placeholder.com/100", // Placeholder image URL
      },
      {
        quote: "The predictive alerts have helped us manage traffic congestion more effectively.",
        name: "Jane Smith",
        role: "City Planner",
        image: "https://via.placeholder.com/100", // Placeholder image URL
      },
      {
        quote: "The route optimization feature is a game-changer for our logistics team.",
        name: "Mike Johnson",
        role: "Logistics Manager",
        image: "https://via.placeholder.com/100", // Placeholder image URL
      },
      {
        quote: "I love how easy it is to plan my commute with this system.",
        name: "Sarah Lee",
        role: "Daily Commuter",
        image: "https://via.placeholder.com/100", // Placeholder image URL
      },
    ];
  
    return (
      <section className="py-20 bg-neutral-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Testimonial Image */}
                <div className="flex justify-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-green-500"
                  />
                </div>
  
                {/* Testimonial Quote */}
                <p className="text-neutral-600 italic text-center">
                  &quot;{testimonial.quote}&quot;
                </p>
  
                {/* Testimonial Author */}
                <div className="mt-6 text-center">
                  <p className="text-neutral-900 font-bold">{testimonial.name}</p>
                  <p className="text-neutral-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Testimonials;