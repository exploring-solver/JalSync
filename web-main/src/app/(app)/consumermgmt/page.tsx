"use client";
import React, { useEffect, useState } from 'react';
import { Button, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, FormControl, InputLabel } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { addBilling, deleteBilling, getBillings, updateBilling } from '@/services/api';

interface Consumer {
    id: string;
    name: string;
    contactInfo: string;
    connectionType: string;
    meterReading: number;
    consumption: number;
    billAmount: number;
    dueDate: string;
    paymentStatus: 'Paid' | 'Unpaid' | 'Overdue';
}

// Hardcoded consumers data
const initialConsumers: Consumer[] = [
    {
        id: '1',
        name: 'John Doe',
        contactInfo: 'john@example.com',
        connectionType: 'Residential',
        meterReading: 500,
        consumption: 120,
        billAmount: 1500,
        dueDate: '2024-10-15',
        paymentStatus: 'Paid',
    },
    {
        id: '2',
        name: 'Jane Smith',
        contactInfo: 'jane@example.com',
        connectionType: 'Commercial',
        meterReading: 1500,
        consumption: 200,
        billAmount: 3000,
        dueDate: '2024-10-25',
        paymentStatus: 'Unpaid',
    },
    {
        id: '3',
        name: 'Bob Johnson',
        contactInfo: 'bob@example.com',
        connectionType: 'Residential',
        meterReading: 800,
        consumption: 180,
        billAmount: 2200,
        dueDate: '2024-10-18',
        paymentStatus: 'Overdue',
    },
];

const ConsumerManagementBilling: React.FC = () => {
    const [consumers, setConsumers] = useState<Consumer[]>(initialConsumers);
    const [selectedConsumer, setSelectedConsumer] = useState<Consumer | null>(null);
    const [billingCycle, setBillingCycle] = useState('Monthly');

    // Generate pie chart data based on payment status
    const paymentStatusData = [
        { name: 'Paid', value: consumers.filter(c => c.paymentStatus === 'Paid').length },
        { name: 'Unpaid', value: consumers.filter(c => c.paymentStatus === 'Unpaid').length },
        { name: 'Overdue', value: consumers.filter(c => c.paymentStatus === 'Overdue').length },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    const handleAddConsumer = async (newConsumer: Consumer) => {
        try {
            const addedConsumer = await addBilling(newConsumer);
            setConsumers([...consumers, addedConsumer]);
        } catch (error) {
            console.error('Error adding consumer:', error);
        }
    };

    const handleUpdateConsumer = async (updatedConsumer: Consumer) => {
        try {
            const updated = await updateBilling(updatedConsumer.id, updatedConsumer);
            setConsumers(consumers.map((consumer) => (consumer.id === updated.id ? updated : consumer)));
        } catch (error) {
            console.error('Error updating consumer:', error);
        }
    };

    const handleDeleteConsumer = async (id: string) => {
        try {
            await deleteBilling(id);
            setConsumers(consumers.filter((consumer) => consumer.id !== id));
        } catch (error) {
            console.error('Error deleting consumer:', error);
        }
    };

    const generateBill = (consumer: Consumer) => {
        // This is a placeholder for the actual billing logic
        const updatedConsumer: Consumer = {
            ...consumer,
            consumption: Math.floor(Math.random() * 100),
            billAmount: Math.floor(Math.random() * 1000),
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            paymentStatus: 'Unpaid',
        };
        handleUpdateConsumer(updatedConsumer);
    };

    return (
        <Box sx={{ p: 4, minHeight: '100vh', py: 12, mt: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ mb: 4 }}>Consumer Management and Billing</Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                <Box>
                    <Typography variant="h5" sx={{ mb: 2 }}>Consumer List</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Connection Type</TableCell>
                                    <TableCell>Bill Amount</TableCell>
                                    <TableCell>Payment Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {consumers.map((consumer) => (
                                    <TableRow key={consumer.id} onClick={() => setSelectedConsumer(consumer)}>
                                        <TableCell>{consumer.id}</TableCell>
                                        <TableCell>{consumer.name}</TableCell>
                                        <TableCell>{consumer.connectionType}</TableCell>
                                        <TableCell>{consumer.billAmount}</TableCell>
                                        <TableCell>{consumer.paymentStatus}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Box>
                    <Typography variant="h5" sx={{ mb: 2 }}>Payment Status Overview</Typography>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={paymentStatusData}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {paymentStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </Box>

                <Box>
                    <Typography variant="h5" sx={{ mb: 2 }}>Consumer Details</Typography>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (selectedConsumer) {
                            handleUpdateConsumer(selectedConsumer);
                        } else {
                            handleAddConsumer(selectedConsumer as Consumer);
                        }
                    }}>
                        <TextField
                            label="Consumer ID"
                            value={selectedConsumer?.id || ''}
                            onChange={(e) => setSelectedConsumer({ ...selectedConsumer, id: e.target.value } as Consumer)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Name"
                            value={selectedConsumer?.name || ''}
                            onChange={(e) => setSelectedConsumer({ ...selectedConsumer, name: e.target.value } as Consumer)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Contact Info"
                            value={selectedConsumer?.contactInfo || ''}
                            onChange={(e) => setSelectedConsumer({ ...selectedConsumer, contactInfo: e.target.value } as Consumer)}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel id="connection-type-label">Connection Type</InputLabel>
                            <Select
                                labelId="connection-type-label"
                                value={selectedConsumer?.connectionType || ''}
                                onChange={(e) =>
                                    setSelectedConsumer({
                                        ...selectedConsumer,
                                        connectionType: e.target.value,
                                    } as Consumer)
                                }
                                fullWidth
                            >
                                <MenuItem value="Residential">Residential</MenuItem>
                                <MenuItem value="Commercial">Commercial</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Meter Reading"
                            type="number"
                            value={selectedConsumer?.meterReading || ''}
                            onChange={(e) => setSelectedConsumer({ ...selectedConsumer, meterReading: parseInt(e.target.value) } as Consumer)}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                            {selectedConsumer ? 'Update Consumer' : 'Add Consumer'}
                        </Button>
                    </form>
                    {selectedConsumer && (
                        <Button onClick={() => generateBill(selectedConsumer)} variant="contained" color="secondary" sx={{ mt: 2 }}>
                            Generate Bill
                        </Button>
                    )}
                </Box>
            </Box>

            <Box sx={{ mt: 8 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Billing Settings</Typography>
                <Select
                    value={billingCycle}
                    onChange={(e) => setBillingCycle(e.target.value)}
                    fullWidth
                >
                    <MenuItem value="Monthly">Monthly</MenuItem>
                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                    <MenuItem value="Annually">Annually</MenuItem>
                </Select>
            </Box>
        </Box>
    );
};

export default ConsumerManagementBilling;
