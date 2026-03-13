"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

import { Button } from "./ui/button"

const Header = () => {

  const router = useRouter()

  const [token, setToken] = useState(null)
  const [profilePic, setProfilePic] = useState("/logo-sm.png")

  useEffect(() => {

    const storedToken = localStorage.getItem("token")

    if (!storedToken) return

    setToken(storedToken)

    // GET USER PROFILE
    axios.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
    .then(res => {
      if (res.data.success) {
        setProfilePic(res.data.user.profilePic || "/logo-sm.png")
      }
    })
    .catch(() => {})
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    router.push("/")
  }

  return (

    <header className="fixed top-0 w-full bg-white z-50 border-b">

      <nav className="container mx-auto flex items-center justify-between p-4">

        <Link href="/">
          <Image
            src="/logo.png"
            alt="wealth"
            width={120}
            height={60}
          />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/transactions">Transactions</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="flex items-center gap-4">

          {token ? (

            <DropdownMenu>

              <DropdownMenuTrigger asChild>

                <button>

                  <Image
                    src={profilePic}
                    alt="profile"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />

                </button>

              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">

                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                >
                  My Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={logout}
                >
                  Logout
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>

          ) : (

            <Button onClick={() => router.push("/login")}>
              Login
            </Button>

          )}

        </div>

      </nav>

    </header>
  )
}

export default Header