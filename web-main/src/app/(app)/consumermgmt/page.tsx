"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Table } from '@/components/ui/table';
import { Box } from '@mui/material';
import React, { useState } from 'react';
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
            paymentStatus: 'Unpaid' as 'Unpaid',
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
        <Box p={4} className="min-h-screen py-12 mt-10 flex justify-center items-center">
            <Box maxWidth="md" width="100%">
                <h1 className="text-2xl font-bold mb-4">Consumer Management and Billing</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Consumer List</h2>
                        <Table
                            data={consumers}
                            columns={[
                                { header: 'ID', accessor: 'id' },
                                { header: 'Name', accessor: 'name' },
                                { header: 'Connection Type', accessor: 'connectionType' },
                                { header: 'Bill Amount', accessor: 'billAmount' },
                                { header: 'Payment Status', accessor: 'paymentStatus' },
                            ]}
                            onRowClick={setSelectedConsumer}
                        />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Consumer Details</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            selectedConsumer ? handleUpdateConsumer(selectedConsumer) : handleAddConsumer(selectedConsumer as Consumer);
                        }}>
                            <Input
                                label="Consumer ID"
                                value={selectedConsumer?.id || ''}
                                onChange={(e) => setSelectedConsumer({ ...selectedConsumer, id: e.target.value } as Consumer)}
                            />
                            <Input
                                label="Name"
                                value={selectedConsumer?.name || ''}
                                onChange={(e) => setSelectedConsumer({ ...selectedConsumer, name: e.target.value } as Consumer)}
                            />
                            <Input
                                label="Contact Info"
                                value={selectedConsumer?.contactInfo || ''}
                                onChange={(e) => setSelectedConsumer({ ...selectedConsumer, contactInfo: e.target.value } as Consumer)}
                            />
                            <Select
                                label="Connection Type"
                                options={['Residential', 'Commercial']}
                                value={selectedConsumer?.connectionType || ''}
                                onChange={(value) => setSelectedConsumer({ ...selectedConsumer, connectionType: value } as Consumer)}
                            />
                            <Input
                                label="Meter Reading"
                                type="number"
                                value={selectedConsumer?.meterReading || ''}
                                onChange={(e) => setSelectedConsumer({ ...selectedConsumer, meterReading: parseInt(e.target.value) } as Consumer)}
                            />
                            <Button type="submit">{selectedConsumer ? 'Update Consumer' : 'Add Consumer'}</Button>
                        </form>
                        {selectedConsumer && (
                            <Button onClick={() => generateBill(selectedConsumer)} className="mt-4">Generate Bill</Button>
                        )}
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Billing Settings</h2>
                    <Select
                        label="Billing Cycle"
                        options={['Monthly', 'Quarterly', 'Annually']}
                        value={billingCycle}
                        onChange={setBillingCycle}
                    />
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Payment Status Overview</h2>
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
                </div>
            </Box>
        </Box>
    );
};

export default ConsumerManagementBilling;