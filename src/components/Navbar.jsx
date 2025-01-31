const Navbar = () => {
  return (
    <>
      <div className="flex justify-center items-center space-x-4">
        <a href="/traffic" className="text-white ">
          Traffic Map
        </a>

        <a href="/route-optimization" className="text-white">
          Route Optimization Map
        </a>
      </div>
    </>
  );
};

export default Navbar;
