/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const path = require('path');

const users = require(path.resolve('routes/users.js'));
const cards = require(path.resolve('routes/cards.js'));
const auth = require(path.resolve('middlewares/auth'));
const { getMe } = require(path.resolve('controllers/users'));

router.use('/users', users);
router.use('/cards', cards);
router.use(auth);
router.get('/me', getMe);

module.exports = router;
