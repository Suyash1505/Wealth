"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState(null);
  const [profilePic, setProfilePic] = useState("/logo-sm.png");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return;
    setToken(storedToken);

    // GET USER PROFILE
    axios
      .get("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setProfilePic(res.data.user.profilePic || "/logo-sm.png");
        }
      })
      .catch(() => {});
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/");
  };

  // Navigation configuration
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Transactions", path: "/transactions" },
    { label: "Contact", path: "/contact" },
  ];

  // Helper to check if a route is currently active
  const isActive = (path) => pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 glass-nav">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        
        
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-teal-600 to-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(13,148,136,0.4)] group-hover:scale-105 transition-transform duration-250">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>

          <span className="text-xl font-extrabold tracking-tight gradient-title">
            FlowMint
          </span>
        </Link>

         {/* --- LINKS --- */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive(link.path)
                  ? "text-teal-400 bg-teal-500/10 border border-teal-500/20"
                  : "text-gray-400 hover:text-teal-300 hover:bg-teal-500/5 border border-transparent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

         {/* -- ACCOUNT AUTH ---- */}
        <div className="flex items-center gap-4">
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="outline-none focus:ring-2 focus:ring-teal-500/40 rounded-full">
                  <Image
                    src={profilePic}
                    alt="profile"
                    width={35}
                    height={35}
                    className="rounded-full border border-teal-500/25 hover:scale-105 transition duration-200"
                  />
                </button>
              </DropdownMenuTrigger>

              
              <DropdownMenuContent
                align="end"
                className="bg-slate-800/95 backdrop-blur-xl border border-teal-500/20 text-white rounded-xl shadow-xl p-1.5 min-w-[150px]"
              >
                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                  className="rounded-lg hover:bg-teal-500/10 hover:text-green-600 cursor-pointer font-medium"
                >
                  My Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={logout}
                  className="rounded-lg hover:bg-red-500/10 hover:text-red-600 cursor-pointer font-medium"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">

               {/* --- LOGIN --- */}
              <Button
                variant="ghost"
                onClick={() => router.push("/login")}
                className="h-11 px-5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md
                 text-slate-200 font-semibold tracking-tight hover:bg-teal-500/10 hover:text-teal-300 hover:border-teal-500/20 transition-all duration-300">
                Login
              </Button>

               {/* --- REGISTER --- */}
              <Button
                onClick={() => router.push("/register")}
                className="relative overflow-hidden h-11 px-6 rounded-xl font-semibold tracking-tight text-slate-950
                  bg-gradient-to-r from-teal-300 via-emerald-300 to-amber-300 shadow-[0_0_25px_rgba(45,212,191,0.25)] hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(45,212,191,0.40)] active:scale-[0.98] transition-all duration-300">
                <span className="relative z-10">Get Started</span>

                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500
                  bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45),transparent_70%)]"/>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
