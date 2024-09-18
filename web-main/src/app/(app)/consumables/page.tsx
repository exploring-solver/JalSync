"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Alert, Divider } from '@mui/material';
import { Delete } from '@mui/icons-material';

const ConsumableManagementPage: React.FC = () => {
  const [consumables, setConsumables] = useState<any[]>([]);
  const [selectedConsumableId, setSelectedConsumableId] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newConsumable, setNewConsumable] = useState({
    item_name: '',
    current_quantity: '',
    minimum_threshold: '',
    replenishment_due_date: '',
    panchayat_id: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [panchayats, setPanchayats] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    const fetchConsumables = async () => {
      try {
        // Fetch consumables
        const consumableResponse = await axios.get('http://localhost:5000/api/consumables/');
        const fetchedConsumables = consumableResponse.data;
        setConsumables(fetchedConsumables);

        // Fetch panchayat names
        const panchayatIds = [...new Set(fetchedConsumables.map((consumable: any) => consumable.panchayat_id))];
        if (panchayatIds.length > 0) {
          const panchayatRequests = panchayatIds.map(id => axios.get(`http://localhost:5000/api/panchayats/${id}`));
          const panchayatResponses = await Promise.all(panchayatRequests);
          const panchayatMap = panchayatResponses.reduce((acc: { [id: string]: string }, { data }: any) => {
            acc[data._id] = data.name;
            return acc;
          }, {});
          setPanchayats(panchayatMap);
        }
      } catch (error) {
        console.error('Error fetching consumables or panchayats:', error);
      }
    };

    fetchConsumables();
  }, []);

  const handleDelete = async () => {
    if (selectedConsumableId) {
      try {
        await axios.delete(`http://localhost:5000/api/consumables/${selectedConsumableId}`);
        setConsumables(consumables.filter(consumable => consumable._id !== selectedConsumableId));
        setSuccess('Consumable deleted successfully');
      } catch (error) {
        setError('Error deleting consumable');
        console.error('Error deleting consumable:', error);
      }
      setOpenDeleteDialog(false);
      setSelectedConsumableId(null);
    }
  };

  const handleCreateConsumable = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/consumables/', newConsumable);
      setConsumables([...consumables, response.data]);
      setSuccess('Consumable created successfully');
      setNewConsumable({
        item_name: '',
        current_quantity: '',
        minimum_threshold: '',
        replenishment_due_date: '',
        panchayat_id: ''
      });
    } catch (error) {
      setError('Error creating consumable');
      console.error('Error creating consumable:', error);
    }
  };

  return (
    <Box p={4} display="flex">
      <Box flex={1} mr={2} borderRight="1px solid #ddd">
        <Typography variant="h4" gutterBottom>Consumable Management</Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Box mb={4}>
          <Typography variant="h6" gutterBottom>Add New Consumable</Typography>
          <form onSubmit={handleCreateConsumable}>
            <TextField
              label="Item Name"
              fullWidth
              margin="normal"
              value={newConsumable.item_name}
              onChange={(e) => setNewConsumable({ ...newConsumable, item_name: e.target.value })}
              required
            />
            <TextField
              label="Current Quantity"
              type="number"
              fullWidth
              margin="normal"
              value={newConsumable.current_quantity}
              onChange={(e) => setNewConsumable({ ...newConsumable, current_quantity: e.target.value })}
              required
            />
            <TextField
              label="Minimum Threshold"
              type="number"
              fullWidth
              margin="normal"
              value={newConsumable.minimum_threshold}
              onChange={(e) => setNewConsumable({ ...newConsumable, minimum_threshold: e.target.value })}
              required
            />
            <TextField
              label="Replenishment Due Date"
              type="date"
              fullWidth
              margin="normal"
              value={newConsumable.replenishment_due_date}
              onChange={(e) => setNewConsumable({ ...newConsumable, replenishment_due_date: e.target.value })}
              required
            />
            <TextField
              label="Panchayat ID"
              fullWidth
              margin="normal"
              value={newConsumable.panchayat_id}
              onChange={(e) => setNewConsumable({ ...newConsumable, panchayat_id: e.target.value })}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Consumable
            </Button>
          </form>
        </Box>

        <Typography variant="h6" gutterBottom>Consumables List</Typography>
        <List>
          {consumables.map((consumable) => (
            <ListItem
              key={consumable._id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => { setSelectedConsumableId(consumable._id); setOpenDeleteDialog(true); }}>
                  <Delete />
                </IconButton>
              }
              sx={{ borderBottom: '1px solid #ddd' }}
            >
              <ListItemText
                primary={`Item Name: ${consumable.item_name}`}
                secondary={`Quantity: ${consumable.current_quantity}, Minimum Threshold: ${consumable.minimum_threshold}, Replenishment Due Date: ${new Date(consumable.replenishment_due_date).toLocaleDateString()}, Panchayat: ${panchayats[consumable.panchayat_id] || 'Unknown'}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this consumable?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConsumableManagementPage;
