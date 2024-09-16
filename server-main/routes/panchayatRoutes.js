const express = require('express');
const { addPanchayat, getPanchayats, getPanchayatById, updatePanchayat, deletePanchayat } = require('../controllers/panchayatController');
const router = express.Router();

router.post('/', addPanchayat);
router.get('/', getPanchayats);
router.get('/:id', getPanchayatById);
router.put('/:id', updatePanchayat);
router.delete('/:id', deletePanchayat);

module.exports = router;
