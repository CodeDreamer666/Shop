import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function EditTask() {
    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [hasError, setHasError] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8000/api/get-task-for-edit/${id}`, {
                credentials: "include"
            });
            const data = await res.json();
            setTitleInput(data.title);
            setDescriptionInput(data.description);
        }
        fetchData();
    }, [id])

    useEffect(() => {
        if (hasError !== null && isSuccessful !== null) {
            const timer = setTimeout(() => {
                setHasError(null);
                setIsSuccessful(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [hasError, isSuccessful]);

    const taskDataToSend = {
        task: titleInput,
        details: descriptionInput
    }

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            const response = await fetch(`http://localhost:8000/api/edit-task/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskDataToSend),
                credentials: "include"
            });

            if (response.ok) {
                setIsSuccessful(true);
                setHasError(false);
            } else {
                setIsSuccessful(false);
                setHasError(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Navbar />
            <section className="mt-20 w-[90%] max-w-[400px] mx-auto min-h-[80vh] flex flex-col items-center justify-center">
                {hasError && (
                    <section className="absolute top-4 left-0 max-w-[300px] border-2 border-red-500 bg-red-100 text-red-800 shadow-md py-2 px-2 rounded-lg hover:shadow-lg transition-all duration-300">
                        <h2 className="font-bold">Oops! Something went wrong. Please try submitting again.</h2>
                    </section>
                )}
                <form onSubmit={(event) => handleSubmit(event)}
                    className=" w-[90%] max-w-[400px] bg-white shadow-md mx-auto flex flex-col rounded-lg py-4 px-6 hover:shadow-lg transition-all duration-300">
                    <h1 className="text-[28px] text-center mt-4 font-bold">To-Do List</h1>
                    <label htmlFor="task" className="text-[20px] font-semibold">Task: </label>
                    <input value={titleInput} onChange={(event) => setTitleInput(event.target.value)}
                        className="border-2 my-2 rounded-sm font-[18px] py-2 px-2"
                        id="task" name="task" type="text" required />
                    <label htmlFor="description" className="text-[20px] font-semibold">Description: </label>
                    <textarea value={descriptionInput} onChange={(event) => setDescriptionInput(event.target.value)}
                        className="resize-none border-2 my-2 rounded-sm font-[18px] py-2 px-2"
                        id="description" name="description" type="text" required cols="10" rows="10" />
                    <button type="submit" className="border-2 py-1 mt-4 px-6 rounded-lg font-bold text-[20px] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">Submit</button>
                </form>
                {isSuccessful && !hasError && (
                    <section className="absolute z-10 border-2 bottom-4 mr-20 border-green-500 bg-green-100 text-green-800 shadow-md w-[60%] max-w-[300px] py-2 px-2 rounded-lg hover:shadow-lg transition-all duration-300 ">
                        <h2 className="font-bold">Task edit successfully! You can view it <Link to="/tasks" className="underline">here</Link></h2>
                    </section>
                )}
            </section>
        </>
    )
}