const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './tasks.json');

function readTasks(){
    if(!fs.existsSync(filePath)) fs.writeFileSync(filePath,"[]");
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeTasks(tasks){
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

const args = process.argv.slice(2);
const command = args[0];
const input = args.slice(1);

if(command === 'add'){
    const tasks = readTasks();
    const newTask = {
        id: tasks.length + 1,
        description: input.join(' '),
        status:"todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
    tasks.push(newTask);
    writeTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
} else if(command === 'list'){
    const tasks = readTasks();
    if(input[0]){
        console.log(tasks.filter(task => task.status === input[0]));
    } else {
        console.log(tasks);
    }
} else if(command === 'update'){
    const tasks = readTasks();
    const task = tasks.find(task => task.id == input[0]);
    if(task){
        task.description = input.slice(1).join(' ');
        task.updatedAt = new Date().toISOString();
        writeTasks(tasks);
        console.log('Task updated successfully');
    } else {
        console.log('Task not found.');
    }
} else if(command === 'mark-in-progress' || command === 'mark-done'){
    const tasks = readTasks();
    const task = tasks.find(task => task.id == input[0]);
    if(task){
        task.status = command ==='mark-in-progress'? 'in-progress' : 'done';
        task.updatedAt = new Date().toISOString();
        writeTasks(tasks);
        console.log(`Task marked as ${task.status}`);
    } else {
        console.log('Task not found.');
    }
} else if(command === 'delete'){
    const tasks = readTasks();
    const task = tasks.find(task => task.id == input[0]);
    if(task){
        tasks.splice(tasks.indexOf(task), 1);
        writeTasks(tasks);
        console.log('Task deleted successfully');
    } else {
        console.log('Task not found.');
    }
} else {
    console.log('Unknown command. Available commands: add, list, update, mark-in-progress, mark-done or delete');
    
}