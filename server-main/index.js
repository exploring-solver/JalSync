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

const Razorpay = require('razorpay');
const crypto = require('crypto');

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


// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Endpoint to create a new order
app.post('/api/payments/', async (req, res) => {
  const { amount } = req.body; // Amount should be in paise

  try {
    const options = {
      amount, // amount in paise
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    const order = await razorpay.orders.create(options);
    res.json({
      orderId: order.id,
      currency: order.currency,
      amount: order.amount,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).send('Server error');
  }
});

// Endpoint to verify payment signature
app.post('/api/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature === razorpay_signature) {
    res.send('Payment verified');
  } else {
    res.status(400).send('Invalid signature');
  }
});



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