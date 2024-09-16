"use client";
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Table } from '@/components/ui/table';
import { Box } from '@mui/material';
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
        <Box p={4} className="min-h-screen py-12 mt-10 flex justify-center items-center">
            <Box maxWidth="md" width="100%">
                <h1 className="text-2xl font-bold mb-4">Financial Management for Gram Panchayat</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Transaction List</h2>
                        <Table
                            data={transactions}
                            columns={[
                                { header: 'ID', accessor: 'id' },
                                { header: 'Type', accessor: 'type' },
                                { header: 'Amount', accessor: 'amount' },
                                { header: 'Date', accessor: 'date' },
                            ]}
                            onRowClick={setSelectedTransaction}
                        />
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Transaction Details</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            selectedTransaction ? handleUpdateTransaction(selectedTransaction) : handleAddTransaction(selectedTransaction as Transaction);
                        }}>
                            <Input
                                label="Transaction ID"
                                value={selectedTransaction?.id || ''}
                                onChange={(e) => setSelectedTransaction({ ...selectedTransaction, id: e.target.value } as Transaction)}
                            />
                            <Select
                                label="Type"
                                options={['income', 'expense']}
                                value={selectedTransaction?.type || ''}
                                onChange={(value) => setSelectedTransaction({ ...selectedTransaction, type: value as 'income' | 'expense' } as Transaction)}
                            />
                            <Input
                                label="Amount"
                                type="number"
                                value={selectedTransaction?.amount || ''}
                                onChange={(e) => setSelectedTransaction({ ...selectedTransaction, amount: parseFloat(e.target.value) } as Transaction)}
                            />
                            <Input
                                label="Date"
                                type="date"
                                value={selectedTransaction?.date || ''}
                                onChange={(e) => setSelectedTransaction({ ...selectedTransaction, date: e.target.value } as Transaction)}
                            />
                            <Input
                                label="Source/Purpose"
                                value={selectedTransaction?.source || selectedTransaction?.purpose || ''}
                                onChange={(e) => setSelectedTransaction({
                                    ...selectedTransaction,
                                    [selectedTransaction?.type === 'income' ? 'source' : 'purpose']: e.target.value
                                } as Transaction)}
                            />
                            <Button type="submit">{selectedTransaction ? 'Update Transaction' : 'Add Transaction'}</Button>
                        </form>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Financial Summary</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-green-100 p-4 rounded">
                            <h3 className="font-semibold">Total Income</h3>
                            <p className="text-2xl">₹{financialSummary.income.toFixed(2)}</p>
                        </div>
                        <div className="bg-red-100 p-4 rounded">
                            <h3 className="font-semibold">Total Expense</h3>
                            <p className="text-2xl">₹{financialSummary.expense.toFixed(2)}</p>
                        </div>
                        <div className="bg-blue-100 p-4 rounded">
                            <h3 className="font-semibold">Balance</h3>
                            <p className="text-2xl">₹{financialSummary.balance.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2">Financial Overview</h2>
                    <BarChart width={600} height={300} data={[
                        { name: 'Income', amount: financialSummary.income },
                        { name: 'Expense', amount: financialSummary.expense },
                        { name: 'Balance', amount: financialSummary.balance },
                    ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                </div>
            </Box>
        </Box>
    );
};

export default FinancialManagement;