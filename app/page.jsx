"use client"

import HeroSection from "@/components/Hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
featuresData,
howItWorksData,
statsData,
testimonialsData
} from "@/data/landing"

import Image from "next/image"
import Link from "next/link"

export default function Home() {

return ( 
  <div className="overflow-hidden">

    {/* HERO */}
    <HeroSection />

    {/* ================= STATS ================= */}
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">

          {statsData.map((stat, index) => (
            <div
              key={index}
              className="group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>

              <div className="text-gray-600 text-sm tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


    {/* ================= FEATURES ================= */}
    <section className="py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need To Manage Your Finances
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful tools designed to give you clarity and control over your
            financial life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuresData.map((feature, index) => (
            <Card
              key={index}
              className="p-8 group hover:shadow-xl transition-all duration-400"
            >

              <CardContent className="space-y-5">
                <div className="text-blue-600 group-hover:scale-110 transition">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>


    {/* ================= HOW IT WORKS ================= */}
    <section className="py-28 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How It Works
          </h2>

          <p className="text-gray-600">
            Start managing your finances in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {howItWorksData.map((work, index) => (
            <div
              key={index}
              className="group transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 transition">
                {work.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {work.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {work.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>


    {/* ================= TESTIMONIALS ================= */}
    <section className="py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold mb-4">
            What Our Users Say
          </h2>

          <p className="text-gray-600">
            Trusted by thousands of users worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonialsData.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300"
            >
              <CardContent>
                <div className="flex items-center mb-4 gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={42}
                    height={42}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">
                      {testimonial.name}
                    </div>

                    <div className="text-gray-500 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {testimonial.quote}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>


    {/* ================= CTA ================= */}
    <section className="py-28 bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6"> 
          Ready to Take Control of Your Finances? 
        </h2> 

        <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg"> 
          Join thousands of users who are already managing their finances smarter with Welth. 
        </p> 
        
        <Link 
          href="/dashboard"
        > 
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-6 text-lg rounded-full shadow-xl transition hover:scale-105" 
          > 
            Start Free Trial
          </Button> 
        </Link>
      </div>
    </section>
  </div>
  )
}
