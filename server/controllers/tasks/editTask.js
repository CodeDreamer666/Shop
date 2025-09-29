import getDBTasks from "../../database/tasks/getDB-tasks.js";

export const editTaskController = async (req, res) => {
    const { id } = req.params;
    const tasksDB = await getDBTasks();
    const { task, details } = req.body;
    await tasksDB.run(
        "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
        [task, details, id]
    );
    const updatedTask = await tasksDB.get("SELECT * FROM tasks WHERE id = ?", [id]);
    await tasksDB.close();
    res.json(updatedTask);
}