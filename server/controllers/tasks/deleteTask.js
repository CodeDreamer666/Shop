import getDBTasks from "../../database/tasks/getDB-tasks.js";

export const deleteTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        const tasksDB = await getDBTasks();
        await tasksDB.run("DELETE FROM tasks WHERE id = ?", [id]);
        const allTask = await tasksDB.all("SELECT * FROM tasks");
        await tasksDB.close();
        res.json(allTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete task" });
    }
}