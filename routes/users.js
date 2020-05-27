const router = require('express').Router();

const validateId = require('../middlewares/validateId');
const validateUserUpdate = require('../middlewares/validateUserUpdate');
const validateAvatar = require('../middlewares/validateAvatar');

const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.use(auth);
router.get('/', getUsers);
router.get('/:Id', validateId, getUser);
router.patch('/me', validateUserUpdate, updateUser);
router.patch('/me/avatar', validateAvatar, updateUserAvatar);

module.exports = router;
