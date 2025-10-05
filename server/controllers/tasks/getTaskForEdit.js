import getDBTasks from "../../database/tasks/getDB-tasks.js";

export const getTaskForEditController = async (req, res) => {
    const { id } = req.params;
    const tasksDB = await getDBTasks();

    if (!req.session.userId) {
        return res.status(401).json({ error: "Not Logged In" });
    }

    const editTask = await tasksDB.get("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [id, req.session.userId]);
    await tasksDB.close();
    res.json(editTask);
}