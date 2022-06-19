const express = require('express');
var bcrypt = require('bcryptjs');

const connectDb = require('./db/db');
const User = require('./models/User.js');
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'Server Error Occurred' });
});

app.post('/register', async (req, res, next) => {
  console.log('hitted');
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    res
      .status(400)
      .json({ message: 'Please Provide your information correctly' });
  }
  try {
    let user = await User.findOne({ email });
    console.log(user);
    if (user) {
      res.status(400).json({ message: 'User already existed' });
    }
    user = new User({ name, password, email });
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    user.password = hash;
    await user.save();
    res.send('user created');
  } catch (e) {
    next(e);
  }
});
app.post('/login', async (req, res, next) => {
  console.log('hitted');
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(400).json({ message: 'Please Provide your information' });
  }
  try {
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      res
        .status(400)
        .json({ message: 'Please correctly provide your credential' });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      res
        .status(400)
        .json({ message: 'Please correctly provide your credential' });
    }

    res.send('logged in');
  } catch (e) {
    next(e);
  }
});

connectDb('mongodb://localhost:27017/attendence-system').then(() => {
  console.log('databse connected');
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
