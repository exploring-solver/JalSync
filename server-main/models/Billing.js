const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  consumer_name: { type: String, required: true },
  billing_amount: { type: Number, required: true },
  due_date: { type: Date, required: true },
  payment_status: { type: String, enum: ['Paid', 'Unpaid'], required: true },
  panchayat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Panchayat', required: true }
}, { timestamps: true });

const Billing = mongoose.model('Billing', billingSchema);
module.exports = Billing;
