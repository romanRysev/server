const router = require('express').Router();
const path = require('path');

const auth = require('../middlewares/auth');
const validateNewCard = require('../middlewares/validateNewCard');
const validateId = require('../middlewares/validateId');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
  // eslint-disable-next-line import/no-dynamic-require
} = require(path.resolve('controllers/cards'));

router.use(auth);
router.get('/', getCards);
router.post('/', validateNewCard, createCard);
router.delete('/:Id', validateId, deleteCard);
router.put('/:Id/likes', validateId, likeCard);
router.delete('/:Id/likes', validateId, dislikeCard);

module.exports = router;
