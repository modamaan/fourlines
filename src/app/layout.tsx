import type { Metadata } from "next";
import { Syncopate, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";

const syncopate = Syncopate({ 
  subsets: ["latin"], 
  weight: ["400", "700"],
  variable: "--font-syncopate" 
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat" 
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

export const metadata: Metadata = {
  title: "Four Lines Industries LLC",
  description: "Industrial engineering, manufacturing, customized storage and transportation solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syncopate.variable} ${montserrat.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-black text-white selection:bg-blue-600/30 font-tertiary">
        <LenisProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
