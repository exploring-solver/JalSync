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
        <Box p={4} className="min-h-screen py-12 flex justify-center items-center">
            <Box maxWidth="md" width="100%">
                <Typography variant="h4" gutterBottom textAlign="center">
                    Generate Bills & Payments
                </Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button variant="contained" color="primary" onClick={handleBillGenerate}>
                        Generate Bill
                    </Button>
                    <Button variant="contained" color="secondary" style={{ marginLeft: '20px' }} onClick={handlePayment}>
                        Proceed to Payment
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default BillGeneration;
