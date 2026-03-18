"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full mt-24 relative">
      
      {/* TOP BORDER GLOW */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>

      <div className="bg-white/70 backdrop-blur-xl border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* 🔥 BRAND SECTION */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Image src="/logo.png" alt="Welth" width={120} height={50} />

            <p className="text-sm text-gray-500 text-center md:text-left max-w-xs">
              Smart financial management powered by AI. Track, analyze and grow
              your wealth effortlessly.
            </p>
          </div>

          {/* 🔥 LINKS */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-blue-600 transition">
              Terms
            </Link>

            <Link href="/privacy" className="hover:text-blue-600 transition">
              Privacy
            </Link>

            <Link href="/contact" className="hover:text-blue-600 transition">
              Contact
            </Link>
          </div>

          {/* 🔥 SOCIAL ICONS (FIXED SIZE) */}
          <div className="flex gap-4">
            <a
              href="https://github.com/Suyash1505"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <Image src="/github.png" alt="GitHub" width={24} height={24} />
            </a>

            <a
              href="https://www.linkedin.com/in/suyash-mukesh-shrivastava-a0666a264/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 hover:bg-blue-50"
            >
              <Image
                src="/linkedIn.svg"
                alt="LinkedIn"
                width={22}
                height={22}
              />
            </a>
          </div>
        </div>

        {/* 🔥 BOTTOM BAR */}
        <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Suyash Shrivastava. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
