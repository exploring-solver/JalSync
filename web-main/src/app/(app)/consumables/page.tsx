"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert
} from '@mui/material';
import { Delete } from '@mui/icons-material';

interface Consumable {
  _id: string;
  item_name: string;
  current_quantity: number;
  minimum_threshold: number;
  replenishment_due_date: string;
  panchayat_id: string;
}

interface Panchayat {
  _id: string;
  name: string;
}

const ConsumableManagementPage: React.FC = () => {
  // Hardcoded dummy data for consumables and panchayats
  const dummyConsumables: Consumable[] = [
    {
      _id: '1',
      item_name: 'Water Purification Tablets',
      current_quantity: 120,
      minimum_threshold: 50,
      replenishment_due_date: '2024-12-01',
      panchayat_id: 'p1',
    },
    {
      _id: '2',
      item_name: 'First Aid Kits',
      current_quantity: 20,
      minimum_threshold: 10,
      replenishment_due_date: '2024-11-15',
      panchayat_id: 'p2',
    },
    {
      _id: '3',
      item_name: 'Sanitation Kits',
      current_quantity: 60,
      minimum_threshold: 30,
      replenishment_due_date: '2024-10-30',
      panchayat_id: 'p1',
    },
  ];

  const dummyPanchayats: { [id: string]: string } = {
    p1: 'Panchayat A',
    p2: 'Panchayat B',
  };

  // State Initialization
  const [consumables, setConsumables] = useState<Consumable[]>(dummyConsumables);
  const [selectedConsumableId, setSelectedConsumableId] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [newConsumable, setNewConsumable] = useState<Consumable>({
    _id: '',
    item_name: '',
    current_quantity: 0,
    minimum_threshold: 0,
    replenishment_due_date: '',
    panchayat_id: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [panchayats, setPanchayats] = useState<{ [id: string]: string }>(dummyPanchayats);

  useEffect(() => {
    // Here we already have the hardcoded data, so no need to fetch from the backend.
    setConsumables(dummyConsumables);
    setPanchayats(dummyPanchayats);
  }, []);

  const handleDelete = () => {
    if (selectedConsumableId) {
      setConsumables(consumables.filter(consumable => consumable._id !== selectedConsumableId));
      setSuccess('Consumable deleted successfully');
      setOpenDeleteDialog(false);
      setSelectedConsumableId(null);
    }
  };

  const handleCreateConsumable = (event: React.FormEvent) => {
    event.preventDefault();
    const newConsumableWithId = {
      ...newConsumable,
      _id: (consumables.length + 1).toString(), // Auto-generate a new ID
    };
    setConsumables([...consumables, newConsumableWithId]);
    setSuccess('Consumable created successfully');
    setNewConsumable({
      _id: '',
      item_name: '',
      current_quantity: 0,
      minimum_threshold: 0,
      replenishment_due_date: '',
      panchayat_id: ''
    });
  };

  return (
    <Box p={4} display="flex" flexDirection="column" alignItems="center" className="min-h-screen py-20 px-10">
      <Typography variant="h4" gutterBottom className="font-semibold text-center">
        Consumable Management
      </Typography>

      {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ width: '100%', mb: 2 }}>{success}</Alert>}

      <Box mb={4}>
        <Typography variant="h6" gutterBottom className="font-semibold text-left">Add New Consumable</Typography>
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
            onChange={(e) => setNewConsumable({ ...newConsumable, current_quantity: Number(e.target.value) })}
            required
          />
          <TextField
            label="Minimum Threshold"
            type="number"
            fullWidth
            margin="normal"
            value={newConsumable.minimum_threshold}
            onChange={(e) => setNewConsumable({ ...newConsumable, minimum_threshold: Number(e.target.value) })}
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
            InputLabelProps={{ shrink: true }}
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

      <Typography variant="h6" gutterBottom className="font-semibold">Consumables List</Typography>
      <List sx={{ width: '100%', maxWidth: '600px', bgcolor: 'background.paper' }}>
        {consumables.map((consumable) => (
          <ListItem
            key={consumable._id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => {
                setSelectedConsumableId(consumable._id);
                setOpenDeleteDialog(true);
              }}>
                <Delete />
              </IconButton>
            }
          >
            <ListItemText
              primary={`Item Name: ${consumable.item_name}`}
              secondary={`Quantity: ${consumable.current_quantity}, Minimum Threshold: ${consumable.minimum_threshold}, Replenishment Due Date: ${new Date(consumable.replenishment_due_date).toLocaleDateString()}, Panchayat: ${panchayats[consumable.panchayat_id] || 'Unknown'}`}
            />
          </ListItem>
        ))}
      </List>

      {/* Delete Confirmation Dialog */}
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
