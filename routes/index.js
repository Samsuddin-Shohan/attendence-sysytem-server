const authROutes = require('./auth');
const router = require('express').Router();

router.use('/api/v1/auth', authROutes);

module.exports = router;
