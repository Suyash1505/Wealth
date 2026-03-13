"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"

export default function Register(){

  const router = useRouter()

  const [user_name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {

    if(!user_name || !email || !password){
      toast.error("All fields are required")
      return
    }

    try {

      setLoading(true)

      const res = await axios.post("/api/auth/register", {
        user_name,
        email,
        password
      })

      if(res.data.success){
        toast.success("Registration successful!")
        router.push("/login")
      }

    } 
    catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      )

    }
    finally{
      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="glass-strong w-full max-w-md rounded-3xl p-10 shadow-xl">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center mb-8 gradient-title">
          Create Account
        </h2>

        {/* NAME */}
        <input
          value={user_name}
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* EMAIL */}
        <input
          value={email}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* PASSWORD */}
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* BUTTON */}
        <Button
          size="lg"
          className="w-full"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}
        </Button>

        {/* LOGIN LINK */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>

      </div>

    </div>

  )
}