/* eslint-disable import/no-dynamic-require */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const path = require('path');
const validator = require('validator');

const Card = require(path.resolve('models/card.js'));
const BadRequestError = require(path.resolve('errors/BadRequestError.js'));
const NotFoundError = require(path.resolve('errors/NotFoundError.js'));
const UnauthorizedError = require(path.resolve('errors/UnauthorizedError.js'));

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => { res.set('Access-Control-Allow-Origin', '*'); res.send({ data: card }); })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  if (!validator.isURL(link)) {
    throw new BadRequestError('invalid URL');
  }
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.Id)
    .then((card) => {
      if (!card) { throw new NotFoundError('Source not found'); }
      return card;
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new UnauthorizedError('Unauthorized!');
      }
    })
    .then((card) => Card.deleteOne(card))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.Id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) { throw new NotFoundError('Source not found'); }
      return card;
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.Id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) { throw new NotFoundError('Source not found'); }
      return card;
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};
