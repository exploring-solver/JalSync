/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const FinanceManagement = () => {
    const [finance, setFinance] = useState({ description: '', amount: '', type: 'credit' });

    const handleInputChange = (e: any) => {
        setFinance({ ...finance, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log(finance);
        alert("Finance record added!");
    };

    return (
        <Box p={4} className="min-h-screen py-16 flex justify-center items-center">
            <Box maxWidth="md" width="100%">
                <Typography variant="h4" gutterBottom>
                    Manage Finance
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField name="description" label="Description" onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField name="amount" label="Amount" onChange={handleInputChange} fullWidth margin="normal" />
                    <Button type="submit" variant="contained" color="primary">Add Record</Button>
                </form>
            </Box>
        </Box>
    );
};

export default FinanceManagement;
