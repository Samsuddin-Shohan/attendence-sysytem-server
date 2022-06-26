const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.putUserById);
router.patch('/:userId', userController.patchUserById);
router.delete('/:userId', userController.deleteUserById);
router.get('/', userController.getUsers);
router.post('/', userController.postUser);

module.exports = router;
