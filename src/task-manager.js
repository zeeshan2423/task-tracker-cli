const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../tasks.json');

/**
 * Reads tasks from the JSON file.
 * If the file does not exist, it creates an empty JSON array.
 */
function readTasks() {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

/**
 * Writes the updated tasks list back to the JSON file.
 */
function writeTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

/**
 * Adds a new task to the task list.
 */
function addTask(description) {
    const tasks = readTasks();
    const newTask = {
        id: tasks.length + 1,
        description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    writeTasks(tasks);
    return newTask;
}

/**
 * Lists all tasks or filters tasks by status.
 */
function listTasks(filter) {
    const tasks = readTasks();
    return filter ? tasks.filter(task => task.status === filter) : tasks;
}

/**
 * Updates a task description.
 */
function updateTask(id, newDescription) {
    const tasks = readTasks();
    const task = tasks.find(task => task.id == id);
    if (!task) return null;
    task.description = newDescription;
    task.updatedAt = new Date().toISOString();
    writeTasks(tasks);
    return task;
}

/**
 * Marks a task as "in-progress" or "done".
 */
function markTask(id, status) {
    const tasks = readTasks();
    const task = tasks.find(task => task.id == id);
    if (!task) return null;
    task.status = status;
    task.updatedAt = new Date().toISOString();
    writeTasks(tasks);
    return task;
}

/**
 * Deletes a task from the task list.
 */
function deleteTask(id) {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(task => task.id == id);
    if (taskIndex === -1) return false;
    tasks.splice(taskIndex, 1);
    writeTasks(tasks);
    return true;
}

module.exports = { addTask, listTasks, updateTask, markTask, deleteTask, writeTasks, readTasks };
