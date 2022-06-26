const authROutes = require('./auth');
const userROutes = require('./user');
const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');

router.use('/api/v1/auth', authROutes);
router.use('/api/v1/users', authenticate, userROutes);

module.exports = router;
