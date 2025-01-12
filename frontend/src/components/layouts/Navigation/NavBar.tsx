import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import prohub from "../../../assets/images/prohub.webp";

const Navbar = () => {
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
              className="h-10 w-auto object-contain rounded-lg" // Ensure proper sizing and responsiveness
            />
          </motion.div>
        </Link>

        {/* Menu Button (Mobile View) */}
        <div className="lg:hidden">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-white"
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white text-lg"
          >
            <Link to="/add-task">Add Task</Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white text-lg"
          >
            <Link to="/ask-ai">Ask AI</Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white text-lg"
          >
            <Link to="/buy-me-coffee">Buy Me A Coffee</Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white text-lg"
          >
            <Link to="/sign-in">Sign In</Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white text-lg"
          >
            <Link to="/log-in">Login</Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
