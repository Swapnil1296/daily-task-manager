import { motion } from "framer-motion";

const TakeNotes = () => {
  return (
    <motion.div
      className="max-w-xl mx-auto p-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Take a Note</h2>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileFocus={{ scale: 1.02 }}
        className="space-y-4 bg-white p-4 rounded-md shadow-md"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter note title"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-400"
          />
        </div>

        {/* Note Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Note</label>
          <textarea
            placeholder="Write your note here..."
            rows="6"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-400"
          ></textarea>
        </div>

        {/* Tag Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <div className="flex items-center flex-wrap gap-2 mt-1">
            <input
              type="text"
              placeholder="Add a tag"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-400"
            />
            <motion.span
              className="px-3 py-1 text-sm text-white bg-indigo-500 rounded-full"
              whileHover={{ scale: 1.1, backgroundColor: "#4F46E5" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Example Tag
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#4C1D95" }}
        className="w-full mt-6 px-4 py-2 text-white bg-purple-700 rounded-md shadow-lg hover:bg-purple-800 focus:outline-none"
      >
        Save Note
      </motion.button>
    </motion.div>
  );
};

export default TakeNotes;
