const mongoose = require('../../../services/mongoose');

const assetSchema = new mongoose.Schema({
 
});

const Asset = mongoose.model('Assets', assetSchema);
module.exports = Asset;
