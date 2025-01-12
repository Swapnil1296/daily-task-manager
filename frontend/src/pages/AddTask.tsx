import { motion } from "framer-motion";

const AddTask = () => {
  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-2/3 p-8 bg-white rounded-lg shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-6 text-center"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Add New Task
        </motion.h2>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              placeholder="Enter task title"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 bg-gray-100 shadow-sm"
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter task description"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 bg-gray-100 shadow-sm"
            ></textarea>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 bg-gray-100 shadow-sm"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="text"
                placeholder="Add a tag"
                className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
              />
              <motion.span
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium shadow"
                whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Example Tag
              </motion.span>
            </div>
          </div>

          {/* Subtasks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtasks
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter a subtask"
                  className="flex-1 px-4 py-3 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500 shadow-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow hover:bg-red-600"
                >
                  Remove
                </motion.button>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mt-3 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md shadow hover:bg-green-600"
            >
              Add Subtask
            </motion.button>
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <button className="w-full px-4 py-3 text-white bg-blue-500 rounded-md shadow-lg hover:bg-blue-600">
              Add Task
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AddTask;
