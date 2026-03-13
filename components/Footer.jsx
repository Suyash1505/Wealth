"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 mt-24 bg-white/60 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* LEFT LINKS */}
        <div className="flex flex-col md:flex-row items-center gap-3 text-sm text-gray-500">

          <Link
            href="/terms"
            className="hover:text-blue-600 transition-colors"
          >
            Terms & Conditions
          </Link>

          <span className="hidden md:block text-gray-300">|</span>

          <Link
            href="/privacy"
            className="hover:text-blue-600 transition-colors"
          >
            Privacy Policy
          </Link>

        </div>

        {/* SOCIAL ICONS */}
        <div className="flex gap-4">

          <a
            href="https://github.com/Suyash1505"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-110"
          >
            <Image
              src="/github.png"
              alt="GitHub"
              width={20}
              height={20}
            />
          </a>

          <a
            href="https://www.linkedin.com/in/suyash-mukesh-shrivastava-a0666a264/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-blue-50 transition-all duration-300 hover:scale-110"
          >
            <Image
              src="/linkedIn.svg"
              alt="LinkedIn"
              width={18}
              height={18}
            />
          </a>

        </div>

        {/* COPYRIGHT */}
        <div className="text-sm text-gray-400 text-center md:text-right">
          © {new Date().getFullYear()} Suyash Shrivastava. All rights reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;