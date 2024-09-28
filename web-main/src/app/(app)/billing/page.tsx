/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';
import { Delete, Download, Payment } from '@mui/icons-material';
import { jsPDF } from 'jspdf';

interface Bill {
  _id: string;
  consumer_name: string;
  billing_amount: number;  // billing_amount is a number
  due_date: string;
  payment_status: string;
  panchayat_id: string;
}

interface NewBill {
  consumer_name: string;
  billing_amount: string;  // billing_amount is initially a string from form input
  due_date: string;
  payment_status: string;
  panchayat_id: string;
}

interface Panchayats {
  [key: string]: string;
}

const BillingManagementPage: React.FC = () => {
  const hardcodedBills: Bill[] = [
    {
      _id: '1',
      consumer_name: 'John Doe',
      billing_amount: 1500,
      due_date: '2024-10-15',
      payment_status: 'Paid',
      panchayat_id: 'p1',
    },
    {
      _id: '2',
      consumer_name: 'Jane Smith',
      billing_amount: 3000,
      due_date: '2024-10-25',
      payment_status: 'Unpaid',
      panchayat_id: 'p2',
    },
    {
      _id: '3',
      consumer_name: 'Bob Johnson',
      billing_amount: 2200,
      due_date: '2024-10-18',
      payment_status: 'Overdue',
      panchayat_id: 'p1',
    },
  ];

  const hardcodedPanchayats: Panchayats = {
    p1: 'Panchayat A',
    p2: 'Panchayat B',
  };

  const [bills, setBills] = useState<Bill[]>(hardcodedBills);
  const [panchayats, setPanchayats] = useState<Panchayats>(hardcodedPanchayats);
  const [selectedBillId, setSelectedBillId] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [newBill, setNewBill] = useState<NewBill>({
    consumer_name: '',
    billing_amount: '',
    due_date: '',
    payment_status: '',
    panchayat_id: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDelete = () => {
    if (selectedBillId) {
      setBills(bills.filter(bill => bill._id !== selectedBillId));
      setSuccess('Bill deleted successfully');
      setOpenDeleteDialog(false);
      setSelectedBillId(null);
    }
  };

  const handleCreateBill = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Convert billing_amount to a number before creating the new bill
    const newBillWithId: Bill = {
      _id: `${bills.length + 1}`,
      consumer_name: newBill.consumer_name,
      billing_amount: parseFloat(newBill.billing_amount),  // Convert string to number
      due_date: newBill.due_date,
      payment_status: newBill.payment_status,
      panchayat_id: newBill.panchayat_id,
    };

    setBills([...bills, newBillWithId]);
    setSuccess('Bill created successfully');
    setNewBill({
      consumer_name: '',
      billing_amount: '',
      due_date: '',
      payment_status: '',
      panchayat_id: '',
    });
  };

  const downloadInvoice = (bill: Bill) => {
    try {
      const doc = new jsPDF();
      doc.text(`Invoice`, 10, 10);
      doc.text(`Consumer Name: ${bill.consumer_name}`, 10, 20);
      doc.text(`Billing Amount: ₹${bill.billing_amount}`, 10, 30);
      doc.text(`Due Date: ${new Date(bill.due_date).toLocaleDateString()}`, 10, 40);
      doc.text(`Payment Status: ${bill.payment_status}`, 10, 50);
      doc.text(`Panchayat: ${panchayats[bill.panchayat_id] || 'Unknown'}`, 10, 60);
      doc.save(`invoice_${bill._id}.pdf`);
    } catch (error) {
      console.error('Error generating invoice:', error);
      setError('Error generating invoice');
    }
  };

  const handlePayment = (bill: Bill) => {
    alert(`Payment processing for ${bill.consumer_name}`);
    // This is a placeholder to show how payment functionality could be triggered
    // Replace this with real payment integration logic
  };

  return (
    <Box p={4} display="flex" className="py-16 min-h-screen my-8">
      <Box flex={1} mr={2} borderRight="1px solid #ddd">
        <Typography variant="h4" gutterBottom>Billing Management</Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Box mb={4}>
          <Typography variant="h6" gutterBottom>Add New Bill</Typography>
          <form onSubmit={handleCreateBill}>
            <TextField
              label="Consumer Name"
              fullWidth
              margin="normal"
              value={newBill.consumer_name}
              onChange={(e) => setNewBill({ ...newBill, consumer_name: e.target.value })}
              required
            />
            <TextField
              label="Billing Amount"
              type="number"
              fullWidth
              margin="normal"
              value={newBill.billing_amount}
              onChange={(e) => setNewBill({ ...newBill, billing_amount: e.target.value })}
              required
            />
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              margin="normal"
              value={newBill.due_date}
              onChange={(e) => setNewBill({ ...newBill, due_date: e.target.value })}
              required
            />
            <TextField
              label="Payment Status"
              fullWidth
              margin="normal"
              value={newBill.payment_status}
              onChange={(e) => setNewBill({ ...newBill, payment_status: e.target.value })}
              required
            />
            <TextField
              label="Panchayat ID"
              fullWidth
              margin="normal"
              value={newBill.panchayat_id}
              onChange={(e) => setNewBill({ ...newBill, panchayat_id: e.target.value })}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Bill
            </Button>
          </form>
        </Box>

        <Typography variant="h6" gutterBottom>Billing List</Typography>
        <List>
          {bills.map((bill) => (
            <ListItem
              key={bill._id}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="download" onClick={() => downloadInvoice(bill)}>
                    <Download />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => { setSelectedBillId(bill._id); setOpenDeleteDialog(true); }}>
                    <Delete />
                  </IconButton>
                  <IconButton edge="end" aria-label="payment" onClick={() => handlePayment(bill)}>
                    <Payment />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={`Consumer: ${bill.consumer_name}`}
                secondary={`Amount: ₹${bill.billing_amount}, Due Date: ${new Date(bill.due_date).toLocaleDateString()}, Status: ${bill.payment_status}, Panchayat: ${panchayats[bill.panchayat_id] || 'Unknown'}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Bill</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this bill?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BillingManagementPage;
