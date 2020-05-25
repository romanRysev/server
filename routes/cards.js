/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const path = require('path');

const auth = require(path.resolve('middlewares/auth'));
const validateNewCard = require(path.resolve('middlewares/validateNewCard'));
const validateId = require(path.resolve('middlewares/validateId'));

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
router.delete('/:cardId', validateId, deleteCard);
router.put('/:cardId/likes', validateId, likeCard);
router.delete('/:cardId/likes', validateId, dislikeCard);

module.exports = router;
