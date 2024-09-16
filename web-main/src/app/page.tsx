"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const data = [
    { name: 'Jan', assets: 4000, waterSupply: 2400 },
    { name: 'Feb', assets: 3000, waterSupply: 1398 },
    { name: 'Mar', assets: 2000, waterSupply: 9800 },
    { name: 'Apr', assets: 2780, waterSupply: 3908 },
];

const Dashboard = () => {
    return (
        <Box p={4} className="min-h-screen">
            <Typography variant="h4" gutterBottom>
                Dashboard - Water Supply Analytics
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
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
        </Box>
    );
};

export default Dashboard;
