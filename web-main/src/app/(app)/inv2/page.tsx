"use client";
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Table } from '@/components/ui/table';
import { Box } from '@mui/material';

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

const InventoryManagement: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const [forecastData, setForecastData] = useState([]);

    const handleAddItem = (newItem: InventoryItem) => {
        setInventory([...inventory, newItem]);
    };

    const handleUpdateItem = (updatedItem: InventoryItem) => {
        setInventory(inventory.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const generateForecast = () => {
        // This is a placeholder for the actual forecasting logic
        const mockForecast = [
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
        <Box p={4} className="min-h-screen py-12 mt-10 flex justify-center items-center">
            <Box maxWidth="md" width="100%">
                <h1 className="text-2xl font-bold mb-4">Inventory Management and Demand Forecasting</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Inventory List</h2>
                        <Table
                            data={inventory}
                            columns={[
                                { header: 'ID', accessor: 'id' },
                                { header: 'Name', accessor: 'name' },
                                { header: 'Category', accessor: 'category' },
                                { header: 'Quantity', accessor: 'quantity' },
                            ]}
                            onRowClick={setSelectedItem}
                        />
                    </div>

                    <div className=''>
                        <h2 className="text-xl font-semibold mb-2">Item Details</h2>
                        <form className='space-y-5' onSubmit={(e) => {
                            e.preventDefault();
                            selectedItem ? handleUpdateItem(selectedItem) : handleAddItem(selectedItem as InventoryItem);
                        }}>
                            <Input
                                label="Item ID"
                                value={selectedItem?.id || ''}
                                onChange={(e) => setSelectedItem({ ...selectedItem, id: e.target.value } as InventoryItem)}
                            />
                            <Input
                                label="Name"
                                value={selectedItem?.name || ''}
                                onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value } as InventoryItem)}
                            />
                            <Select
                                label="Category"
                                options={['Chemical', 'Filter', 'Spare Part', 'Other']}
                                value={selectedItem?.category || ''}
                                onChange={(value) => setSelectedItem({ ...selectedItem, category: value } as InventoryItem)}
                            />
                            <Input
                                label="Quantity"
                                type="number"
                                value={selectedItem?.quantity || ''}
                                onChange={(e) => setSelectedItem({ ...selectedItem, quantity: parseInt(e.target.value) } as InventoryItem)}
                            />
                            <Input
                                label="Supplier"
                                value={selectedItem?.supplier || ''}
                                onChange={(e) => setSelectedItem({ ...selectedItem, supplier: e.target.value } as InventoryItem)}
                            />
                            <Input
                                label="Purchase Date"
                                type="date"
                                value={selectedItem?.purchaseDate || ''}
                                onChange={(e) => setSelectedItem({ ...selectedItem, purchaseDate: e.target.value } as InventoryItem)}
                            />
                            <Input
                                label="Expiration Date"
                                type="date"
                                value={selectedItem?.expirationDate || ''}
                                onChange={(e) => setSelectedItem({ ...selectedItem, expirationDate: e.target.value } as InventoryItem)}
                            />
                            <Input
                                label="Usage Rate"
                                type="number"
                                value={selectedItem?.usageRate || ''}
                                onChange={(e) => setSelectedItem({ ...selectedItem, usageRate: parseFloat(e.target.value) } as InventoryItem)}
                            />
                            <Input
                                label="Reorder Point"
                                type="number"
                                value={selectedItem?.reorderPoint || ''}
                                onChange={(e) => setSelectedItem({ ...selectedItem, reorderPoint: parseInt(e.target.value) } as InventoryItem)}
                            />
                            <Input
                                label="Optimal Stock Level"
                                type="number"
                                value={selectedItem?.optimalStockLevel || ''}
                                onChange={(e) => setSelectedItem({ ...selectedItem, optimalStockLevel: parseInt(e.target.value) } as InventoryItem)}
                            />
                            <Button type="submit">{selectedItem ? 'Update Item' : 'Add Item'}</Button>
                        </form>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Demand Forecast</h2>
                    <Button onClick={generateForecast}>Generate Forecast</Button>
                    <div className="mt-4">
                        <LineChart width={600} height={300} data={forecastData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="demand" stroke="#8884d8" />
                        </LineChart>
                    </div>
                </div>
            </Box>
        </Box>
    );
};

export default InventoryManagement;