const Card = require('../models/card.js');
const NotFoundError = require('../errors/NotFoundError.js');
const ForbiddenError = require('../errors/ForbiddenError.js');


module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => { res.send({ data: card }); })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
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
        throw new ForbiddenError('Forbidden!');
      }
    })
    .then((card) => Card.deleteOne(card))
    .then(() => res.send({ message: 'Карточка удалена!' }))
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
