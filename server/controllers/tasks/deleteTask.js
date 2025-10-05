import getDBTasks from "../../database/tasks/getDB-tasks.js";

export const deleteTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        const tasksDB = await getDBTasks();

        if (!req.session.userId) {
            return res.status(401).json({ error: "Not Logged In " });
        }

        await tasksDB.run("DELETE FROM tasks WHERE id = ? AND user_id = ?", [id, req.session.userId]);
        const allTask = await tasksDB.all("SELECT * FROM tasks WHERE user_id = ?", [req.session.userId]);
        await tasksDB.close();
        res.json(allTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete task" });
    }
}