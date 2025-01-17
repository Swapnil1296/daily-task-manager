const db = require("../config/database");
const { logger } = require("../config/logger");
const {
  validateTaskFields,
  insertTask,
  insertSubtasks,
  insertTags,
  checkDuplicateTask,
} = require("../helper/helper");

const taskModels = {
  addTask: async (task) => {
    try {
      // Destructure the task object
      const { title, description, dueDate, priority, tags, subtasks, userId } =
        task;

      // Validate required fields
      const missingFields = validateTaskFields({
        title,
        description,
        dueDate,
        priority,
        userId,
      });
      if (missingFields.length > 0) {
        return {
          status: 400,
          message: `Missing required fields: ${missingFields.join(", ")}.`,
        };
      }

      // Check if a task with the same title already exists for today
      const existingTask = await checkDuplicateTask({ title, userId, dueDate });
      if (existingTask) {
        return {
          status: 409,
          message: `A task with the title "${title}" already exists for today.`,
        };
      }

      // Insert the main task into the database
      const query = `
            INSERT INTO tasks (
              user_id, 
              title, 
              description, 
              due_date, 
              priority, 
              tags, 
              subtasks
            ) VALUES (
              $1, $2, $3, $4, $5, $6, $7
            ) RETURNING task_id;
          `;
      const values = [
        userId,
        title,
        description,
        dueDate,
        priority,
        tags,
        subtasks,
      ];

      const taskResult = await db.query(query, values); // Assuming `db.query` is the method to interact with your database
      const taskId = taskResult.rows[0]?.task_id;

      return {
        status: 200,
        message: "Task added successfully.",
        taskId,
      };
    } catch (error) {
      logger.error(`Error adding task: ${error?.message}`);
      console.error("Error message:", error.message);
      return {
        status: 500,
        message:
          "An error occurred while adding the task. Please try again later.",
      };
    }
  },

  getTaskByUser: async (userId) => {
    try {
      // Validate the input
      if (!userId) {
        return {
          status: 400,
          message: "User ID is required to fetch tasks.",
        };
      }

      // Query to fetch tasks, subtasks, and tags
      const query = `SELECT * FROM tasks WHERE user_id=$1`;

      const fetchedTasks = await db.query(query, [userId]);

      // Handle cases when tasks are found or not
      if (fetchedTasks.rowCount > 0) {
        return {
          status: 200,
          message: "Tasks fetched successfully.",
          tasks: fetchedTasks.rows,
        };
      }

      return {
        status: 404,
        message: "No tasks found for the user.",
      };
    } catch (error) {
      logger.error(`Error fetching tasks: ${error.message}`);
      return {
        status: 500,
        message:
          "An unexpected error occurred while fetching tasks. Please try again later.",
      };
    }
  },
  updateTask: async (userId, taskId, updatedFields) => {
    try {
      // Validate required parameters
      if (!userId || !taskId) {
        return {
          status: 400,
          message: "User ID and Task ID are required to update a task.",
        };
      }

      // Destructure the fields to update
      const { title, description, dueDate, priority, tags, subtasks } =
        updatedFields;

      // Construct dynamic SET clause for the query
      const setClause = [];
      const values = [];
      let index = 1;

      if (title) {
        setClause.push(`title = $${index++}`);
        values.push(title);
      }
      if (description) {
        setClause.push(`description = $${index++}`);
        values.push(description);
      }
      if (dueDate) {
        setClause.push(`due_date = $${index++}`);
        values.push(dueDate);
      }
      if (priority) {
        setClause.push(`priority = $${index++}`);
        values.push(priority);
      }
      if (tags) {
        setClause.push(`tags = $${index++}`);
        values.push(tags);
      }
      if (subtasks) {
        setClause.push(`subtasks = $${index++}`);
        values.push(subtasks);
      }

      // If no fields to update, return early
      if (setClause.length === 0) {
        return {
          status: 400,
          message: "No valid fields provided for update.",
        };
      }

      // Add userId and taskId to the values array
      values.push(userId, taskId);

      // Prepare the SQL query
      const query = `
        UPDATE tasks
        SET ${setClause.join(", ")}, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $${index++} AND task_id = $${index}
        RETURNING task_id;
      `;

      // Execute the query
      const result = await db.query(query, values);

      // Check if the task was updated
      if (result.rowCount === 0) {
        return {
          status: 404,
          message: "Task not found or no changes made.",
        };
      }

      return {
        status: 200,
        message: "Task updated successfully.",
        taskId: result.rows[0]?.task_id,
      };
    } catch (error) {
      logger.error(`Error updating task: ${error?.message}`);
      console.error("Error message:", error.message);
      return {
        status: 500,
        message:
          "An error occurred while updating the task. Please try again later.",
      };
    }
  },
};

module.exports = taskModels;
