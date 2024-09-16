const Asset = require('../models/Asset');

// Add a new asset
const addAsset = async (req, res) => {
  const { asset_type, location_latitude, location_longitude, installation_date, panchayat_id } = req.body;

  try {
    const asset = new Asset({ asset_type, location_latitude, location_longitude, installation_date, panchayat_id });
    await asset.save();
    res.status(201).json(asset);
  } catch (error) {
    res.status(400).json({ message: 'Error adding asset', error });
  }
};

// Get all assets
const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assets', error });
  }
};

// Get a single asset by ID
const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching asset', error });
  }
};

// Update an asset
const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ message: 'Error updating asset', error });
  }
};

// Delete an asset
const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.status(200).json({ message: 'Asset deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting asset', error });
  }
};

module.exports = { addAsset, getAssets, getAssetById, updateAsset, deleteAsset };
