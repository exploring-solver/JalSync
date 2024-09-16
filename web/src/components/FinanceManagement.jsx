import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const FinanceManagement = () => {
    const [finance, setFinance] = useState({ description: '', amount: '', type: 'credit' });

    const handleInputChange = (e) => {
        setFinance({ ...finance, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log(finance);
        alert("Finance record added!");
    };

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Manage Finance
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="description" label="Description" onChange={handleInputChange} fullWidth margin="normal" />
                <TextField name="amount" label="Amount" onChange={handleInputChange} fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="primary">Add Record</Button>
            </form>
        </Box>
    );
};

export default FinanceManagement;
