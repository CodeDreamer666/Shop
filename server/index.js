import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import cors from "cors";

const PORT = 8000;
const { writeFile, readFile } = fs;
const { join } = path;
const __dirname = import.meta.dirname;
const app = express();
const tasksDataPath = join(__dirname, "data", "tasks.json");

app.use(cors());
app.use(express.json());

app.post("/api/to-do-list", async (req, res) => {
    try {
        const data = await readFile(tasksDataPath, "utf8");
        const parseData = JSON.parse(data);
        parseData.push({
            id: parseData.length + 1,
            ...req.body
        });
        await writeFile(tasksDataPath, JSON.stringify(parseData, null, 2), "utf8");
        res.json(parseData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Failed to save task" });
    }
});

app.get("/api/to-do-list", async (req, res) => {
    try {
        const data = await readFile(tasksDataPath, "utf8");
        const parseData = JSON.parse(data);
        res.json(parseData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Failed to get task" });
    }
});

app.delete("/api/to-do-list/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await readFile(tasksDataPath, "utf8");
        const parseData = JSON.parse(data);
        const filteredData = parseData.filter((tasks) => {
            return tasks.id !== Number(id);
        })
        await writeFile(tasksDataPath, JSON.stringify(filteredData, null, 2), "utf8");
        res.json(filteredData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Failed to delete task" });
    }
});

app.get("/api/to-do-list/:id", async (req, res) => {
    const { id } = req.params;
    const data = await readFile(tasksDataPath, "utf8");
    const parseData = JSON.parse(data);
    const filteredData = parseData.filter((task) => {
        return task.id === Number(id);
    });
    res.json(filteredData)
});

app.patch("/api/to-do-list/:id", async (req, res) => {
    const { id } = req.params;
    const data = await readFile(tasksDataPath, "utf8");
    const parseData = JSON.parse(data);
    const updatedData = parseData.map((task) => {
        if (task.id === Number(id)) {
            return {
                ...task,
                task: req.body.task,
                details: req.body.details
            };
        } else {
            return task;
        }
    });
    await writeFile(tasksDataPath, JSON.stringify(updatedData, null, 2), "utf8");
    res.json(updatedData);
})



app.listen(PORT, () => console.log(`Server is connected at port: ${PORT}`));
