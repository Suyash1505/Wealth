"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"

export default function Login(){

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {

      const res = await axios.post("/api/auth/login", {
        email,
        password
      })

      if(res.data.success){

        localStorage.setItem("token", res.data.token)

        window.dispatchEvent(new Event("authChanged"))

        toast.success("Login successful!")

        router.push("/")
        router.refresh()
      }

    } 
    catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login failed!"
      )

    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="glass-strong w-full max-w-md rounded-3xl p-10 shadow-xl">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center mb-8 gradient-title">
          Welcome Back
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* LOGIN BUTTON */}
        <Button
          size="lg"
          className="w-full"
          onClick={handleLogin}
        >
          Login
        </Button>

      </div>

    </div>

  )
}