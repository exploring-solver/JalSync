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

// const { admin, adminRouter } = require('./admin/admin');

dotenv.config();
// connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res) => {
  res.json("Welcome to JalSync API by team ramanujan (sih-2024)!!")
})
app.use('/api/users', userRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/consumables', consumableRoutes);
app.use('/api/billings', billingRoutes);
app.use('/api/panchayats', panchayatRoutes);

const start = async () => {
  connectDB();
  
  // Dynamically import AdminJS and @adminjs/mongoose
  const { default: AdminJS } = await import('adminjs');
  const AdminJSMongoose = await import('@adminjs/mongoose');
  const { buildRouter } = await import('@adminjs/express');
  
  // Import the models
  const User = require('./models/User');
  const Asset = require('./models/Asset');
  const Consumable = require('./models/Consumable');
  const Billing = require('./models/Billing');
  const Panchayat = require('./models/Panchayat');
  
  // Register AdminJS Mongoose adapter
  AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
  });

  // Configure AdminJS
  const adminOptions = {
    resources: [
      { resource: User, options: { parent: { name: 'User Management' } } },
      { resource: Asset, options: { parent: { name: 'Asset Management' } } },
      { resource: Consumable, options: { parent: { name: 'Inventory Management' } } },
      { resource: Billing, options: { parent: { name: 'Billing Management' } } },
      { resource: Panchayat, options: { parent: { name: 'Panchayat Management' } } },
    ],
    rootPath: '/admin',  // Path to access the admin panel
  };
  
  const admin = new AdminJS(adminOptions);
  const adminRouter = buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();