const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/users', require('./routes/user.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/sizes', require('./routes/clothSize.routes'));
app.use('/api/units', require('./routes/unit.routes'));
app.use('/api/stock', require('./routes/stock.routes'));


// DB Connection Test and Server Start
const PORT = process.env.port || 3001;
sequelize.authenticate()
  .then(() => {
    console.log('✅ DB connection successful');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to DB:', err.message);
  });
