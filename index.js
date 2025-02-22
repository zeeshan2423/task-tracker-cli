#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Define the file path for storing tasks
const filePath = path.join(__dirname, './tasks.json');

/**
 * Reads tasks from the JSON file.
 * If the file does not exist, it creates an empty JSON array.
 * @returns {Array} List of tasks
 */
function readTasks() {
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

/**
 * Writes the updated tasks list back to the JSON file.
 * @param {Array} tasks - Updated list of tasks
 */
function writeTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// Extract command-line arguments
const args = process.argv.slice(2);
const command = args[0]; // Command (e.g., add, list, update, etc.)
const input = args.slice(1); // Additional inputs (e.g., task ID, description)

/**
 * Adds a new task to the task list.
 */
if (command === 'add') {
    const tasks = readTasks();
    const newTask = {
        id: tasks.length + 1, // Assigning an ID based on task count
        description: input.join(' '), // Task description
        status: "todo", // Default status when adding a new task
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    writeTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
} 

/**
 * Lists all tasks or filters tasks by status.
 * Usage: 
 * - `task-cli list` (lists all tasks)
 * - `task-cli list done` (lists only completed tasks)
 */
else if (command === 'list') {
    const tasks = readTasks();
    if (input[0]) {
        console.log(tasks.filter(task => task.status === input[0]));
    } else {
        console.log(tasks);
    }
}

/**
 * Updates an existing task's description.
 * Usage: `task-cli update <id> "New task description"`
 */
else if (command === 'update') {
    const tasks = readTasks();
    const task = tasks.find(task => task.id == input[0]);
    if (task) {
        task.description = input.slice(1).join(' '); // Update task description
        task.updatedAt = new Date().toISOString();
        writeTasks(tasks);
        console.log('Task updated successfully');
    } else {
        console.log('Task not found.');
    }
}

/**
 * Marks a task as either "in-progress" or "done".
 * Usage:
 * - `task-cli mark-in-progress <id>`
 * - `task-cli mark-done <id>`
 */
else if (command === 'mark-in-progress' || command === 'mark-done') {
    const tasks = readTasks();
    const task = tasks.find(task => task.id == input[0]);
    if (task) {
        task.status = command === 'mark-in-progress' ? 'in-progress' : 'done';
        task.updatedAt = new Date().toISOString();
        writeTasks(tasks);
        console.log(`Task marked as ${task.status}`);
    } else {
        console.log('Task not found.');
    }
}

/**
 * Deletes a task from the task list.
 * Usage: `task-cli delete <id>`
 */
else if (command === 'delete') {
    const tasks = readTasks();
    const task = tasks.find(task => task.id == input[0]);
    if (task) {
        tasks.splice(tasks.indexOf(task), 1); // Remove task from array
        writeTasks(tasks);
        console.log('Task deleted successfully');
    } else {
        console.log('Task not found.');
    }
} 

/**
 * Displays an error message for unknown commands.
 */
else {
    console.log('Unknown command. Available commands: add, list, update, mark-in-progress, mark-done, or delete');
}
