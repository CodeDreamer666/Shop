import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Login() {
    return (
        <>
            <Navbar />
            <section className="mt-20 w-[90%] max-w-[400px] mx-auto">
                <form className=" w-[90%] max-w-[400px] bg-white shadow-md mx-auto flex flex-col rounded-lg py-4 px-6 hover:shadow-lg transition-all duration-300">
                    <h1 className="text-[28px] mt-2 font-bold">Login</h1>
                    <p className="italic font-semibold mb-4">Your productivity hub is just a login away</p>
                    <label htmlFor="email" className="text-[20px] font-semibold">Email: </label>
                    <input
                        className="border-2 my-2 rounded-sm font-[18px] py-2 px-2 mb-6"
                        id="email" name="email" type="email" required />
                    <label htmlFor="password" className="text-[20px] font-semibold">Password: </label>
                    <input
                        className="border-2 my-2 rounded-sm font-[18px] py-2 px-2"
                        id="password" name="password" type="password" required />
                    <p className="italic text-gray-600 mb-6">Forgot password?</p>
                    <button type="submit" className="border-2 py-1 px-6 mt-2 rounded-lg font-bold text-[20px] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">Submit</button>
                </form>
            </section>
        </>
    )
}