import React from "react";
import { motion } from "framer-motion";

const LoggedOutHome: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-400 to-blue-500 text-white">
      {/* Welcome Message */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Your Productivity Hub! 🚀
        </h1>
        <p className="text-lg font-medium">
          Take control of your tasks, notes, and goals in one place.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 w-11/12 max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Feature 1 */}
        <motion.div
          className="p-6 bg-white text-green-500 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3 className="text-xl font-bold mb-2">📋 Organize Notes</h3>
          <p className="text-sm">
            Easily create and manage notes for meetings, projects, and personal
            goals.
          </p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          className="p-6 bg-white text-green-500 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3 className="text-xl font-bold mb-2">✅ Track Tasks</h3>
          <p className="text-sm">
            Stay on top of deadlines with your personalized task manager.
          </p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          className="p-6 bg-white text-green-500 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3 className="text-xl font-bold mb-2">💬 AI-Powered Chat</h3>
          <p className="text-sm">
            Get insights, advice, and assistance through our AI-powered
            features.
          </p>
        </motion.div>
      </motion.div>

      {/* Call-to-Action Section */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <button className="px-8 py-4 bg-white text-green-500 font-semibold rounded-full shadow-lg hover:bg-green-100 transition-all duration-300">
          Create an Account Now 🚀
        </button>
      </motion.div>

      {/* Motivational Footer */}
      <motion.div
        className="absolute bottom-10 text-center text-sm font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <p>
          Still wondering why? Join the thousands of users taking charge of
          their productivity! 💡
        </p>
        <p>
          Don’t have an account?{" "}
          <a href="/signup" className="underline">
            Sign up
          </a>{" "}
          today!
        </p>
      </motion.div>
    </div>
  );
};

export default LoggedOutHome;
