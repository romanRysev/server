/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const path = require('path');

const validateId = require(path.resolve('middlewares/validateId'));
const validateNewUser = require(path.resolve('middlewares/validateNewUser'));
const validateLogin = require(path.resolve('middlewares/validateLogin'));
const validateUserUpdate = require(path.resolve('middlewares/validateUserUpdate'));
const validateAvatar = require(path.resolve('middlewares/validateAvatar'));

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
} = require(path.resolve('controllers/users'));
const auth = require(path.resolve('middlewares/auth'));

router.post('/signup', validateNewUser, createUser);
router.post('/signin', validateLogin, login);
router.use(auth);
router.get('/', getUsers);
router.get('/:userId', validateId, getUser);
router.patch('/me', validateUserUpdate, updateUser);
router.patch('/me/avatar', validateAvatar, updateUserAvatar);

module.exports = router;
