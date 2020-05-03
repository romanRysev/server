const router = require('express').Router();
const path = require('path');
const Card = require(path.resolve('models/card.js'));

router.get('/', (req, res) => {
  Card.find({})
      .then(card => res.send({ data: card }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.post('/', (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, "owner" : req.user._id })
      .then(card => res.send({ data: card }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.delete('/:cardId', (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
      .then(card => res.send({ data: card }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.put('/:cardId/likes', (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true },)
      .then(card => res.send({ data: card }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.delete('/:cardId/likes', (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true },)
      .then(card => res.send({ data: card }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
});

module.exports = router;
