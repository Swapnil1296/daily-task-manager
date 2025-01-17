const { logger } = require("../config/logger");
const taskModels = require("../models/task.models");
const verifyUser = require("../validations/verify-user");

const taskController = {
  addTask: async (req, res) => {
    logger.info("Attempting to add a task");
    try {
      const { title, description, dueDate, priority, tags, subtasks } =
        req.body;
      const { email, userId } = req.user; // Extract user details from the auth token

      // Validate user
      const verifyUserResponse = await verifyUser(email, userId);
      if (verifyUserResponse.status !== 200) {
        logger.warn("User verification failed");
        return res.status(401).json({
          status: 401,
          message: "Unauthorized user",
        });
      }

      // Construct task details
      const taskDetails = {
        title,
        description,
        dueDate,
        priority,
        tags,
        subtasks,
        userId,
      };

      // Add task
      const taskResponse = await taskModels.addTask(taskDetails);

      switch (taskResponse.status) {
        case 200:
          logger.info("Task added successfully");
          return res.status(201).json({
            status: 201,
            message: "Task added successfully",
            taskId: taskResponse.taskId,
          });

        case 409:
          logger.warn(
            `Conflict: A task with the title "${title}" already exists for today`
          );
          return res.status(409).json({
            status: 409,
            message: `A task with the title "${title}" already exists for today`,
          });

        default:
          logger.error("Unexpected error while adding task");
          return res.status(500).json({
            status: 500,
            message: "Internal server error. Please try again later.",
          });
      }
    } catch (error) {
      logger.error(`Error adding task: ${error.message}`);
      return res.status(500).json({
        status: 500,
        message: "Internal server error. Please try again later.",
      });
    }
  },
  getTaskByUser: async (req, res) => {
    logger.info("attempting to fetch task");
    try {
      const { email, userId } = req.user;

      // Verify the user
      const verifyUserResponse = await verifyUser(email, userId);
      if (verifyUserResponse.status !== 200) {
        logger.warn("User verification failed");
        return res.status(401).json({
          status: 401,
          message: "Unauthorized user",
        });
      }

      // Fetch tasks for the user
      const { status, message, tasks } = await taskModels.getTaskByUser(userId);

      // Send appropriate response based on the model result
      if (status === 200) {
        logger.info("Tasks fetched successfully");
        return res.status(200).json({
          status,
          message,
          tasks,
        });
      }

      logger.error("Error fetching tasks: " + message);
      return res.status(status).json({
        status,
        message,
      });
    } catch (error) {
      logger.error(`Unexpected error fetching tasks: ${error.message}`);
      return res.status(500).json({
        status: 500,
        message: "Internal server error. Please try again later.",
      });
    }
  },

  updateTask: async (req, res) => {
    logger.info("attempting to update task");
    try {
      const { title, description, dueDate, priority, tags, subtasks } =
        req.body;
      const { taskId } = req.params;

      if (!taskId) {
        logger.warn("missing task id");
        return res.status(401).json({
          status: 401,
          message: "task id is required",
        });
      }
      const { userId, email } = req.user;
      const verifyUserResponse = await verifyUser(email, userId);
      if (verifyUserResponse.status !== 200) {
        logger.warn("User verification failed");
        return res.status(401).json({
          status: 401,
          message: "Unauthorized user",
        });
      }
      let tasktoupdate = {
        title,
        description,
        dueDate,
        priority,
        tags,
        subtasks,
      };
      const { status, message } = await taskModels.updateTask(
        userId,
        taskId,
        tasktoupdate
      );

      if (status === 200) {
        logger.info("Tasks fetched successfully");
        return res.status(200).json({
          status,
          message,
        });
      }

      logger.error("Error fetching tasks: " + message);
      return res.status(status).json({
        status,
        message,
      });
    } catch (error) {
      logger.warn(`Unexpected erro updating tasks:${error.message}`);
      return res.status(500).json({
        status: 500,
        message: "Internal server error. Please try again later.",
      });
    }
  },
};

module.exports = taskController;
