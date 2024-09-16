const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  asset_type: { type: String, required: true },
  location_latitude: { type: Number, required: true },
  location_longitude: { type: Number, required: true },
  installation_date: { type: Date, required: true },
  last_maintenance_date: { type: Date },
  panchayat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Panchayat', required: true }
}, { timestamps: true });

const Asset = mongoose.model('Asset', assetSchema);
module.exports = Asset;
