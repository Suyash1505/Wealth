"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {

    return (

        <div className="relative flex items-center justify-center min-h-screen px-6 overflow-hidden">

            {/* background glow */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400 opacity-30 blur-[120px] rounded-full"></div>
            <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] bg-indigo-400 opacity-30 blur-[120px] rounded-full"></div>

            {/* content */}
            <div className="relative glass-strong max-w-md w-full p-10 rounded-3xl shadow-xl text-center">
                <h1 className="text-7xl font-bold gradient-title mb-4">
                    404
                </h1>

                <h2 className="text-2xl font-semibold mb-3">
                    Page Not Found
                </h2>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    Oops! The page you're looking for doesn't exist or may have been moved.
                </p>

                <Link href="/">
                    <Button
                        size="lg"
                        className="px-8"
                    >
                        Return Home
                    </Button>
                </Link>
            </div>
        </div>

    )
}
