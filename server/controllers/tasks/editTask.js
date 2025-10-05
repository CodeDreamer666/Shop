import getDBTasks from "../../database/tasks/getDB-tasks.js";

export const editTaskController = async (req, res) => {
    const { id } = req.params;
    const tasksDB = await getDBTasks();
    const { task, details } = req.body;

    if (!req.session.userId) {
        return res.status(401).json({ error: "Not Logged In" });
    }

    await tasksDB.run(
        "UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?",
        [task, details, id, req.session.userId]
    );
    const updatedTask = await tasksDB.get("SELECT * FROM tasks WHERE id = ? AND user_id = ?", [id, req.session.userId]);
    await tasksDB.close();
    res.json(updatedTask);
}