import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function SignIn() {
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [hasError, setHasError] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(null);
    const [backendError, setBackendError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (hasError !== null && isSuccessful !== null) {
            const timer = setTimeout(() => {
                setHasError(null);
                setIsSuccessful(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [hasError, isSuccessful])

    const userInformationToSend = {
        name: nameInput,
        email: emailInput,
        password: passwordInput
    };

    async function signIn(event) {
        try {
            event.preventDefault();
            const res = await fetch("http://localhost:8000/api/auth/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userInformationToSend),
                credentials: "include" // Ensure cookies are sent
            });

            const data = await res.json();

            if (res.ok) {
                setEmailInput("");
                setNameInput("");
                setPasswordInput("");
                setIsSuccessful(true);
                setHasError(false);
                setTimeout(() => {
                    navigate("/"); // or any other route
                    window.location.reload(); // Force refresh if needed
                }, 1000);
            } else {
                setIsSuccessful(false);
                setHasError(true);
                setBackendError(data.error);
            }
        } catch (err) {
            console.log("Error: " + err);
        }
    }
    return (
        <>
            <Navbar />
            <section className="mt-20 w-[90%] max-w-[400px] mx-auto min-h-[80vh] flex flex-col items-center justify-center">
                {hasError && (
                    <section className="absolute z-10 bottom-12 max-w-[300px] border-2 border-red-500 bg-red-100 text-red-800 shadow-md py-2 px-2 rounded-lg hover:shadow-lg transition-all duration-300">
                        <h2 className="font-bold">{backendError}</h2>
                    </section>
                )}
                <form onSubmit={(event) => signIn(event)}
                    className=" w-[90%] max-w-[400px] relative bg-white shadow-md mx-auto flex flex-col rounded-lg py-4 px-6 hover:shadow-lg transition-all duration-300">
                    <h1 className="text-[28px] mt-2 font-bold">Sign In</h1>
                    <p className="italic font-semibold mb-4">Stay on track. Stay productive. Sign in below</p>
                    <label htmlFor="name" className="text-[20px] font-semibold">Name: </label>
                    <input value={nameInput} onChange={(event) => setNameInput(event.target.value)}
                        className="border-2 my-2 rounded-sm font-[18px] py-2 px-2 mb-4"
                        id="name" name="name" type="text" required />
                    <label htmlFor="email" className="text-[20px] font-semibold">Email: </label>
                    <input value={emailInput} onChange={(event) => setEmailInput(event.target.value)}
                        className="border-2 my-2 rounded-sm font-[18px] py-2 px-2 mb-4"
                        id="email" name="email" type="email" required />
                    <label htmlFor="password" className="text-[20px] font-semibold">Password: </label>
                    <input value={passwordInput} onChange={(event) => setPasswordInput(event.target.value)}
                        className="border-2 my-2 rounded-sm font-[18px] py-2 px-2 mb-8"
                        id="password" name="password" type="password" required />
                    <button type="submit" className="border-2 py-1 px-6 rounded-lg font-bold text-[20px] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">Submit</button>
                </form>
                {isSuccessful && !hasError && (
                    <section className="absolute z-10 border-2 border-green-500 bg-green-100 text-green-800 shadow-md w-[60%] max-w-[300px] py-2 px-2 rounded-lg hover:shadow-lg transition-all duration-300 ">
                        <h2 className="font-bold">Registered successfully!</h2>
                    </section>
                )}
            </section>
        </>
    )
}