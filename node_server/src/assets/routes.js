const express = require('express');
const router = express.Router();
const catalogueController = require('./controllers/catalogueController');
const auth = require('../../middlewares/auth');

module.exports = router;
