const express = require('express');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDb = require('./db/db');
const { loginController, registerController } = require('./controllers/auth');
const User = require('./models/User.js');
require('dotenv').config();
const cors = require('cors');
const authenticate = require('./middlewares/authenticate');
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'Server Error Occurred' });
});

app.post('/register', registerController);
app.post('/login', loginController);
app.get('/public', authenticate, (req, res, next) => {
  return res.json({ message: 'I am a public route' });
});
app.get('/private', authenticate, (req, res, next) => {
  console.log(`i am the user ${req.user}`);
  return res.status(200).json({ message: 'I am a private route' });
});

connectDb('mongodb://localhost:27017/attendence-system').then(() => {
  console.log('databse connected');
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
