import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="text-xl font-bold text-green-600">MapApp</div>

        {/* Hamburger Menu Button (Mobile Only) */}
        <button
          className="md:hidden focus:outline-none text-green-600"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:space-x-6 absolute md:static bg-white w-full md:w-auto left-0 mt-4 md:mt-0 p-4 md:p-0 shadow-md md:shadow-none`}
        >
          <a
            href="#"
            className="block md:inline text-green-600 hover:text-green-800"
          >
            Home
          </a>
          <a
            href="/dashboard"
            className="block md:inline text-green-600 hover:text-green-800"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block md:inline text-green-600 hover:text-green-800"
          >
            Route Planner
          </a>
          <a
            href="/predictiveAlerts"
            className="block md:inline text-green-600 hover:text-green-800"
          >
            Predictive Alerts
          </a>
          <a
            href="/traffic"
            className="block md:inline text-green-600 hover:text-green-800"
          >
            Traffic Map
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;