const jwt = require('jsonwebtoken');
const User = require('../models/User');
async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'unauthorized' });
    }
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, 'secret-key');
    // console.log(decoded);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: 'invalid tokens' });
    }
    req.user = user;
    // console.log(decoded);
    next();
  } catch (e) {
    return res.status(401).json({ message: 'invalid token' });
  }
}
module.exports = authenticate;
