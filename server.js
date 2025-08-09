const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth'); // ✅ Import your routes
const app = express();

// MongoDB Connect
mongoose.connect('mongodb+srv://gowsickarancse2023:g0wsic%40031@shopeasecluster.wdio1yi.mongodb.net/ShopEaseDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Mongo Error:', err));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Register auth routes here
app.use('/auth', authRoutes);

// Default route to login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/login.html`);
});
