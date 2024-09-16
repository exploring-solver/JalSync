const express = require('express');
const { addConsumable, getConsumables, getConsumableById, updateConsumable, deleteConsumable } = require('../controllers/consumableController');
const router = express.Router();

router.post('/', addConsumable);
router.get('/', getConsumables);
router.get('/:id', getConsumableById);
router.put('/:id', updateConsumable);
router.delete('/:id', deleteConsumable);

module.exports = router;
