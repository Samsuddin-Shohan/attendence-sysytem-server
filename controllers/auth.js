const { loginServices, registerServices } = require('../services/authServices');
const loginController = async (req, res, next) => {
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(400).json({ message: 'Please Provide your information' });
  }
  try {
    const token = await loginServices({ email, password });
    res.status(200).json({ message: 'Logged in', token });
  } catch (e) {
    next(e);
  }
};

const registerController = async (req, res, next) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    res
      .status(400)
      .json({ message: 'Please Provide your all your information correctly' });
  }
  try {
    const user = await registerServices({ name, password, email });
    res.status(201).json({ message: 'User created', user });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  loginController,
  registerController,
};
