import { motion } from "framer-motion";

const AskAITab = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <motion.div
        className="w-2/3 p-6 bg-white rounded-lg shadow-xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Ask AI
        </h1>

        {/* Input Section */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-700">
            What do you want to ask?
          </label>
          <input
            type="text"
            placeholder="Type your question here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
          />
          <button className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 shadow-md">
            Submit
          </button>
        </div>

        {/* Answer Section */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-700">Answer:</h2>
          <motion.div
            className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-inner"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-800">
              The AI-generated answer will be displayed here.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AskAITab;
