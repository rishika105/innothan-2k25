import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Car = ({ onTrafficJam }) => {
  const [isDriving, setIsDriving] = useState(true);

  useEffect(() => {
    // Simulate a traffic jam after 3 seconds
    const trafficJamTimeout = setTimeout(() => {
      setIsDriving(false);
      onTrafficJam();
    }, 3000);

    return () => clearTimeout(trafficJamTimeout);
  }, [onTrafficJam]);

  return (
    <motion.div
      className="w-12 h-8 bg-blue-500 absolute bottom-4"
      animate={{
        x: isDriving ? "100vw" : "50vw", // Drive to the end of the screen or stop midway
      }}
      transition={{
        duration: 5,
        ease: "linear",
        repeat: isDriving ? Infinity : 0, // Repeat animation if driving
      }}
    />
  );
};
Car.propTypes = {
  onTrafficJam: PropTypes.func.isRequired,
};

export default Car;
