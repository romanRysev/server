/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const path = require('path');
const validator = require('validator');
// eslint-disable-next-line import/no-dynamic-require
const User = require(path.resolve('models/user.js'));

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) { throw new Error('Source not found'); }
      return user;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Source not found') {
        res.status(404).send({ message: 'Ресурс не найден!' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};


module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  if (!validator.isURL(avatar)) {
    return res.status(500).send({ message: 'invalid URL' });
  }
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  if (!validator.isURL(avatar)) {
    return res.status(500).send({ message: 'invalid URL' });
  }
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
