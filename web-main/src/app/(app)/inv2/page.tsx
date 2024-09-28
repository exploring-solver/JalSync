"use client";
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Container,
  Typography,
  Grid,
  CardContent,
  Card,
  CardActions,
} from '@mui/material';

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

  // Add some dummy data for the inventory when the component mounts
  useEffect(() => {
    const dummyInventory: InventoryItem[] = [
      {
        id: '1',
        name: 'Chlorine',
        category: 'Chemical',
        quantity: 100,
        supplier: 'Supplier A',
        purchaseDate: '2023-09-01',
        expirationDate: '2024-09-01',
        usageRate: 10,
        reorderPoint: 20,
        optimalStockLevel: 150,
      },
      {
        id: '2',
        name: 'Water Filter',
        category: 'Filter',
        quantity: 50,
        supplier: 'Supplier B',
        purchaseDate: '2023-08-15',
        expirationDate: '2025-08-15',
        usageRate: 5,
        reorderPoint: 10,
        optimalStockLevel: 60,
      },
      {
        id: '3',
        name: 'Valve Spare',
        category: 'Spare Part',
        quantity: 30,
        supplier: 'Supplier C',
        purchaseDate: '2023-07-10',
        expirationDate: '2026-07-10',
        usageRate: 2,
        reorderPoint: 5,
        optimalStockLevel: 40,
      },
    ];
    setInventory(dummyInventory);
  }, []);

  const handleAddItem = (newItem: InventoryItem) => {
    setInventory([...inventory, newItem]);
  };

  const handleUpdateItem = (updatedItem: InventoryItem) => {
    setInventory(inventory.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  // Add dummy data for the forecast
  const generateForecast = () => {
    const mockForecast: ForecastData[] = [
      { month: 'Jan', demand: 80 },
      { month: 'Feb', demand: 100 },
      { month: 'Mar', demand: 120 },
      { month: 'Apr', demand: 110 },
      { month: 'May', demand: 130 },
      { month: 'Jun', demand: 140 },
    ];
    setForecastData(mockForecast);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8, mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Inventory Management and Demand Forecasting
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Inventory List
              </Typography>
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
                      <TableRow
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        hover
                        sx={{
                          '&:hover': {
                            backgroundColor: '#f5f5f5',
                            cursor: 'pointer',
                          },
                        }}
                      >
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Item Details
              </Typography>
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  selectedItem
                    ? handleUpdateItem(selectedItem)
                    : handleAddItem(selectedItem as unknown as InventoryItem);
                }}
                sx={{ '& .MuiTextField-root': { my: 1 } }}
              >
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
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  value={selectedItem?.quantity || ''}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, quantity: parseInt(e.target.value) } as InventoryItem)
                  }
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
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, usageRate: parseFloat(e.target.value) } as InventoryItem)
                  }
                />
                <TextField
                  fullWidth
                  label="Reorder Point"
                  type="number"
                  value={selectedItem?.reorderPoint || ''}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, reorderPoint: parseInt(e.target.value) } as InventoryItem)
                  }
                />
                <TextField
                  fullWidth
                  label="Optimal Stock Level"
                  type="number"
                  value={selectedItem?.optimalStockLevel || ''}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, optimalStockLevel: parseInt(e.target.value) } as InventoryItem)
                  }
                />
                <CardActions>
                  <Button type="submit" variant="contained" color="primary">
                    {selectedItem ? 'Update Item' : 'Add Item'}
                  </Button>
                </CardActions>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Demand Forecast
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button onClick={generateForecast} variant="contained" color="primary">
                Generate Forecast
              </Button>
            </Box>
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
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default InventoryManagement;
