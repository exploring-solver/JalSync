"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, TextField, Select, MenuItem, Typography, Divider } from '@mui/material';
import { OlaMaps } from '@/olaSDK/olamaps-js-sdk.es';

interface Asset {
  id: string;
  type: string;
  latitude: number;
  longitude: number;
  installationDate: string;
  manufacturer: string;
  model: string;
  capacity: string;
  condition: string;
}

const GISAssetManagement: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const olaMapsRef = useRef<OlaMaps | null>(null);
  const myMapRef = useRef<unknown>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [newAsset, setNewAsset] = useState<Asset>({
    id: '',
    type: '',
    latitude: 0,
    longitude: 0,
    installationDate: '',
    manufacturer: '',
    model: '',
    capacity: '',
    condition: '',
  });

  // Load dummy data on component mount
  useEffect(() => {
    const dummyAssets: Asset[] = [
      {
        id: '1',
        type: 'Pump',
        latitude: 28.690229,
        longitude: 77.2881183,
        installationDate: '2022-06-01',
        manufacturer: 'Company A',
        model: 'X123',
        capacity: '100L',
        condition: 'Excellent',
      },
      {
        id: '2',
        type: 'Pipeline',
        latitude: 28.691229,
        longitude: 77.2891183,
        installationDate: '2021-03-15',
        manufacturer: 'Company B',
        model: 'P456',
        capacity: '200L',
        condition: 'Good',
      },
      {
        id: '3',
        type: 'Valve',
        latitude: 28.692229,
        longitude: 77.2871183,
        installationDate: '2020-12-20',
        manufacturer: 'Company C',
        model: 'V789',
        capacity: '50L',
        condition: 'Fair',
      },
    ];
    setAssets(dummyAssets);
  }, []);

  useEffect(() => {
    if (!olaMapsRef.current && mapContainerRef.current) {
      olaMapsRef.current = new OlaMaps({
        apiKey: process.env.NEXT_PUBLIC_OLA_API_KEY,
      });

      myMapRef.current = olaMapsRef.current.init({
        style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
        container: mapContainerRef.current,
        center: [77.2881183, 28.690229],
        zoom: 16,
      });
    }

    // Add markers when assets change
    if (myMapRef.current && assets.length) {
      assets.forEach((asset) => {
        const popup = olaMapsRef.current!.addPopup({ offset: [0, -30], anchor: 'bottom' })
          .setHTML(`<div class="font-semibold text-xl text-gray-800">${asset.type}</div>`);

        olaMapsRef.current!
          .addMarker({ offset: [0, 6], anchor: 'bottom', color: 'blue' })
          .setLngLat([asset.longitude, asset.latitude])
          .addTo(myMapRef.current)
          .setPopup(popup);
      });
    }
  }, [assets]);

  const handleAddAsset = () => {
    setAssets([...assets, newAsset]);
    setNewAsset({
      id: '',
      type: '',
      latitude: 0,
      longitude: 0,
      installationDate: '',
      manufacturer: '',
      model: '',
      capacity: '',
      condition: '',
    });
  };

  const handleUpdateAsset = (updatedAsset: Asset) => {
    setAssets(assets.map(asset => asset.id === updatedAsset.id ? updatedAsset : asset));
  };

  return (
    <Box sx={{ p: 4, minHeight: '100vh', py: 16, mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
      <Box sx={{ maxWidth: 'lg', width: '100%' }}>
        <Typography variant="h2" sx={{ mb: 4, fontWeight: 'bold', color: '#333' }}>GIS-based Asset Management</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Box sx={{ height: 400 }}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div ref={mapContainerRef} className="w-full h-[600px] border-2 border-gray-300 rounded-lg" />
            </div>
          </Box>
          <Box sx={{ p: 4, backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold',color: '#333' }}>Asset Details</Typography>
            <Box>
              <TextField
                label="Asset ID"
                value={newAsset.id}
                onChange={(e) => setNewAsset({ ...newAsset, id: e.target.value })}
                fullWidth
                margin="normal"
                sx={{ color: '#333' }}
              />
              <Select
                label="Asset Type"
                value={newAsset.type}
                onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })}
                fullWidth
                margin="dense"
                sx={{ color: '#333' }}
                placeholder='Asset Type'
              >
                <MenuItem value="Pump" sx={{ color: '#333' }}>Pump</MenuItem>
                <MenuItem value="Pipeline" sx={{ color: '#333' }}>Pipeline</MenuItem>
                <MenuItem value="Valve" sx={{ color: '#333' }}>Valve</MenuItem>
                <MenuItem value="Treatment Plant" sx={{ color: '#333' }}>Treatment Plant</MenuItem>
              </Select>
              <TextField
                label="Latitude"
                type="number"
                value={newAsset.latitude}
                onChange={(e) => setNewAsset({ ...newAsset, latitude: parseFloat(e.target.value) })}
                fullWidth
                margin="normal"
                sx={{ color: '#333' }}
              />
              <TextField
                label="Longitude"
                type="number"
                value={newAsset.longitude}
                onChange={(e) => setNewAsset({ ...newAsset, longitude: parseFloat(e.target.value) })}
                fullWidth
                margin="normal"
                sx={{ color: '#333' }}
              />
              <TextField
                label="Installation Date"
                type="date"
                value={newAsset.installationDate}
                onChange={(e) => setNewAsset({ ...newAsset, installationDate: e.target.value })}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                sx={{ color: '#333' }}
              />
              <TextField
                label="Manufacturer"
                value={newAsset.manufacturer}
                onChange={(e) => setNewAsset({ ...newAsset, manufacturer: e.target.value })}
                fullWidth
                margin="normal"
                sx={{ color: '#333' }}
              />
              <TextField
                label="Model"
                value={newAsset.model}
                onChange={(e) => setNewAsset({ ...newAsset, model: e.target.value })}
                fullWidth
                margin="normal"
                sx={{ color: '#333' }}
              />
              <TextField
                label="Capacity"
                value={newAsset.capacity}
                onChange={(e) => setNewAsset({ ...newAsset, capacity: e.target.value })}
                fullWidth
                margin="normal"
                sx={{ color: '#333' }}
              />
              <Select
                label="Condition"
                value={newAsset.condition}
                onChange={(e) => setNewAsset({ ...newAsset, condition: e.target.value })}
                fullWidth
                margin="dense"
                sx={{ color: '#333' }}
                placeholder='Condition'
              >
                <MenuItem value="Excellent" sx={{ color: '#333' }}>Excellent</MenuItem>
                <MenuItem value="Good" sx={{ color: '#333' }}>Good</MenuItem>
                <MenuItem value="Fair" sx={{ color: '#333' }}>Fair</MenuItem>
                <MenuItem value="Poor" sx={{ color: '#333' }}>Poor</MenuItem>
              </Select>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Button type="button" variant="contained" color="success" sx={{ color: '#fff' }} onClick={handleAddAsset}>
                  Add Asset
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        {assets.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, color: '#333' }} className='font-semibold text-center'>Asset List</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
              {assets.map((asset) => (
                <Box
                  key={asset.id}
                  sx={{
                    p: 2,
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                  onClick={() => handleUpdateAsset(asset)}
                >
                  <Typography variant="h6" sx={{ color: '#333' }} className='font-semibold text-center text-2xl'>{asset.type}</Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}className='font-semibold text-left text-xl'>ID: {asset.id}</Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}className='font-semibold text-left text-xl'>Latitude: {asset.latitude}</Typography>
                  <Typography variant="body2" sx={{ color: '#555' }} className='font-semibold text-left text-xl'>Longitude: {asset.longitude}</Typography>
                  <Typography variant="body2" sx={{ color: '#555' }}className='font-semibold text-left text-xl'>Condition: {asset.condition}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GISAssetManagement;
