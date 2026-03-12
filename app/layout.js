import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ToastProvider from "@/components/ToastProvider.jsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const jetMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetmono",
});

export const metadata = {
  title: "Wealth",
  description: "AI Powered Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sora.variable} ${jetMono.variable} antialiased`}
      >

        {/* ------- HEADER ----------- */}
        <Header/>

        <main className="min-h-screen">
          {children}

          <ToastProvider/>

        </main>
      
        {/* ------- FOOTER ----------- */}
        <Footer/>
      </body>
    </html>
  );
}