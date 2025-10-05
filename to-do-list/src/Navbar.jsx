import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const [userName, setUserName] = useState("Guest");
    const location = useLocation(); // Add this to detect route changes
    const navigate = useNavigate();

    useEffect(() => {
        const fetchedUserName = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/auth/me", {
                    method: "GET",
                    credentials: "include"
                });
                const data = await res.json();

                if (data.isLoggedIn) {
                    setUserName(data.name);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchedUserName();
    }, [location]); // empty array = run once when component mounts

    async function handleLogout() {
        try {
            const res = await fetch("http://localhost:8000/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });
            if (res.ok) {
                setUserName("Guest");
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 1000)
            } else {

            }
        } catch (err) {
            console.error(err);
        }
    }

    const styleForNavBar = "bg-blue-300 hover:bg-blue-400 py-1 px-2 rounded-lg transition-all duration-300 cursor-pointer"
    return (
        <header>
            <nav className="fixed z-50 top-0 left-0 flex items-center justify-between w-full h-16 bg-white shadow-lg ">
                <button onClick={() => setIsVisible(!isVisible)}
                    className="block md:hidden font-bold text-3xl ml-4 hover:text-blue-400 transition-all duration-300 cursor-pointer hover:scale-105">&#9776;</button>
                <h2 className="mx-8 font-semibold text-lg flex gap-1">
                    <span>Welcome,</span>
                    <span>{userName}</span>
                </h2>
                <div className="hidden md:flex md:w-full md:justify-end">
                    <ul className="flex gap-4 mx-4 text-lg font-semibold">
                        <Link className={styleForNavBar} to="/">Add Task</Link>
                        <Link className={styleForNavBar} to="/login">Login</Link>
                        <Link className={styleForNavBar} to="/sign-in">Sign In</Link>
                        <Link className={styleForNavBar} to="/tasks">My Tasks</Link>
                        <li className={styleForNavBar} onClick={handleLogout}>Logout</li>
                    </ul>
                </div>
            </nav>
            {isVisible && (
                <aside className="md:hidden fixed left-0 z-20 w-[45%] max-w-[200px] h-screen bg-gray-100 shadow-2xl text-black p-4">
                    <div className="mt-16">
                        <ul className="flex gap-4 flex-col mx-4 text-lg font-semibold">
                            <Link className={styleForNavBar} to="/">Add Task</Link>
                            <Link className={styleForNavBar} to="/login">Login</Link>
                            <Link className={styleForNavBar} to="/sign-in">Sign In</Link>
                            <Link className={styleForNavBar} to="/tasks">My Tasks</Link>
                            <li className={styleForNavBar} onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                </aside>
            )}
        </header>
    )
}