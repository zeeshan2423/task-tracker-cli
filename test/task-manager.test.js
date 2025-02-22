const test = require('node:test');
const assert = require('node:assert');
const { addTask, listTasks, updateTask, markTask, deleteTask, writeTasks } = require('../src/task-manager.js');

// Helper function to reset tasks before each test
function resetTasks() {
    writeTasks([]);
}

test('should add a new task', () => {
    resetTasks();
    const task = addTask('Test adding a task');
    assert.strictEqual(task.id, 1);
    assert.strictEqual(task.description, 'Test adding a task');
    assert.strictEqual(task.status, 'todo');
});

test('should list all tasks', () => {
    resetTasks();
    addTask('Task 1');
    addTask('Task 2');
    const tasks = listTasks();
    assert.strictEqual(tasks.length, 2);
    assert.strictEqual(tasks[0].description, 'Task 1');
    assert.strictEqual(tasks[1].description, 'Task 2');
});

test('should update a task description', () => {
    resetTasks();
    addTask('Original Task');
    const updatedTask = updateTask(1, 'Updated Task');
    assert.notStrictEqual(updatedTask, null);
    assert.strictEqual(updatedTask.description, 'Updated Task');
});

test('should mark a task as in-progress', () => {
    resetTasks();
    addTask('Task to mark');
    const task = markTask(1, 'in-progress');
    assert.notStrictEqual(task, null);
    assert.strictEqual(task.status, 'in-progress');
});

test('should mark a task as done', () => {
    resetTasks();
    addTask('Task to complete');
    const task = markTask(1, 'done');
    assert.notStrictEqual(task, null);
    assert.strictEqual(task.status, 'done');
});

test('should delete a task', () => {
    resetTasks();
    addTask('Task to delete');
    const deleted = deleteTask(1);
    assert.strictEqual(deleted, true);
    assert.strictEqual(listTasks().length, 0);
});

test('should return null if updating a non-existent task', () => {
    resetTasks();
    const result = updateTask(99, 'Does not exist');
    assert.strictEqual(result, null);
});

test('should return false if deleting a non-existent task', () => {
    resetTasks();
    const result = deleteTask(99);
    assert.strictEqual(result, false);
});
