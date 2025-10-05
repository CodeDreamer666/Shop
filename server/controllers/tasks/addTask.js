import getDBTasks from "../../database/tasks/getDB-tasks.js";

export const addTaskController = async (req, res) => {
    try {
        const tasksDB = await getDBTasks();
        const { task, details } = req.body;

        if (!req.session.userId) {
            return res.status(401).json({ error: "Not Logged In " })
        };

        await tasksDB.run(`
            INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)`,
            [task, details, req.session.userId]);
        
        const allTasks = await tasksDB.all("SELECT * FROM tasks WHERE user_id = ?", [req.session.userId])
        await tasksDB.close();
        res.status(201).json(allTasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save task" });
    }
};