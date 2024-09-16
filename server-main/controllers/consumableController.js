const Consumable = require('../models/Consumable');

// Add a new consumable
const addConsumable = async (req, res) => {
  const { item_name, current_quantity, minimum_threshold, replenishment_due_date, panchayat_id } = req.body;

  try {
    const consumable = new Consumable({ item_name, current_quantity, minimum_threshold, replenishment_due_date, panchayat_id });
    await consumable.save();
    res.status(201).json(consumable);
  } catch (error) {
    res.status(400).json({ message: 'Error adding consumable', error });
  }
};

// Get all consumables
const getConsumables = async (req, res) => {
  try {
    const consumables = await Consumable.find();
    res.status(200).json(consumables);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching consumables', error });
  }
};

// Get a single consumable by ID
const getConsumableById = async (req, res) => {
  try {
    const consumable = await Consumable.findById(req.params.id);
    if (!consumable) return res.status(404).json({ message: 'Consumable not found' });
    res.status(200).json(consumable);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching consumable', error });
  }
};

// Update a consumable
const updateConsumable = async (req, res) => {
  try {
    const consumable = await Consumable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!consumable) return res.status(404).json({ message: 'Consumable not found' });
    res.status(200).json(consumable);
  } catch (error) {
    res.status(500).json({ message: 'Error updating consumable', error });
  }
};

// Delete a consumable
const deleteConsumable = async (req, res) => {
  try {
    const consumable = await Consumable.findByIdAndDelete(req.params.id);
    if (!consumable) return res.status(404).json({ message: 'Consumable not found' });
    res.status(200).json({ message: 'Consumable deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting consumable', error });
  }
};

module.exports = { addConsumable, getConsumables, getConsumableById, updateConsumable, deleteConsumable };
