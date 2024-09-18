// "use client";
// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Box, Typography } from '@mui/material';

// const data = [
//     { name: 'Jan', assets: 4000, waterSupply: 2400 },
//     { name: 'Feb', assets: 3000, waterSupply: 1398 },
//     { name: 'Mar', assets: 2000, waterSupply: 9800 },
//     { name: 'Apr', assets: 2780, waterSupply: 3908 },
// ];

// const Dashboard = () => {
//     return (
//         <Box 
//             p={4} 
//             display="flex" 
//             flexDirection="column" 
//             justifyContent="center" 
//             alignItems="center" 
//             className="min-h-screen py-12 px-6 mx-auto my-10"
//         >
//             <Typography variant="h4" gutterBottom>
//                 Dashboard - Water Supply Analytics
//             </Typography>
//             <Box width="80%">
//                 <ResponsiveContainer width="100%" height={400}>
//                     <LineChart data={data}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Line type="monotone" dataKey="assets" stroke="#8884d8" />
//                         <Line type="monotone" dataKey="waterSupply" stroke="#82ca9d" />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </Box>
//         </Box>
//     );
// };

// export default Dashboard;
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
        <Box 
            p={4} 
            display="flex" 
            flexDirection="column" 
            justifyContent="center" 
            alignItems="center" 
            className="min-h-screen py-12 px-6 mx-auto my-10"
        >
            <Typography variant="h4" gutterBottom>
                Dashboard - Water Supply Analytics
            </Typography>
            <Typography variant="body1" paragraph>
                Jal Jeevan Mission (JJM) is a flagship initiative by the Government of India, aiming to provide safe and 
                adequate drinking water to all rural households by 2024. This scheme focuses on ensuring community-managed 
                water supply infrastructure and sustainable operation.
            </Typography>
            <Typography variant="body1" paragraph>
                Through this portal, panchayats can manage assets, consumables, financial transactions, and other activities 
                associated with village water supply schemes efficiently.
            </Typography>
            <Box width="80%">
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
        </Box>
    );
};

export default Dashboard;

