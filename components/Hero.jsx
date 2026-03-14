"use client"

import Link from "next/link"
import Image from "next/image"

import { Button } from "./ui/button"
import { useEffect, useRef } from "react"

const HeroSection = () => {

    const imgRef = useRef();

    useEffect(() => {

        const handleScroll = () => {
            if (!imgRef.current){
                return;
            }

            if (window.scrollY > 100) {
                imgRef.current.classList.add("scrolled")
            } 
            else {
                imgRef.current.classList.remove("scrolled")
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <section className="pb-20 px-6">
        <div className="container mx-auto text-center max-w-6xl">

            {/* TITLE */}
            <h1 className="text-5xl md:text-7xl lg:text-[95px] leading-tight gradient-title">
            Manage Your Finances <br /> with Intelligence
            </h1>

            {/* SUBTITLE */}
            <p className="text-lg md:text-xl text-gray-600 mt-2 mb-10 max-w-3xl mx-auto">
            An AI-powered financial management platform that helps you track,
            analyze, and optimize your spending with real-time insights.
            </p>

            {/* CTA */}
            <div className="flex justify-center mb-16">
            <Link href="/dashboard">
                <Button size="lg" className="px-10 text-base">
                Get Started
                </Button>
            </Link>
            </div>

            {/* HERO IMAGE */}
            <div className="hero-image-wrapper">
                <div ref={imgRef} className="glass rounded-3xl p-3 shadow-2xl hero-image">
                    <Image
                    src="/banner.jpeg"
                    alt="Hero Banner"
                    width={1280}
                    height={720}
                    priority
                    className="rounded-2xl"
                    />
                </div>
            </div>

        </div>
        </section>
    )
}

export default HeroSection