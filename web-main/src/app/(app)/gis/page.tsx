"use client";
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Box } from '@mui/material';

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
    const [assets, setAssets] = useState<Asset[]>([]);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

    const handleAddAsset = (newAsset: Asset) => {
        setAssets([...assets, newAsset]);
    };

    const handleUpdateAsset = (updatedAsset: Asset) => {
        setAssets(assets.map(asset => asset.id === updatedAsset.id ? updatedAsset : asset));
    };

    return (
        <Box p={4} className="min-h-screen py-12 mt-10 flex justify-center items-center">
            <Box maxWidth="md" width="100%">
                <h1 className="text-2xl font-bold mb-4">GIS-based Asset Management</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-96">
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {assets.map(asset => (
                                <Marker
                                    key={asset.id}
                                    position={[asset.latitude, asset.longitude]}
                                    eventHandlers={{
                                        click: () => setSelectedAsset(asset),
                                    }}
                                >
                                    <Popup>{asset.type}</Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Asset Details</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            selectedAsset ? handleUpdateAsset(selectedAsset) : handleAddAsset(selectedAsset as Asset);
                        }}>
                            <Input
                                label="Asset ID"
                                value={selectedAsset?.id || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, id: e.target.value } as Asset)}
                            />
                            <Select
                                label="Asset Type"
                                options={['Pump', 'Pipeline', 'Valve', 'Treatment Plant']}
                                value={selectedAsset?.type || ''}
                                onChange={(value) => setSelectedAsset({ ...selectedAsset, type: value } as Asset)}
                            />
                            <Input
                                label="Latitude"
                                type="number"
                                value={selectedAsset?.latitude || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, latitude: parseFloat(e.target.value) } as Asset)}
                            />
                            <Input
                                label="Longitude"
                                type="number"
                                value={selectedAsset?.longitude || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, longitude: parseFloat(e.target.value) } as Asset)}
                            />
                            <Input
                                label="Installation Date"
                                type="date"
                                value={selectedAsset?.installationDate || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, installationDate: e.target.value } as Asset)}
                            />
                            <Input
                                label="Manufacturer"
                                value={selectedAsset?.manufacturer || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, manufacturer: e.target.value } as Asset)}
                            />
                            <Input
                                label="Model"
                                value={selectedAsset?.model || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, model: e.target.value } as Asset)}
                            />
                            <Input
                                label="Capacity"
                                value={selectedAsset?.capacity || ''}
                                onChange={(e) => setSelectedAsset({ ...selectedAsset, capacity: e.target.value } as Asset)}
                            />
                            <Select
                                label="Condition"
                                options={['Excellent', 'Good', 'Fair', 'Poor']}
                                value={selectedAsset?.condition || ''}
                                onChange={(value) => setSelectedAsset({ ...selectedAsset, condition: value } as Asset)}
                            />
                            <Button type="submit">{selectedAsset ? 'Update Asset' : 'Add Asset'}</Button>
                        </form>
                    </div>
                </div>
            </Box>
        </Box>
    );
};

export default GISAssetManagement;