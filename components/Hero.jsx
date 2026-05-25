"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { Button } from "./ui/button"

const HeroSection = () => {
  const imgRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return

      if (window.scrollY > 100) {
        imgRef.current.classList.add("scrolled")
      } else {
        imgRef.current.classList.remove("scrolled")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="pb-24 pt-12 px-6 relative overflow-hidden">
      
      {/* Ambient background glow blurs behind hero text */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/3 w-75 h-75 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="container mx-auto text-center max-w-6xl relative z-10">


        {/* 2. Rebranded Title using the FlowMint Gradient */}
        <h1 className="text-5xl md:text-7xl lg:text-[95px] font-black leading-tight tracking-tighter text-white mb-6">
          Manage Your Finances, <br />
          <span className="gradient-title">With Intelligence.</span>
        </h1>

        {/* 3. High-contrast, dark-mode friendly Subtitle */}
        <p className="text-lg md:text-xl text-slate-300 mt-4 mb-10 max-w-3xl mx-auto leading-relaxed">
          FlowMint uses advanced AI to track, analyze, and optimize your money—delivering personalized insights, smart budgets, and predictive forecasts in real time.
        </p>

        {/* 4. Dual Call-to-Actions (CTAs) */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-16">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 text-base font-bold glow-teal rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Start Free
            </Button>
          </Link>        
        </div>


        {/* 6. Tilted Dashboard Image Frame */}
        <div className="hero-image-wrapper">
          <div ref={imgRef} className="glass rounded-3xl p-3 shadow-2xl hero-image">
            <Image
              src="/banner.png"
              alt="FlowMint Dashboard"
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
