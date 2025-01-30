
const Navbar = () => {
    return (
        <nav className="bg-blue-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">FinTech</div>
                <ul className="flex space-x-4">
                    <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
                    <li><a href="#" className="text-white hover:text-gray-300">About</a></li>
                    <li><a href="#" className="text-white hover:text-gray-300">Services</a></li>
                    <li><a href="#" className="text-white hover:text-gray-300">Contact</a></li>
                </ul>
                <div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Login</button>
                    <button className="bg-white text-blue-900 px-4 py-2 rounded ml-2 hover:bg-gray-200">Sign Up</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;