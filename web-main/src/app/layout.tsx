/* eslint-disable @next/next/no-sync-scripts */
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import "@/olaSDK/style.css"
import { Inter } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "JalSync",
  description: "Created By Team Ramanujan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      
      <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
      <body
        className={''}
      >

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
