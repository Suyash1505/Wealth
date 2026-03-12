'use client'

import axios from "axios";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { toast } from "react-toastify";

export default function Register(){

    const router = useRouter();

    const [user_name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {

        if(!user_name || !email || !password){
            toast.error("ALL FIELDS ARE REQUIRED");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post("/api/auth/register", {
                user_name,
                email,
                password
            });

            if(res.data.success){
                toast.success("REGISTRATION SUCCESSFULL!")
                router.push('/login')
            }
        } 
        catch (error) {
            toast.error(
                error.response?.data?.message || 
                "REGISTERATION FAIL"
            )
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className="p-10">

            <h2 className="text-xl font-bold mb-6">
                Register
            </h2>

            <input
                value={user_name}
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                className="border p-2"
            />

            <br /><br />

            <input
                value={email}
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2"
            />

            <br /><br />

            <input
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2"
            />

            <br /><br />

            <button
                onClick={handleRegister}
                disabled={loading}
                className="bg-black text-white px-4 py-2"
            >
                {loading ? "Registering..." : "Register"}
            </button>

        </div>
    );
}