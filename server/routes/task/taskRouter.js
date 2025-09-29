import express from "express";
import cors from "cors";
import { addTaskController } from "../../controllers/tasks/addTask.js";
import { getTaskController } from "../../controllers/tasks/getTask.js";
import { deleteTaskController } from "../../controllers/tasks/deleteTask.js";
import { getTaskForEditController } from "../../controllers/tasks/getTaskForEdit.js";
import { editTaskController } from "../../controllers/tasks/editTask.js";

const app = express();
export const taskRouter = express.Router();
app.use(cors());
app.use(express.json());

taskRouter.post("/add-task", addTaskController);
taskRouter.get("/get-task", getTaskController);
taskRouter.delete("/delete-task/:id", deleteTaskController);
taskRouter.get("/get-task-for-edit/:id", getTaskForEditController);
taskRouter.patch("/edit-task/:id", editTaskController);