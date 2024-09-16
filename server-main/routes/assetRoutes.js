const express = require('express');
const { addAsset, getAssets, getAssetById, updateAsset, deleteAsset } = require('../controllers/assetController');
const router = express.Router();

router.post('/', addAsset);
router.get('/', getAssets);
router.get('/:id', getAssetById);
router.put('/:id', updateAsset);
router.delete('/:id', deleteAsset);

module.exports = router;
