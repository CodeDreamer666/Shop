import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import './App.css'
import Navbar from './Navbar';

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hasError, setHasError] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(null);

  useEffect(() => {
    if (hasError !== null && isSuccessful !== null) {
      const timer = setTimeout(() => {
        setHasError(null);
        setIsSuccessful(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasError, isSuccessful])

  const taskToSend = {
    task: title,
    details: description
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const response = await fetch("http://localhost:8000/api/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskToSend)
      });

      if (response.ok) {
        setIsSuccessful(true);
        setHasError(false)
        setTitle("");
        setDescription("");
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
      <section className="mt-20 w-[90%] max-w-[400px] mx-auto">
        {hasError && (
          <section className="absolute z-10 max-w-[300px] border-2 border-red-500 bg-red-100 text-red-800 shadow-md py-2 px-2 rounded-lg hover:shadow-lg transition-all duration-300">
            <h2 className="font-bold">Oops! Something went wrong. Please try submitting again.</h2>
          </section>
        )}
        <form onSubmit={(event) => handleSubmit(event)}
          className=" w-[90%] max-w-[400px] relative bg-white shadow-md mx-auto flex flex-col rounded-lg py-4 px-6 hover:shadow-lg transition-all duration-300">
          <h1 className="text-[28px] mt-2 mb-2 font-bold">To-Do List</h1>
          <label htmlFor="task" className="text-[20px] font-semibold">Task: </label>
          <input value={title} onChange={(event) => setTitle(event.target.value)}
            className="border-2 my-2 rounded-sm font-[18px] py-2 px-2"
            id="task" name="task" type="text" required />
          <label htmlFor="description" className="text-[20px] font-semibold">Description: </label>
          <textarea value={description} onChange={(event) => setDescription(event.target.value)}
            className="resize-none border-2 my-2 rounded-sm font-[18px] py-2 px-2"
            id="description" name="description" type="text" required cols="10" rows="10" />
          <button type="submit" className="border-2 py-1 mt-4 px-6 rounded-lg font-bold text-[20px] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">Submit</button>
        </form>
        {isSuccessful && !hasError && (
          <section className="absolute z-10 border-2 border-green-500 bg-green-100 text-green-800 shadow-md w-[60%] max-w-[300px] py-2 px-2 rounded-lg hover:shadow-lg transition-all duration-300 ">
            <h2 className="font-bold">Task created successfully! You can view it
              <Link to="/tasks"> here</Link>
            </h2>
          </section>
        )}
      </section>
    </>
  )
}