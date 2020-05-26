/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const path = require('path');
const validator = require('validator');
// eslint-disable-next-line import/no-dynamic-require
const Card = require(path.resolve('models/card.js'));

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  if (!validator.isURL(link)) {
    return res.status(500).send({ message: 'invalid URL' });
  }
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) { throw new Error('Source not found'); }
      return card;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Source not found') {
        res.status(404).send({ message: 'Ресурс не найден!' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) { throw new Error('Source not found'); }
      return card;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Source not found') {
        res.status(404).send({ message: 'Ресурс не найден!' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) { throw new Error('Source not found'); }
      return card;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Source not found') {
        res.status(404).send({ message: 'Ресурс не найден!' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
