import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import prohub from "../../../assets/images/prohub.webp";
import { useId, useState } from "react";

// Define a default avatar image URL
const defaultAvatar = "https://via.placeholder.com/40";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const textId = useId();

  const userName = sessionStorage.getItem('userName') || 'Guest';
  const userImage = sessionStorage.getItem('userImage') || defaultAvatar;
  const getToken = sessionStorage.getItem('accessToken');

  const navItems = [
    { id: textId, name: "Add Task", link: "/add-task" },
    { id: textId, name: "Take Notes", link: "/take-notes" },
    { id: textId, name: "Ask AI", link: "/ask-ai" },
    // { id: textId, name: "Sign Up", link: "/sign-up" }
  ];

  // Handle menu toggle for mobile view
  const handleMenuToggle = () => {
    setMenuOpen(prevState => !prevState);
  };


  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userImage');
    window.location.href = '/log-in';
  };

  return (
    <nav className="bg-gradient-to-r from-yellow-500 to-orange-500 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={prohub}
              alt="pro-hub-svg"
              className="h-10 w-auto object-contain rounded-lg"
            />
          </motion.div>
        </Link>

        {/* Menu Button (Mobile View) */}
        <div className="lg:hidden">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-white"
            onClick={handleMenuToggle} // Toggle the menu on button click
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          {navItems.map((item) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white text-lg"
              key={item.id}
            >
              <Link to={item.link}>{item.name}</Link>
            </motion.div>
          ))}

          {/* Conditionally render Log In or Log Out based on token */}
          {getToken ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white text-lg cursor-pointer"
              onClick={handleLogout} // Call handleLogout on click
            >
              <span> Log Out</span>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white text-lg"
            >
              <Link to="/log-in">Log In</Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu (Conditional rendering based on menuOpen state) */}
        <div
          className={`lg:hidden absolute top-16 left-0 w-full bg-gradient-to-r from-yellow-500 to-orange-500 shadow-md ${menuOpen ? 'block' : 'hidden'}`}
        >
          <div className="flex flex-col items-center space-y-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="text-white text-lg"
                onClick={() => setMenuOpen(false)} // Close the menu after an item is clicked
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Log In / Log Out */}
            {getToken ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white text-lg"
                onClick={handleLogout}
              >
                Log Out
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white text-lg"
              >
                <Link to="/log-in">Log In</Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="hidden lg:flex items-center space-x-4">
          <span className="text-white text-lg">{userName}</span>
          <img
            src={userImage}
            alt="User Avatar"
            className="h-10 w-10 rounded-full border-2 border-white"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
