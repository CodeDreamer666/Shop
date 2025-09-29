import getDBTasks from "../../database/tasks/getDB-tasks.js";

export const getTaskForEditController = async (req, res) => {
    const { id } = req.params;
    const tasksDB = await getDBTasks();
    const editTask = await tasksDB.get("SELECT * FROM tasks WHERE id = ?", [id]);
    await tasksDB.close();
    res.json(editTask);
}