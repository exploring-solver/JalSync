
"use client";
import React from 'react';
import { Button, Box, Typography } from '@mui/material';

const BillGeneration = () => {
    const handleBillGenerate = () => {
        alert("Bill generated successfully!");
    };

    const handlePayment = () => {
        alert("Proceeding to payment gateway!");
    };

    return (
        <Box p={4} className="min-h-screen">
            <Typography variant="h4" gutterBottom>
                Generate Bills & Payments
            </Typography>
            <Button variant="contained" color="primary" onClick={handleBillGenerate}>Generate Bill</Button>
            <Button variant="contained" color="secondary" style={{ marginLeft: '20px' }} onClick={handlePayment}>Proceed to Payment</Button>
        </Box>
    );
};

export default BillGeneration;
