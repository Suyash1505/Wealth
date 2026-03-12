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

            console.log(res.data);
            
            if(res.data.success){
                localStorage.setItem("token", res.data.token);
                toast.success("LOGIN SUCCESSFUL!");
                router.push("/");
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
        <div style={{padding:"40px"}}>

            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                onChange={(e)=>setEmail(e.target.value)}
            />

            <br/><br/>

            <input
                type="password"
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)}
            />

            <br/><br/>

            <button onClick={handleLogin}>
                Login
            </button>

        </div>
    )
}