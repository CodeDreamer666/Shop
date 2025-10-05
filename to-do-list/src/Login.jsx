import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Login() {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [resFromServer, setResFromServer] = useState("");
    const [hasError, setHasError] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(null);
    const navigate = useNavigate();

    const loginInfoToSend = {
        email: emailInput,
        password: passwordInput
    };

    useEffect(() => {
       const timer = setTimeout(() => {
         setHasError(null);
         setIsSuccessful(null);
         setResFromServer("");
       }, 3000);
       return () => clearTimeout(timer)
    }, [resFromServer]);

    async function handleLogin(event) {
        event.preventDefault();
        try {
            const res = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInfoToSend),
                credentials: "include"
            });
            const data = await res.json();

            if (res.ok) {
                setEmailInput("");
                setPasswordInput("");
                setResFromServer(data.message);
                setIsSuccessful(true);
                setHasError(false);
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 1000);
            } else {
                console.error(data.error);
                setHasError(true);
                setIsSuccessful(false);
                setResFromServer(data.error);
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
                    <section className="absolute top-[20%]  max-w-[300px] border-2 border-red-500 bg-red-100 text-red-800 shadow-md py-2 px-2 rounded-lg hover:shadow-lg transition-all duration-300">
                        <h2 className="font-bold">{resFromServer}</h2>
                    </section>
                )}
                <form onSubmit={(event) => handleLogin(event)}
                    className=" w-[90%] max-w-[400px] bg-white shadow-md mx-auto flex flex-col rounded-lg py-4 px-6 hover:shadow-lg transition-all duration-300">
                    <h1 className="text-[28px] mt-2 font-bold">Login</h1>
                    <p className="italic font-semibold mb-4">Your productivity hub is just a login away</p>
                    <label htmlFor="email" className="text-[20px] font-semibold">Email: </label>
                    <input value={emailInput} onChange={(event) => setEmailInput(event.target.value)}
                        className="border-2 my-2 rounded-sm font-[18px] py-2 px-2 mb-6"
                        id="email" name="email" type="email" required />
                    <label htmlFor="password" className="text-[20px] font-semibold">Password: </label>
                    <input value={passwordInput} onChange={(event) => setPasswordInput(event.target.value)}
                        className="border-2 my-2 rounded-sm font-[18px] py-2 px-2"
                        id="password" name="password" type="password" required />
                    <p className="italic text-gray-600 mb-6">Forgot password?</p>
                    <button type="submit" className="border-2 py-1 px-6 mt-2 rounded-lg font-bold text-[20px] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">Submit</button>
                </form>
                {isSuccessful && (
                    <section className="absolute bottom-[15%] mr-25 z-10 border-2 border-green-500 bg-green-100 text-green-800 shadow-md w-[60%] max-w-[300px] py-2 px-2 rounded-lg hover:shadow-lg transition-all duration-300 ">
                        <h2 className="font-bold">{resFromServer}</h2>
                    </section>
                )}
            </section>
        </>
    )
}