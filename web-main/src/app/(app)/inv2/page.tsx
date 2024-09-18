"use client";
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Container, Typography, Grid } from '@mui/material';

interface InventoryItem {
    id: string;
    name: string;
    category: string;
    quantity: number;
    supplier: string;
    purchaseDate: string;
    expirationDate: string;
    usageRate: number;
    reorderPoint: number;
    optimalStockLevel: number;
}

interface ForecastData {
    month: string;
    demand: number;
}

const InventoryManagement: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const [forecastData, setForecastData] = useState<ForecastData[]>([]);

    const handleAddItem = (newItem: InventoryItem) => {
        setInventory([...inventory, newItem]);
    };

    const handleUpdateItem = (updatedItem: InventoryItem) => {
        setInventory(inventory.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const generateForecast = () => {
        // This is a placeholder for the actual forecasting logic
        const mockForecast: ForecastData[] = [
            { month: 'Jan', demand: 100 },
            { month: 'Feb', demand: 120 },
            { month: 'Mar', demand: 140 },
            { month: 'Apr', demand: 160 },
            { month: 'May', demand: 180 },
            { month: 'Jun', demand: 200 },
        ];
        setForecastData(mockForecast);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 16, mt: 10 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Inventory Management and Demand Forecasting
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>Inventory List</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inventory.map((item) => (
                                    <TableRow key={item.id} onClick={() => setSelectedItem(item)} hover>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>Item Details</Typography>
                    <Box component="form" onSubmit={(e) => {
                        e.preventDefault();
                        selectedItem ? handleUpdateItem(selectedItem) : handleAddItem(selectedItem as unknown as InventoryItem);
                    }} sx={{ '& .MuiTextField-root': { my: 1 } }}>
                        <TextField
                            fullWidth
                            label="Item ID"
                            value={selectedItem?.id || ''}
                            onChange={(e) => setSelectedItem({ ...selectedItem, id: e.target.value } as InventoryItem)}
                        />
                        <TextField
                            fullWidth
                            label="Name"
                            value={selectedItem?.name || ''}
                            onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value } as InventoryItem)}
                        />
                        <Select
                            fullWidth
                            label="Category"
                            value={selectedItem?.category || ''}
                            onChange={(e) => setSelectedItem({ ...selectedItem, category: e.target.value } as InventoryItem)}
                        >
                            {['Chemical', 'Filter', 'Spare Part', 'Other'].map((category) => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                        <TextField
                            fullWidth
                            label="Quantity"
                            type="number"
                            value={selectedItem?.quantity || ''}
                            onChange={(e) => setSelectedItem({ ...selectedItem, quantity: parseInt(e.target.value) } as InventoryItem)}
                        />
                        <TextField
                            fullWidth
                            label="Supplier"
                            value={selectedItem?.supplier || ''}
                            onChange={(e) => setSelectedItem({ ...selectedItem, supplier: e.target.value } as InventoryItem)}
                        />
                        <TextField
                            fullWidth
                            label="Purchase Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={selectedItem?.purchaseDate || ''}
                            onChange={(e) => setSelectedItem({ ...selectedItem, purchaseDate: e.target.value } as InventoryItem)}
                        />
                        <TextField
                            fullWidth
                            label="Expiration Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={selectedItem?.expirationDate || ''}
                            onChange={(e) => setSelectedItem({ ...selectedItem, expirationDate: e.target.value } as InventoryItem)}
                        />
                        <TextField
                            fullWidth
                            label="Usage Rate"
                            type="number"
                            value={selectedItem?.usageRate || ''}
                            onChange={(e) => setSelectedItem({ ...selectedItem, usageRate: parseFloat(e.target.value) } as InventoryItem)}
                        />
                        <TextField
                            fullWidth
                            label="Reorder Point"
                            type="number"
                            value={selectedItem?.reorderPoint || ''}
                            onChange={(e) => setSelectedItem({ ...selectedItem, reorderPoint: parseInt(e.target.value) } as InventoryItem)}
                        />
                        <TextField
                            fullWidth
                            label="Optimal Stock Level"
                            type="number"
                            value={selectedItem?.optimalStockLevel || ''}
                            onChange={(e) => setSelectedItem({ ...selectedItem, optimalStockLevel: parseInt(e.target.value) } as InventoryItem)}
                        />
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            {selectedItem ? 'Update Item' : 'Add Item'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ mt: 8 }}>
                <Typography variant="h5" gutterBottom>Demand Forecast</Typography>
                <Button onClick={generateForecast} variant="contained">Generate Forecast</Button>
                <Box sx={{ mt: 4, height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={forecastData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="demand" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </Container>
    );
};

export default InventoryManagement;