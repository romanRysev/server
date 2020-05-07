const router = require('express').Router();
const path = require('path');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  // eslint-disable-next-line import/no-dynamic-require
} = require(path.resolve('controllers/users'));

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/signup', createUser);
router.post('/signin', login);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
