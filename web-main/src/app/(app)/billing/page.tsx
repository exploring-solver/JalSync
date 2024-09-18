"use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';
// import { Delete, Download, Payment } from '@mui/icons-material';
// import { jsPDF } from 'jspdf';
// import useRazorpay from 'react-razorpay';

// const BillingManagementPage = () => {
//   const [bills, setBills] = useState([]);
//   const [panchayats, setPanchayats] = useState({});
//   const [selectedBillId, setSelectedBillId] = useState(null);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [newBill, setNewBill] = useState({
//     consumer_name: '',
//     billing_amount: '',
//     due_date: '',
//     payment_status: '',
//     panchayat_id: ''
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const Razorpay = useRazorpay();

//   useEffect(() => {
//     const fetchBills = async () => {
//       try {
//         const billResponse = await axios.get('http://localhost:5000/api/billings/');
//         const fetchedBills = billResponse.data;
//         setBills(fetchedBills);

//         const panchayatIds = [...new Set(fetchedBills.map(bill => bill.panchayat_id))];
//         if (panchayatIds.length > 0) {
//           const panchayatRequests = panchayatIds.map(id => axios.get(`http://localhost:5000/api/panchayats/${id}`));
//           const panchayatResponses = await Promise.all(panchayatRequests);
//           const panchayatMap = panchayatResponses.reduce((acc, { data }) => {
//             acc[data._id] = data.panchayat_name;
//             return acc;
//           }, {});
//           setPanchayats(panchayatMap);
//         }
//       } catch (error) {
//         console.error('Error fetching bills or panchayats:', error);
//         setError('Error fetching bills or panchayats');
//       }
//     };

//     fetchBills();
//   }, []);

//   const handleDelete = async () => {
//     if (selectedBillId) {
//       try {
//         await axios.delete(`http://localhost:5000/api/billings/${selectedBillId}`);
//         setBills(bills.filter(bill => bill._id !== selectedBillId));
//         setSuccess('Bill deleted successfully');
//       } catch (error) {
//         setError('Error deleting bill');
//         console.error('Error deleting bill:', error);
//       }
//       setOpenDeleteDialog(false);
//       setSelectedBillId(null);
//     }
//   };

//   const handleCreateBill = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/billings/', newBill);
//       setBills([...bills, response.data]);
//       setSuccess('Bill created successfully');
//       setNewBill({
//         consumer_name: '',
//         billing_amount: '',
//         due_date: '',
//         payment_status: '',
//         panchayat_id: ''
//       });
//     } catch (error) {
//       setError('Error creating bill');
//       console.error('Error creating bill:', error);
//     }
//   };

//   const downloadInvoice = async (bill) => {
//     try {
//       const doc = new jsPDF();
//       doc.text(`Invoice`, 10, 10);
//       doc.text(`Consumer Name: ${bill.consumer_name}`, 10, 20);
//       doc.text(`Billing Amount: ₹${bill.billing_amount}`, 10, 30);
//       doc.text(`Due Date: ${new Date(bill.due_date).toLocaleDateString()}`, 10, 40);
//       doc.text(`Payment Status: ${bill.payment_status}`, 10, 50);
//       doc.text(`Panchayat: ${panchayats[bill.panchayat_id] || 'Unknown'}`, 10, 60);
//       doc.save(`invoice_${bill._id}.pdf`);
//     } catch (error) {
//       console.error('Error generating invoice:', error);
//       setError('Error generating invoice');
//     }
//   };

//   const handlePayment = async (bill) => {
//     try {
//       const paymentResponse = await axios.post('http://localhost:5000/api/payments/', { amount: bill.billing_amount * 100 });
//       const { orderId, razorpayKeyId } = paymentResponse.data;

//       const options = {
//         key: razorpayKeyId,
//         amount: bill.billing_amount * 100,
//         currency: 'INR',
//         name: 'Your Company Name',
//         description: 'Billing Payment',
//         order_id: orderId,
//         handler: async (response) => {
//           try {
//             const verificationResponse = await axios.post('http://localhost:5000/api/verify', {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             });

//             if (verificationResponse.status === 200) {
//               setSuccess('Payment Successful');
//               // Update the bill status or refetch bills here
//             }
//           } catch (error) {
//             console.error('Error verifying payment:', error);
//             setError('Error verifying payment');
//           }
//         },
//         prefill: {
//           name: bill.consumer_name,
//           email: '',
//           contact: '',
//         },
//         theme: {
//           color: '#F37254'
//         }
//       };

//       const razorpay = new Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//       setError('Error initiating payment');
//     }
//   };
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';
import { Delete, Download, Payment } from '@mui/icons-material';
import { jsPDF } from 'jspdf';

const BillingManagementPage = () => {
  const [bills, setBills] = useState([]);
  const [panchayats, setPanchayats] = useState({});
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newBill, setNewBill] = useState({
    consumer_name: '',
    billing_amount: '',
    due_date: '',
    payment_status: '',
    panchayat_id: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const billResponse = await axios.get('http://localhost:5000/api/billings/');
        const fetchedBills = billResponse.data;
        setBills(fetchedBills);

        const panchayatIds = [...new Set(fetchedBills.map(bill => bill.panchayat_id))];
        if (panchayatIds.length > 0) {
          const panchayatRequests = panchayatIds.map(id => axios.get(`http://localhost:5000/api/panchayats/${id}`));
          const panchayatResponses = await Promise.all(panchayatRequests);
          const panchayatMap = panchayatResponses.reduce((acc, { data }) => {
            acc[data._id] = data.panchayat_name;
            return acc;
          }, {});
          setPanchayats(panchayatMap);
        }
      } catch (error) {
        console.error('Error fetching bills or panchayats:', error);
        setError('Error fetching bills or panchayats');
      }
    };

    fetchBills();

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleDelete = async () => {
    if (selectedBillId) {
      try {
        await axios.delete(`http://localhost:5000/api/billings/${selectedBillId}`);
        setBills(bills.filter(bill => bill._id !== selectedBillId));
        setSuccess('Bill deleted successfully');
      } catch (error) {
        setError('Error deleting bill');
        console.error('Error deleting bill:', error);
      }
      setOpenDeleteDialog(false);
      setSelectedBillId(null);
    }
  };

  const handleCreateBill = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/billings/', newBill);
      setBills([...bills, response.data]);
      setSuccess('Bill created successfully');
      setNewBill({
        consumer_name: '',
        billing_amount: '',
        due_date: '',
        payment_status: '',
        panchayat_id: ''
      });
    } catch (error) {
      setError('Error creating bill');
      console.error('Error creating bill:', error);
    }
  };

  const downloadInvoice = async (bill) => {
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

  const handlePayment = async (bill) => {
    try {
      const paymentResponse = await axios.post('http://localhost:5000/api/payments/', { amount: bill.billing_amount * 100 });
      const { orderId, razorpayKeyId } = paymentResponse.data;

      const options = {
        key: razorpayKeyId,
        amount: bill.billing_amount * 100,
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Billing Payment',
        order_id: orderId,
        handler: async (response) => {
          try {
            const verificationResponse = await axios.post('http://localhost:5000/api/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationResponse.status === 200) {
              setSuccess('Payment Successful');
              // Update the bill status or refetch bills here
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            setError('Error verifying payment');
          }
        },
        prefill: {
          name: bill.consumer_name,
          email: '',
          contact: '',
        },
        theme: {
          color: '#F37254'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      setError('Error initiating payment');
    }
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