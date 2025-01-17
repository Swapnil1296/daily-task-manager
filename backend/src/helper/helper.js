const db = require("../config/database");

// Helper function to validate required fields
function validateTaskFields({ title, description, dueDate, priority, userId }) {
  const missingFields = [];
  if (!title) missingFields.push("title");
  if (!description) missingFields.push("description");
  if (!dueDate) missingFields.push("dueDate");
  if (!priority) missingFields.push("priority");
  if (!userId) missingFields.push("userId");
  return missingFields;
}

// Helper function to check for duplicate tasks
async function checkDuplicateTask({ title, userId, dueDate }) {
  const result = await db.query(
    `SELECT task_id FROM tasks
         WHERE title = $1 AND user_id = $2 AND due_date::date = $3::date`,
    [title, userId, dueDate]
  );
  return result.rowCount > 0 ? result.rows[0] : null;
}

// Helper function to insert the main task
async function insertTask({ title, description, dueDate, priority, userId }) {
  const result = await db.query(
    `INSERT INTO tasks (title, description, due_date, priority, user_id)
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [title, description, dueDate, priority, userId]
  );
  return result.rowCount > 0 ? result.rows[0] : null;
}

// Helper function to insert subtasks
async function insertSubtasks(subtasks, taskId, userId) {
  const subtaskPromises = subtasks.map((subtask) =>
    db.query(
      `INSERT INTO subtasks (title, task_id, user_id)
             VALUES ($1, $2, $3) RETURNING id`,
      [subtask, taskId, userId]
    )
  );

  const results = await Promise.all(subtaskPromises);
  results.forEach((result, index) => {
    console.log(`Subtask ${index + 1} added with ID: ${result.rows[0].id}`);
  });
}

// Helper function to insert tags and associate them with the task
async function insertTags(tags, taskId, userId) {
  const tagPromises = tags.map((tag) =>
    db.query(`INSERT INTO tags (name, user_id) VALUES ($1, $2) RETURNING id`, [
      tag,
      userId,
    ])
  );

  const tagResults = await Promise.all(tagPromises);
  for (const [index, result] of tagResults.entries()) {
    console.log(`Tag ${index + 1} added with ID: ${result.rows[0].id}`);

    if (result.rowCount > 0) {
      const tagId = result.rows[0].id;
      const taskTagResult = await db.query(
        `INSERT INTO task_tags (task_id, tag_id) VALUES ($1, $2)`,
        [taskId, tagId]
      );
      if (taskTagResult.rowCount > 0) {
        console.log(
          `Task-Tag relationship added with ID: ${taskTagResult.rows[0]}`
        );
      }
    }
  }
}

module.exports = {
  validateTaskFields,
  insertTags,
  insertSubtasks,
  insertTask,
  checkDuplicateTask,
};
