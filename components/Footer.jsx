"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left Section */}
        <div className="flex flex-col md:flex-row items-center gap-3 text-sm text-neutral-400">
          <Link href="/terms" className="hover:text-white transition-colors duration-300">
            Terms & Conditions
          </Link>
          <span className="hidden md:block">|</span>
          <Link href="/privacy" className="hover:text-white transition-colors duration-300">
            Privacy Policy
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://github.com/Suyash1505"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 hover:bg-neutral-700 transition-all duration-300 hover:scale-110"
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
            className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 hover:bg-blue-600 transition-all duration-300 hover:scale-110"
          >
            <Image
              src="/linkedIn.svg"
              alt="LinkedIn"
              width={20}
              height={20}
            />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-neutral-500 text-center md:text-right">
          © {new Date().getFullYear()} Suyash Shrivastava. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;