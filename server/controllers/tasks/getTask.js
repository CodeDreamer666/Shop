import getDBTasks from "../../database/tasks/getDB-tasks.js";

export const getTaskController = async (req, res) => {
    try {
        const tasksDB = await getDBTasks();

        if (!req.session.userId) {
            return res.status(401).json({ error: "Not Logged In", isLoggedIn: false });
        }

        const allTask = await tasksDB.all("SELECT * FROM tasks WHERE user_id = ?", [req.session.userId]);
        await tasksDB.close()
        res.json(allTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get task" });
    }
}