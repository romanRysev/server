const router = require('express').Router();

const validateNewUser = require('../middlewares/validateNewUser');
const validateLogin = require('../middlewares/validateLogin');

const users = require('./users.js');
const cards = require('./cards.js');
const auth = require('../middlewares/auth');
const { getMe, createUser, login } = require('../controllers/users');


router.post('/signup', validateNewUser, createUser);
router.post('/signin', validateLogin, login);
router.use('/users', users);
router.use('/cards', cards);
router.use(auth);
router.get('/me', getMe);

module.exports = router;
