"use client";
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';

interface Transaction {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    date: string;
    source: string;
    purpose: string;
}

const FinancialManagement: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [financialSummary, setFinancialSummary] = useState({ income: 0, expense: 0, balance: 0 });

    const handleAddTransaction = (newTransaction: Transaction) => {
        setTransactions([...transactions, newTransaction]);
        updateFinancialSummary([...transactions, newTransaction]);
    };

    const handleUpdateTransaction = (updatedTransaction: Transaction) => {
        const updatedTransactions = transactions.map(transaction =>
            transaction.id === updatedTransaction.id ? updatedTransaction : transaction
        );
        setTransactions(updatedTransactions);
        updateFinancialSummary(updatedTransactions);
    };

    const updateFinancialSummary = (transactionList: Transaction[]) => {
        const summary = transactionList.reduce((acc, transaction) => {
            if (transaction.type === 'income') {
                acc.income += transaction.amount;
                acc.balance += transaction.amount;
            } else {
                acc.expense += transaction.amount;
                acc.balance -= transaction.amount;
            }
            return acc;
        }, { income: 0, expense: 0, balance: 0 });
        setFinancialSummary(summary);
    };

    return (
        <Box sx={{ p: 4, minHeight: '100vh', py: 16, mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ maxWidth: 'md', width: '100%' }}>
                <Typography variant="h4" sx={{ mb: 4 , fontWeight: 'bold'}} >Financial Management for Gram Panchayat</Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
                    <Box>
                        <Typography variant="h5" sx={{ mb: 2 }}>Transaction List</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.map((transaction) => (
                                        <TableRow key={transaction.id} onClick={() => setSelectedTransaction(transaction)}>
                                            <TableCell>{transaction.id}</TableCell>
                                            <TableCell>{transaction.type}</TableCell>
                                            <TableCell>{transaction.amount}</TableCell>
                                            <TableCell>{transaction.date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box>
                        <Typography variant="h5" sx={{ mb: 2 }}>Transaction Details</Typography>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            selectedTransaction ? handleUpdateTransaction(selectedTransaction) : handleAddTransaction(selectedTransaction as unknown as Transaction);
                        }}>
                            <TextField
                                label="Transaction ID"
                                value={selectedTransaction?.id || ''}
                                onChange={(e) => setSelectedTransaction({ ...selectedTransaction, id: e.target.value } as Transaction)}
                                fullWidth
                                margin="normal"
                            />
                            <Select
                                label="Type"
                                value={selectedTransaction?.type || ''}
                                onChange={(e) => setSelectedTransaction({ ...selectedTransaction, type: e.target.value as 'income' | 'expense' } as Transaction)}
                                fullWidth
                                margin="dense"
                            >
                                <MenuItem value="income">Income</MenuItem>
                                <MenuItem value="expense">Expense</MenuItem>
                            </Select>
                            <TextField
                                label="Amount"
                                type="number"
                                value={selectedTransaction?.amount || ''}
                                onChange={(e) => setSelectedTransaction({ ...selectedTransaction, amount: parseFloat(e.target.value) } as Transaction)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Date"
                                type="date"
                                value={selectedTransaction?.date || ''}
                                onChange={(e) => setSelectedTransaction({ ...selectedTransaction, date: e.target.value } as Transaction)}
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Source/Purpose"
                                value={selectedTransaction?.source || selectedTransaction?.purpose || ''}
                                onChange={(e) => setSelectedTransaction({
                                    ...selectedTransaction,
                                    [selectedTransaction?.type === 'income' ? 'source' : 'purpose']: e.target.value
                                } as Transaction)}
                                fullWidth
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                {selectedTransaction ? 'Update Transaction' : 'Add Transaction'}
                            </Button>
                        </form>
                    </Box>
                </Box>

                <Box sx={{ mt: 8 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Financial Summary</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                        <Paper sx={{ p: 2, bgcolor: 'success.light' }}>
                            <Typography variant="h6">Total Income</Typography>
                            <Typography variant="h4">₹{financialSummary.income.toFixed(2)}</Typography>
                        </Paper>
                        <Paper sx={{ p: 2, bgcolor: 'error.light' }}>
                            <Typography variant="h6">Total Expense</Typography>
                            <Typography variant="h4">₹{financialSummary.expense.toFixed(2)}</Typography>
                        </Paper>
                        <Paper sx={{ p: 2, bgcolor: 'info.light' }}>
                            <Typography variant="h6">Balance</Typography>
                            <Typography variant="h4">₹{financialSummary.balance.toFixed(2)}</Typography>
                        </Paper>
                    </Box>
                </Box>
                <Box sx={{ mt: 8 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Financial Overview</Typography>
                    <Box sx={{ width: '100%', height: 300 }}>
                        <BarChart
                            width={600}
                            height={300}
                            data={[
                                { name: 'Income', amount: financialSummary.income },
                                { name: 'Expense', amount: financialSummary.expense },
                                { name: 'Balance', amount: financialSummary.balance },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#8884d8" />
                        </BarChart>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default FinancialManagement;