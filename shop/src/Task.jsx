import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Tasks() {
    const [tasksData, setTasksData] = useState([]);

    useEffect(() => {
        const fetchTasksData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/to-do-list");
                const data = await response.json();
                setTasksData(data);
            } catch (err) {
                console.error(err);
                console.log("Failed to fetch Data");
            }
        }
        fetchTasksData();
    }, []);

    async function handleDelete(taskId) {
        try {
            const response = await fetch(`http://localhost:8000/api/to-do-list/${taskId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("Delete task successfully");
                setTasksData(prev => prev.filter(task => task.id !== taskId));
            } else {
                console.log("Delete task unsuccessfully");
            }
        } catch (err) {
            console.error(err);
            console.log("Failed to delete task")
        }

    }

    return (
        <section className="mt-8">
            <ul>
                {tasksData.map(({ id, task, details }) => {
                    return (
                        <li key={id} className="bg-white shadow-md mb-6 max-w-[350px] w-[90%] mx-auto px-6 py-4 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <section className="flex flex-col">
                                <h2 className="text-2xl font-bold">{task}</h2>
                                <p className="text-[18px] ml-2">- {details}</p>
                                <div className="mt-4 flex gap-2">
                                    <Link to={`/edit/${id}`}>
                                        <button className="bg-blue-500 cursor-pointer text-white px-4 py-1 rounded-lg font-semibold hover:bg-blue-600 transition">
                                            Edit
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDelete(id)}
                                        className="bg-red-500 text-white px-4 py-1 rounded-lg font-bold text-[16px] hover:bg-red-600 transition-all duration-300 cursor-pointer">
                                        Delete
                                    </button>
                                </div>
                            </section>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}