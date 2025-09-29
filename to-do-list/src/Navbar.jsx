import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const styleForNavBar = "bg-blue-300 hover:bg-blue-400 py-1 px-2 rounded-lg transition-all duration-300 cursor-pointer"
    return (
        <header>
            <nav className="fixed top-0 left-0 flex items-center justify-end w-full h-16 bg-white shadow-lg ">
                <ul className="flex gap-4 mr-4 text-lg font-semibold">
                  <Link className={styleForNavBar} to="/">Add Task</Link>
                  <Link className={styleForNavBar} to="/login">Login</Link>
                  <Link className={styleForNavBar} to="/sign-in">Sign In</Link>
                  <Link className={styleForNavBar} to="/tasks">My Tasks</Link>
                </ul>
            </nav>
        </header>
    )
}