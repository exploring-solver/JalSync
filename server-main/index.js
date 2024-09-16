const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const assetRoutes = require('./routes/assetRoutes');
const consumableRoutes = require('./routes/consumableRoutes');
const billingRoutes = require('./routes/billingRoutes');
const panchayatRoutes = require('./routes/panchayatRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/consumables', consumableRoutes);
app.use('/api/billings', billingRoutes);
app.use('/api/panchayats', panchayatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
