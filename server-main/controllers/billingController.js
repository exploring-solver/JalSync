const Billing = require('../models/Billing');

// Add a new billing record
const addBilling = async (req, res) => {
  const { consumer_name, billing_amount, due_date, payment_status, panchayat_id } = req.body;

  try {
    const billing = new Billing({ consumer_name, billing_amount, due_date, payment_status, panchayat_id });
    await billing.save();
    res.status(201).json(billing);
  } catch (error) {
    res.status(400).json({ message: 'Error adding billing record', error });
  }
};

// Get all billing records
const getBillings = async (req, res) => {
  try {
    const billings = await Billing.find();
    res.status(200).json(billings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching billing records', error });
  }
};

// Get a single billing record by ID
const getBillingById = async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id);
    if (!billing) return res.status(404).json({ message: 'Billing record not found' });
    res.status(200).json(billing);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching billing record', error });
  }
};

// Update a billing record
const updateBilling = async (req, res) => {
  try {
    const billing = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!billing) return res.status(404).json({ message: 'Billing record not found' });
    res.status(200).json(billing);
  } catch (error) {
    res.status(500).json({ message: 'Error updating billing record', error });
  }
};

// Delete a billing record
const deleteBilling = async (req, res) => {
  try {
    const billing = await Billing.findByIdAndDelete(req.params.id);
    if (!billing) return res.status(404).json({ message: 'Billing record not found' });
    res.status(200).json({ message: 'Billing record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting billing record', error });
  }
};

module.exports = { addBilling, getBillings, getBillingById, updateBilling, deleteBilling };
