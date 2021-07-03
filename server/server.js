const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

// Configurations
const mongoose_config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
mongoose.set('useFindAndModify', false);
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./Users/UserRouter'));
app.use('/api/gastos', require('./Gastos/GastosRouter'));
app.use('/api/items', require('./Items/ItemRouter'));
app.get('/api', (req, res) => {
  res.send('<h1>Bienvenido a la API de UniPiso<h1/>');
});

app.use(express.static('../client/build'));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Connection to DB
mongoose
  .connect(
    process.env.MONGODB_URI || `mongodb://localhost:27017/UniPisoDB`,
    mongoose_config
  )
  .then(() => {
    console.log('Connection to the UniPiso DB is successful!');
  })
  .catch((err) => console.error(err));

// Server Initialization
let port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server on port', port);
});

module.exports = app;
