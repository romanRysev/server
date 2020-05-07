/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const path = require('path');

const auth = require(path.resolve('middlewares/auth'));

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
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
