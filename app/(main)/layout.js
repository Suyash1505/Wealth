"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MainLayout({ children }) {

    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // GET TOKEN
        const token = localStorage.getItem("token");
        
        // IF NO TOKEN
        if (!token) {
            router.push("/login");
        } 
        else {
            setLoading(false);
        }
    }, [router]);

    // LOADING SCREEN
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    // RENDER PROTECTED CONTENT
    return (
        <>
            {children}
        </>
    );
}