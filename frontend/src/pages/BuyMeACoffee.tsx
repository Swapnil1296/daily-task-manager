import { motion } from "framer-motion";

const BuyMeACoffee = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-200 via-orange-300 to-red-300">
      <motion.div
        className="w-full mt-20 max-w-md p-6 bg-white rounded-lg shadow-lg"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-yellow-700 mb-6">
          ☕ Buy Me a Coffee
        </h2>

        {/* Coffee Image */}
        <div className="flex justify-center mb-6">
          <img
            src="https://img.icons8.com/color/96/coffee-to-go.png"
            alt="Coffee"
            className="w-24 h-24"
          />
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Choose Amount
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-yellow-200 focus:border-yellow-400 bg-yellow-100"
            >
              <option value="5">$5 - Small Coffee</option>
              <option value="10">$10 - Medium Coffee</option>
              <option value="15">$15 - Large Coffee</option>
              <option value="custom">Custom Amount</option>
            </select>
          </div>

          {/* Custom Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Custom Amount (Optional)
            </label>
            <input
              type="number"
              placeholder="Enter amount in USD"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-yellow-200 focus:border-yellow-400"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Add a Message (Optional)
            </label>
            <textarea
              placeholder="Write a short note"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-yellow-200 focus:border-yellow-400"
            ></textarea>
          </div>

          {/* Payment Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 shadow-md"
          >
            Proceed to Payment
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default BuyMeACoffee;
