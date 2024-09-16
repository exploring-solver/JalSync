import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const InventoryManagement = () => {
    const [item, setItem] = useState({ name: '', quantity: '', demandForecast: '' });

    const handleInputChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log(item);
        alert("Item added to inventory!");
    };

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Manage Inventory
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="name" label="Item Name" onChange={handleInputChange} fullWidth margin="normal" />
                <TextField name="quantity" label="Quantity" onChange={handleInputChange} fullWidth margin="normal" />
                <TextField name="demandForecast" label="Demand Forecast" onChange={handleInputChange} fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="primary">Add Item</Button>
            </form>
        </Box>
    );
};

export default InventoryManagement;
