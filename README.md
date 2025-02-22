---

# **Task Tracker CLI** 📝

A simple **command-line tool** built with **Node.js** to manage your tasks efficiently.  
Easily **add, update, delete, and track tasks** using a JSON-based storage system.

🔗 **Project URL:** [Task Tracker Project on Roadmap.sh](https://roadmap.sh/projects/task-tracker)

## **Features** 🚀

✅ Add, update, and delete tasks  
✅ Mark tasks as **to-do, in-progress, or done**  
✅ List all tasks or filter by status  
✅ Persistent storage using JSON  
✅ No external dependencies—only built-in Node.js modules  
✅ **Automated testing** using Node.js built-in test framework (`node:test`)

---

## **Installation** 🛠️

### **1️⃣ Clone the repository**

```sh
git clone https://github.com/zeeshan2423/task-tracker-cli.git
cd task-tracker-cli
```

### **2️⃣ Install Node.js (if not installed)**

Download and install **Node.js** from [nodejs.org](https://nodejs.org/).

### **3️⃣ Initialize the CLI**

Run the following command to set up the CLI globally:

```sh
npm link
```

Now you can use `task-cli` as a command-line tool! 🎉

---

## **Usage** 🖥️

### **Add a Task**

```sh
task-cli add "Buy groceries"
```

📌 **Output:** `Task added successfully (ID: 1)`

---

### **List All Tasks**

```sh
task-cli list
```

### **List Tasks by Status**

```sh
task-cli list done
task-cli list todo
task-cli list in-progress
```

---

### **Update a Task**

```sh
task-cli update 1 "Buy groceries and cook dinner"
```

---

### **Mark a Task as In Progress**

```sh
task-cli mark-in-progress 1
```

### **Mark a Task as Done**

```sh
task-cli mark-done 1
```

---

### **Delete a Task**

```sh
task-cli delete 1
```

📌 **Output:** `Task deleted successfully.`

---

## **File Storage** 📂

Tasks are stored in a JSON file `tasks.json` in the project directory.  
Each task has the following structure:

```json
{
  "id": 1,
  "description": "Buy groceries",
  "status": "todo",
  "createdAt": "2025-02-21T12:00:00.000Z",
  "updatedAt": "2025-02-21T12:00:00.000Z"
}
```

---

## **Running Tests 🧪**

This project includes automated tests using **Node.js built-in `node:test` framework**.

### **Run All Tests**

To verify all functionalities, execute:

```sh
npm test
```

📌 **Expected Output Example:**

```sh
✔ should add a new task
✔ should list all tasks
✔ should update a task description
✔ should mark a task as in-progress
✔ should mark a task as done
✔ should delete a task
✔ should return null if updating a non-existent task
✔ should return false if deleting a non-existent task
ℹ tests 8
ℹ suites 0
ℹ pass 8
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms
```

---

## **Error Handling** ⚠️

- If you try to update or delete a non-existing task, you’ll see a **"Task not found."** message.
- If the `tasks.json` file is missing, it will be **automatically created**.
- Commands with missing parameters will prompt correct usage.

---

## **Uninstalling the CLI** ❌

To remove the CLI tool:

```sh
npm unlink
```

---

## **Contributing** 🤝

Feel free to fork this project, improve it, and submit a **pull request**.

---

## **License** 📜

This project is licensed under the **MIT License**.

---

## **Author** ✨

👨‍💻 Developed by **Mohammad Zeeshan Khan**  
📧 Contact: zeeshan2423@gmail.com

---
