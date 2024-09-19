/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CarouselProps {
  items: { src: string; title: string }[];
  initialScroll?: number;
}

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

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
        className="flex w-full overflow-x-scroll py-10 scroll-smooth"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className="flex flex-row justify-start gap-4 pl-4">
          {items.map((item, index) => (
            <motion.div
              key={"carousel-item" + index}
              className="relative h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={item.src}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white text-xl font-semibold">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 mr-10">
        <button
          className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          {"<"}
        </button>
        <button
          className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};
