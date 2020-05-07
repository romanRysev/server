/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const path = require('path');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
} = require(path.resolve('controllers/users'));
const auth = require(path.resolve('middlewares/auth'));

router.post('/signup', createUser);
router.post('/signin', login);
router.use(auth);
router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
