const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const loginController = async (req, res, next) => {
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(400).json({ message: 'Please Provide your information' });
  }
  try {
    let user = await User.findOne({ email });
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
    delete user._doc.password;
    const token = jwt.sign(user._doc, 'secret-key');
    res.status(200).json({ message: 'Logged in', token });
  } catch (e) {
    next(e);
  }
};

const registerController = async (req, res, next) => {
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
};

module.exports = {
  loginController,
  registerController,
};
