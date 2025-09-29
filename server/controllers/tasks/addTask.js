import getDBTasks from "../../database/tasks/getDB-tasks.js";

export const addTaskController = async (req, res) => {
    try {
        const tasksDB = await getDBTasks();
        const { task, details } = req.body;
        await tasksDB.run(`
            INSERT INTO tasks (title, description) VALUES (?, ?)`,
        [task, details]);
        const allTasks = await tasksDB.all("SELECT * FROM tasks")
        await tasksDB.close();
        res.status(201).json(allTasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save task" });
    }
};