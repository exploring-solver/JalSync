"use client";
import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

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

const ConsumerManagementBilling: React.FC = () => {
    const [consumers, setConsumers] = useState<Consumer[]>([]);
    const [selectedConsumer, setSelectedConsumer] = useState<Consumer | null>(null);
    const [billingCycle, setBillingCycle] = useState('Monthly');

    const handleAddConsumer = (newConsumer: Consumer) => {
        setConsumers([...consumers, newConsumer]);
    };

    const handleUpdateConsumer = (updatedConsumer: Consumer) => {
        setConsumers(consumers.map(consumer => consumer.id === updatedConsumer.id ? updatedConsumer : consumer));
    };

    const generateBill = (consumer: Consumer) => {
        // This is a placeholder for the actual billing logic
        const updatedConsumer = {
            ...consumer,
            consumption: Math.floor(Math.random() * 100),
            billAmount: Math.floor(Math.random() * 1000),
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            paymentStatus: 'Unpaid' as const,
        };
        handleUpdateConsumer(updatedConsumer);
    };

    const paymentStatusData = [
        { name: 'Paid', value: consumers.filter(c => c.paymentStatus === 'Paid').length },
        { name: 'Unpaid', value: consumers.filter(c => c.paymentStatus === 'Unpaid').length },
        { name: 'Overdue', value: consumers.filter(c => c.paymentStatus === 'Overdue').length },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

    return (
        <Box sx={{ p: 4, minHeight: '100vh', py: 12, mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Box sx={{ maxWidth: 'md', width: '100%' }}>
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
                        <Typography variant="h5" sx={{ mb: 2 }}>Consumer Details</Typography>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            selectedConsumer ? handleUpdateConsumer(selectedConsumer) : handleAddConsumer(selectedConsumer as unknown as Consumer);
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
                            <Select
                                label="Connection Type"
                                value={selectedConsumer?.connectionType || ''}
                                onChange={(e) => setSelectedConsumer({ ...selectedConsumer, connectionType: e.target.value } as Consumer)}
                                fullWidth
                                margin="dense"
                            >
                                <MenuItem value="Residential">Residential</MenuItem>
                                <MenuItem value="Commercial">Commercial</MenuItem>
                            </Select>
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

                <Box sx={{ mt: 8 }}>
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
            </Box>
        </Box>
    );
};

export default ConsumerManagementBilling;