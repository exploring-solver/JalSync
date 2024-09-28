/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface CarouselProps {
  items: { src: string; title: string }[];
}

export const Carousel = ({ items }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="flex w-full overflow-x-scroll py-10 scroll-smooth scrollbar-hide"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className="flex gap-4 pl-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="relative h-80 w-56 md:h-[30rem] md:w-72 rounded-3xl overflow-hidden group"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover p-2 border-2 border-black rounded"
              />
              {/* Hover effect */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center flex-col">
                <p className="text-white text-xl font-bold">{item.title}</p>
                <p className="text-white text-center">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute flex justify-between w-full top-1/2 -translate-y-1/2 px-4">
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className="bg-gray-100 p-2 rounded-full disabled:opacity-50"
        >
          <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
        </button>
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className="bg-gray-100 p-2 rounded-full disabled:opacity-50"
        >
          <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export const CarouselDemo = () => {
  const data = [
    { src: "/imgs/15.jpg", title: "JalSync's Logo", description: "Our Splash Screen" },
    { src: "/imgs/11.jpg", title: "Login Screen", description: "Manage user authentication and access control." },
    { src: "/imgs/12.jpg", title: "Login Screen In Hindi", description: "Manage user authentication and access control." },
    { src: "/imgs/14.jpg", title: "Multi-Lingual Support", description: "Access of most used languages in India" },
    { src: "/imgs/7.jpg", title: "User Profile / Language Change", description: "Track User Profile" },
    { src: "/imgs/2.jpg", title: "Dashboard Screen", description: "View key metrics and manage system operations." },
    { src: "/imgs/13.jpg", title: "GIS Mapping & Asset Management", description: "Track and maintain water supply infrastructure." },
    { src: "/imgs/8.jpg", title: "Inventory Management", description: "Manage and forecast inventory of consumables." },
    { src: "/imgs/10.jpg", title: "Financial Management", description: "Handle financial transactions and record-keeping." },
    { src: "/imgs/9.jpg", title: "Addition of Assets", description: "Addition of assets via Gram Panchayat" },
    { src: "/imgs/payment1.png", title: "Payment Gateway", description: "Bills Payment's are powered by RazorPay" },
    { src: "/imgs/payment2.png", title: "Selecting Bank On Razorpay", description: "Bills Payment's are powered by RazorPay" },
  ];

  return (
    <div className="w-full h-full py-20">
      <h2 className="text-center text-2xl md:text-5xl font-bold mb-8">
        App UI Showcase
      </h2>
      <div className="flex justify-center">
        <Link href="jalsync-app-release-team-ramanujan.apk" className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-300 text-center w-fit m-auto">
          Download App
        </Link>
      </div>
      <Carousel items={data} />
    </div>
  );
};