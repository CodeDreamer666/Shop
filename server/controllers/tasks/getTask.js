import getDBTasks from "../../database/tasks/getDB-tasks.js";

export const getTaskController = async (req, res) => {
    try {
        const tasksDB = await getDBTasks();
        const allTask = await tasksDB.all("SELECT * FROM tasks");
        await tasksDB.close()
        res.json(allTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get task" });
    }
}