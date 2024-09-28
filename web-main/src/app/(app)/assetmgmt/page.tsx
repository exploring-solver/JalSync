/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Collapse, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Alert, Divider } from '@mui/material';
import { ExpandMore, ExpandLess, Delete } from '@mui/icons-material';

interface Asset {
  _id: string;
  asset_type: string;
  location_latitude: string;
  location_longitude: string;
  installation_date: string;
  panchayat_id: string;
}

interface NewAsset {
  asset_type: string;
  location_latitude: string;
  location_longitude: string;
  installation_date: string;
  panchayat_id: string;
}

const AssetManagementPage: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [collapsedAssetType, setCollapsedAssetType] = useState<string | null>(null);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newAsset, setNewAsset] = useState<NewAsset>({
    asset_type: '',
    location_latitude: '',
    location_longitude: '',
    installation_date: '',
    panchayat_id: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [panchayats, setPanchayats] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const assetResponse = await axios.get<Asset[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/assets/`);
        const fetchedAssets = assetResponse.data;
        setAssets(fetchedAssets);

        const panchayatIds = Array.from(new Set(fetchedAssets.map(asset => asset.panchayat_id)));
        if (panchayatIds.length > 0) {
          const panchayatRequests = panchayatIds.map(id => axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/panchayats/${id}`));
          const panchayatResponses = await Promise.all(panchayatRequests);
          const panchayatMap = panchayatResponses.reduce((acc: { [id: string]: string }, { data }) => {
            acc[data._id] = data.name;
            return acc;
          }, {});
          setPanchayats(panchayatMap);
        }
      } catch (error) {
        console.error('Error fetching assets or panchayats:', error);
      }
    };

    fetchAssets();
  }, []);

  const handleDelete = async () => {
    if (selectedAssetId) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/assets/${selectedAssetId}`);
        setAssets(assets.filter(asset => asset._id !== selectedAssetId));
        setSuccess('Asset deleted successfully');
      } catch (error) {
        setError('Error deleting asset');
        console.error('Error deleting asset:', error);
      }
      setOpenDeleteDialog(false);
      setSelectedAssetId(null);
    }
  };

  const handleCreateAsset = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post<Asset>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/assets/`, newAsset);
      setAssets([...assets, response.data]);
      setSuccess('Asset created successfully');
      setNewAsset({
        asset_type: '',
        location_latitude: '',
        location_longitude: '',
        installation_date: '',
        panchayat_id: ''
      });
    } catch (error) {
      setError('Error creating asset');
      console.error('Error creating asset:', error);
    }
  };

  const handleAssetTypeClick = (type: string) => {
    setCollapsedAssetType(type === collapsedAssetType ? null : type);
  };

  const assetCategories = Object.entries(
    assets.reduce<{ [key: string]: Asset[] }>((acc, asset) => {
      acc[asset.asset_type] = acc[asset.asset_type] || [];
      acc[asset.asset_type].push(asset);
      return acc;
    }, {})
  );

  return (
    <Box p={4} display="flex" className="py-16 min-h-screen my-8">
      <Box flex={1} mr={2} borderRight="1px solid #ddd">
        <Typography variant="h4" gutterBottom>Asset Management</Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <Box mb={4}>
          <Typography variant="h6" gutterBottom>Add New Asset</Typography>
          <form onSubmit={handleCreateAsset}>
            <TextField
              label="Asset Type"
              fullWidth
              margin="normal"
              value={newAsset.asset_type}
              onChange={(e) => setNewAsset({ ...newAsset, asset_type: e.target.value })}
              required
            />
            <TextField
              label="Location Latitude"
              type="decimal"
              fullWidth
              margin="normal"
              value={newAsset.location_latitude}
              onChange={(e) => setNewAsset({ ...newAsset, location_latitude: e.target.value })}
              required
            />
            <TextField
              label="Location Longitude"
              type="decimal"
              fullWidth
              margin="normal"
              value={newAsset.location_longitude}
              onChange={(e) => setNewAsset({ ...newAsset, location_longitude: e.target.value })}
              required
            />
            <TextField
              label="Installation Date"
              type="date"
              fullWidth
              margin="normal"
              value={newAsset.installation_date}
              onChange={(e) => setNewAsset({ ...newAsset, installation_date: e.target.value })}
              required
            />
            <TextField
              label="Panchayat ID"
              fullWidth
              margin="normal"
              value={newAsset.panchayat_id}
              onChange={(e) => setNewAsset({ ...newAsset, panchayat_id: e.target.value })}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Asset
            </Button>
          </form>
        </Box>

        <Typography variant="h6" gutterBottom>Asset Types</Typography>
        {assetCategories.map(([type, assets]) => (
          <Box key={type} mb={2}>
            <Button
              fullWidth
              onClick={() => handleAssetTypeClick(type)}
              endIcon={collapsedAssetType === type ? <ExpandLess /> : <ExpandMore />}
              sx={{ textAlign: 'left', justifyContent: 'space-between', fontWeight: 'bold' }}
            >
              {type}
            </Button>
            <Collapse in={collapsedAssetType === type}>
              <List>
                {assets.map((asset) => (
                  <ListItem
                    key={asset._id}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => { setSelectedAssetId(asset._id); setOpenDeleteDialog(true); }}>
                        <Delete />
                      </IconButton>
                    }
                    sx={{ borderBottom: '1px solid #ddd' }}
                  >
                    <ListItemText
                      primary={`ID: ${asset._id}`}
                      secondary={`Location: (${asset.location_latitude}, ${asset.location_longitude}), Installation Date: ${asset.installation_date}, Panchayat: ${panchayats[asset.panchayat_id] || 'Unknown'}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <Divider />
          </Box>
        ))}
      </Box>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this asset?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssetManagementPage;
