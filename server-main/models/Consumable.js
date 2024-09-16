const mongoose = require('mongoose');

const consumableSchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  current_quantity: { type: Number, required: true },
  minimum_threshold: { type: Number, required: true },
  panchayat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Panchayat', required: true },
  replenishment_due_date: { type: Date }
}, { timestamps: true });

const Consumable = mongoose.model('Consumable', consumableSchema);
module.exports = Consumable;
