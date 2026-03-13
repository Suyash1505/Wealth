"use client"

import axios from "axios";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login(){

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {

            const res = await axios.post("/api/auth/login", {
                email,
                password
            });

            if(res.data.success){

                // SAVE TOKEN
                localStorage.setItem("token", res.data.token);

                // TELL HEADER AUTH CHANGED
                window.dispatchEvent(new Event("authChanged"));

                toast.success("LOGIN SUCCESSFUL!");

                router.push("/");
                router.refresh();
            }

        } 
        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "LOGIN FAIL!"
            );

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white border p-8 rounded-lg w-[350px] shadow">

                <h2 className="text-2xl mb-6 text-center font-semibold">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                    className="border p-2 w-full rounded"
                />

                <br/><br/>

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                    className="border p-2 w-full rounded"
                />

                <br/><br/>

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>

            </div>

        </div>
    )
}