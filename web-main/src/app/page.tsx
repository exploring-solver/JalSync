"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { CarouselDemo } from '@/components/CarouselDemo';
import { Divider } from '@mui/material';

// Dynamic import for Three.js related components

const data = [
  { name: 'Jan', assets: 4000, waterSupply: 2400 },
  { name: 'Feb', assets: 3000, waterSupply: 1398 },
  { name: 'Mar', assets: 2000, waterSupply: 9800 },
  { name: 'Apr', assets: 2780, waterSupply: 3908 },
];

const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg m-auto">
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className="absolute w-full m-auto h-full object-fit"
          initial={{ opacity: 0, x: '100%' }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            x: index === currentIndex ? '0%' : '-100%',
          }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
};

const Dashboard = () => {
  const carouselImages = [
    '1.png',
    '2.png',
    '3.png',
  ];

  return (
    <div className="min-h-screen py-16 px-12 mx-auto  bg-gradient-to-r from-blue-100 to-green-100">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-blue-800 mb-4">JalSync Dashboard</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Empowering communities with sustainable water management solutions through the Jal Jeevan Mission initiative.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center ">Water Supply Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="assets" stroke="#8884d8" />
              <Line type="monotone" dataKey="waterSupply" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white p-8 rounded-lg shadow-xl mb-16"
      >
        <h2 className="text-3xl font-semibold mb-6 text-blue-700">Impact Analytics</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="households" stroke="#8884d8" name="Households Reached" />
            <Line yAxisId="right" type="monotone" dataKey="waterSupply" stroke="#82ca9d" name="Water Supply (KL)" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12 bg-white px-6 py-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4  text-center">Project Highlights</h2>
          <Carousel images={carouselImages} />
        </motion.div>

      </div>

      <CarouselDemo/>
      <Divider/>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center mt-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Join us in our mission to provide safe and adequate drinking water to all rural households by 2024.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Learn More
        </button>
      </motion.div>
    </div>
  );
};

export default Dashboard;