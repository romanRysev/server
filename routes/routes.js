const router = require('express').Router();
const users = require('./users.js');
const cards = require('./cards.js');

router.use('/users', users);
router.use('/cards', cards);

module.exports = router;
