/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const path = require('path');

const users = require(path.resolve('routes/users.js'));
const cards = require(path.resolve('routes/cards.js'));

router.use('/users', users);
router.use('/cards', cards);

module.exports = router;
