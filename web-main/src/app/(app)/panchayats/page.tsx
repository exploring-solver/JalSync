/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from '@mui/material';
import { Delete } from '@mui/icons-material';

const PanchayatManagementPage: React.FC = () => {
  const [panchayats, setPanchayats] = useState<any[]>([]);
  const [selectedPanchayatId, setSelectedPanchayatId] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newPanchayat, setNewPanchayat] = useState({
    panchayat_name: '',
    district: '',
    state: '',
    contact_details: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchPanchayats = async () => {
      try {
        // Fetch panchayats
        const panchayatResponse = await axios.get('http://localhost:5000/api/panchayats/');
        setPanchayats(panchayatResponse.data);
      } catch (error) {
        console.error('Error fetching panchayats:', error);
      }
    };

    fetchPanchayats();
  }, []);

  const handleDelete = async () => {
    if (selectedPanchayatId) {
      try {
        await axios.delete(`http://localhost:5000/api/panchayats/${selectedPanchayatId}`);
        setPanchayats(panchayats.filter(panchayat => panchayat._id !== selectedPanchayatId));
        setSuccess('Panchayat deleted successfully');
      } catch (error) {
        setError('Error deleting panchayat');
        console.error('Error deleting panchayat:', error);
      }
      setOpenDeleteDialog(false);
      setSelectedPanchayatId(null);
    }
  };

  const handleCreatePanchayat = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/panchayats/', newPanchayat);
      setPanchayats([...panchayats, response.data]);
      setSuccess('Panchayat created successfully');
      setNewPanchayat({
        panchayat_name: '',
        district: '',
        state: '',
        contact_details: ''
      });
    } catch (error) {
      setError('Error creating panchayat');
      console.error('Error creating panchayat:', error);
    }
  };

  return (
    <Box p={4} display="flex" className="py-16 min-h-screen my-8">
      <Box flex={1} mr={2} borderRight="1px solid #ddd">
        <Typography variant="h4" gutterBottom>Panchayat Management</Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Box mb={4}>
          <Typography variant="h6" gutterBottom>Add New Panchayat</Typography>
          <form onSubmit={handleCreatePanchayat}>
            <TextField
              label="Panchayat Name"
              fullWidth
              margin="normal"
              value={newPanchayat.panchayat_name}
              onChange={(e) => setNewPanchayat({ ...newPanchayat, panchayat_name: e.target.value })}
              required
            />
            <TextField
              label="District"
              fullWidth
              margin="normal"
              value={newPanchayat.district}
              onChange={(e) => setNewPanchayat({ ...newPanchayat, district: e.target.value })}
              required
            />
            <TextField
              label="State"
              fullWidth
              margin="normal"
              value={newPanchayat.state}
              onChange={(e) => setNewPanchayat({ ...newPanchayat, state: e.target.value })}
              required
            />
            <TextField
              label="Contact Details"
              fullWidth
              margin="normal"
              value={newPanchayat.contact_details}
              onChange={(e) => setNewPanchayat({ ...newPanchayat, contact_details: e.target.value })}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Panchayat
            </Button>
          </form>
        </Box>

        <Typography variant="h6" gutterBottom>Panchayats List</Typography>
        <List>
          {panchayats.map((panchayat) => (
            <ListItem
              key={panchayat._id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => { setSelectedPanchayatId(panchayat._id); setOpenDeleteDialog(true); }}>
                  <Delete />
                </IconButton>
              }
              sx={{ borderBottom: '1px solid #ddd' }}
            >
              <ListItemText
                primary={`Panchayat Name: ${panchayat.panchayat_name}`}
                secondary={`District: ${panchayat.district}, State: ${panchayat.state}, Contact Details: ${panchayat.contact_details}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this panchayat?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PanchayatManagementPage;
