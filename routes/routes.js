const router = require('express').Router();
const users = require('./users.js');
const cards = require('./cards.js');

router.use('/cards', cards);
router.use('/users', users);


module.exports = router;
