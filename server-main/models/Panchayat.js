const mongoose = require('mongoose');

const panchayatSchema = new mongoose.Schema({
  panchayat_name: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  contact_details: { type: String, required: true }
}, { timestamps: true });

const Panchayat = mongoose.model('Panchayat', panchayatSchema);
module.exports = Panchayat;
