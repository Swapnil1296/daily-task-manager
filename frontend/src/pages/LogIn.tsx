import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-300 via-blue-300 to-indigo-300">
      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200 focus:border-green-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-green-200 focus:border-green-400"
            />
          </div>

          {/* Login Button */}
          <button className="w-full py-3 text-white bg-green-500 rounded-md hover:bg-green-600 shadow-md">
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="#" className="text-green-500 hover:underline">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
